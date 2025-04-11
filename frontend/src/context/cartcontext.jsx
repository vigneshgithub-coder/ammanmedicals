// context/cartcontext.js

import { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const exists = cartItems.find((item) => item._id === product._id);
    if (exists) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(
      cartItems
        .map((item) =>
          item._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ✅ New: Clear Cart
  const clearCart = () => setCartItems([]);

  const totalItems = useMemo(() =>
    cartItems.reduce((acc, item) => acc + item.quantity, 0), [cartItems]);

  const totalPrice = useMemo(() =>
    cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0), [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart, // ✅ included in context
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
