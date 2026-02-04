import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { menuItems } from "../../data/menuData";

export default function FoodCardsSimple() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 relative z-20 mt-[-20px]">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">

        <div>
          <h2 className="text-3xl font-bold font-heading">
            Our Signature Dishes
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Delicious meals delivered fresh to your door 🚀
          </p>
        </div>

        <Link to="/menu" className="group mt-4 sm:mt-0 flex items-center gap-2 text-pizza-yellow border border-pizza-yellow/50 px-6 py-2 rounded-full hover:bg-pizza-yellow hover:text-pizza-black transition-all duration-300 font-medium tracking-wide text-sm">
          View Full Menu
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>

      </div>

      {/* GRID */}
      <div className="flex overflow-x-auto pb-8 gap-4 snap-x snap-mandatory lg:grid lg:grid-cols-4 lg:gap-6 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">

        {menuItems.slice(0, 8).map((item) => (
          <Link
            to={`/product/${item.id}`}
            key={item.id}
            className="min-w-[280px] sm:min-w-[320px] lg:min-w-0 border-none outline-none block snap-center"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="relative rounded-3xl overflow-hidden h-[420px] group"
            >
              {/* Image with gradient overly */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-90" />
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transform md:group-hover:scale-110 transition-transform duration-700"
              />

              {/* Floating Price Tag (Top Right) */}
              <div className="absolute top-4 right-4 z-20 bg-white/20 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                ₹{item.price}
              </div>

              {/* Minimalist Info (Bottom) */}
              <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                <h3 className="text-2xl font-heading text-white leading-tight mb-2 drop-shadow-lg">
                  {item.name}
                </h3>
                <p className="text-gray-300 text-sm line-clamp-2 mb-4 opacity-90 font-light">
                  {item.desc}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-pizza-yellow text-xs font-bold tracking-widest uppercase">
                    Signature Dish
                  </span>
                  <button className="w-12 h-12 bg-pizza-red rounded-full flex items-center justify-center text-white shadow-lg shadow-pizza-red/40 hover:scale-110 active:scale-95 transition-all">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}

      </div>

    </div>
  );
}
