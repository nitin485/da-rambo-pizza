import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Star, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const specials = [
    {
        id: 1,
        name: 'Ultimate Feast Pizza',
        desc: 'Loaded with premium toppings, extra cheese & our signature sauce that will make your taste buds dance',
        price: 449,
        originalPrice: 549,
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80',
        tag: "Chef's Pick",
        accent: 'from-orange-500 to-red-600',
    },
    {
        id: 2,
        name: 'Truffle Mushroom Burger',
        desc: 'Gourmet double patty burger with truffle mayo, caramelized onions & aged cheddar',
        price: 349,
        originalPrice: 429,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80',
        tag: 'Today Special',
        accent: 'from-yellow-500 to-orange-500',
    },
    {
        id: 3,
        name: 'Signature Mojito',
        desc: 'Refreshing mint & lime with our secret house blend - the perfect refresher',
        price: 149,
        originalPrice: 199,
        image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=1200&q=80',
        tag: 'Must Try',
        accent: 'from-green-400 to-emerald-600',
    },
];

const TodaysSpecial = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [time, setTime] = useState({ hours: 8, minutes: 45, seconds: 30 });

    const activeItem = specials[activeIndex];

    // Countdown
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(prev => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Auto-cycle
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % specials.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-[700px] bg-pizza-black overflow-hidden">
            {/* Full Background Image with Overlay */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                >
                    <img
                        src={activeItem.image}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                    {/* Dark Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
                </motion.div>
            </AnimatePresence>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [-20, 20, -20],
                            x: [-10, 10, -10],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 4 + i,
                            repeat: Infinity,
                            delay: i * 0.5,
                        }}
                        className="absolute w-1 h-1 bg-pizza-yellow rounded-full"
                        style={{
                            top: `${20 + i * 15}%`,
                            left: `${60 + i * 5}%`,
                        }}
                    />
                ))}
            </div>

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-6 py-20 min-h-[700px] flex items-center">
                <div className="grid lg:grid-cols-2 gap-12 items-center w-full">

                    {/* Left - Content */}
                    <div className="max-w-xl">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-3 mb-6"
                        >
                            <div className="flex items-center gap-2 bg-pizza-red/20 backdrop-blur-sm border border-pizza-red/30 text-pizza-red px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                                <Flame size={14} className="animate-pulse" />
                                Limited Offer
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full">
                                <Clock size={14} className="text-pizza-yellow" />
                                <span className="text-white font-mono text-sm">
                                    {String(time.hours).padStart(2, '0')}:{String(time.minutes).padStart(2, '0')}:{String(time.seconds).padStart(2, '0')}
                                </span>
                            </div>
                        </motion.div>

                        {/* Tag */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex + '-tag'}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className={`inline-block bg-gradient-to-r ${activeItem.accent} text-white px-4 py-1.5 rounded-full text-sm font-bold mb-4`}
                            >
                                <span className="flex items-center gap-2">
                                    <Sparkles size={14} />
                                    {activeItem.tag}
                                </span>
                            </motion.div>
                        </AnimatePresence>

                        {/* Title */}
                        <AnimatePresence mode="wait">
                            <motion.h2
                                key={activeIndex + '-title'}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.5 }}
                                className="text-5xl md:text-6xl lg:text-7xl font-heading text-white mb-6 leading-tight"
                            >
                                {activeItem.name}
                            </motion.h2>
                        </AnimatePresence>

                        {/* Description */}
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={activeIndex + '-desc'}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="text-lg text-gray-300 mb-8 leading-relaxed"
                            >
                                {activeItem.desc}
                            </motion.p>
                        </AnimatePresence>

                        {/* Rating */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} className="text-pizza-yellow fill-pizza-yellow" />
                                ))}
                            </div>
                            <span className="text-gray-400 text-sm">4.9 (2.5k+ reviews)</span>
                        </div>

                        {/* Price & CTA */}
                        <div className="flex items-center gap-6">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex + '-price'}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="flex items-baseline gap-3"
                                >
                                    <span className="text-5xl font-bold text-white">₹{activeItem.price}</span>
                                    <span className="text-xl text-gray-500 line-through">₹{activeItem.originalPrice}</span>
                                </motion.div>
                            </AnimatePresence>

                            <Link to="/menu">
                                <motion.button
                                    whileHover={{ scale: 1.05, x: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-3 bg-pizza-red hover:bg-pizza-red/90 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors shadow-lg shadow-pizza-red/30"
                                >
                                    Order Now
                                    <ArrowRight size={20} />
                                </motion.button>
                            </Link>
                        </div>
                    </div>

                    {/* Right - Item Selector */}
                    <div className="hidden lg:flex flex-col gap-4 justify-center items-end">
                        {specials.map((item, index) => (
                            <motion.div
                                key={item.id}
                                onClick={() => setActiveIndex(index)}
                                whileHover={{ x: -10 }}
                                className={`relative cursor-pointer group transition-all duration-300 ${index === activeIndex ? 'opacity-100' : 'opacity-50 hover:opacity-80'
                                    }`}
                            >
                                <div className={`flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border ${index === activeIndex ? 'border-pizza-red' : 'border-white/10'
                                    }`}>
                                    <div className="w-20 h-20 rounded-xl overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="text-right">
                                        <h4 className="text-white font-semibold mb-1">{item.name}</h4>
                                        <p className="text-pizza-yellow font-bold">₹{item.price}</p>
                                    </div>
                                </div>

                                {/* Active Indicator */}
                                {index === activeIndex && (
                                    <motion.div
                                        layoutId="activeIndicator"
                                        className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-12 bg-pizza-red rounded-full"
                                    />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                <motion.div
                    key={activeIndex}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 6, ease: 'linear' }}
                    className="h-full bg-gradient-to-r from-pizza-red to-pizza-yellow"
                />
            </div>

            {/* Mobile Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 lg:hidden">
                {specials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`h-2 rounded-full transition-all ${index === activeIndex ? 'w-6 bg-pizza-red' : 'w-2 bg-white/30'
                            }`}
                    />
                ))}
            </div>
        </section>
    );
};

export default TodaysSpecial;
