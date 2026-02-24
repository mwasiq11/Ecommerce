
export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  description: string;
  rating: number;
  orders: number;
  shipping: string;
  category: string;
  brand: string;
  condition: 'Any' | 'Refurbished' | 'Brand new' | 'Old items';
  image: string;
  stock?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories?: string[];
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
}

export interface Message {
  id: string;
  sender: string;
  text: string;
  time: string;
  isMine: boolean;
  avatar?: string;
}

export interface FilterState {
  category: string;
  brands: string[];
  priceRange: [number, number];
  condition: string;
  rating: number | null;
}
