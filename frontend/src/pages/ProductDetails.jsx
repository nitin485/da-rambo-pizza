import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star, ShoppingBag, Leaf, Heart, Utensils, Zap, ChevronRight, Minus, Plus, ArrowRight } from 'lucide-react';
import { getProductById } from '../data/menuData';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [activeSize, setActiveSize] = useState('Regular');

    useEffect(() => {
        const foundProduct = getProductById(id);
        if (foundProduct) {
            setProduct(foundProduct);
            window.scrollTo(0, 0);
        } else {
            navigate('/menu');
        }
    }, [id, navigate]);

    if (!product) return null;

    return (
        <div className="bg-[#050505] min-h-screen text-white font-body selection:bg-rose-500 selection:text-white overflow-x-hidden">
            <Navbar />

            {/* Background Atmosphere */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-rose-600/20 rounded-full blur-[180px] opacity-40 mix-blend-screen animate-pulse duration-[5000ms]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[150px] opacity-30 mix-blend-screen" />
            </div>

            <main className="relative z-10 pt-24 lg:pt-40 pb-20 px-6">
                <div className="container mx-auto max-w-7xl">

                    {/* Back Link */}
                    <div className="mb-8 lg:mb-12">
                        <Link
                            to="/menu"
                            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group"
                        >
                            <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-zinc-800 transition-all">
                                <ArrowLeft size={18} />
                            </div>
                            <span className="text-sm font-medium tracking-wide uppercase">Back to Menu</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center">

                        {/* LEFT: VISUAL (7 Cols) */}
                        <div className="lg:col-span-7 relative group">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                className="relative z-10"
                            >
                                <div className="relative aspect-square lg:aspect-[4/3] rounded-[3rem] overflow-hidden">
                                    {/* Blurred Shadow Image */}
                                    <img
                                        src={product.image}
                                        alt=""
                                        className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-40 scale-110"
                                    />

                                    {/* Main Image */}
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="relative w-full h-full object-cover shadow-2xl transition-transform duration-700 group-hover:scale-105"
                                    />

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />

                                    {/* Floating Badges */}
                                    <div className="absolute bottom-8 left-8 flex flex-wrap gap-4">
                                        {product.category === 'Pizza' && (
                                            <div className="px-5 py-2.5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 flex items-center gap-3">
                                                <Leaf size={16} className="text-green-400" />
                                                <span className="text-white text-xs font-bold uppercase tracking-widest">Fresh Veg</span>
                                            </div>
                                        )}
                                        <div className="px-5 py-2.5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 flex items-center gap-3">
                                            <div className="flex text-yellow-500">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={12} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i < Math.floor(product.rating) ? "" : "text-zinc-600"} />
                                                ))}
                                            </div>
                                            <span className="text-white text-xs font-bold uppercase tracking-widest">{product.rating} Rating</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* RIGHT: INFO (5 Cols) */}
                        <div className="lg:col-span-5 relative">
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="space-y-8"
                            >
                                {/* Category */}
                                <div className="inline-flex items-center gap-3">
                                    <span className="h-px w-8 bg-rose-500"></span>
                                    <span className="text-rose-500 font-bold uppercase tracking-[0.2em] text-sm">
                                        {product.category}
                                    </span>
                                </div>

                                {/* Title */}
                                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display leading-[0.9] text-white">
                                    {product.name}
                                </h1>

                                {/* Description */}
                                <p className="text-zinc-400 text-lg leading-relaxed font-light border-l-2 border-zinc-800 pl-6">
                                    {product.desc}
                                </p>

                                {/* Ingredients Tags */}
                                {product.ingredients && (
                                    <div className="flex flex-wrap gap-2">
                                        {product.ingredients.map((ing, i) => (
                                            <span key={i} className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-medium text-zinc-500 uppercase tracking-wide">
                                                {ing}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="h-px w-full bg-zinc-800/50" />

                                {/* Price & Actions */}
                                <div className="space-y-6">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl text-zinc-500 font-display">₹</span>
                                        <span className="text-5xl sm:text-7xl text-white font-display tracking-tight">
                                            {product.price * quantity}
                                        </span>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                        {/* Quantity */}
                                        <div className="flex items-center bg-zinc-900 rounded-2xl p-2 border border-zinc-800/50">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-zinc-800 text-white transition-colors"
                                            >
                                                <Minus size={18} />
                                            </button>
                                            <div className="w-16 text-center font-display text-2xl pt-1">{quantity}</div>
                                            <button
                                                onClick={() => setQuantity(quantity + 1)}
                                                className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-zinc-800 text-white transition-colors"
                                            >
                                                <Plus size={18} />
                                            </button>
                                        </div>

                                        {/* Add Button */}
                                        <button
                                            onClick={() => {
                                                addToCart(product, quantity);
                                                // Optional: Add visual feedback here
                                            }}
                                            className="flex-1 bg-white text-black rounded-2xl font-bold text-lg uppercase tracking-wide hover:bg-rose-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-4 py-4 px-8 shadow-xl shadow-white/5 hover:shadow-rose-500/20 group">
                                            Add to Order
                                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>

                                {/* Spiciness Indicator (Optional) */}
                                <div className="flex items-center gap-2 text-sm text-zinc-500 pt-4">
                                    <Zap size={16} className={`text-rose-500 ${product.category === 'Pizza' || product.category === 'Burger' ? 'opacity-100' : 'opacity-0'}`} />
                                    <span>Made strictly with fresh ingredients immediately upon order.</span>
                                </div>

                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProductDetails;
