// book calls for people clicking on Coaching Card

import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Booking from '@/models/Booking'
import { Resend } from 'resend'

const REQUIRED_ENV = ['RESEND_API_KEY']
for (const key of REQUIRED_ENV) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
}

const resend = new Resend(process.env.RESEND_API_KEY)

const VALID_SLOTS = ['slot1', 'slot2', 'slot3', 'slot4', 'slot5', 'slot6']
const NOT_NOW = 'NOT RIGHT NOW, BUT I WANT TO STAY IN THE LOOP'

const SLOT_TIMES = {
  slot1: '9:00 AM - 9:30 AM',
  slot2: '11:00 AM - 11:30 AM',
  slot3: '1:00 PM - 1:30 PM',
  slot4: '3:00 PM - 3:30 PM',
  slot5: '5:00 PM - 5:30 PM',
  slot6: '7:00 PM - 7:30 PM',
}

const rateLimitMap = new Map()
const RATE_LIMIT_WINDOW_MS = 60 * 1000
const RATE_LIMIT_MAX = 3

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

function sanitize(str) {
  if (!str || typeof str !== 'string') return ''
  return str.replace(/<[^>]*>/g, '').trim()
}

function normalizeInstagram(handle) {
  const clean = sanitize(handle)
  return clean.startsWith('@') ? clean.slice(1) : clean
}

function normalizeWhatsapp(number) {
  return sanitize(number).replace(/[\s\-().]/g, '')
}

function isValidWhatsapp(number) {
  return /^\+?[0-9]{7,15}$/.test(number)
}

// ── Helper: detect a MongoDB duplicate-key error across the different shapes
// it can show up in depending on Mongoose/driver version. Some versions put
// the code directly on err.code; others wrap the underlying MongoServerError
// and nest it under err.cause.code. Checking both avoids silently falling
// through to a generic 500 when the duplicate-key case actually fired. ──
function isDuplicateKeyError(err) {
  return err?.code === 11000 || err?.cause?.code === 11000
}

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

async function sendEmailAsync(payload) {
  try {
    await resend.emails.send({
      from: 'MOGWARD Applications <ascend@mogward.com>',
      to: 'hoodiewolf11@gmail.com',
      subject: `New Application — ${payload.name} — ${payload.date} — ${SLOT_TIMES[payload.slot]}`,
      html: buildEmail(payload),
    })
  } catch (err) {
    console.error('[MOGWARD] Resend email failed for booking:', payload.bookingId, err?.message)
  }
}

export async function POST(request) {
  try {
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

    let body
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ success: false, message: 'Invalid request body.' }, { status: 400 })
    }

    const {
      sessionId,
      name: rawName,
      whatsapp: rawWhatsapp,
      instagram: rawInstagram,
      date: rawDate,
      slot: rawSlot,
      goal, blockers, appearanceRating, faceConcerns,
      commitment, startWhen, trainingDays, diet, dietDetail,
      age, gender, city, weight, height, experience, investment,
    } = body

    const name      = sanitize(rawName)
    const whatsapp  = normalizeWhatsapp(rawWhatsapp)
    const instagram = normalizeInstagram(rawInstagram)
    const date      = sanitize(rawDate)
    const slot      = sanitize(rawSlot)

    const errors = []
    if (!name)                          errors.push('Name is required.')
    if (!whatsapp)                      errors.push('WhatsApp number is required.')
    else if (!isValidWhatsapp(whatsapp)) errors.push('WhatsApp number looks invalid. Include country code e.g. +91.')
    if (!instagram)                     errors.push('Instagram username is required.')
    if (!date)                          errors.push('Date is required.')
    if (!slot || !VALID_SLOTS.includes(slot)) errors.push('A valid time slot is required.')

    if (errors.length > 0) {
      return NextResponse.json({ success: false, message: errors[0] }, { status: 400 })
    }

    await connectDB()

    // formStatus is decided server-side from the investment answer — this is
    // the gate that decides whether a slot actually gets locked and whether
    // the owner gets emailed.
    const formStatus = sanitize(investment) === NOT_NOW ? 'declined_budget' : 'completed'

    // Only a 'completed' record can ever collide on date+slot (per the
    // partial unique index), so the duplicate check only matters for that case.
    // excluding this same session's own record so a person finishing their
    // own in-progress application is never blocked by themselves.
    if (formStatus === 'completed') {
      const existing = await Booking.findOne({ date, slot, formStatus: 'completed' }).lean()
      if (existing && existing.sessionId !== sessionId) {
        return NextResponse.json(
          { success: false, message: 'This slot has just been booked by someone else. Please pick another.' },
          { status: 409 }
        )
      }
    }

    const answerFields = {
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
    }

    // ── Write to DB ──
    // The findOne check above is a fast-path for the common case, but it cannot
    // fully prevent two simultaneous requests both completing for the same
    // date+slot from passing it before either writes. The partial unique index
    // on {date, slot} (scoped to formStatus: 'completed') in the Booking schema
    // is the real guard: MongoDB enforces unique indexes on updates as well as
    // inserts, so if this findOneAndUpdate would create a second 'completed'
    // record for the same date+slot, Mongo itself rejects it with a duplicate-key
    // error — caught below via isDuplicateKeyError, which checks both the
    // common err.code shape and the nested err.cause.code shape some driver/
    // Mongoose version combinations use when wrapping the underlying error.
    let booking
    try {
      if (sessionId) {
        // Upsert against the same record the partial-save created at Q5,
        // turning it into the final outcome instead of creating a duplicate row.
        booking = await Booking.findOneAndUpdate(
          { sessionId },
          { $set: { name, whatsapp, instagram, date, slot, formStatus, ...answerFields } },
          { upsert: true, new: true }
        )
      } else {
        // Fallback — no sessionId (e.g. partial-save never fired, or client
        // is an older version). Create fresh.
        booking = await Booking.create({ name, whatsapp, instagram, date, slot, formStatus, ...answerFields })
      }
    } catch (err) {
      if (isDuplicateKeyError(err)) {
        return NextResponse.json(
          { success: false, message: 'This slot has just been booked by someone else. Please pick another.' },
          { status: 409 }
        )
      }
      throw err
    }

    // Only email the owner for the case they actually need to act on.
    // Awaited (not fire-and-forget) — serverless functions can be torn down
    // right after the response is sent, which would silently kill an
    // un-awaited send before it reaches Resend.
    if (formStatus === 'completed') {
      await sendEmailAsync({
        name,
        whatsapp,
        instagram,
        date,
        slot,
        bookingId: booking._id.toString(),
        answers: answerFields,
      })
    }

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
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}