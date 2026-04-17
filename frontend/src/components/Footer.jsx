import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black py-12 border-t border-white/10">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                    <div>
                        <div className="text-2xl font-heading text-white tracking-wider mb-6">
                            DA RAMBO <span className="text-pizza-red">PIZZA</span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            The best pizza in town, made with fresh ingredients and lots of love. Spicy. Dark. Premium.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold uppercase mb-6">Quick Links</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-pizza-yellow transition-colors">Menu</a></li>
                            <li><a href="#" className="hover:text-pizza-yellow transition-colors">Locations</a></li>
                            <li><a href="#" className="hover:text-pizza-yellow transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-pizza-yellow transition-colors">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold uppercase mb-6">Legal</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-pizza-yellow transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-pizza-yellow transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold uppercase mb-6">Follow Us</h4>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-pizza-red transition-colors">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-pizza-red transition-colors">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-pizza-red transition-colors">
                                <Instagram size={18} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="text-center text-gray-600 text-sm border-t border-white/5 pt-8">
                    &copy; {new Date().getFullYear()} Da Rambo Pizza. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
