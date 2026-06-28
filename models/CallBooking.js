import mongoose from 'mongoose';

const CallBookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  slot: {
    type: String,
    required: true,
  },
  slotLabel: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['scheduled', 'cancelled', 'completed'],
    default: 'scheduled',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Unique on date+slot — same reasoning as the public Booking model: this is
// the real guard against two people (or two requests from the same person)
// landing on the same date+slot at the same time. The findOne check in the
// route is just the fast, friendly-error path.
CallBookingSchema.index({ date: 1, slot: 1 }, { unique: true });

const CallBooking = mongoose.models.CallBooking || mongoose.model('CallBooking', CallBookingSchema);
export default CallBooking;