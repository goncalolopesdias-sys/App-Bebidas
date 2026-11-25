  import React, { createContext, useCallback, useState } from 'react';

  export interface CartItem {
    id: string;
    nome: string;
    preco: number;
    img: any;
    quantidade: number;
  }

  export interface CartContextType {
    items: CartItem[];
    addItem: (item: Omit<CartItem, 'id' | 'quantidade'>) => void;
    removeItem: (itemId: string) => void;
    updateQuantidade: (itemId: string, quantidade: number) => void;
    clearCart: () => void;
    total: number;
    subtotal: number;
  }

  export const CartContext = createContext<CartContextType | undefined>(undefined);

  export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = useCallback((item: Omit<CartItem, 'id' | 'quantidade'>) => {
      setItems((prev) => {
        const existingItem = prev.find((i) => i.nome === item.nome);
        if (existingItem) {
          return prev.map((i) =>
            i.nome === item.nome ? { ...i, quantidade: i.quantidade + 1 } : i
          );
        }
        return [...prev, { ...item, id: Date.now().toString(), quantidade: 1 }];
      });
    }, []);

    const removeItem = useCallback((itemId: string) => {
      setItems((prev) => prev.filter((i) => i.id !== itemId));
    }, []);

    const updateQuantidade = useCallback((itemId: string, quantidade: number) => {
      if (quantidade <= 0) {
        removeItem(itemId);
        return;
      }
      setItems((prev) =>
        prev.map((i) => (i.id === itemId ? { ...i, quantidade } : i))
      );
    }, [removeItem]);

    const clearCart = useCallback(() => {
      setItems([]);
    }, []);

    const subtotal = items.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    const taxa = 1.5;
    const total = subtotal + taxa;

    return (
      <CartContext.Provider
        value={{
          items,
          addItem,
          removeItem,
          updateQuantidade,
          clearCart,
          total,
          subtotal,
        }}
      >
        {children}
      </CartContext.Provider>
    );
  }

  export function useCart() {
    const context = React.useContext(CartContext);
    if (!context) {
      throw new Error('useCart deve ser usado dentro de CartProvider');
    }
    return context;
  }
