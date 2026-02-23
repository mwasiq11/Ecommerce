
import { Product, Category, Order, Message } from './types';

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Automobiles', icon: '🚗' },
  { id: '2', name: 'Clothes and wear', icon: '👕' },
  { id: '3', name: 'Home interiors', icon: '🛋️' },
  { id: '4', name: 'Computer and tech', icon: '💻' },
  { id: '5', name: 'Tools, equipments', icon: '🛠️' },
  { id: '6', name: 'Sports and outdoor', icon: '🏀' },
  { id: '7', name: 'Animal and pets', icon: '🐕' },
  { id: '8', name: 'Machinery tools', icon: '⚙️' },
  { id: '9', name: 'More category', icon: '➕' }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: 'Canon Camera EOS 2000, Black 10x zoom',
    price: 998.00,
    originalPrice: 1128.00,
    description: 'Professional grade DSLR camera for high-quality photography and 4K video recording.',
    rating: 4.5,
    orders: 154,
    shipping: 'Free Shipping',
    category: 'Computer and tech',
    brand: 'Canon',
    condition: 'Brand new',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&h=500&q=80',
    stock: 12
  },
  {
    id: 'p2',
    title: 'GoPro HERO6 4K Action Camera - Black',
    price: 998.00,
    description: 'Rugged and waterproof action camera for extreme sports and outdoor adventures.',
    rating: 4.8,
    orders: 89,
    shipping: 'Free Shipping',
    category: 'Computer and tech',
    brand: 'GoPro',
    condition: 'Brand new',
    image: 'https://images.unsplash.com/photo-1526170315870-ef68971ef02f?auto=format&fit=crop&w=500&h=500&q=80',
    stock: 5
  },
  {
    id: 'p3',
    title: 'Samsung Galaxy Watch 4 Classic',
    price: 240.00,
    originalPrice: 299.00,
    description: 'Advanced smartwatch with fitness tracking and seamless smartphone integration.',
    rating: 4.2,
    orders: 342,
    shipping: 'Paid Shipping',
    category: 'Electronics',
    brand: 'Samsung',
    condition: 'Refurbished',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&h=500&q=80',
    stock: 20
  },
  {
    id: 'p4',
    title: 'Modern Leather Sofa - Gray Luxury',
    price: 1200.00,
    description: 'Stylish and comfortable genuine leather sofa for your modern home interior.',
    rating: 4.9,
    orders: 12,
    shipping: 'Free Shipping',
    category: 'Home interiors',
    brand: 'Generic',
    condition: 'Brand new',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=500&h=500&q=80',
    stock: 2
  },
  {
    id: 'p5',
    title: 'Apple MacBook Pro 14 M2 Chip',
    price: 1999.00,
    description: 'Powerful laptop for professionals with the latest M2 silicon architecture.',
    rating: 5.0,
    orders: 54,
    shipping: 'Free Shipping',
    category: 'Computer and tech',
    brand: 'Apple',
    condition: 'Brand new',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&h=500&q=80',
    stock: 8
  },
  {
    id: 'p6',
    title: 'Professional Tool Set 150pcs Industrial',
    price: 150.00,
    description: 'Complete chrome-vanadium tool kit for all your machinery and home repair needs.',
    rating: 4.6,
    orders: 210,
    shipping: 'Free Shipping',
    category: 'Tools, equipments',
    brand: 'DeWalt',
    condition: 'Brand new',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&h=500&q=80',
    stock: 45
  },
  {
    id: 'p7',
    title: 'Smart Home Speaker Echo Dot',
    price: 49.99,
    description: 'Voice-controlled smart speaker with Alexa assistant integration.',
    rating: 4.4,
    orders: 512,
    shipping: 'Free Shipping',
    category: 'Computer and tech',
    brand: 'Amazon',
    condition: 'Brand new',
    image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=500&h=500&q=80',
    stock: 100
  },
  {
    id: 'p8',
    title: 'Blue Cotton Casual Shirt',
    price: 25.00,
    description: 'Comfortable 100% cotton shirt for daily wear.',
    rating: 4.1,
    orders: 890,
    shipping: 'Paid Shipping',
    category: 'Clothes and wear',
    brand: 'Uniqlo',
    condition: 'Brand new',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&h=500&q=80',
    stock: 50
  },
  {
    id: 'p9',
    title: 'Wireless Gaming Headphones',
    price: 129.00,
    description: 'High-fidelity audio with ultra-low latency wireless connection.',
    rating: 4.7,
    orders: 123,
    shipping: 'Free Shipping',
    category: 'Computer and tech',
    brand: 'Sony',
    condition: 'Brand new',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&h=500&q=80',
    stock: 30
  },
  {
    id: 'p10',
    title: 'Designer Minimalist Watch',
    price: 150.00,
    description: 'Classic analog watch with a clean dial and leather strap.',
    rating: 4.3,
    orders: 45,
    shipping: 'Free Shipping',
    category: 'Clothes and wear',
    brand: 'Fossil',
    condition: 'Brand new',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=500&h=500&q=80',
    stock: 15
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-1234',
    date: '12 March 2024',
    items: [{ product: MOCK_PRODUCTS[0], quantity: 1 }],
    total: 998.00,
    status: 'Delivered'
  },
  {
    id: 'ord-5678',
    date: '18 March 2024',
    items: [{ product: MOCK_PRODUCTS[2], quantity: 2 }],
    total: 480.00,
    status: 'Shipped'
  }
];

export const MOCK_MESSAGES: Message[] = [
  { id: 'm1', sender: 'Support', text: 'Hello! How can we help you today?', time: '10:30 AM', isMine: false, avatar: 'https://i.pravatar.cc/150?u=support' },
  { id: 'm2', sender: 'You', text: 'I have a question about my last order.', time: '10:31 AM', isMine: true },
  { id: 'm3', sender: 'Support', text: 'Sure, please provide your order ID.', time: '10:32 AM', isMine: false, avatar: 'https://i.pravatar.cc/150?u=support' }
];

export const REGIONS = [
  { name: 'Arabic Emirates', site: 'shopname.ae', flag: '🇦🇪' },
  { name: 'Australia', site: 'shopname.au', flag: '🇦🇺' },
  { name: 'United States', site: 'shopname.us', flag: '🇺🇸' },
  { name: 'Russia', site: 'shopname.ru', flag: '🇷🇺' },
  { name: 'Italy', site: 'shopname.it', flag: '🇮🇹' },
  { name: 'Denmark', site: 'shopname.dk', flag: '🇩🇰' },
  { name: 'France', site: 'shopname.fr', flag: '🇫🇷' },
  { name: 'China', site: 'shopname.cn', flag: '🇨🇳' },
  { name: 'Great Britain', site: 'shopname.co.uk', flag: '🇬🇧' }
];
