import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

// GET user addresses
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");

    if (!uid) {
      return NextResponse.json({ error: "Missing uid parameter" }, { status: 400 });
    }

    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return NextResponse.json({ addresses: [] });
    }

    const data = userDoc.data();
    return NextResponse.json({ addresses: data?.addresses || [] });
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return NextResponse.json({ error: "Failed to fetch addresses" }, { status: 500 });
  }
}

// POST new address
export async function POST(req: Request) {
  try {
    const { uid, phone, address } = await req.json();

    if (!uid || !address) {
      return NextResponse.json({ error: "Missing uid or address" }, { status: 400 });
    }

    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();

    // Generate a simple unique ID for the address
    const newAddress = {
      ...address,
      id: Date.now().toString(),
    };

    if (!userDoc.exists) {
      // Create new user profile with this first address
      await userRef.set({
        uid,
        phone,
        addresses: [newAddress],
      });
    } else {
      // Append to existing addresses array
      const existingData = userDoc.data();
      const addresses = existingData?.addresses || [];
      await userRef.update({
        phone: phone || existingData?.phone,
        addresses: [...addresses, newAddress],
      });
    }

    return NextResponse.json({ success: true, address: newAddress });
  } catch (error) {
    console.error("Error saving address:", error);
    return NextResponse.json({ error: "Failed to save address" }, { status: 500 });
  }
}
