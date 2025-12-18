import { createContext, useContext, useMemo, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getMemePrice } from '../constants';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useLocalStorage('cart', []);

  const addItem = useCallback((meme) => {
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
  }, [setCartItems]);

  const removeItem = useCallback((id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, [setCartItems]);

  const decreaseCount = useCallback((id) => {
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
  }, [setCartItems]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, [setCartItems]);

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => {
      const price = getMemePrice(item.rating);
      return total + (price * item.count);
    }, 0);
  }, [cartItems]);

  const getItemCount = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.count, 0);
  }, [cartItems]);

  const value = useMemo(
    () => ({
      cartItems,
      addItem,
      removeItem,
      decreaseCount,
      clearCart,
      getTotalPrice,
      getItemCount,
    }),
    [cartItems]
  );

  return (
    <CartContext.Provider value={value}>
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
