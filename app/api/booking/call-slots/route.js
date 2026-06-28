// for protocol slot check

import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import CallBooking from '@/models/CallBooking'

const VALID_SLOTS = ['slot1', 'slot2', 'slot3', 'slot4', 'slot5', 'slot6']

function sanitize(str) {
  if (!str || typeof str !== 'string') return ''
  return str.replace(/<[^>]*>/g, '').trim()
}

// ── GET /api/booking/call-slots?date=<date string> ──
// Returns which slots are already taken for a given date in CallBooking
// (the credits-based dashboard booking flow), regardless of status —
// same "any booking blocks it" rule as the public booking flow.
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const date = sanitize(searchParams.get('date'))

    if (!date) {
      return NextResponse.json(
        { success: false, message: 'Date is required.' },
        { status: 400 }
      )
    }

    await connectDB()

    const bookings = await CallBooking.find({ date }).select('slot').lean()
    const bookedSlots = [...new Set(bookings.map(b => b.slot))].filter(s => VALID_SLOTS.includes(s))

    return NextResponse.json(
      { success: true, bookedSlots },
      { status: 200 }
    )
  } catch (error) {
    console.error('[MOGWARD] booking/call-slots GET error:', error)
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}