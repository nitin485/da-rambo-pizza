import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Menu as MenuIcon, X, Search, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchInput from './SearchInput';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const location = useLocation();

    // Scroll-Spy Logic for Home Page Sections
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            if (location.pathname !== '/') {
                setActiveSection(location.pathname.startsWith('/menu') || location.pathname.startsWith('/product') ? 'menu' : '');
                return;
            }

            const sections = ['contact'];
            const scrollPosition = window.scrollY + 150;

            let currentSection = 'home';
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const height = element.offsetHeight;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
                        currentSection = section;
                    }
                }
            }
            setActiveSection(currentSection);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    const navLinks = [
        { name: 'Home', path: '/', type: 'route' },
        { name: 'Menu', path: '/menu', type: 'route' },
        { name: 'Categories', path: '/menu', type: 'dropdown' },
        { name: 'Contact', path: 'contact', type: 'hash' }
    ];

    const categories = [
        { name: "Pizza", path: "/menu/Pizza" },
        { name: "Burger", path: "/menu/Burger" },
        { name: "Chinese", path: "/menu/Chinese" },
        { name: "Shakes", path: "/menu/Shakes" },
        { name: "Mojito", path: "/menu/Mojito" },
        { name: "Coffee", path: "/menu/Coffee" },
    ];

    const isLinkActive = (link) => {
        if (link.type === 'hash') return activeSection === link.path;
        if (link.path === '/') return activeSection === 'home';
        if (link.path === '/menu') return activeSection === 'menu';
        return false;
    };

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-pizza-black/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95, rotate: -3 }}
                        className="text-2xl font-heading text-white tracking-wider cursor-pointer select-none"
                    >
                        <motion.span
                            initial={{ display: "inline-block" }}
                            whileTap={{ scaleX: 1.2, scaleY: 0.8 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            DA RAMBO
                        </motion.span>
                        <span className="text-pizza-red ml-2">PIZZA</span>
                    </motion.div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => {
                        if (link.type === 'dropdown') {
                            return (
                                <div
                                    key={link.name}
                                    className="relative group"
                                    onMouseEnter={() => setIsCategoriesOpen(true)}
                                    onMouseLeave={() => setIsCategoriesOpen(false)}
                                >
                                    <button className="flex items-center gap-1 font-medium text-sm uppercase tracking-wide px-1 py-2 text-white/80 hover:text-pizza-yellow transition-colors">
                                        {link.name}
                                        <ChevronDown size={14} className={`transition-transform duration-300 ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {isCategoriesOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-full left-0 w-48 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl py-2 mt-1"
                                            >
                                                {categories.map((cat) => (
                                                    <Link
                                                        key={cat.name}
                                                        to={cat.path}
                                                        className="block px-4 py-2 text-sm text-gray-300 hover:text-pizza-yellow hover:bg-white/5 transition-colors"
                                                    >
                                                        {cat.name}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        }

                        const href = link.type === 'hash'
                            ? (location.pathname === '/' ? `#${link.path}` : `/#${link.path}`)
                            : link.path;
                        const active = isLinkActive(link);

                        return (
                            <Link
                                key={link.name}
                                to={href}
                                className="relative font-medium text-sm uppercase tracking-wide px-1 py-2"
                            >
                                {active ? (
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pizza-yellow via-orange-500 to-pizza-red font-bold">
                                        {link.name}
                                    </span>
                                ) : (
                                    <span className="text-white/80 hover:text-pizza-yellow transition-colors">
                                        {link.name}
                                    </span>
                                )}

                                {/* Active Indicator Underline */}
                                {active && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-pizza-yellow via-orange-500 to-pizza-red rounded-full"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
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
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-[calc(100%+8px)] left-4 right-4 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden md:hidden"
                    >
                        <div className="flex flex-col p-4 justify-center items-center">
                            {/* Navigation Links */}
                            <nav className="flex flex-col gap-2 mb-6 w-full">
                                {navLinks.map((link) => {
                                    if (link.type === 'dropdown') {
                                        return (
                                            <div key={link.name} className="flex flex-col items-center">
                                                <div className="text-xs text-zinc-500 uppercase tracking-widest mb-2 mt-4">Categories</div>
                                                <div className="grid grid-cols-2 gap-2 w-full">
                                                    {categories.map((cat) => (
                                                        <Link
                                                            key={cat.name}
                                                            to={cat.path}
                                                            className="flex items-center justify-center p-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-medium hover:border-pizza-yellow/50 transition-all"
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                        >
                                                            {cat.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    }

                                    const href = link.type === 'hash'
                                        ? (location.pathname === '/' ? `#${link.path}` : `/#${link.path}`)
                                        : link.path;
                                    const active = isLinkActive(link);

                                    return (
                                        <Link
                                            key={link.name}
                                            to={href}
                                            className={`flex items-center justify-center p-4 rounded-xl transition-all group ${active
                                                ? 'bg-white/10 border border-white/5'
                                                : 'hover:bg-white/5'
                                                }`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <span className={`font-heading text-xl tracking-wide transition-colors ${active
                                                ? 'text-transparent bg-clip-text bg-gradient-to-r from-pizza-yellow to-pizza-red font-bold'
                                                : 'text-white group-hover:text-pizza-yellow'
                                                }`}>
                                                {link.name}
                                            </span>
                                        </Link>
                                    );
                                })}
                            </nav>

                            {/* Divider with visual flair */}
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                            {/* Cart Action */}
                            <button className="w-full py-4 bg-gradient-to-r from-pizza-red to-red-600 text-white font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-red-900/20 active:scale-[0.98] transition-all">
                                <ShoppingBag size={20} />
                                <span>My Cart</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
