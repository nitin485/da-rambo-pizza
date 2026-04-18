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

    // ❗ FIX: no default payment
    const [paymentMethod, setPaymentMethod] = useState('');

    const [orderStep, setOrderStep] = useState('cart');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleClose = () => {
        if (isProcessing) return;
        if (orderStep === 'success') {
            setOrderStep('cart');
            setPaymentMethod('');
            clearCart();
        }
        closeCheckout();
    };

    // ✅ UPDATED: now includes orderId
    const generateWhatsAppMessage = (orderId) => {
        const itemsList = cartItems.map(item =>
            `▫️ ${item.quantity}x ${item.name} (₹${item.price * item.quantity})`
        ).join('%0a');

        const paymentText =
            paymentMethod === 'UPI'
                ? "✅ Paid via UPI (Verified)"
                : "Cash at Counter";

        const message =
            `*NEW ORDER - TABLE ${tableId || 'N/A'}* 🍕%0a%0a` +
            `Order ID: ${orderId || 'N/A'}%0a%0a` +
            `${itemsList}%0a%0a` +
            `*Total: ₹${cartTotal}*%0a` +
            `Payment: ${paymentText}`;

        return `https://wa.me/918448161446?text=${message}`;
    };

    const handlePlaceOrder = async () => {
        if (!tableId) {
            alert("Please enter a table number");
            return;
        }

        // ❗ FIX: force payment selection
        if (!paymentMethod) {
            alert("Please select a payment method");
            return;
        }

        if (isProcessing) return;

        // ✅ CASH FLOW
        if (paymentMethod === 'Cash') {
            const whatsappUrl = generateWhatsAppMessage("CASH_" + Date.now());
            window.open(whatsappUrl, '_blank');
            setOrderStep('success');
            return;
        }

        // ❗ UPI FLOW
        if (!window.Razorpay) {
            alert("Razorpay failed to load");
            return;
        }

        setIsProcessing(true);
        setOrderStep('upi_pending');

        try {
            let res = await fetch("https://da-rambo-pizza-production.up.railway.app/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: cartTotal }),
                signal: AbortSignal.timeout(12000)
            });

            if (!res.ok) {
                throw new Error("Server error");
            }

            const order = await res.json();

            const options = {
                key: order.key_id || import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: "INR",
                name: "Da Rambo Pizza",
                description: `Table ${tableId} — ₹${cartTotal}`,
                order_id: order.id,

                // 🔐 CRITICAL FIX
                handler: async function (response) {
                    try {
                        const verify = await fetch("https://da-rambo-pizza-production.up.railway.app/verify-payment", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                ...response,
                                cartItems,
                                total: cartTotal,
                                tableId
                            })
                        });

                        const result = await verify.json();

                        if (result.success) {
                            const whatsappUrl = generateWhatsAppMessage(result.orderId);
                            window.open(whatsappUrl, '_blank');
                            setOrderStep('success');
                        } else {
                            alert("Payment verification failed");
                            setOrderStep('cart');
                        }
                    } catch (err) {
                        alert("Verification error: " + err.message);
                        setOrderStep('cart');
                    } finally {
                        setIsProcessing(false);
                    }
                },

                modal: {
                    ondismiss: function () {
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
                alert("Payment failed: " + response.error.description);
                setIsProcessing(false);
                setOrderStep('cart');
            });

            rzp.open();

        } catch (err) {
            alert("Error: " + err.message);
            setIsProcessing(false);
            setOrderStep('cart');
        }
    };

    return (
        <AnimatePresence>
            {isCheckoutOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        className="fixed bottom-0 left-0 right-0 bg-[#121212] z-50 rounded-t-[2rem] max-h-[90vh] flex flex-col md:max-w-md md:mx-auto"
                    >

                        <div className="p-6 text-white text-xl font-bold">
                            {orderStep === 'success'
                                ? 'Order Sent! 🎉'
                                : orderStep === 'upi_pending'
                                    ? 'Processing Payment...'
                                    : 'Checkout'}
                        </div>

                        <div className="p-6 space-y-4">

                            <input
                                value={tableId}
                                onChange={(e) => setTableId(e.target.value)}
                                placeholder="Table No"
                                className="w-full p-3 rounded bg-black text-white"
                            />

                            <div className="grid grid-cols-2 gap-3">
                                <button onClick={() => setPaymentMethod('Cash')}>
                                    Cash
                                </button>
                                <button onClick={() => setPaymentMethod('UPI')}>
                                    UPI
                                </button>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                disabled={isProcessing}
                                className="w-full bg-white text-black py-3 rounded"
                            >
                                {paymentMethod === 'UPI'
                                    ? `Confirm & Pay ₹${cartTotal}`
                                    : `Place Order ₹${cartTotal}`}
                            </button>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CheckoutModal;