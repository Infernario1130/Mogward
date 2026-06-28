import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import CallBooking from '@/models/CallBooking';
import jwt from 'jsonwebtoken';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// ── Shared row/section builders (same pattern as book-call application email) ──
function row(label, value) {
  return `
    <tr style="border-bottom: 1px solid #262626;">
      <td style="padding: 10px 0; color: #737373; font-size: 12px; width: 42%; vertical-align: top;">${label}</td>
      <td style="padding: 10px 0; color: #ffffff; font-size: 12px;">${value || '—'}</td>
    </tr>`
}

function section(label) {
  return `
    <tr>
      <td colspan="2" style="padding: 20px 0 8px; color: #9400D3; font-size: 10px; letter-spacing: 0.3em; font-weight: bold;">${label}</td>
    </tr>`
}

function emailShell({ eyebrow, bodyTable, footerNote }) {
  return `
    <div style="font-family: monospace; background: #09090b; color: #ffffff; padding: 32px; border-radius: 12px; max-width: 620px;">

      <div style="border-bottom: 2px solid #9400D3; padding-bottom: 16px; margin-bottom: 24px;">
        <h1 style="color: #9400D3; font-size: 22px; margin: 0; letter-spacing: 0.2em;">MOGWARD</h1>
        <p style="color: #737373; font-size: 11px; margin: 4px 0 0; letter-spacing: 0.3em;">${eyebrow}</p>
      </div>

      <table style="width: 100%; border-collapse: collapse;">
        ${bodyTable}
      </table>

      ${footerNote ? `
      <div style="margin-top: 28px; padding: 16px; border: 1px solid #9400D3; border-radius: 8px; background: rgba(148,0,211,0.08);">
        ${footerNote}
      </div>` : ''}

      <p style="color: #404040; font-size: 10px; letter-spacing: 0.2em; margin-top: 28px; text-align: center;">
        © 2026 MOGWARD // ALL RIGHTS RESERVED
      </p>

    </div>`
}

// ── User-facing confirmation email ──
function buildUserConfirmationEmail({ name, date, slotLabel, creditsRemaining }) {
  const bodyTable = `
    ${section('CALL CONFIRMED')}
    ${row('DATE', date)}
    ${row('TIME SLOT', slotLabel)}
    ${row('CREDITS REMAINING', creditsRemaining)}
  `

  const footerNote = `
    <p style="color: #9400D3; font-size: 10px; letter-spacing: 0.25em; margin: 0 0 6px; font-weight: bold;">WHAT'S NEXT</p>
    <p style="color: #a3a3a3; font-size: 12px; margin: 0;">We'll see you on the call — please be ready 5 minutes early.</p>
    <p style="color: #a3a3a3; font-size: 12px; margin: 4px 0 0;">Reply to this email if you need to reschedule.</p>
  `

  return emailShell({
    eyebrow: 'YOUR 1:1 CALL IS BOOKED',
    bodyTable,
    footerNote,
  })
}

// ── Admin-facing notification email ──
function buildAdminNotificationEmail({ name, email, phone, date, slotLabel }) {
  const bodyTable = `
    ${section('BOOKING DETAILS')}
    ${row('DATE', date)}
    ${row('SLOT', slotLabel)}

    ${section('CLIENT INFO')}
    ${row('NAME', name)}
    ${row('EMAIL', email)}
    ${row('PHONE', phone)}
  `

  const footerNote = `
    <p style="color: #9400D3; font-size: 10px; letter-spacing: 0.25em; margin: 0 0 6px; font-weight: bold;">QUICK REPLY</p>
    <p style="color: #a3a3a3; font-size: 12px; margin: 0;">Email: <span style="color: #ffffff;">${email}</span></p>
    <p style="color: #a3a3a3; font-size: 12px; margin: 4px 0 0;">Phone: <span style="color: #ffffff;">${phone}</span></p>
  `

  return emailShell({
    eyebrow: 'NEW PROTOCOL CALL BOOKING',
    bodyTable,
    footerNote,
  })
}

export async function POST(request) {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: 'Please login to continue' }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return NextResponse.json({ success: false, message: 'Session expired please login again' }, { status: 401 });
    }

    const { date, slot, slotLabel } = await request.json();
    if (!date || !slot || !slotLabel) {
      return NextResponse.json({ success: false, message: 'Date and slot are required' }, { status: 400 });
    }

    await connectDB();

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 401 });
    }

    if (!user.callCreditsRemaining || user.callCreditsRemaining <= 0) {
      return NextResponse.json({ success: false, message: 'No free call credits remaining' }, { status: 403 });
    }

    // ── Duplicate check — same date + same slot, regardless of who's booking ──
    // Fast-path for the common case; the unique index below is what actually
    // guarantees no two bookings ever land on the same date+slot.
    const existingBooking = await CallBooking.findOne({ date, slot });
    if (existingBooking) {
      return NextResponse.json(
        { success: false, message: 'This slot has just been booked by someone else. Please pick another.' },
        { status: 409 }
      );
    }

    let booking;
    try {
      booking = new CallBooking({
        userId: user._id,
        date,
        slot,
        slotLabel,
      });
      await booking.save();
    } catch (err) {
      if (err?.code === 11000) {
        return NextResponse.json(
          { success: false, message: 'This slot has just been booked by someone else. Please pick another.' },
          { status: 409 }
        );
      }
      throw err;
    }

    user.callCreditsRemaining -= 1;
    await user.save();

    // ── Send emails (don't block the response on failure) ──
    try {
      await resend.emails.send({
        from: 'MOGWARD <onboarding@resend.dev>',
        to: "infernario11@gmail.com", //user.email
        subject: 'Your Call is Confirmed',
        html: buildUserConfirmationEmail({
          name: user.name,
          date,
          slotLabel,
          creditsRemaining: user.callCreditsRemaining,
        }),
      });

      await resend.emails.send({
        from: 'MOGWARD Applications <ascend@mogward.com>',
        to: 'hoodiewolf11@gmail.com',
        subject: `New Call Booking via protocol user. — ${user.name} — ${date} — ${slotLabel}`,
        html: buildAdminNotificationEmail({
          name: user.name,
          email: user.email,
          phone: user.phone,
          date,
          slotLabel,
        }),
      });
    } catch (emailErr) {
      console.error('Email send failed:', emailErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Call booked successfully',
      creditsRemaining: user.callCreditsRemaining,
    }, { status: 200 });

  } catch (error) {
    console.error('Book call error:', error);
    return NextResponse.json({ success: false, message: 'Something went wrong please try again' }, { status: 500 });
  }
}