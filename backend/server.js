require("dotenv").config();

// Surface crashes clearly
process.on("uncaughtException", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error("❌ Port 5000 is already in use! Kill old server first:");
    console.error("   Run: pkill -f 'node server.js'   then try again.");
    process.exit(1);
  }
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
app.use(express.json());
app.use(cors());

const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET
});

// Helper: wrap any promise with a timeout
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Razorpay API timed out after ${ms}ms`)), ms)
  );
  return Promise.race([promise, timeout]);
}

// ✅ create order
app.post("/create-order", async (req, res) => {
  try {
    const order = await withTimeout(
      razorpay.orders.create({
        amount: req.body.amount * 100,
        currency: "INR"
      }),
      10000 // 10 second timeout
    );
    console.log("✅ Order created:", order.id);
    res.json(order);
  } catch (err) {
    console.error("❌ Order creation failed:", err.message);
    res.status(500).json({ error: err.message || "Failed to create order" });
  }
});

// ✅ verify payment
app.post("/verify-payment", (req, res) => {

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

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
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
  console.log("   KEY_ID loaded:", process.env.KEY_ID ? process.env.KEY_ID.slice(0, 12) + "..." : "MISSING");
});