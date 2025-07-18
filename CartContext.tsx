import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Product, CartItem, CartContextType } from './types.ts';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState<{ message: string } | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000); // Hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const addToCart = (product: Product) => {
    if (!product.sold && !cartItems.some(item => item.id === product.id)) {
      setCartItems(prevItems => [...prevItems, { ...product }]);
      setNotification({ message: `${product.name} added to bag!` });
    }
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  const isProductInCart = (productId: string) => {
    return cartItems.some(item => item.id === productId);
  };
  
  const getWhatsAppMessage = () => {
    const header = "Hello Thrift by Musk! I'm interested in purchasing the following items from my cart:\n\n";
    const itemsList = cartItems.map(item => `- ${item.name} (${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(item.price)})`).join('\n');
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    const footer = `\n\nTotal: ${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(total)}`;
    return encodeURIComponent(header + itemsList + footer);
  };

  return (
    <CartContext.Provider value={{ cartItems, isCartOpen, notification, addToCart, removeFromCart, toggleCart, isProductInCart, getWhatsAppMessage }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};