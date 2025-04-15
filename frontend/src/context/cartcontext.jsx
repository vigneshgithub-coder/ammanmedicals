import { createContext, useContext, useState } from 'react';

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
    setCartItems(cartItems.filter((item) => item._id !== productId));
  };

 const placeorder=(productId)=>{
  setCartItems(cartItems.filter((item) => item_id !==productId ));
 };

 const updateCartItemQuantity = (id, newQty) => {
  setCartItems((prev) =>
    prev.map((item) =>
      item._id === id ? { ...item, quantity: newQty } : item
    )
  );
};


  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart ,placeorder, updateCartItemQuantity,}}>
      {children}
    </CartContext.Provider>
  );
};
