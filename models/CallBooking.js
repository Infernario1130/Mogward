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

const CallBooking = mongoose.models.CallBooking || mongoose.model('CallBooking', CallBookingSchema);
export default CallBooking;