import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowRight, Zap, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const specials = [
    {
        id: 1,
        name: 'Ultimate Feast',
        desc: 'Loaded with premium toppings & extra cheese.',
        price: 449,
        originalPrice: 549,
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80',
        tag: "HOT DROP",
        accent: 'text-rose-400',
        // "God Gradient" - Rich, deep, multi-stop
        bg: 'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-500/40 via-orange-600/20 to-stone-900',
        shape: 'rounded-[3rem_2rem_0rem_3rem]' // Unique geometric shape
    },
    {
        id: 2,
        name: 'Truffle Burger',
        desc: 'Gourmet double patty with truffle mayo.',
        price: 349,
        originalPrice: 429,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80',
        tag: 'TRENDING',
        accent: 'text-amber-400',
        bg: 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/30 via-amber-700/20 to-stone-900',
        shape: 'rounded-[1rem_3rem_1rem_3rem]' // Leaf shape
    },
    {
        id: 3,
        name: 'Neon Mojito',
        desc: 'Electric blue refresher with fresh mint.',
        price: 149,
        originalPrice: 199,
        image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=1200&q=80',
        tag: 'VIBE CHECK',
        accent: 'text-cyan-400',
        bg: 'bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-cyan-500/30 via-blue-600/20 to-slate-900',
        shape: 'rounded-[3rem_0rem_3rem_0rem]' // Diagonal
    },
];

const TodaysSpecial = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeItem = specials[activeIndex];

    // Mouse position for parallax (optional subtle effect)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % specials.length);
        }, 4500);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-[60vh] bg-[#050505] overflow-hidden flex items-center py-12">

            {/* Background Texture */}
            <div className="absolute inset-0 opacity-20 pointer-events-none z-0 mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}
            />

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeIndex + '-bg'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }} // Smoother background fade
                    className={`absolute inset-0 ${activeItem.bg} transition-all duration-700 blur-xl scale-110`}
                />
            </AnimatePresence>

            {/* Marquee Background */}
            <div className="absolute top-10 left-0 right-0 overflow-hidden opacity-[0.05] pointer-events-none">
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="whitespace-nowrap font-black text-[12vw] leading-none text-white font-heading tracking-tighter"
                >
                    TODAYS SPECIAL TODAYS SPECIAL TODAYS SPECIAL
                </motion.div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                    {/* LEFT: Content */}
                    <div className="lg:col-span-5 space-y-6">
                        <div>
                            {/* Shape-based Tag */}
                            <motion.div
                                key={activeIndex + '-tag'}
                                initial={{ opacity: 0, x: -20, rotate: -5 }}
                                animate={{ opacity: 1, x: 0, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className={`inline-flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-xl border-l-4 border-b-4 border-white/20 rounded-tr-2xl rounded-bl-2xl mb-4 shadow-lg`}
                            >
                                <Zap size={16} className={activeItem.accent} />
                                <span className={`font-black tracking-widest text-sm uppercase text-white`}>
                                    {activeItem.tag}
                                </span>
                            </motion.div>

                            <motion.h2
                                key={activeIndex + '-title'}
                                initial={{ opacity: 0, y: 50, skewY: 5 }}
                                animate={{ opacity: 1, y: 0, skewY: 0 }}
                                exit={{ opacity: 0, y: -50, skewY: -5 }}
                                transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
                                className="text-4xl sm:text-5xl md:text-7xl font-black font-heading text-white leading-[0.9] tracking-tighter mb-4 drop-shadow-2xl"
                            >
                                {activeItem.name}
                            </motion.h2>

                            <motion.p
                                key={activeIndex + '-desc'}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-zinc-300 text-lg max-w-sm leading-relaxed"
                            >
                                {activeItem.desc}
                            </motion.p>
                        </div>

                        {/* Price & CTA */}
                        <motion.div
                            key={activeIndex + '-cta'}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap items-center gap-6"
                        >
                            <div className="relative group/price cursor-default">
                                <div className={`absolute -inset-1 rounded-lg blur opacity-25 group-hover/price:opacity-75 transition duration-500 ${activeItem.accent.replace('text-', 'bg-')}`} />
                                <div className="relative flex items-baseline gap-2 bg-black/50 px-4 py-2 rounded-lg border border-white/10 backdrop-blur">
                                    <span className={`text-4xl font-black ${activeItem.accent} drop-shadow-md`}>
                                        ₹{activeItem.price}
                                    </span>
                                    <span className="text-lg text-zinc-500 line-through decoration-2">
                                        ₹{activeItem.originalPrice}
                                    </span>
                                </div>
                            </div>

                            <Link to="/menu">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative flex items-center gap-3 px-8 py-3 bg-white text-black font-black text-sm uppercase tracking-wider rounded-tl-2xl rounded-br-2xl shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.4)] transition-all"
                                >
                                    Grab It Now <ArrowRight size={18} />
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* RIGHT: Image Showcase */}
                    <div className="lg:col-span-7 relative flex justify-center items-center h-[400px] perspective-1000">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex + '-img'}
                                initial={{ opacity: 0, rotateX: 10, rotateY: 10, scale: 0.8 }}
                                animate={{ opacity: 1, rotateX: 0, rotateY: 0, scale: 1 }}
                                exit={{ opacity: 0, rotateX: -10, rotateY: -10, scale: 1.1 }}
                                transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                                style={{
                                    transformStyle: 'preserve-3d',
                                    x: mousePos.x,
                                    y: mousePos.y
                                }}
                                className="relative w-full max-w-[500px] aspect-square"
                            >
                                {/* ABSTRACT GLOW BEHIND */}
                                <div className={`absolute inset-10 rounded-full blur-[80px] opacity-60 animate-pulse ${activeItem.accent.replace('text-', 'bg-')}`} />

                                {/* MAIN CARD with UNIQUE SHAPE */}
                                <div className={`relative w-full h-full overflow-hidden border-4 border-white/10 shadow-2xl bg-[#121212] ${activeItem.shape}`}>
                                    <img
                                        src={activeItem.image}
                                        alt={activeItem.name}
                                        className="w-full h-full object-cover scale-110"
                                    />

                                    {/* Glass Overlay Details */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                                    {/* Floating Element: Rating */}
                                    <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5 shadow-xl">
                                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                        <span className="text-white font-bold text-sm">4.9</span>
                                    </div>
                                </div>

                                {/* Floating Discount Sticker - Now Rotates */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1, rotate: 12 }}
                                    transition={{ delay: 0.4, type: "spring" }}
                                    className="absolute -bottom-6 -left-6 z-20"
                                >
                                    <div className="bg-white text-black font-black text-xl p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] border-4 border-black clip-polygon-star">
                                        <div className="text-center leading-tight">
                                            -{(100 - (activeItem.price / activeItem.originalPrice * 100)).toFixed(0)}%
                                            <div className="text-[10px] font-bold tracking-widest uppercase">OFF</div>
                                        </div>
                                    </div>
                                </motion.div>

                            </motion.div>
                        </AnimatePresence>

                        {/* Custom Geometric Pagination */}
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
                            {specials.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveIndex(idx)}
                                    className={`transition-all duration-500 ease-out border border-white/20 ${idx === activeIndex
                                        ? `w-12 h-3 ${activeItem.accent.replace('text-', 'bg-')} shadow-[0_0_10px_currentColor]`
                                        : 'w-3 h-3 bg-transparent hover:bg-white/20'
                                        } rounded-none skew-x-[-12deg]`}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default TodaysSpecial;
