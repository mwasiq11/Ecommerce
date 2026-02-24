
import { useState, useEffect, useCallback } from 'react';
import { CartItem, Product } from '../types';
import { cartService } from '../services/cartService';

export const useCartController = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        setCartItems(cartService.getCart());
    }, []);

    const addToCart = useCallback((product: Product) => {
        const updated = cartService.addItem(product);
        setCartItems(updated);
    }, []);

    const removeFromCart = useCallback((productId: string) => {
        const updated = cartService.removeItem(productId);
        setCartItems(updated);
    }, []);

    const updateQuantity = useCallback((productId: string, quantity: number) => {
        const updated = cartService.updateQuantity(productId, quantity);
        setCartItems(updated);
    }, []);

    const clearCart = useCallback(() => {
        cartService.saveCart([]);
        setCartItems([]);
    }, []);

    const cartTotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return {
        cartItems,
        cartTotal,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
    };
};
