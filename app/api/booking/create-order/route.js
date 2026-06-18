import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import jwt from 'jsonwebtoken'
import Razorpay from 'razorpay'

const SESSION_CONFIG = {
  '30min': {
    price: 999,
    duration: '30 MIN SESSION',
    label: '30-MINUTE SESSION',
  },
}

export async function POST(request) {
  try {
    // Verify JWT
    const token = request.cookies.get('token')?.value
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Please login to continue' },
        { status: 401 }
      )
    }

    let decoded
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'Session expired please login again' },
        { status: 401 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { sessionId, date, slot } = body

    // Validate required fields
    if (!sessionId) {
      return NextResponse.json(
        { success: false, message: 'Session type is required' },
        { status: 400 }
      )
    }
    if (!date) {
      return NextResponse.json(
        { success: false, message: 'Booking date is required' },
        { status: 400 }
      )
    }
    if (!slot) {
      return NextResponse.json(
        { success: false, message: 'Time slot is required' },
        { status: 400 }
      )
    }
    if (!['slot1', 'slot2', 'slot3', 'slot4', 'slot5', 'slot6'].includes(slot)) {
      return NextResponse.json(
        { success: false, message: 'Invalid time slot' },
        { status: 400 }
      )
    }

    // Validate session type
    const session = SESSION_CONFIG[sessionId]
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Invalid session type' },
        { status: 400 }
      )
    }

    // Connect to MongoDB
    await connectDB()

    // Find user
    const user = await User.findById(decoded.userId)
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 401 }
      )
    }

    // Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    // Create Razorpay order
    let razorpayOrder
    try {
      razorpayOrder = await razorpay.orders.create({
        amount: session.price * 100,
        currency: 'INR',
        receipt: 'booking_' + Date.now(),
        notes: {
          userId: user._id.toString(),
          sessionId,
          date,
          slot,
          duration: session.duration,
        },
      })
    } catch (error) {
      console.error('Razorpay booking order creation error:', error)
      return NextResponse.json(
        { success: false, message: 'Failed to create payment order please try again' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        order: {
          id: razorpayOrder.id,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
        },
        session: {
          id: sessionId,
          price: session.price,
          duration: session.duration,
          label: session.label,
        },
        booking: {
          date,
          slot,
        },
        user: {
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
        keyId: process.env.RAZORPAY_KEY_ID,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Booking create order error:', error)
    return NextResponse.json(
      { success: false, message: 'Something went wrong please try again' },
      { status: 500 }
    )
  }
}