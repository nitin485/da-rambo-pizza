import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useParams, useLocation } from 'react-router-dom';
import { Search, Filter, ShoppingBag, Star, Clock, X, Plus } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { menuItems } from '../data/menuData';
import { useCart } from '../context/CartContext';

const Menu = () => {
    const { category: pathCategory } = useParams();
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);

    const initialSearch = urlParams.get('search') || "";
    const initialCategory = pathCategory || urlParams.get('category') || "All";

    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const { addToCart } = useCart();

    // Sync state with URL params and path params
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const search = params.get('search') || "";
        const category = pathCategory || params.get('category') || "All";
        setSearchQuery(search);
        setSelectedCategory(category);
    }, [location.search, pathCategory]);

    const categories = ["All", "Pizza", "Burger", "Chinese", "Shakes", "Mojito", "Coffee"];

    const filteredItems = useMemo(() => {
        return menuItems.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.desc.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    return (
        <div className="bg-pizza-black min-h-screen text-white font-body selection:bg-pizza-red selection:text-white">
            <Navbar />

            <main className="pt-24 md:pt-32 pb-20">
                <div className="container mx-auto px-6">
                    {/* Header Section */}
                    <div className="mb-12">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl lg:text-7xl font-heading mb-4"
                        >
                            OUR <span className="text-pizza-red">MENU</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-zinc-400 max-w-xl"
                        >
                            Explore our curated selection of wood-fired pizzas, artisan coffee, and gourmet delights. Every dish is crafted with passion.
                        </motion.p>
                    </div>

                    {/* Search & Filter Bar - THE UX UPGRADE */}
                    {/* Search & Filter Bar - Unstuck for Natural Scroll */}
                    <div className="relative z-30 mb-8 py-4 bg-transparent -mx-6 px-6 flex flex-col md:flex-row gap-6 items-center">
                        <div className="relative w-full md:flex-1 group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-pizza-red transition-colors duration-300" size={20} />
                            <input
                                type="text"
                                placeholder="Search pizza, coffee, sandwich..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-zinc-900 border border-white/10 rounded-xl py-3 pl-14 pr-6 text-base focus:outline-none focus:border-pizza-red/50 focus:bg-zinc-800 transition-all duration-300 placeholder:text-zinc-600"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                                >
                                    <X size={20} />
                                </button>
                            )}
                        </div>

                        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar w-full md:w-auto">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-6 py-3 rounded-xl font-heading text-sm whitespace-nowrap transition-all duration-300 border ${selectedCategory === cat
                                        ? 'bg-pizza-red border-pizza-red text-white shadow-md'
                                        : 'bg-zinc-900 border-white/10 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mb-8">
                        <p className="text-zinc-500 text-sm">
                            Showing {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
                        </p>
                    </div>

                    {/* Menu Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
                        <AnimatePresence mode='popLayout'>
                            {filteredItems.map((item, index) => (
                                <Link to={`/product/${item.id}`} key={item.id} className="block group">
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                    >
                                        {/* MOBILE CARD (List View) */}
                                        <div className="md:hidden relative bg-zinc-900/50 rounded-2xl overflow-hidden border border-white/5 flex h-32">
                                            {/* Image Left */}
                                            <div className="w-1/3 relative overflow-hidden">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            {/* Content Right */}
                                            <div className="w-2/3 p-4 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex justify-between items-start mb-1">
                                                        <h3 className="text-lg font-heading text-white line-clamp-1">
                                                            {item.name}
                                                        </h3>
                                                        <span className="font-bold text-pizza-yellow text-sm">
                                                            ₹{item.price}
                                                        </span>
                                                    </div>
                                                    <p className="text-zinc-500 text-xs line-clamp-2 leading-relaxed">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                                <div className="flex items-center justify-between mt-2">
                                                    <div className="flex items-center gap-1">
                                                        <Star size={10} className="text-pizza-yellow fill-pizza-yellow" />
                                                        <span className="text-xs text-zinc-400">{item.rating}</span>
                                                    </div>
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            addToCart(item);
                                                        }}
                                                        className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center active:bg-pizza-red active:scale-90 transition-all"
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* DESKTOP CARD (Original Grid View) */}
                                        <div className="hidden md:flex flex-col h-full bg-[#121212] rounded-[2rem] overflow-hidden border border-white/5 hover:border-pizza-red/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-pizza-red/5">
                                            {/* Image */}
                                            <div className="aspect-[4/3] overflow-hidden relative">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-60" />

                                                {/* Floating Badge */}
                                                <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/10">
                                                    <Star size={12} className="text-pizza-yellow fill-pizza-yellow" />
                                                    <span className="text-xs font-bold text-white">{item.rating}</span>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-6 pt-2 flex-grow flex flex-col">
                                                <div className="mb-2">
                                                    <h3 className="text-lg font-heading text-white group-hover:text-pizza-red transition-colors duration-300">
                                                        {item.name}
                                                    </h3>
                                                </div>
                                                <p className="text-zinc-500 text-sm mb-4 line-clamp-2">
                                                    {item.desc}
                                                </p>

                                                <div className="flex items-center justify-between mt-auto">
                                                    <div>
                                                        <p className="text-xs text-zinc-500 mb-0.5">Price</p>
                                                        <p className="text-xl font-bold text-white">₹{item.price}</p>
                                                    </div>
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            addToCart(item);
                                                        }}
                                                        className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-pizza-red hover:text-white transition-all duration-300 shadow-lg z-20 relative"
                                                    >
                                                        <Plus size={20} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Empty State */}
                    {filteredItems.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="py-20 text-center"
                        >
                            <div className="mb-6 inline-block p-6 rounded-full bg-zinc-900 border border-white/5">
                                <Search size={48} className="text-zinc-700" />
                            </div>
                            <h3 className="text-3xl font-heading mb-2 text-zinc-400">No matches found</h3>
                            <p className="text-zinc-600">Try searching for something else or explore other categories.</p>
                        </motion.div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Menu;
