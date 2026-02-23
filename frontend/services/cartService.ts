
import { CartItem, Product } from '../types';

const CART_KEY = 'marketplace_cart';

export const cartService = {
  getCart(): CartItem[] {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveCart(items: CartItem[]): void {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  },

  addItem(product: Product, quantity: number = 1): CartItem[] {
    const cart = this.getCart();
    const existingIndex = cart.findIndex(i => i.product.id === product.id);
    
    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }
    
    this.saveCart(cart);
    return cart;
  },

  removeItem(productId: string): CartItem[] {
    const cart = this.getCart().filter(i => i.product.id !== productId);
    this.saveCart(cart);
    return cart;
  },

  updateQuantity(productId: string, quantity: number): CartItem[] {
    const cart = this.getCart().map(i => {
      if (i.product.id === productId) {
        return { ...i, quantity: Math.max(1, quantity) };
      }
      return i;
    });
    this.saveCart(cart);
    return cart;
  }
};
