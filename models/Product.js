import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  title: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export default Product;