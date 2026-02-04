import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, CreditCard, Banknote, MessageCircle, CheckCircle, Smartphone } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const MERCHANT_UPI = "example@upi"; // REPLACE WITH REAL ID
const MERCHANT_NAME = "Da Rambo Pizza";

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
    const [orderStep, setOrderStep] = useState('cart'); // cart, success

    const handleClose = () => {
        if (orderStep === 'success') {
            // Reset for next time
            setOrderStep('cart');
            clearCart();
        }
        closeCheckout();
    };

    const generateWhatsAppMessage = () => {
        const itemsList = cartItems.map(item =>
            `▫️ ${item.quantity}x ${item.name} (₹${item.price * item.quantity})`
        ).join('%0a'); // %0a is newline

        const paymentText = paymentMethod === 'UPI'
            ? "Paid via UPI (Verify screenshot)"
            : "Cash at Counter";

        const message = `*NEW ORDER - TABLE ${tableId || 'N/A'}* 🍕%0a%0a` +
            `${itemsList}%0a%0a` +
            `*Total: ₹${cartTotal}*%0a` +
            `Payment: ${paymentText}`;

        return `https://wa.me/918448161446?text=${message}`; // Replace number
    };

    const handlePlaceOrder = () => {
        if (!tableId) {
            alert("Please enter a table number");
            return;
        }

        const whatsappUrl = generateWhatsAppMessage();
        window.open(whatsappUrl, '_blank');
        setOrderStep('success');
    };

    const getUpiLink = () => {
        // Deep link format
        // upi://pay?pa=UPI_ID&pn=NAME&am=AMOUNT&cu=INR&tn=NOTE
        const note = `Table ${tableId}`;
        return `upi://pay?pa=${MERCHANT_UPI}&pn=${MERCHANT_NAME}&am=${cartTotal}&cu=INR&tn=${note}`;
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
                                {orderStep === 'success' ? 'Order Sent' : 'Ah, Good Choice!'}
                            </h2>
                            <button
                                onClick={handleClose}
                                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="overflow-y-auto p-6 space-y-6 flex-1">
                            {orderStep === 'cart' ? (
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

                                    {/* UPI Section */}
                                    {paymentMethod === 'UPI' && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-4 text-center space-y-3"
                                        >
                                            <a
                                                href={getUpiLink()}
                                                className="block w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                                            >
                                                <Smartphone size={18} />
                                                Pay ₹{cartTotal} via App
                                            </a>
                                            <p className="text-xs text-blue-300">
                                                Tap above to pay via GPay/PhonePe.<br />
                                                <span className="font-bold">Then click "Send Order" below.</span>
                                            </p>
                                        </motion.div>
                                    )}
                                </>
                            ) : (
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
                            {orderStep === 'cart' ? (
                                <button
                                    onClick={handlePlaceOrder}
                                    className="w-full bg-white text-black font-heading text-xl py-4 rounded-2xl hover:bg-pizza-red hover:text-white transition-all shadow-lg flex items-center justify-center gap-2"
                                >
                                    <MessageCircle size={24} />
                                    {paymentMethod === 'UPI' ? 'Confirm & Send Order' : `Place Order • ₹${cartTotal}`}
                                </button>
                            ) : (
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
