import React from 'react';
import { motion } from 'framer-motion';

const categories = [
    {
        id: 'all',
        name: 'All',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
        count: '40+ Items'
    },
    {
        id: 'pizza',
        name: 'Pizza',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
        count: '14 Items'
    },
    {
        id: 'burger',
        name: 'Burgers',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
        count: '10 Items'
    },
    {
        id: 'chinese',
        name: 'Chinese',
        image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80',
        count: '8 Items'
    },
    {
        id: 'shakes',
        name: 'Shakes',
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
        count: '12 Items'
    },
    {
        id: 'mojito',
        name: 'Mojito',
        image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=800&q=80',
        count: '6 Items'
    },
];

const Categories = () => {
    return (
        <section className="py-20 bg-pizza-black relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-pizza-red/5 rounded-full blur-[80px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-pizza-yellow/5 rounded-full blur-[80px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-pizza-yellow font-bold tracking-widest uppercase mb-2 block text-sm">
                        Top Foods
                    </span>
                    <h2 className="text-4xl md:text-5xl font-heading text-white">
                        Our Categories
                    </h2>
                    <div className="h-1 w-20 bg-pizza-red mx-auto mt-4 rounded-full" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-6">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="group flex flex-col items-center cursor-pointer"
                        >
                            {/* Image Container */}
                            <div className="relative w-32 h-32 md:w-36 md:h-36 mb-6 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-pizza-red/50 transition-all duration-300 shadow-lg">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            {/* Text Content */}
                            <h3 className="text-xl font-heading text-white group-hover:text-pizza-red transition-colors duration-300 tracking-wide">
                                {category.name}
                            </h3>
                            <span className="text-xs text-gray-500 font-medium mt-1 group-hover:text-gray-400 transition-colors">
                                {category.count}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
