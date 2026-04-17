import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';

const SearchInput = ({ variant = "default", placeholder = "Search..." }) => {
    const [query, setQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            window.location.href = `/menu?search=${encodeURIComponent(query)}`;
        }
    };

    if (variant === "navbar") {
        return (
            <motion.div
                className="hidden lg:flex items-center"
                initial="initial"
                whileHover="hover"
                animate="initial"
            >
                <form
                    onSubmit={handleSearch}
                    className="relative flex items-center group/navsearch"
                >
                    {/* Animated Gradient Border Layer */}
                    <motion.div
                        variants={{
                            initial: { opacity: 0, scale: 0.8 },
                            hover: { opacity: 1, scale: 1 }
                        }}
                        className="absolute -inset-[1px] bg-gradient-to-r from-pizza-red via-pizza-yellow to-pizza-red rounded-full opacity-0 blur-[2px] group-hover/navsearch:opacity-100 transition-opacity duration-500"
                    />

                    <div className="relative flex items-center bg-black/80 backdrop-blur-xl rounded-full overflow-hidden border border-white/5">
                        <motion.div
                            variants={{
                                initial: { x: 0, opacity: 0.5 },
                                hover: { x: 12, opacity: 1 }
                            }}
                            className="absolute left-3 z-20 text-white"
                        >
                            <Search size={16} />
                        </motion.div>

                        <motion.input
                            variants={{
                                initial: { width: "40px", paddingLeft: "40px" },
                                hover: { width: "260px", paddingLeft: "40px" }
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 250,
                                damping: 25,
                                mass: 1
                            }}
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={placeholder}
                            className="bg-transparent py-2 pr-4 text-xs font-medium text-white appearance-none focus:outline-none placeholder:text-zinc-700 cursor-pointer focus:cursor-text"
                        />

                        {/* Dynamic Shadow Depth */}
                        <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] pointer-events-none" />
                    </div>
                </form>
            </motion.div>
        );
    }

    return (
        <form
            onSubmit={handleSearch}
            className="relative group w-full max-w-lg"
        >
            <div className="absolute inset-0 bg-pizza-red/20 blur-2xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 focus-within:border-pizza-red/50 focus-within:bg-white/15 transition-all duration-300">
                <Search className="ml-4 text-zinc-400 group-focus-within:text-pizza-red transition-colors" size={20} />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-white placeholder:text-zinc-500 text-lg"
                />
                <button
                    type="submit"
                    className="bg-pizza-red text-white p-3 rounded-xl shadow-lg shadow-pizza-red/20 transition-transform active:scale-95"
                >
                    <ArrowRight size={20} />
                </button>
            </div>
        </form>
    );
};

export default SearchInput;
