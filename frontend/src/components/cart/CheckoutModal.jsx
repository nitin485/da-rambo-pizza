import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, CreditCard, Banknote, MessageCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const CheckoutModal = () => {
    const {
        cartItems,
        cartTotal,
        tableId,
        setTableId,
        isCheckoutOpen,
        closeCheckout,
        updateQuantity,
        removeFromCart,
        clearCart
    } = useCart();

    const [paymentMethod, setPaymentMethod] = useState('Cash');
    // Steps: 'cart' | 'upi_pending' | 'success'
    const [orderStep, setOrderStep] = useState('cart');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleClose = () => {
        if (isProcessing) return; // block close during active payment
        if (orderStep === 'success') {
            setOrderStep('cart');
            setPaymentMethod('Cash');
            clearCart();
        }
        closeCheckout();
    };

    const generateWhatsAppMessage = () => {
        const itemsList = cartItems.map(item =>
            `▫️ ${item.quantity}x ${item.name} (₹${item.price * item.quantity})`
        ).join('%0a');

        const paymentText = paymentMethod === 'UPI'
            ? "✅ Paid via UPI / Razorpay"
            : "Cash at Counter";

        const message =
            `*NEW ORDER - TABLE ${tableId || 'N/A'}* 🍕%0a%0a` +
            `${itemsList}%0a%0a` +
            `*Total: ₹${cartTotal}*%0a` +
            `Payment: ${paymentText}`;

        return `https://wa.me/918448161446?text=${message}`;
    };

    // ── STEP 1: User clicks "Confirm & Pay" or "Place Order" ──────────────────
    const handlePlaceOrder = async () => {
        if (!tableId) {
            alert("Please enter a table number");
            return;
        }
        if (isProcessing) return;

        // ── Cash flow: direct WhatsApp ────────────────────────────────────────
        if (paymentMethod === 'Cash') {
            const whatsappUrl = generateWhatsAppMessage();
            window.open(whatsappUrl, '_blank');
            setOrderStep('success');
            return;
        }

        // ── UPI flow: start Razorpay ─────────────────────────────────────────
        if (!window.Razorpay) {
            alert(
                "❌ Razorpay payment window could not load.\n\n" +
                "If you're on a desktop browser, please disable your ad-blocker and refresh.\n\n" +
                "On mobile, try opening in Chrome or Safari."
            );
            return;
        }

        setIsProcessing(true);
        setOrderStep('upi_pending'); // lock UI — show "payment in progress" state

        try {
            console.log("🔵 Step 1: Contacting backend to create order...");

            let res;
            try {
                res = await fetch("https://da-rambo-pizza-production.up.railway.app/create-order", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ amount: cartTotal }),
                    signal: AbortSignal.timeout(12000)
                });
            } catch (networkErr) {
                alert("❌ Cannot reach payment server.\n\nPlease check your internet and try again.\n\nError: " + networkErr.message);
                setIsProcessing(false);
                setOrderStep('cart');
                return;
            }

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                alert(`❌ Server error (${res.status}): ${errData.error || 'Unknown error'}.\n\nPlease try again.`);
                setIsProcessing(false);
                setOrderStep('cart');
                return;
            }

            const order = await res.json();
            console.log("🔵 Step 2: Razorpay order created:", order.id);

            const options = {
                key: order.key_id || import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: "INR",
                name: "Da Rambo Pizza",
                description: `Table ${tableId} — ₹${cartTotal}`,
                order_id: order.id,

                // ✅ Only fires AFTER Razorpay confirms actual payment
                handler: async function (response) {
                    console.log("🔵 Step 3: Payment captured, verifying with backend...");
                    try {
                        const verify = await fetch("https://da-rambo-pizza-production.up.railway.app/verify-payment", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(response)
                        });
                        const result = await verify.json();
                        console.log("🔵 Step 4: Verification result:", result);

                        if (result.success) {
                            // ✅ Payment verified — NOW send WhatsApp
                            const whatsappUrl = generateWhatsAppMessage();
                            window.open(whatsappUrl, '_blank');
                            setOrderStep('success');
                        } else {
                            alert("❌ Payment verification failed. Please show payment screenshot to staff.");
                            setOrderStep('cart');
                        }
                    } catch (verifyErr) {
                        alert("❌ Verification error: " + verifyErr.message + "\n\nShow payment screenshot to staff.");
                        setOrderStep('cart');
                    } finally {
                        setIsProcessing(false);
                    }
                },

                modal: {
                    // ✅ If user closes Razorpay without paying → go back to cart
                    ondismiss: function () {
                        console.log("🔵 Razorpay closed without payment.");
                        setIsProcessing(false);
                        setOrderStep('cart');
                    }
                },

                prefill: {
                    name: `Table ${tableId}`,
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response) {
                console.error("❌ Payment failed:", response.error);
                alert(`❌ Payment failed: ${response.error.description}`);
                setIsProcessing(false);
                setOrderStep('cart');
            });
            rzp.open();

        } catch (err) {
            console.error("❌ Unexpected error:", err);
            alert("Unexpected error: " + err.message);
            setIsProcessing(false);
            setOrderStep('cart');
        }
    };






    return (
        <AnimatePresence>
            {isCheckoutOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal Sheet */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed bottom-0 left-0 right-0 bg-[#121212] z-50 rounded-t-[2rem] border-t border-white/10 max-h-[90vh] flex flex-col md:max-w-md md:mx-auto"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/5">
                            <h2 className="text-2xl font-heading text-white">
                                {orderStep === 'success' ? 'Order Sent! 🎉' : orderStep === 'upi_pending' ? 'Processing Payment...' : 'Ah, Good Choice!'}
                            </h2>
                            <button
                                onClick={handleClose}
                                disabled={isProcessing}
                                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 text-zinc-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="overflow-y-auto p-6 space-y-6 flex-1">

                            {/* ── Cart Step ─────────────────────────────────────── */}
                            {orderStep === 'cart' && (
                                <>
                                    {/* Table Number */}
                                    <div className="bg-zinc-900/50 p-4 rounded-2xl border border-white/5">
                                        <label className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-2 block">Table Number</label>
                                        <input
                                            type="text"
                                            value={tableId}
                                            onChange={(e) => setTableId(e.target.value)}
                                            placeholder="Enter Table No."
                                            className="w-full bg-transparent text-2xl font-display text-white placeholder:text-zinc-700 focus:outline-none"
                                        />
                                    </div>

                                    {/* Items */}
                                    <div className="space-y-4">
                                        {cartItems.map((item) => (
                                            <div key={`${item.id}-${item.selectedSize}`} className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <p className="text-white font-medium">{item.name}</p>
                                                    <p className="text-xs text-zinc-500">₹{item.price} x {item.quantity}</p>
                                                </div>
                                                <div className="flex items-center gap-3 bg-zinc-900 rounded-xl p-1 border border-white/5">
                                                    <button
                                                        onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.selectedSize, -1) : removeFromCart(item.id, item.selectedSize)}
                                                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                                                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-zinc-800 text-white"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="h-px bg-white/5 my-4" />

                                    {/* Payment Method */}
                                    <div>
                                        <label className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-3 block">Payment Method</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                onClick={() => setPaymentMethod('Cash')}
                                                className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all duration-300 ${paymentMethod === 'Cash' ? 'bg-pizza-red/10 border-pizza-red text-pizza-red' : 'bg-zinc-900 border-zinc-800 text-zinc-400'}`}
                                            >
                                                <Banknote size={24} />
                                                <span className="text-sm font-bold">Cash</span>
                                            </button>
                                            <button
                                                onClick={() => setPaymentMethod('UPI')}
                                                className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all duration-300 ${paymentMethod === 'UPI' ? 'bg-blue-500/10 border-blue-500 text-blue-500' : 'bg-zinc-900 border-zinc-800 text-zinc-400'}`}
                                            >
                                                <CreditCard size={24} />
                                                <span className="text-sm font-bold">UPI Online</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* UPI Info */}
                                    {paymentMethod === 'UPI' && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-4 space-y-2"
                                        >
                                            <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Paying To</p>
                                            <p className="text-white font-bold text-lg font-mono">8448161446@ptaxis</p>
                                            <p className="text-xs text-blue-300">
                                                💳 Click <span className="font-bold text-white">"Confirm &amp; Pay"</span> below to pay securely via Razorpay (GPay, PhonePe, UPI, Cards).
                                            </p>
                                        </motion.div>
                                    )}
                                </>
                            )}

                            {/* ── UPI Payment In Progress ───────────────────────── */}
                            {orderStep === 'upi_pending' && (
                                <div className="flex flex-col items-center justify-center py-12 space-y-6 text-center">
                                    <div className="relative w-20 h-20">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                                            className="absolute inset-0 rounded-full border-4 border-blue-500/20 border-t-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Complete Your Payment</h3>
                                        <p className="text-zinc-400 text-sm">The Razorpay payment window is open.<br />Please complete the payment there.</p>
                                    </div>
                                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3 text-xs text-yellow-300 max-w-xs">
                                        ⚠️ Do <strong>not</strong> close this screen. Your order will only be sent after payment is confirmed.
                                    </div>
                                </div>
                            )}

                            {/* ── Success Step ──────────────────────────────────── */}
                            {orderStep === 'success' && (
                                <div className="text-center py-10 space-y-6">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto"
                                    >
                                        <CheckCircle size={48} />
                                    </motion.div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Order Sent!</h3>
                                        <p className="text-zinc-400">Your order has been sent via WhatsApp.<br />We'll start preparing it shortly.</p>
                                    </div>
                                    <div className="p-4 bg-zinc-900 rounded-xl border border-white/5 text-sm text-zinc-500">
                                        Table {tableId} • {cartItems.length} Items • ₹{cartTotal}
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-white/5 bg-[#121212]">
                            {orderStep === 'cart' && (
                                <button
                                    onClick={handlePlaceOrder}
                                    disabled={isProcessing}
                                    className="w-full bg-white text-black font-heading text-xl py-4 rounded-2xl hover:bg-pizza-red hover:text-white transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <MessageCircle size={24} />
                                    {paymentMethod === 'UPI' ? `Confirm & Pay • ₹${cartTotal}` : `Place Order • ₹${cartTotal}`}
                                </button>
                            )}
                            {orderStep === 'upi_pending' && (
                                <button
                                    disabled
                                    className="w-full bg-blue-600/40 text-blue-200 font-heading text-xl py-4 rounded-2xl flex items-center justify-center gap-3 cursor-not-allowed"
                                >
                                    <Loader2 size={22} className="animate-spin" />
                                    Waiting for Payment...
                                </button>
                            )}
                            {orderStep === 'success' && (
                                <button
                                    onClick={handleClose}
                                    className="w-full bg-zinc-800 text-white font-bold py-4 rounded-2xl hover:bg-zinc-700 transition-all"
                                >
                                    Close & New Order
                                </button>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CheckoutModal;
