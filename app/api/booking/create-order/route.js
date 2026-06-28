// book calls for people clicking on Coaching Card

import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Booking from '@/models/Booking'
import { Resend } from 'resend'

// ── Guard env vars at startup ──
const REQUIRED_ENV = ['RESEND_API_KEY']
for (const key of REQUIRED_ENV) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
}

const resend = new Resend(process.env.RESEND_API_KEY)

const VALID_SLOTS = ['slot1', 'slot2', 'slot3', 'slot4', 'slot5', 'slot6']

const SLOT_TIMES = {
  slot1: '9:00 AM - 9:30 AM',
  slot2: '11:00 AM - 11:30 AM',
  slot3: '1:00 PM - 1:30 PM',
  slot4: '3:00 PM - 3:30 PM',
  slot5: '5:00 PM - 5:30 PM',
  slot6: '7:00 PM - 7:30 PM',
}

// ── Rate limiting (in-memory, resets on cold start) ──
const rateLimitMap = new Map()
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX = 3 // max 3 requests per IP per minute

function isRateLimited(ip) {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now - entry.firstRequest > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now })
    return false
  }

  if (entry.count >= RATE_LIMIT_MAX) return true

  entry.count++
  return false
}

// ── Sanitize string — strip HTML tags, trim ──
function sanitize(str) {
  if (!str || typeof str !== 'string') return ''
  return str.replace(/<[^>]*>/g, '').trim()
}

// ── Normalize Instagram — always store without @ ──
function normalizeInstagram(handle) {
  const clean = sanitize(handle)
  return clean.startsWith('@') ? clean.slice(1) : clean
}

// ── Normalize WhatsApp — digits and + only ──
function normalizeWhatsapp(number) {
  const clean = sanitize(number).replace(/[\s\-().]/g, '')
  return clean
}

function isValidWhatsapp(number) {
  // Must start with + and have 7–15 digits
  return /^\+?[0-9]{7,15}$/.test(number)
}

// ── Build HTML email ──
function buildEmail({ name, whatsapp, instagram, date, slot, bookingId, answers }) {
  const {
    goal, blockers, appearanceRating, faceConcerns,
    commitment, startWhen, trainingDays, diet, dietDetail,
    age, gender, city, weight, height, experience, investment,
  } = answers

  const row = (label, value) => `
    <tr style="border-bottom: 1px solid #262626;">
      <td style="padding: 10px 0; color: #737373; font-size: 12px; width: 42%; vertical-align: top;">${label}</td>
      <td style="padding: 10px 0; color: #ffffff; font-size: 12px;">${value || '—'}</td>
    </tr>`

  const section = (label) => `
    <tr>
      <td colspan="2" style="padding: 20px 0 8px; color: #9400D3; font-size: 10px; letter-spacing: 0.3em; font-weight: bold;">${label}</td>
    </tr>`

  return `
    <div style="font-family: monospace; background: #09090b; color: #ffffff; padding: 32px; border-radius: 12px; max-width: 620px;">

      <div style="border-bottom: 2px solid #9400D3; padding-bottom: 16px; margin-bottom: 24px;">
        <h1 style="color: #9400D3; font-size: 22px; margin: 0; letter-spacing: 0.2em;">MOGWARD</h1>
        <p style="color: #737373; font-size: 11px; margin: 4px 0 0; letter-spacing: 0.3em;">NEW 1:1 APPLICATION RECEIVED</p>
      </div>

      <table style="width: 100%; border-collapse: collapse;">

        ${section('BOOKING DETAILS')}
        ${row('DATE', date)}
        ${row('SLOT', `${SLOT_TIMES[slot]} (${slot})`)}
        ${row('BOOKING ID', bookingId)}

        ${section('CONTACT INFO')}
        ${row('NAME', name)}
        ${row('WHATSAPP', whatsapp)}
        ${row('INSTAGRAM', '@' + instagram)}

        ${section('APPLICATION ANSWERS')}
        ${row('MAIN GOAL', goal)}
        ${row('BLOCKERS', Array.isArray(blockers) ? blockers.join(' | ') : blockers)}
        ${row('APPEARANCE RATING', appearanceRating ? `${appearanceRating} / 5` : '—')}
        ${row('FACE CONCERNS', Array.isArray(faceConcerns) ? faceConcerns.join(' | ') : faceConcerns)}
        ${row('COMMITMENT LEVEL', commitment)}
        ${row('START TIMELINE', startWhen)}
        ${row('TRAINING DAYS/WEEK', trainingDays)}
        ${row('ON A DIET', diet === 'Yes' && dietDetail ? `Yes — ${dietDetail}` : diet)}
        ${row('AGE', age)}
        ${row('GENDER', gender)}
        ${row('CITY', city)}
        ${row('WEIGHT', weight)}
        ${row('HEIGHT', height)}
        ${row('TRAINING EXPERIENCE', experience)}
        ${row('FINANCIAL READINESS', investment)}

      </table>

      <div style="margin-top: 28px; padding: 16px; border: 1px solid #9400D3; border-radius: 8px; background: rgba(148,0,211,0.08);">
        <p style="color: #9400D3; font-size: 10px; letter-spacing: 0.25em; margin: 0 0 6px; font-weight: bold;">QUICK REPLY</p>
        <p style="color: #a3a3a3; font-size: 12px; margin: 0;">WhatsApp: <span style="color: #ffffff;">${whatsapp}</span></p>
        <p style="color: #a3a3a3; font-size: 12px; margin: 4px 0 0;">Instagram: <span style="color: #ffffff;">@${instagram}</span></p>
      </div>

      <p style="color: #404040; font-size: 10px; letter-spacing: 0.2em; margin-top: 28px; text-align: center;">
        © 2026 MOGWARD // ALL RIGHTS RESERVED
      </p>

    </div>`
}

// ── Send email async — does not block response ──
async function sendEmailAsync(payload) {
  try {
    await resend.emails.send({
      from: 'MOGWARD Applications <ascend@mogward.com>',
      to: "hoodiewolf11@gmail.com",
      subject: `New Application — ${payload.name} — ${payload.date} — ${SLOT_TIMES[payload.slot]}`,
      html: buildEmail(payload),
    })
  } catch (err) {
    console.error('[MOGWARD] Resend email failed for booking:', payload.bookingId, err?.message)
  }
}

// ── Main handler ──
export async function POST(request) {
  try {

    // ── Rate limiting ──
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown'

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please wait a moment and try again.' },
        { status: 429 }
      )
    }

    // ── Parse body ──
    let body
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { success: false, message: 'Invalid request body.' },
        { status: 400 }
      )
    }

    const {
      name: rawName,
      whatsapp: rawWhatsapp,
      instagram: rawInstagram,
      date: rawDate,
      slot: rawSlot,
      // email-only fields
      goal, blockers, appearanceRating, faceConcerns,
      commitment, startWhen, trainingDays, diet, dietDetail,
      age, gender, city, weight, height, experience, investment,
    } = body

    // ── Sanitize & normalize ──
    const name      = sanitize(rawName)
    const whatsapp  = normalizeWhatsapp(rawWhatsapp)
    const instagram = normalizeInstagram(rawInstagram)
    const date      = sanitize(rawDate)
    const slot      = sanitize(rawSlot)

    // ── Validate required fields ──
    const errors = []
    if (!name)                          errors.push('Name is required.')
    if (!whatsapp)                      errors.push('WhatsApp number is required.')
    else if (!isValidWhatsapp(whatsapp)) errors.push('WhatsApp number looks invalid. Include country code e.g. +91.')
    if (!instagram)                     errors.push('Instagram username is required.')
    if (!date)                          errors.push('Date is required.')
    if (!slot || !VALID_SLOTS.includes(slot)) errors.push('A valid time slot is required.')

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, message: errors[0] },
        { status: 400 }
      )
    }

    // ── Connect DB ──
    await connectDB()

    // ── Duplicate check — same date + same slot, regardless of who's booking ──
    // (Slots are a shared resource — one slot can only ever belong to one person,
    // not "one person per slot per date" like the old check implied.)
    const existing = await Booking.findOne({ date, slot })
    if (existing) {
      return NextResponse.json(
        { success: false, message: 'This slot has just been booked by someone else. Please pick another.' },
        { status: 409 }
      )
    }

    // ── Save to DB ──
    // The findOne check above is a fast-path for the common case, but it cannot
    // fully prevent two simultaneous requests from both passing it before either
    // writes. The unique index on {date, slot} in the Booking schema is the real
    // guard — if two requests race, the DB itself rejects the second insert with
    // a duplicate-key error (code 11000), which we catch below.
    let booking
    try {
      booking = await Booking.create({ name, whatsapp, instagram, date, slot })
    } catch (err) {
      if (err?.code === 11000) {
        return NextResponse.json(
          { success: false, message: 'This slot has just been booked by someone else. Please pick another.' },
          { status: 409 }
        )
      }
      throw err
    }

    // ── Send email async (non-blocking) ──
    sendEmailAsync({
      name,
      whatsapp,
      instagram,
      date,
      slot,
      bookingId: booking._id.toString(),
      answers: {
        goal:             sanitize(goal),
        blockers:         Array.isArray(blockers) ? blockers.map(sanitize) : [],
        appearanceRating: Number(appearanceRating) || 0,
        faceConcerns:     Array.isArray(faceConcerns) ? faceConcerns.map(sanitize) : [],
        commitment:       sanitize(commitment),
        startWhen:        sanitize(startWhen),
        trainingDays:     sanitize(trainingDays),
        diet:             sanitize(diet),
        dietDetail:       sanitize(dietDetail),
        age:              sanitize(String(age || '')),
        gender:           sanitize(gender),
        city:             sanitize(city),
        weight:           sanitize(weight),
        height:           sanitize(height),
        experience:       sanitize(experience),
        investment:       sanitize(investment),
      },
    })

    // ── Respond immediately ──
    return NextResponse.json(
      {
        success: true,
        message: 'Application submitted successfully. We will reach out on WhatsApp within 24 hours.',
        bookingId: booking._id.toString(),
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('[MOGWARD] book-call POST error:', error)
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}