import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, ArrowUpRight } from 'lucide-react';

// Premium Visuals
import cafeInterior from '../../assets/gallery/cafe_interior_premium_1769508023756.png';
import coffeeMaking from '../../assets/gallery/coffee_latte_art_closeup_1769508419875.png';
import peopleEating from '../../assets/gallery/people_enjoying_cafe_1769508750529.png';
import pizzaOven from '../../assets/gallery/pizza_oven_flames_1769508877148.png';
import heroPizza from '../../assets/hero-pizza.png';
import burgerImg from '../../assets/burger.jpg';

const galleryItems = [
    { id: 1, src: cafeInterior, title: "Ambience", size: "col-span-1 md:col-span-2 row-span-2" },
    { id: 2, src: coffeeMaking, title: "Craft Coffee", size: "col-span-1" },
    { id: 3, src: pizzaOven, title: "Wood Fired", size: "col-span-1" },
    { id: 4, src: heroPizza, title: "Signature Pizza", size: "col-span-1" },
    { id: 5, src: burgerImg, title: "Gourmet Burger", size: "col-span-1" },
];

const Gallery = () => {
    return (
        <section className="py-20 bg-pizza-black relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-10">

                {/* Simple Header */}
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <span className="text-pizza-yellow text-xs font-bold tracking-[0.2em] uppercase block mb-2">
                            @darambopizza
                        </span>
                        <h2 className="text-4xl md:text-5xl font-heading text-white">
                            Vibe Check
                        </h2>
                    </div>

                    <a href="#" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group">
                        <Instagram size={20} />
                        <span className="hidden md:inline">Follow on Instagram</span>
                        <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                </div>

                {/* Simple Collage Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px]">
                    {galleryItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1.09 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative group rounded-2xl overflow-hidden cursor-pointer bg-zinc-900 ${item.size}`}
                        >
                            <img
                                src={item.src}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="text-white font-heading text-xl tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    {item.title}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Gallery;
