import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Menu as MenuIcon, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchInput from './SearchInput';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-pizza-black/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="text-2xl font-heading text-white tracking-wider group-hover:text-pizza-red transition-colors">
                        DA RAMBO <span className="text-pizza-red">PIZZA</span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <Link
                        to="/menu"
                        className="text-white/80 hover:text-pizza-yellow font-medium transition-colors text-sm uppercase tracking-wide"
                    >
                        Menu
                    </Link>
                    {['Our Story', 'Locations', 'Contact'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase().replace(' ', '-')}`}
                            className="text-white/80 hover:text-pizza-yellow font-medium transition-colors text-sm uppercase tracking-wide"
                        >
                            {item}
                        </a>
                    ))}
                    <SearchInput variant="navbar" placeholder="Quick search..." />
                </div>

                {/* Icons & CTA */}
                <div className="hidden md:flex items-center gap-6">
                    <button className="text-white hover:text-pizza-red transition-colors">
                        <ShoppingBag size={24} />
                    </button>
                    <button className="px-6 py-2 bg-pizza-red text-white font-bold uppercase rounded-full hover:bg-red-700 transition-transform transform hover:scale-105 shadow-lg shadow-pizza-red/20">
                        Login
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 w-full bg-pizza-black/95 backdrop-blur-xl border-t border-white/10 p-6 md:hidden"
                    >
                        <div className="flex flex-col gap-6 items-center">
                            <Link
                                to="/menu"
                                className="text-xl font-heading text-white hover:text-pizza-yellow"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Menu
                            </Link>
                            {['Our Story', 'Locations', 'Contact'].map((item) => (
                                <a
                                    key={item}
                                    href="#"
                                    className="text-xl font-heading text-white hover:text-pizza-yellow"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item}
                                </a>
                            ))}
                            <div className="w-full">
                                <SearchInput placeholder="Search menu..." />
                            </div>
                            <hr className="w-12 border-white/20" />
                            <button className="flex items-center gap-2 text-white hover:text-pizza-red">
                                <ShoppingBag size={20} /> Cart
                            </button>
                            <button className="w-full py-3 bg-pizza-red text-white font-bold uppercase rounded-lg">
                                Login
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
