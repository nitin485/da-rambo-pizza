import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedCart = localStorage.getItem('pizzaCart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error("Cart load error:", error);
            return [];
        }
    });

    const [tableId, setTableId] = useState('');
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    // Persist cart
    useEffect(() => {
        localStorage.setItem('pizzaCart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Detect Table ID from URL
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const table = params.get('table');
        if (table) {
            setTableId(table);
            localStorage.setItem('pizzaTable', table);
        } else {
            // Try to recover from local storage
            const savedTable = localStorage.getItem('pizzaTable');
            if (savedTable) setTableId(savedTable);
        }
    }, []);

    const addToCart = (product, quantity = 1, size = 'Regular') => {
        setCartItems(prev => {
            const existingItem = prev.find(item => item.id === product.id && item.selectedSize === size);
            if (existingItem) {
                return prev.map(item =>
                    (item.id === product.id && item.selectedSize === size)
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity, selectedSize: size }];
        });
    };

    const removeFromCart = (id, size) => {
        setCartItems(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)));
    };

    const updateQuantity = (id, size, delta) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id && item.selectedSize === size) {
                const newQuantity = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('pizzaCart');
    };

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const openCheckout = () => setIsCheckoutOpen(true);
    const closeCheckout = () => setIsCheckoutOpen(false);

    return (
        <CartContext.Provider value={{
            cartItems,
            tableId,
            setTableId,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartCount,
            cartTotal,
            isCheckoutOpen,
            openCheckout,
            closeCheckout
        }}>
            {children}
        </CartContext.Provider>
    );
};
