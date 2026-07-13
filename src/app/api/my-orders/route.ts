import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get("phone");

    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    // Normalize phone: strip +91 prefix if present
    const normalizedPhone = phone.replace(/^\+91/, "");

    // Query Firestore for orders matching this phone number
    // We check both userPhone and shipping.phone fields
    const ordersRef = db.collection("orders");
    
    // Fetch without orderBy to avoid composite index requirement
    const snapshot = await ordersRef
      .where("userPhone", "==", normalizedPhone)
      .limit(50)
      .get();

    // If no results from userPhone, try with +91 prefix
    let orders: any[] = [];
    if (snapshot.empty) {
      const snapshot2 = await ordersRef
        .where("userPhone", "==", `+91${normalizedPhone}`)
        .limit(50)
        .get();
      orders = snapshot2.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } else {
      orders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    }

    // Also check legacy orders where userPhone might not exist but shipping.phone matches
    if (orders.length === 0) {
      const allOrders = await ordersRef.orderBy("createdAt", "desc").limit(200).get();
      orders = allOrders.docs
        .filter((doc) => {
          const data = doc.data();
          return data.shipping?.phone === normalizedPhone;
        })
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
    }

    // Sort in memory by createdAt descending
    orders.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
