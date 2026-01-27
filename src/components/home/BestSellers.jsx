import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Cheese Pizza",
    price: 299,
    desc: "Extra cheese, oven baked",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZSWFmrKPzyNQhUkfLNItXS8cx063fectkzw&s"
  },
  {
    id: 2,
    name: "Loaded Burger",
    price: 249,
    desc: "Double patty burger",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200"
  },
  {
    id: 3,
    name: "Peri Peri Fries",
    price: 149,
    desc: "Crispy spicy fries",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200"
  },
  {
    id: 4,
    name: "Chocolate Cake",
    price: 199,
    desc: "Rich & moist cake",
    image:
      "https://images.unsplash.com/photo-1667908775750-395e9b043396?q=80&w=427"
  },
  {
    id: 5,
    name: "Veg Sandwich",
    price: 179,
    desc: "Grilled veggies & cheese",
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=1200"
  },
  {
    id: 6,
    name: "Chicken Biryani",
    price: 259,
    desc: "Served with raita",
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1200"
  },
  {
    id: 7,
    name: "Butter Chicken",
    price: 299,
    desc: "Creamy tomato gravy",
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1200"
  },
  {
    id: 8,
    name: "Pasta Alfredo",
    price: 229,
    desc: "Creamy white sauce pasta",
    image:
      "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=1200"
  },
  {
    id: 9,
    name: "Grilled Chicken",
    price: 279,
    desc: "Smoky & juicy",
    image:
      "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=1200"
  },
  {
    id: 10,
    name: "Veg Momos",
    price: 139,
    desc: "Steamed dumplings",
    image:
      "https://images.unsplash.com/photo-1628294896516-344152572ee8?q=80&w=1200"
  },
  {
    id: 11,
    name: "Iced Coffee",
    price: 129,
    desc: "Cold brew coffee",
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1200"
  },
  {
    id: 12,
    name: "Strawberry Shake",
    price: 149,
    desc: "Fresh & creamy",
    image:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1200"
  }
];

export default function FoodCardsSimple() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">

        <div>
          <h2 className="text-3xl font-bold">
            Popular Items
          </h2>

          <p className="text-gray-500">
            Delicious meals delivered fresh to your door 🚀
          </p>
        </div>

        <Link to="/menu" className="mt-4 sm:mt-0 border border-black px-6 py-2 rounded-full hover:bg-black hover:text-white transition">
          View Full Menu →
        </Link>

      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {products.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition group"
          >

            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-56 object-cover group-hover:scale-110 transition duration-700"
            />

            {/* PRICE BADGE */}
            <span className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
              ₹{item.price}
            </span>

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-end">

              <div className="p-4 w-full text-white">

                <h3 className="text-lg font-semibold">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-200">
                  {item.desc}
                </p>

                <div className="flex justify-between items-center mt-3">

                  <span className="font-bold text-yellow-400">
                    ₹{item.price}
                  </span>

                  <button className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg text-sm">
                    Add
                  </button>

                </div>

              </div>

            </div>

          </motion.div>
        ))}

      </div>

    </div>
  );
}
