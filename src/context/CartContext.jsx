import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('jandyCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('jandyCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const checkoutWithWhatsApp = () => {
    const phoneNumber = '584141234567'; // Change to actual Jandy Tours number
    const messageHeader = '¡Hola Jandy Tours! 👋 Deseo realizar la reserva de los siguientes paquetes:\n\n';
    const itemsList = cartItems
      .map((item) => `- *${item.title}* (${item.quantity}x) - $${item.price * item.quantity}`)
      .join('\n');
    const totalLine = `\n\n*Total a pagar: $${cartTotal}*`;
    const footer = '\n\nPor favor, indíquenme los pasos a seguir para completar mi pago. ¡Gracias!';

    const fullMessage = encodeURIComponent(messageHeader + itemsList + totalLine + footer);
    window.open(`https://wa.me/${phoneNumber}?text=${fullMessage}`, '_blank');
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        checkoutWithWhatsApp,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
