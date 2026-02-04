import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, ShieldCheck, Wallet, Coffee } from 'lucide-react';

const highlights = [
    {
        icon: Leaf,
        title: 'Fresh Ingredients',
        desc: 'Handpicked daily from local suppliers',
    },
    {
        icon: ShieldCheck,
        title: 'Hygienic Kitchen',
        desc: '100% clean & sanitized environment',
    },
    {
        icon: Wallet,
        title: 'Affordable Prices',
        desc: 'Quality food at pocket-friendly rates',
    },
];

const AboutCafe = () => {
    return (
        <section className="py-16 md:py-24 bg-[#1a1a1a] relative overflow-hidden">
            {/* Animated Background Elements */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 pointer-events-none"
            >
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-pizza-red/5 to-transparent" />
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-20 right-20 w-32 h-32 bg-pizza-red/10 rounded-full blur-2xl"
                />
                <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-20 left-20 w-24 h-24 bg-pizza-yellow/10 rounded-full blur-2xl"
                />
            </motion.div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        viewport={{ once: true }}
                        className="relative group"
                    >
                        {/* Glow Effect Behind Image */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-pizza-red/20 to-pizza-yellow/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Image Container */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.4 }}
                            className="relative rounded-3xl overflow-hidden shadow-2xl"
                        >
                            <motion.img
                                initial={{ scale: 1.1 }}
                                whileInView={{ scale: 1 }}
                                transition={{ duration: 1.2 }}
                                viewport={{ once: true }}
                                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2048&auto=format&fit=crop"
                                alt="Authentic Wood Fired Pizza"
                                className="w-full h-[400px] md:h-[580px] object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </motion.div>
                    </motion.div>

                    {/* Content Section */}
                    <div>
                        {/* Label */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-2 mb-6"
                        >
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <Coffee size={18} className="text-pizza-red" />
                            </motion.div>
                            <span className="text-pizza-red font-semibold text-sm uppercase tracking-widest">
                                About Us
                            </span>
                        </motion.div>

                        {/* Title with letter animation effect */}
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl lg:text-5xl font-heading text-white mb-6 leading-tight uppercase"
                        >
                            Step Into <span className="text-pizza-red">The Cage.</span>
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-gray-400 text-lg leading-relaxed mb-10"
                        >
                            Beyond the industrial mesh and golden accents lies a sanctuary for pizza purists. Da Rambo Pizza—affectionately known as 'The Cage'—is where raw aesthetics meet refined flavors. Every slice is a testament to our wood-fired heritage.
                        </motion.p>

                        {/* Highlights with stagger animation */}
                        <div className="space-y-4">
                            {highlights.map((item, index) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, x: -40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.3 + index * 0.15,
                                        type: 'spring',
                                        stiffness: 100
                                    }}
                                    viewport={{ once: true }}
                                    whileHover={{ x: 8, transition: { duration: 0.2 } }}
                                    className="flex items-center gap-4 group cursor-pointer"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className="w-12 h-12 rounded-xl bg-pizza-red/10 flex items-center justify-center group-hover:bg-pizza-red transition-colors duration-300"
                                    >
                                        <item.icon size={22} className="text-pizza-red group-hover:text-white transition-colors duration-300" />
                                    </motion.div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-0.5 group-hover:text-pizza-yellow transition-colors duration-300">
                                            {item.title}
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            {item.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutCafe;
