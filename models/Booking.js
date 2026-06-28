import mongoose from 'mongoose'

const BookingSchema = new mongoose.Schema({
  // ── Identity / contact ──
  sessionId: {
    type: String,
    unique: true,
    sparse: true, // allows multiple docs without sessionId (legacy/manual rows) without index conflicts
  },
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

  // ── Lead outcome ──
  // partial: stopped after Q5+ without finishing
  // declined_budget: finished, but selected "Not right now" on investment
  // completed: finished and ready to pay — the only case that emails the owner
  formStatus: {
    type: String,
    enum: ['partial', 'declined_budget', 'completed'],
    default: 'partial',
  },

  // ── Booking acceptance status (separate from formStatus — this is for
  // you manually tracking accepted/rejected after a completed application) ──
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },

  // ── Application answers (optional — partial records may not have all of these) ──
  goal: String,
  blockers: [String],
  appearanceRating: Number,
  faceConcerns: [String],
  commitment: String,
  startWhen: String,
  trainingDays: String,
  diet: String,
  dietDetail: String,
  age: String,
  gender: String,
  city: String,
  weight: String,
  height: String,
  experience: String,
  investment: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Fast lookup for the duplicate-booking check.
BookingSchema.index({ whatsapp: 1, date: 1, slot: 1 })

// The ONLY real slot-occupancy guarantee: a given date+slot can have at most
// one "completed" record. Partial / declined_budget records are allowed to
// share a date+slot with each other and with a later completed booking —
// they never block anyone.
BookingSchema.index(
  { date: 1, slot: 1 },
  { unique: true, partialFilterExpression: { formStatus: 'completed' } }
)

const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema)
export default Booking