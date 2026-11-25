import { createContext, useContext, useState } from 'react';

const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: any }) {
  const [cart, setCart] = useState<any[]>([]);

  function addToCart(product: any, qty: number) {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? {...i, qty: i.qty + qty} : i);
      return [...prev, {...product, qty}];
    });
  }

  function removeFromCart(id: number) {
    setCart(prev => prev.filter(i => i.id !== id));
  }

  function changeQty(id: number, qty: number) {
    if (qty <= 0) { removeFromCart(id); return; }
    setCart(prev => prev.map(i => i.id === id ? {...i, qty} : i));
  }

  function clearCart() {
    setCart([]);
  }

  const total = cart.reduce((a, i) => a + i.price * i.qty, 0);
  const totalItems = cart.reduce((a, i) => a + i.qty, 0);

  return (
    <CartContext.Provider value={{cart, addToCart, removeFromCart, changeQty, clearCart, total, totalItems}}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}