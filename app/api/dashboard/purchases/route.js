import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Order from '@/models/Order';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  try {
    // Verify JWT
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

    await connectDB();

    // Verify user exists
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 401 }
      );
    }

    // Fetch all paid orders for this user
    let orders;
    try {
      orders = await Order.find({
        userId: decoded.userId,
        paymentStatus: 'paid',
      }).sort({ createdAt: -1 });
    } catch (error) {
      console.error('Orders fetch error:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to fetch purchases please try again' },
        { status: 500 }
      );
    }

    // Flatten and deduplicate products across all orders
    const seenProductIds = new Set();
    const purchases = [];

    for (const order of orders) {
      for (const item of order.products) {
        try {
          const productIdStr = item.productId.toString();

          if (!seenProductIds.has(productIdStr)) {
            seenProductIds.add(productIdStr);

            purchases.push({
              id: productIdStr,
              title: item.title,
              price: item.price,
              purchasedOn: order.createdAt
                ? new Date(order.createdAt).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  }).toUpperCase()
                : 'N/A',
              orderId: order._id.toString(),
              razorpayPaymentId: order.razorpayPaymentId,
            });
          }
        } catch (itemError) {
          // Skip malformed product entries, don't crash entire response
          console.error('Malformed product entry in order:', order._id, itemError);
          continue;
        }
      }
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          name: user.name,
          email: user.email,
        },
        purchases,
        totalPurchases: purchases.length,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Dashboard purchases error:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong please try again' },
      { status: 500 }
    );
  }
}