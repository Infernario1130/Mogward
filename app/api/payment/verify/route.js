import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Product from '@/models/Product';
import Order from '@/models/Order';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { MAIN_PACKAGE } from '@/lib/products';

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
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, productIds } = body;

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature || !productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Missing payment details' },
        { status: 400 }
      );
    }

    // Dedupe to avoid false "not found" mismatches when the same product
    // appears more than once in the request
    const uniqueProductIds = [...new Set(productIds)];

    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpayOrderId + '|' + razorpayPaymentId)
      .digest('hex');

    const signatureBuffer = Buffer.from(razorpaySignature, 'hex');
    const expectedBuffer = Buffer.from(expectedSignature, 'hex');

    if (
      signatureBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
    ) {
      return NextResponse.json(
        { success: false, message: 'Payment verification failed invalid signature' },
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

    const products = await Product.find({ _id: { $in: uniqueProductIds } });
    if (products.length !== uniqueProductIds.length) {
      return NextResponse.json(
        { success: false, message: 'One or more products not found' },
        { status: 404 }
      );
    }

    // Duplicate order check
    const existingOrder = await Order.findOne({ razorpayOrderId });
    if (existingOrder) {
      return NextResponse.json(
        { success: false, message: 'Order already processed' },
        { status: 409 }
      );
    }

    const totalAmount = products.reduce((sum, p) => sum + p.price, 0);

    const order = new Order({
      userId: user._id,
      products: products.map(p => ({
        productId: p._id,
        title: p.title,
        price: p.price,
      })),
      totalAmount,
      paymentStatus: 'paid',
      razorpayOrderId,
      razorpayPaymentId,
      createdAt: new Date(),
    });

    await order.save();

    const isBundle = uniqueProductIds.includes(MAIN_PACKAGE.id);
    const creditsEarned = isBundle ? 2 : uniqueProductIds.length;
    user.callCreditsRemaining = (user.callCreditsRemaining || 0) + creditsEarned;
    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Payment successful',
        order: {
          id: order._id.toString(),
          razorpayOrderId: order.razorpayOrderId,
          razorpayPaymentId: order.razorpayPaymentId,
          totalAmount: order.totalAmount,
          createdAt: order.createdAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong please try again' },
      { status: 500 }
    );
  }
}