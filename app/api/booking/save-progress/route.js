import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Booking from '@/models/Booking'

const VALID_SLOTS = ['slot1', 'slot2', 'slot3', 'slot4', 'slot5', 'slot6']

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

// ── POST /api/booking/save-progress ──
// Fired once, when the user crosses question 5 (name, whatsapp, instagram,
// goal, blockers all answered). Upserts by sessionId so a later full
// submission can update this same record instead of creating a duplicate.
// Does NOT touch the unique date+slot index — partial records never lock
// a slot for anyone.
export async function POST(request) {
  try {
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
      goal,
      blockers,
    } = body

    const name      = sanitize(rawName)
    const whatsapp  = normalizeWhatsapp(rawWhatsapp)
    const instagram = normalizeInstagram(rawInstagram)
    const date      = sanitize(rawDate)
    const slot      = sanitize(rawSlot)

    if (!sessionId)                          return NextResponse.json({ success: false, message: 'Missing session.' }, { status: 400 })
    if (!name || !whatsapp || !instagram)    return NextResponse.json({ success: false, message: 'Missing contact info.' }, { status: 400 })
    if (!date || !slot || !VALID_SLOTS.includes(slot)) {
      return NextResponse.json({ success: false, message: 'Missing date/slot.' }, { status: 400 })
    }

    await connectDB()

    await Booking.findOneAndUpdate(
      { sessionId },
      {
        $set: {
          sessionId,
          name,
          whatsapp,
          instagram,
          date,
          slot,
          goal: sanitize(goal),
          blockers: Array.isArray(blockers) ? blockers.map(sanitize) : [],
          formStatus: 'partial',
        },
      },
      { upsert: true, new: true }
    )

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('[MOGWARD] save-progress POST error:', error)
    return NextResponse.json({ success: false, message: 'Something went wrong.' }, { status: 500 })
  }
}