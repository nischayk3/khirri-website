import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import axios from "axios";
import { sendAdminOrderNotification } from "@/lib/email";

// Helper function to get Shiprocket Auth Token
async function getShiprocketToken() {
  try {
    const res = await axios.post("https://apiv2.shiprocket.in/v1/external/auth/login", {
      email: process.env.SHIPROCKET_API_EMAIL,
      password: process.env.SHIPROCKET_API_PASSWORD,
    });
    return res.data.token;
  } catch (error) {
    console.error("Shiprocket Auth Error:", error);
    throw new Error("Failed to authenticate with Shiprocket");
  }
}

export async function POST(req: Request) {
  try {
    const orderData = await req.json();
    
    // 1. Save order to Firebase Firestore
    const orderRef = db.collection("orders").doc(orderData.orderId);
    await orderRef.set({
      ...orderData,
      status: "PROCESSING",
      timestamp: new Date().toISOString(),
    });

    // 2. Create Order in Shiprocket
    try {
      const token = await getShiprocketToken();
      
      // Map Khirri order items to Shiprocket format
      const orderItems = orderData.items.map((item: any) => ({
        name: item.name,
        sku: item.name.replace(/\s+/g, '-').toLowerCase(),
        units: item.quantity,
        selling_price: item.price,
        discount: 0,
        tax: 0,
        hsn: ""
      }));

      // Approximate dimension and weight for standard box
      const totalWeightKg = orderData.items.reduce((acc: number, item: any) => {
        // Parse "250g", "400g", etc.
        const weightMatches = item.weight.match(/(\d+)/);
        const weightGrams = weightMatches ? parseInt(weightMatches[0]) : 500;
        return acc + (weightGrams * item.quantity);
      }, 0) / 1000;

      const nameParts = orderData.shipping.fullName.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "Customer";

      const shiprocketPayload = {
        order_id: orderData.orderId,
        order_date: new Date().toISOString().split("T")[0],
        pickup_location: "warehouse", // Shiprocket requires exact match with dashboard location
        channel_id: "", 
        comment: orderData.orderNotes || "New Order from Website",
        billing_customer_name: firstName,
        billing_last_name: lastName,
        billing_address: orderData.shipping.addressLine1,
        billing_address_2: orderData.shipping.addressLine2 || "",
        billing_city: orderData.shipping.city,
        billing_pincode: orderData.shipping.pincode,
        billing_state: orderData.shipping.state,
        billing_country: "India",
        billing_email: orderData.shipping.email || "support@khirri.com",
        billing_phone: orderData.shipping.phone,
        shipping_is_billing: true,
        shipping_customer_name: firstName,
        shipping_last_name: lastName,
        shipping_address: orderData.shipping.addressLine1,
        shipping_address_2: orderData.shipping.addressLine2 || "",
        shipping_city: orderData.shipping.city,
        shipping_pincode: orderData.shipping.pincode,
        shipping_state: orderData.shipping.state,
        shipping_country: "India",
        shipping_email: orderData.shipping.email || "support@khirri.com",
        shipping_phone: orderData.shipping.phone,
        order_items: orderItems,
        payment_method: orderData.paymentMethod === "cod" ? "COD" : "Prepaid",
        shipping_charges: orderData.deliveryCharge,
        giftwrap_charges: 0,
        transaction_charges: 0,
        total_discount: orderData.discount || 0,
        sub_total: orderData.total, // Ensure this maps properly based on shiprocket rules
        length: 20,
        breadth: 15,
        height: 10,
        weight: totalWeightKg > 0.5 ? totalWeightKg : 0.5,
      };

      const shiprocketRes = await axios.post(
        "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
        shiprocketPayload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 3. Update Firestore with Shiprocket ID
      const srOrderId = shiprocketRes.data?.order_id || shiprocketRes.data?.payload?.order_id;
      const srShipmentId = shiprocketRes.data?.shipment_id || shiprocketRes.data?.payload?.shipment_id;

      if (srOrderId) {
        await orderRef.update({
          shiprocketOrderId: srOrderId,
          shiprocketShipmentId: srShipmentId || null,
          status: "READY_TO_SHIP",
        });
      } else {
        await orderRef.update({
          fulfillmentError: "Missing order_id in Shiprocket response: " + JSON.stringify(shiprocketRes.data),
        });
      }

    } catch (shiprocketError: any) {
      console.error("Shiprocket Order Creation Error:", shiprocketError.response?.data || shiprocketError);
      // We don't fail the API call if Shiprocket fails, the order is still saved in DB.
      // But we update the DB to reflect the fulfillment error.
      await orderRef.update({
        fulfillmentError: shiprocketError.response?.data?.message || "Failed to push to Shiprocket",
      });
    }

    // 4. Send Admin Notification Email
    await sendAdminOrderNotification(orderData);

    return NextResponse.json({ success: true, orderId: orderData.orderId });

  } catch (error) {
    console.error("Order processing error:", error);
    return NextResponse.json(
      { error: "Internal server error during order processing" },
      { status: 500 }
    );
  }
}
