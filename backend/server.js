require("dotenv").config();

// Handle crashes properly
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err.message);
});
process.on("unhandledRejection", (reason) => {
  console.error("❌ Unhandled Rejection:", reason);
});

const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const crypto = require("crypto");

const app = express();

// ✅ Middleware
app.use(express.json());

app.use(cors({
  origin: "*" // ⚠️ Change to your frontend URL in production
}));

// ✅ Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET
});

// 🧠 Temporary DB (replace with MongoDB later)
const ordersDB = [];

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully");
});

// Helper: timeout wrapper
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Razorpay API timed out after ${ms}ms`)), ms)
  );
  return Promise.race([promise, timeout]);
}

// ==========================
// ✅ CREATE ORDER (RAZORPAY)
// ==========================
app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const order = await withTimeout(
      razorpay.orders.create({
        amount: amount * 100,
        currency: "INR"
      }),
      10000
    );

    console.log("✅ Razorpay Order created:", order.id);

    res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: process.env.KEY_ID
    });

  } catch (err) {
    console.error("❌ Order creation failed:", err.message);
    res.status(500).json({ error: err.message || "Failed to create order" });
  }
});

// ==========================
// 🔐 VERIFY PAYMENT + STORE ORDER
// ==========================
app.post("/verify-payment", (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      cartItems,
      total,
      tableId
    } = req.body;

    // ❌ Validate input
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        error: "Missing payment details"
      });
    }

    // 🔐 Step 1: Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.log("❌ Invalid signature (possible fraud)");
      return res.json({ success: false });
    }

    // 🔥 Step 2: Create secure order (SERVER SIDE)
    const orderId = "ORD_" + Date.now();

    const newOrder = {
      orderId,
      paymentId: razorpay_payment_id,
      razorpayOrderId: razorpay_order_id,
      tableId: tableId || "N/A",
      items: cartItems || [],
      total: total || 0,
      status: "PAID",
      createdAt: new Date()
    };

    ordersDB.push(newOrder);

    console.log("✅ Order stored securely:", newOrder);

    // ✅ Step 3: Send response with orderId
    res.json({
      success: true,
      orderId
    });

  } catch (err) {
    console.error("❌ Verification failed:", err.message);
    res.status(500).json({ success: false });
  }
});

// ==========================
// 🧾 GET ORDERS (DEBUG / ADMIN)
// ==========================
app.get("/orders", (req, res) => {
  res.json(ordersDB);
});

// ==========================
// ✅ PORT FIX (RAILWAY SAFE)
// ==========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(
    "🔑 KEY_ID:",
    process.env.KEY_ID ? process.env.KEY_ID.slice(0, 10) + "..." : "MISSING"
  );
});