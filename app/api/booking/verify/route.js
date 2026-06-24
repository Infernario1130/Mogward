import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import Booking from '@/models/Booking'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const SESSION_CONFIG = {
  '30min': {
    price: 999,
    duration: '30 MIN SESSION',
    label: '30-MINUTE SESSION',
  },
}

const SLOT_LABELS = {
  slot1: 'Slot 1',
  slot2: 'Slot 2',
  slot3: 'Slot 3',
  slot4: 'Slot 4',
  slot5: 'Slot 5',
  slot6: 'Slot 6',
}

const CLIENT_EMAIL = 'aryank0204@gmail.com'

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
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      sessionId,
      date,
      slot,
    } = body

    // Validate all required fields
    if (
      !razorpayOrderId ||
      !razorpayPaymentId ||
      !razorpaySignature ||
      !sessionId ||
      !date ||
      !slot
    ) {
      return NextResponse.json(
        { success: false, message: 'Missing payment or booking details' },
        { status: 400 }
      )
    }

    // Validate session
    const session = SESSION_CONFIG[sessionId]
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Invalid session type' },
        { status: 400 }
      )
    }

    // Validate slot
    if (!['slot1', 'slot2' , , 'slot3', 'slot4', 'slot5', 'slot6'].includes(slot)) {
      return NextResponse.json(
        { success: false, message: 'Invalid time slot' },
        { status: 400 }
      )
    }

    // Verify Razorpay signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpayOrderId + '|' + razorpayPaymentId)
      .digest('hex')

    const signatureBuffer = Buffer.from(razorpaySignature, 'hex')
    const expectedBuffer = Buffer.from(expectedSignature, 'hex')

    if (
      signatureBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
    ) {
      return NextResponse.json(
        { success: false, message: 'Payment verification failed invalid signature' },
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

    // Check duplicate booking
    const existingBooking = await Booking.findOne({ razorpayOrderId })
    if (existingBooking) {
      return NextResponse.json(
        { success: false, message: 'Booking already processed' },
        { status: 409 }
      )
    }

    // Check if slot is already booked for that date
    const slotTaken = await Booking.findOne({
      date,
      slot,
      paymentStatus: 'paid',
    })
    if (slotTaken) {
      return NextResponse.json(
        { success: false, message: 'This slot has already been booked for this date' },
        { status: 409 }
      )
    }

    // Save booking to MongoDB
    const booking = new Booking({
      userId: user._id,
      customerName: user.name,
      customerEmail: user.email,
      customerPhone: user.phone,
      date,
      slot,
      sessionId,
      duration: session.duration,
      price: session.price,
      paymentStatus: 'paid',
      razorpayOrderId,
      razorpayPaymentId,
      createdAt: new Date(),
    })

    await booking.save()

    // Send email to customer
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: user.email,
        subject: 'Booking Confirmed — Your 1:1 Call With Aryan',
        html: `
          <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #fff;">
            <h1 style="font-size: 24px; font-weight: 900; letter-spacing: -0.5px; margin-bottom: 8px;">
              BOOKING CONFIRMED
            </h1>
            <p style="color: #666; font-size: 14px; margin-bottom: 32px;">
              Your slot has been secured. Here are your booking details.
            </p>

            <div style="background: #f5f5f5; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Date</td>
                  <td style="padding: 8px 0; font-weight: 700; font-size: 14px; text-align: right;">${date}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Slot</td>
                  <td style="padding: 8px 0; font-weight: 700; font-size: 14px; text-align: right;">${SLOT_LABELS[slot]}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Duration</td>
                  <td style="padding: 8px 0; font-weight: 700; font-size: 14px; text-align: right;">${session.duration}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Amount Paid</td>
                  <td style="padding: 8px 0; font-weight: 700; font-size: 14px; text-align: right;">₹${session.price}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Payment ID</td>
                  <td style="padding: 8px 0; font-weight: 700; font-size: 12px; text-align: right; color: #888;">${razorpayPaymentId}</td>
                </tr>
              </table>
            </div>

            <p style="color: #444; font-size: 14px; line-height: 1.6; margin-bottom: 32px;">
              Aryan will contact you on your registered phone number before the call. Make sure you are available at the scheduled time.
            </p>

            <p style="color: #888; font-size: 12px;">
              For support contact us at <a href="mailto:${CLIENT_EMAIL}" style="color: #000;">${CLIENT_EMAIL}</a>
            </p>
          </div>
        `,
      })
    } catch (emailError) {
      console.error('Customer email failed:', emailError)
      // Don't fail the whole request if email fails
    }

    // Send email to client (Aryan)
    try {
      await resend.emails.send({
        from: 'aryank0204@gmail.com',
        to: CLIENT_EMAIL,
        subject: `New Call Booking — ${user.name} — ${date} ${SLOT_LABELS[slot]}`,
        html: `
          <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #fff;">
            <h1 style="font-size: 24px; font-weight: 900; letter-spacing: -0.5px; margin-bottom: 8px;">
              NEW BOOKING
            </h1>
            <p style="color: #666; font-size: 14px; margin-bottom: 32px;">
              Someone just booked a 1:1 call with you.
            </p>

            <div style="background: #f5f5f5; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Name</td>
                  <td style="padding: 8px 0; font-weight: 700; font-size: 14px; text-align: right;">${user.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Email</td>
                  <td style="padding: 8px 0; font-weight: 700; font-size: 14px; text-align: right;">${user.email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Phone</td>
                  <td style="padding: 8px 0; font-weight: 700; font-size: 14px; text-align: right;">${user.phone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Date</td>
                  <td style="padding: 8px 0; font-weight: 700; font-size: 14px; text-align: right;">${date}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Slot</td>
                  <td style="padding: 8px 0; font-weight: 700; font-size: 14px; text-align: right;">${SLOT_LABELS[slot]}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Duration</td>
                  <td style="padding: 8px 0; font-weight: 700; font-size: 14px; text-align: right;">${session.duration}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Amount Paid</td>
                  <td style="padding: 8px 0; font-weight: 700; font-size: 14px; text-align: right;">₹${session.price}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Payment ID</td>
                  <td style="padding: 8px 0; font-weight: 700; font-size: 12px; text-align: right; color: #888;">${razorpayPaymentId}</td>
                </tr>
              </table>
            </div>

            <p style="color: #888; font-size: 12px;">
              Booking ID: ${booking._id.toString()}
            </p>
          </div>
        `,
      })
    } catch (emailError) {
      console.error('Client email failed:', emailError)
      // Don't fail the whole request if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Booking confirmed',
        booking: {
          id: booking._id.toString(),
          date: booking.date,
          slot: booking.slot,
          duration: booking.duration,
          price: booking.price,
          razorpayOrderId: booking.razorpayOrderId,
          razorpayPaymentId: booking.razorpayPaymentId,
          createdAt: booking.createdAt,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Booking verify error:', error)
    return NextResponse.json(
      { success: false, message: 'Something went wrong please try again' },
      { status: 500 }
    )
  }
}