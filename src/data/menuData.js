export const menuItems = [
    // PIZZA
    {
        id: 1,
        name: "Margherita Pizza",
        category: "Pizza",
        price: 299,
        rating: 4.8,
        time: "20-25 min",
        desc: "Classic delight with 100% real mozzarella cheese, fresh basil, and signature tomato sauce. A timeless favorite.",
        ingredients: ["Mozzarella Cheese", "Fresh Basil", "Tomato Sauce", "Olive Oil", "Sourdough Base"],
        calories: "250 kcal/slice",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 5,
        name: "Pepperoni Feast",
        category: "Pizza",
        price: 399,
        rating: 4.9,
        time: "25-30 min",
        desc: "American classic! Spicy pepperoni slices loaded on a bed of cheesy goodness. A meaty treat for pizza lovers.",
        ingredients: ["Pepperoni Slices", "Mozzarella Cheese", "Chili Flakes", "Tomato Sauce"],
        calories: "320 kcal/slice",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 9,
        name: "Veggie Supreme",
        category: "Pizza",
        price: 349,
        rating: 4.7,
        time: "20-25 min",
        desc: "A supreme combination of black olives, green capsicum, mushroom, onion, spicy red paprika & juicy sweet corn with flavor-packed pan crust.",
        ingredients: ["Black Olives", "Capsicum", "Mushroom", "Onion", "Sweet Corn", "Paprika"],
        calories: "280 kcal/slice",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80"
    },

    // BURGER
    {
        id: 2,
        name: "Double Patty Burger",
        category: "Burger",
        price: 249,
        rating: 4.9,
        time: "15-20 min",
        desc: "Two juicy flame-grilled patties served with melted cheddar, fresh lettuce, tomatoes, and our secret sauce on a toasted sesame bun.",
        ingredients: ["Double Beef/Chicken Patty", "Cheddar Cheese", "Lettuce", "Tomato", "Secret Sauce", "Sesame Bun"],
        calories: "650 kcal",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 10,
        name: "Crispy Chicken Burger",
        category: "Burger",
        price: 219,
        rating: 4.8,
        time: "15 min",
        desc: "Golden fried chicken breast seasoned with aromatic spices, topped with spicy mayo and crunchy iceberg lettuce.",
        ingredients: ["Fried Chicken Breast", "Spicy Mayo", "Iceberg Lettuce", "Brioche Bun"],
        calories: "550 kcal",
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80"
    },

    // SIDES & SNACKS (From BestSellers)
    {
        id: 3,
        name: "Peri Peri Fries",
        category: "Snacks",
        price: 149,
        rating: 4.6,
        time: "10 min",
        desc: "Crispy crinkle-cut fries tossed in spicy Peri Peri seasoning. Served with a side of cheese dip.",
        ingredients: ["Potatoes", "Peri Peri Spice Mix", "Salt", "Oil"],
        calories: "300 kcal",
        image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        name: "Veg Sandwich",
        category: "Sandwich",
        price: 179,
        rating: 4.5,
        time: "10-15 min",
        desc: "Grilled sandwich loaded with fresh cucumber, tomato, onions, and a layer of mint chutney and cheese.",
        ingredients: ["Bread", "Cucumber", "Tomato", "Onion", "Cheese", "Mint Chutney"],
        calories: "280 kcal",
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80"
    },

    // CHINESE / ITALIAN
    {
        id: 8,
        name: "Pasta Carbonara",
        category: "Italian",
        price: 329,
        rating: 4.7,
        time: "15-20 min",
        desc: "Authentic Italian carbonara made with eggs, hard cheese, cured pork, and black pepper. Creamy and rich.",
        ingredients: ["Spaghetti", "Eggs", "Pancetta", "Parmesan Cheese", "Black Pepper"],
        calories: "580 kcal",
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 11,
        name: "Spicy Noodles",
        category: "Chinese",
        price: 199,
        rating: 4.6,
        time: "10-15 min",
        desc: "Wok-tossed hakka noodles with crunchy vegetables, soy sauce, and a hint of chili garlic paste.",
        ingredients: ["Noodles", "Cabbage", "Carrot", "Capsicum", "Soy Sauce", "Chili Garlic Paste"],
        calories: "400 kcal",
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 12,
        name: "Veg Momos",
        category: "Chinese",
        price: 149,
        rating: 4.5,
        time: "15 min",
        desc: "Delicate steamed dumplings filled with finely chopped vegetables. Served with spicy momo chutney.",
        ingredients: ["Flour Wrapper", "Cabbage", "Onion", "Ginger", "Garlic"],
        calories: "250 kcal/plate",
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80"
    },

    // SHAKES & DESSERTS
    {
        id: 13,
        name: "Strawberry Shake",
        category: "Shakes",
        price: 179,
        rating: 4.8,
        time: "5 min",
        desc: "Creamy milkshake made with fresh strawberries and vanilla ice cream. Topped with whipped cream.",
        ingredients: ["Fresh Strawberries", "Milk", "Ice Cream", "Whipped Cream"],
        calories: "350 kcal",
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 14,
        name: "Oreo Crumble",
        category: "Shakes",
        price: 199,
        rating: 4.9,
        time: "5 min",
        desc: "Thick chocolate shake blended with crunchy Oreo cookies. A favorite for cookie lovers.",
        ingredients: ["Oreo Cookies", "Chocolate Ice Cream", "Milk", "Chocolate Sauce"],
        calories: "420 kcal",
        image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 16,
        name: "Chocolate Cake",
        category: "Dessert",
        price: 199,
        rating: 4.8,
        time: "Ready",
        desc: "Decadent dark chocolate truffle cake. Moist, rich, and covered in smooth ganache.",
        ingredients: ["Dark Chocolate", "Flour", "Cocoa Powder", "Cream"],
        calories: "450 kcal/slice",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80"
    },

    // MOJITO & BEVERAGES
    {
        id: 15,
        name: "Classic Mint Mojito",
        category: "Mojito",
        price: 149,
        rating: 4.7,
        time: "5 min",
        desc: "Refreshing virgin mojito with fresh mint leaves, lime wedges, and sparkling soda.",
        ingredients: ["Mint Leaves", "Lemon", "Soda", "Sugar Syrup", "Ice"],
        calories: "120 kcal",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80"
    },

    // COFFEE
    {
        id: 6,
        name: "Cappuccino",
        category: "Coffee",
        price: 149,
        rating: 4.7,
        time: "5-10 min",
        desc: "Robust espresso topped with equal parts steamed milk and milk foam. Dusted with cocoa powder.",
        ingredients: ["Espresso", "Steamed Milk", "Milk Foam", "Cocoa Powder"],
        calories: "120 kcal",
        image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 7,
        name: "Latte Art Special",
        category: "Coffee",
        price: 169,
        rating: 4.8,
        time: "5-8 min",
        desc: "Smooth and creamy latte featuring beautiful, hand-poured latte art. A visual and tasting treat.",
        ingredients: ["Espresso", "Steamed Milk"],
        calories: "150 kcal",
        image: "https://images.unsplash.com/photo-1555658636-6e4a36218be7?auto=format&fit=crop&w=800&q=80"
    },
];

export const getProductById = (id) => {
    return menuItems.find(item => item.id === parseInt(id));
};
