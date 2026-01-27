import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// Premium Visuals
import cafeInterior from '../../assets/gallery/cafe_interior_premium_1769508023756.png';
import coffeeMaking from '../../assets/gallery/coffee_latte_art_closeup_1769508419875.png';
import peopleEating from '../../assets/gallery/people_enjoying_cafe_1769508750529.png';
import pizzaOven from '../../assets/gallery/pizza_oven_flames_1769508877148.png';
import heroPizza from '../../assets/hero-pizza.png';
import burgerImg from '../../assets/burger.png';

const cards = [
    { id: 1, src: cafeInterior, title: "Modern Space", category: "Interior", sub: "Designed for premium comfort" },
    { id: 2, src: coffeeMaking, title: "Artisan Brew", category: "Coffee", sub: "Roasted to perfection daily" },
    { id: 3, src: heroPizza, title: "Royal Crust", category: "Dishes", sub: "Signature wood-fired sourdough" },
    { id: 4, src: pizzaOven, title: "Ancient Fire", category: "Kitchen", sub: "Traditional craft" },
    { id: 5, src: burgerImg, title: "Gourmet Bite", category: "Dishes", sub: "Premium angus charcoal grilled" },
    { id: 6, src: peopleEating, title: "Social Vibe", category: "Atmosphere", sub: "Where community meets art" },
];

const Gallery = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Smoother spring for natural movement
    const x = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]), {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const headerScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);

    return (
        <section ref={targetRef} className="relative h-[600vh] bg-pizza-black">
            {/* Sticky Frame */}
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">

                {/* Background Large Text (Moves slower as an accent) */}
                <motion.div
                    style={{ x: useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]) }}
                    className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex whitespace-nowrap pointer-events-none opacity-[0.03]"
                >
                    <h2 className="text-[30vw] font-heading text-white leading-none">THE GALLERY EXPERIENCE THE GALLERY EXPERIENCE</h2>
                </motion.div>

                {/* Section Title - Disappears as you scroll deep into gallery */}
                <motion.div
                    style={{ opacity: headerOpacity, scale: headerScale }}
                    className="absolute top-24 left-10 md:left-20 z-40 pointer-events-none"
                >
                    <span className="text-pizza-red font-heading text-xl tracking-[0.5em] uppercase mb-4 block">Visuals</span>
                    <h2 className="text-6xl md:text-8xl font-heading text-white leading-tight">
                        CRAFTED FOR<br />
                        <span className="text-pizza-red">THE SENSES</span>
                    </h2>
                </motion.div>

                {/* Main Horizontal Track */}
                <motion.div
                    style={{ x }}
                    className="flex gap-12 md:gap-24 px-10 md:px-20 items-center h-full"
                >
                    {/* Extra padding-left for the first card to start after the header area */}
                    <div className="w-[40vw] flex-shrink-0 hidden md:block" />

                    {cards.map((card) => (
                        <div
                            key={card.id}
                            className="group relative h-[60vh] w-[80vw] md:w-[750px] flex-shrink-0"
                        >
                            {/* The Card Container */}
                            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-zinc-900 shadow-2xl transition-all duration-700 ease-out">
                                {/* Image with simple, clean zoom on hover */}
                                <img
                                    src={card.src}
                                    alt={card.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />

                                {/* Gradient Vignette - Always active for readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                {/* Info Overlay - More persistent and clean */}
                                <div className="absolute inset-x-0 bottom-0 p-8 md:p-12">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-6 h-px bg-pizza-red" />
                                        <span className="text-pizza-red font-accent text-[10px] md:text-xs uppercase tracking-[0.4em]">
                                            {card.category}
                                        </span>
                                    </div>
                                    <h3 className="text-white font-heading text-4xl md:text-6xl mb-2 tracking-tight group-hover:text-pizza-red transition-colors duration-500">
                                        {card.title}
                                    </h3>
                                    <p className="text-zinc-400 font-body text-sm md:text-base max-w-sm overflow-hidden h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-700">
                                        {card.sub}
                                    </p>
                                </div>

                                {/* Count Indicator */}
                                <div className="absolute top-8 right-10 text-white/10 font-heading text-6xl pointer-events-none">
                                    0{card.id}
                                </div>
                            </div>

                            {/* Subtle reflection-like border */}
                            <div className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none" />
                        </div>
                    ))}

                    {/* Extra padding-right for the last card to finish nicely */}
                    <div className="w-[20vw] flex-shrink-0" />
                </motion.div>

                {/* Subtle Interactive Progress Bar */}
                <div className="absolute bottom-12 left-10 md:left-20 right-10 md:right-20">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-zinc-600 font-accent text-[10px] uppercase tracking-widest">Discover</span>
                        <span className="text-zinc-600 font-accent text-[10px] uppercase tracking-widest">Da Rambo Pizza</span>
                    </div>
                    <div className="h-[2px] w-full bg-white/5 relative">
                        <motion.div
                            style={{ scaleX: scrollYProgress }}
                            className="absolute inset-y-0 left-0 bg-pizza-red origin-left w-full"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Gallery;
