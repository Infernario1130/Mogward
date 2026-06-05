import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local');
}

const ProductSchema = new mongoose.Schema({
  title: { type: [String], required: true },
  price: { type: Number, required: true },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const products = [
  {
    title: ["THE SUMMER", "SPLIT"],
    price: 1199,
    active: true,
  },
  {
    title: ["MUSCLE", "KITCHEN"],
    price: 999,
    active: true,
  },
  {
    title: ["HAIR", "CARE"],
    price: 799,
    active: true,
  },
  {
    title: ["SKIN", "CARE"],
    price: 599,
    active: true,
  },
  {
    title: ["THE ARYAN", "METHOD"],
    price: 2799,
    active: true,
  },
]

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB Connected');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    const inserted = await Product.insertMany(products);
    console.log('Products seeded successfully:');
    inserted.forEach(p => console.log(`- ${p.title.join(' ')}: ₹${p.price} | ID: ${p._id}`));

    await mongoose.disconnect();
    console.log('Done');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seed();