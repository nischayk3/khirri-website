import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "khirri.official@gmail.com",
    pass: process.env.EMAIL_PASSWORD, // Must be an App Password, not regular password
  },
});

export async function sendAdminOrderNotification(order: any) {
  if (!process.env.EMAIL_PASSWORD) {
    console.log("No EMAIL_PASSWORD set. Skipping admin email notification.");
    return;
  }

  const itemsList = order.items
    .map((item: any) => `- ${item.quantity}x ${item.productName} (${item.weight})`)
    .join("\n");

  const mailOptions = {
    from: '"Khirri Alerts" <khirri.official@gmail.com>',
    to: process.env.EMAIL_USER || "khirri.official@gmail.com", // Send to self
    subject: `🚨 New Order! #${order.orderId} (₹${order.total})`,
    text: `
Hello Admin,

You have received a new order on Khirri!

Order ID: ${order.orderId}
Total Amount: ₹${order.total}
Payment Method: ${order.paymentMethod.toUpperCase()}

Customer Details:
Name: ${order.shipping.fullName}
Phone: ${order.shipping.phone}
Email: ${order.shipping.email || "N/A"}
Address: ${order.shipping.addressLine1}, ${order.shipping.addressLine2 || ""}
City: ${order.shipping.city}, ${order.shipping.state} - ${order.shipping.pincode}

Order Items:
${itemsList}

-------------------------
Subtotal: ₹${order.subtotal}
Discount: ₹${order.discount}
Delivery: ₹${order.deliveryCharge}
COD Surcharge: ₹${order.codSurcharge || 0}
Total: ₹${order.total}
-------------------------

Please login to Shiprocket to view fulfillment details.
`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Admin email notification sent for order ${order.orderId}`);
  } catch (error) {
    console.error("Error sending admin email notification:", error);
  }
}
