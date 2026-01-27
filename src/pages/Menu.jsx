import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ShoppingBag, Star, Clock, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const menuItems = [
    { id: 1, name: "Margherita Pizza", category: "Pizza", price: 299, rating: 4.8, time: "20-25 min", desc: "Fresh basil, mozzarella, and tomato sauce", image: "https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "Double Patty Burger", category: "Burgers", price: 249, rating: 4.9, time: "15-20 min", desc: "Juicy beef patties with melted cheddar", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "Cappuccino", category: "Coffee", price: 149, rating: 4.7, time: "5-10 min", desc: "Rich espresso with steamed milk foam", image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80" },
    { id: 4, name: "Club Sandwich", category: "Sandwich", price: 199, rating: 4.6, time: "10-15 min", desc: "Triple-layered with chicken and bacon", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80" },
    { id: 5, name: "Pepperoni Feast", category: "Pizza", price: 399, rating: 4.9, time: "25-30 min", desc: "Loaded with spicy pepperoni slices", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80" },
    { id: 6, name: "Avocado Toast", category: "Sandwich", price: 179, rating: 4.5, time: "10 min", desc: "Healthy sourdough with smashed avocado", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80" },
    { id: 7, name: "Latte Art Special", category: "Coffee", price: 169, rating: 4.8, time: "5-8 min", desc: "Smooth latte with custom milk art", image: "https://images.unsplash.com/photo-1570968015861-d55a43b1f7d8?auto=format&fit=crop&w=800&q=80" },
    { id: 8, name: "Pasta Carbonara", category: "Italian", price: 329, rating: 4.7, time: "15-20 min", desc: "Creamy pasta with pancetta and egg", image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80" },
];

const Menu = () => {
    // Read search from URL if present
    const urlParams = new URLSearchParams(window.location.search);
    const initialSearch = urlParams.get('search') || "";

    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = ["All", "Pizza", "Burgers", "Coffee", "Sandwich", "Italian"];

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

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-6">
                    {/* Header Section */}
                    <div className="mb-12">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-heading mb-4"
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
                    <div className="sticky top-24 z-40 mb-12 flex flex-col md:flex-row gap-6 items-center">
                        <div className="relative w-full md:flex-1 group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-pizza-red transition-colors duration-300" size={20} />
                            <input
                                type="text"
                                placeholder="Search pizza, coffee, sandwich..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl py-5 pl-16 pr-6 text-lg focus:outline-none focus:border-pizza-red/50 focus:bg-zinc-900/80 transition-all duration-300 placeholder:text-zinc-600"
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

                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar w-full md:w-auto">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-8 py-4 rounded-2xl font-heading text-lg whitespace-nowrap transition-all duration-300 ${selectedCategory === cat
                                        ? 'bg-pizza-red text-white shadow-lg shadow-pizza-red/20'
                                        : 'bg-zinc-900/50 text-zinc-400 border border-white/5 hover:bg-zinc-800'
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <AnimatePresence mode='popLayout'>
                            {filteredItems.map((item, index) => (
                                <motion.div
                                    layout
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    className="group bg-zinc-900/40 rounded-3xl overflow-hidden border border-white/5 hover:border-pizza-red/30 transition-all duration-500 shadow-xl"
                                >
                                    {/* Image Section */}
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/10">
                                            <Star size={14} className="text-pizza-yellow fill-pizza-yellow" />
                                            <span className="text-sm font-bold">{item.rating}</span>
                                        </div>
                                        <div className="absolute bottom-4 left-4 bg-pizza-red text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                            {item.category}
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-2xl font-heading group-hover:text-pizza-red transition-colors duration-300 tracking-wide">
                                                {item.name}
                                            </h3>
                                            <span className="text-xl font-bold text-pizza-red">₹{item.price}</span>
                                        </div>
                                        <p className="text-zinc-400 text-sm mb-6 line-clamp-2 leading-relaxed">
                                            {item.desc}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-zinc-500 text-xs">
                                                <Clock size={14} />
                                                <span>{item.time}</span>
                                            </div>
                                            <button className="bg-white text-black p-3 rounded-2xl hover:bg-pizza-red hover:text-white transition-all duration-300 shadow-lg group-active:scale-95">
                                                <ShoppingBag size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
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
