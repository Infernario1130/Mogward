import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Product from '@/models/Product';
import jwt from 'jsonwebtoken';
import Razorpay from 'razorpay';

export async function POST(request) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Please login to continue' },
        { status: 401 }
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'Session expired please login again' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { productIds } = body;

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Product IDs are required' },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 401 }
      );
    }

    // Fetch all products and verify all are active
    const products = await Product.find({ _id: { $in: productIds }, active: true });

    if (products.length !== productIds.length) {
      return NextResponse.json(
        { success: false, message: 'One or more products not found or no longer available' },
        { status: 404 }
      );
    }

    // Sum total from DB — never trust frontend price
    const totalAmount = products.reduce((sum, p) => sum + p.price, 0);

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    let razorpayOrder;
    try {
      razorpayOrder = await razorpay.orders.create({
        amount: totalAmount * 100,
        currency: 'INR',
        receipt: 'receipt_' + Date.now(),
        notes: {
          productIds: productIds.join(','),
          userId: user._id.toString(),
        },
      });
    } catch (error) {
      console.error('Razorpay order creation error:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to create payment order please try again' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        order: {
          id: razorpayOrder.id,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
        },
        products: products.map(p => ({
          id: p._id.toString(),
          title: p.title,
          price: p.price,
        })),
        user: {
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
        keyId: process.env.RAZORPAY_KEY_ID,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong please try again' },
      { status: 500 }
    );
  }
}