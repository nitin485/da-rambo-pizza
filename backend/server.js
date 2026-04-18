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
  origin: "https://da-rambo-pizza.vercel.app" // 🔁 replace with your real Vercel URL
}));

// ✅ Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET
});

// ✅ Health check route (IMPORTANT for Railway testing)
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

// ✅ Create Order
app.post("/create-order", async (req, res) => {
  try {
    const order = await withTimeout(
      razorpay.orders.create({
        amount: req.body.amount * 100,
        currency: "INR"
      }),
      10000
    );

    console.log("✅ Order created:", order.id);
    res.json(order);

  } catch (err) {
    console.error("❌ Order creation failed:", err.message);
    res.status(500).json({ error: err.message || "Failed to create order" });
  }
});

// ✅ Verify Payment
app.post("/verify-payment", (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }

  } catch (err) {
    console.error("❌ Verification failed:", err.message);
    res.status(500).json({ success: false });
  }
});

// ✅ PORT FIX (MOST IMPORTANT FOR RAILWAY)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(
    "🔑 KEY_ID:",
    process.env.KEY_ID ? process.env.KEY_ID.slice(0, 10) + "..." : "MISSING"
  );
});