// books call for people buying protocol

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import CallBooking from '@/models/CallBooking';
import jwt from 'jsonwebtoken';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    const booking = new CallBooking({
      userId: user._id,
      date,
      slot,
      slotLabel,
    });
    await booking.save();

    user.callCreditsRemaining -= 1;
    await user.save();

    // Send emails (don't block the response on failure)
    try {
      await resend.emails.send({
        from: 'Mogward <onboarding@resend.dev>',
        to: user.email,
        subject: 'Your Call is Confirmed',
        html: `<p>Hi ${user.name},</p><p>Your 1:1 call is booked for <b>${date}</b>, slot: <b>${slotLabel}</b>.</p>`,
      });

      await resend.emails.send({
        from: 'Mogward <onboarding@resend.dev>',
        to: process.env.HOST_EMAIL,
        subject: 'New Call Booking',
        html: `<p>${user.name} (${user.email}, ${user.phone}) booked a call.</p><p>Date: ${date}<br/>Slot: ${slotLabel}</p>`,
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