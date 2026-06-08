import mongoose from 'mongoose'

const BookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  customerPhone: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  slot: {
    type: String,
    enum: ['slot1', 'slot2'],
    required: true,
  },
  sessionId: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['paid', 'failed'],
    default: 'paid',
  },
  razorpayOrderId: {
    type: String,
    required: true,
  },
  razorpayPaymentId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema)

export default Booking