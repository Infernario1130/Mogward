import mongoose from 'mongoose'

const BookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  whatsapp: {
    type: String,
    required: true,
    trim: true,
  },
  instagram: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String,
    required: true,
  },
  slot: {
    type: String,
    enum: ['slot1', 'slot2', 'slot3', 'slot4', 'slot5', 'slot6'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Unique on date+slot — this is the actual source of truth that prevents two
// people booking the same slot. The app-level check in create-order is just
// for a fast, friendly error message; this index is what closes the race
// condition when two requests land at the same time.
BookingSchema.index({ date: 1, slot: 1 }, { unique: true })

const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema)
export default Booking