import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, ExternalLink, Instagram, Facebook, Twitter, MessageCircle } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-12 md:py-20 bg-pizza-black relative overflow-hidden">
            {/* Elegant Background Particles */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-pizza-red/50 to-transparent" />
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-pizza-red/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pizza-yellow/5 rounded-full blur-[100px]" />
            </div>

            <div id="locations" className="absolute top-0 left-0" />

            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
                {/* Compact Centered Header */}
                <div className="text-center mb-16 max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pizza-red/10 border border-pizza-red/20 mb-6"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-pizza-red animate-pulse" />
                        <span className="text-pizza-red font-bold text-[10px] uppercase tracking-[0.2em]">Locate The Cage</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-heading text-white mb-4 uppercase leading-none"
                    >
                        Let's Talk <span className="text-pizza-red italic">Pizza.</span>
                    </motion.h2>
                    <p className="text-gray-500 text-sm font-medium">Ready for the ultimate wood-fired experience in Sangam Vihar?</p>
                </div>

                {/* Highly Compact Premium Layout */}
                <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                    {/* LEFT: Elevated Info Cards */}
                    <div className="lg:col-span-4 space-y-4">
                        {[
                            {
                                icon: MapPin,
                                title: "Headquarters",
                                detail: "Pandey Kothi, Block B, Devli",
                                sub: "Sangam Vihar, New Delhi 110080",
                                color: "text-pizza-red"
                            },
                            {
                                icon: Phone,
                                title: "Direct Line",
                                detail: "+91 84481 61446",
                                sub: "Priority delivery support",
                                color: "text-pizza-yellow"
                            },
                            {
                                icon: Clock,
                                title: "Cage Hours",
                                detail: "11 AM - 11:30 PM",
                                sub: "Serving hot & fresh daily",
                                color: "text-white"
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group bg-[#151515]/80 backdrop-blur-md border border-white/5 p-6 rounded-[2rem] hover:border-pizza-red/30 transition-all duration-500 cursor-default"
                            >
                                <div className="flex items-center gap-5">
                                    <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform duration-500`}>
                                        <item.icon size={22} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h4 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">{item.title}</h4>
                                        <p className="text-white text-base font-bold leading-tight mb-0.5">{item.detail}</p>
                                        <p className="text-gray-600 text-[11px] font-medium">{item.sub}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* Social Links Row */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="flex gap-3 pt-2"
                        >
                            {[Instagram, Facebook, Twitter].map((Social, i) => (
                                <a key={i} href="#" className="flex-1 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-pizza-red transition-all duration-300">
                                    <Social size={18} />
                                </a>
                            ))}
                        </motion.div>
                    </div>

                    {/* RIGHT: Modern Map Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="lg:col-span-8 relative rounded-[2.5rem] overflow-hidden border border-white/10 group shadow-2xl min-h-[400px]"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.186027551184!2d77.2419568!3d28.5040503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce10994eb2d7b%3A0xcb44cdee8e571d73!2sPandey%20Kothi%2C%20B-110%2CSurya%20public%20school%20road%2C%20Mangal%20Bazaar%20Rd%2C%20Block%20B%2C%20Devli%2C%20Sangam%20Vihar%2C%20New+Delhi%2C%20Delhi+110080!5e0!3m2!1sen!2sin!4v1769498050411!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.1) brightness(0.9)' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Da Rambo Pizza Location"
                        />

                        {/* Elegant UI Overlays */}
                        <div className="absolute top-6 left-6">
                            <div className="px-5 py-2.5 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-pizza-red shadow-[0_0_10px_rgba(255,61,0,0.8)]" />
                                <span className="text-white font-bold text-[10px] uppercase tracking-widest">LIVE IN SANGAM VIHAR</span>
                            </div>
                        </div>

                        {/* Compact Navigation Bar */}
                        <div className="absolute bottom-6 left-6 right-6">
                            <motion.a
                                whileHover={{ y: -5 }}
                                href="https://maps.app.goo.gl/wgUByKX8XU2gBF2H8"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full bg-white text-black p-5 rounded-[1.5rem] shadow-2xl transition-all duration-300"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-pizza-black text-white flex items-center justify-center">
                                            <MapPin size={20} />
                                        </div>
                                        <div>
                                            <span className="block font-black uppercase text-xs tracking-wide">Get Directions</span>
                                            <span className="block text-gray-500 text-[9px] uppercase font-bold tracking-widest">Open in Google Maps</span>
                                        </div>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-pizza-red text-white flex items-center justify-center">
                                        <ExternalLink size={18} />
                                    </div>
                                </div>
                            </motion.a>
                        </div>
                    </motion.div>

                </div>

                {/* Final Mini CTA Footer */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mt-8 flex flex-wrap justify-center gap-4"
                >
                    <button className="flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white text-white hover:text-black rounded-2xl border border-white/10 transition-all font-bold uppercase text-[10px] tracking-widest group">
                        <MessageCircle size={18} className="text-pizza-red" />
                        Chat with us
                    </button>
                    <button className="flex items-center gap-3 px-8 py-4 bg-pizza-red text-white rounded-2xl shadow-xl shadow-pizza-red/20 hover:scale-105 transition-all font-bold uppercase text-[10px] tracking-widest">
                        Book Now
                        <ExternalLink size={16} />
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
