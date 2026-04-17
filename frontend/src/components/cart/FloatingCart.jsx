import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const FloatingCart = () => {
    const { cartCount, cartTotal, openCheckout } = useCart();

    return (
        <AnimatePresence>
            {cartCount > 0 && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-6 left-6 right-6 z-50 md:left-auto md:right-8 md:w-96"
                >
                    <button
                        onClick={openCheckout}
                        className="w-full bg-pizza-red text-white p-4 rounded-2xl shadow-xl shadow-pizza-red/30 flex items-center justify-between group overflow-hidden relative"
                    >
                        {/* Background Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pizza-red opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="flex items-center gap-4 relative z-10">
                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center font-bold backdrop-blur-sm">
                                {cartCount}
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-red-100 font-medium uppercase tracking-wider">Total</p>
                                <p className="text-xl font-bold font-display">₹{cartTotal}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 relative z-10 font-bold uppercase tracking-wide text-sm">
                            View Cart
                            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FloatingCart;
