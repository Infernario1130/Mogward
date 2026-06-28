import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Booking from '@/models/Booking'

const VALID_SLOTS = ['slot1', 'slot2', 'slot3', 'slot4', 'slot5', 'slot6']

function sanitize(str) {
  if (!str || typeof str !== 'string') return ''
  return str.replace(/<[^>]*>/g, '').trim()
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const date = sanitize(searchParams.get('date'))

    if (!date) {
      return NextResponse.json({ success: false, message: 'Date is required.' }, { status: 400 })
    }

    await connectDB()

    // Only 'completed' records actually occupy a slot — partial and
    // declined_budget leads never block anyone else from that date+slot.
    const bookings = await Booking.find({ date, formStatus: 'completed' }).select('slot').lean()
    const bookedSlots = [...new Set(bookings.map(b => b.slot))].filter(s => VALID_SLOTS.includes(s))

    return NextResponse.json({ success: true, bookedSlots }, { status: 200 })
  } catch (error) {
    console.error('[MOGWARD] booking/slots GET error:', error)
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}