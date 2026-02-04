import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative min-h-[85vh] flex items-center overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover scale-[1.02]"
                >
                    <source
                        src="https://media.istockphoto.com/id/180617222/video/adding-a-sprinkle-of-cheese-on-pizza.mp4?s=mp4-640x640-is&k=20&c=S7sp2zrwfn8pi4yjFy74CAQI9Z12pkL7arVqw9RzgWg="
                        type="video/mp4"
                    />
                </video>
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [-20, 20, -20],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            duration: 4 + i,
                            repeat: Infinity,
                            delay: i * 0.5,
                        }}
                        className="absolute w-1 h-1 bg-pizza-yellow rounded-full"
                        style={{
                            top: `${20 + i * 12}%`,
                            left: `${55 + i * 7}%`,
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6">
                <div className="max-w-3xl">
                    {/* Tagline */}
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-block text-pizza-yellow font-bold tracking-widest uppercase text-sm mb-6"
                    >
                        Since 1985
                    </motion.span>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading leading-[0.9] mb-6"
                    >
                        <span className="text-white">The Legend</span>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pizza-red to-orange-500">
                            Of Taste.
                        </span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-xl"
                    >
                        Crafted with passion, served hot. Experience the authentic taste of wood-fired perfection in every slice.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-wrap gap-4"
                    >
                        <Link to="/menu">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-3 px-8 py-4 bg-pizza-red text-white font-bold rounded-full hover:bg-red-700 transition-all shadow-lg shadow-pizza-red/40 uppercase tracking-wide"
                            >
                                Order Now
                                <ArrowRight size={20} />
                            </motion.button>
                        </Link>

                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            {/*             
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1.5 h-1.5 bg-white rounded-full"
                    />
                </div>
            </motion.div> */}
        </section>
    );
};

export default Hero;
