import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useLocalStorage('cart', []);

  const addItem = (meme) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === meme.id);
      
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === meme.id
            ? { ...item, count: item.count + 1 }
            : item
        );
      }
      
      return [...prevItems, { ...meme, count: 1 }];
    });
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const decreaseCount = (id) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((item) => item.id === id);
      
      if (item && item.count === 1) {
        return prevItems.filter((item) => item.id !== id);
      }
      
      return prevItems.map((item) =>
        item.id === id
          ? { ...item, count: item.count - 1 }
          : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.rating * 25;
      return total + (price * item.count);
    }, 0);
  };

  const getItemCount = () => {
    return cartItems.reduce((total, item) => total + item.count, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,
        decreaseCount,
        clearCart,
        getTotalPrice,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart musí být použit uvnitř CartProvider');
  }
  return context;
}
