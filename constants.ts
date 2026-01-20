import { Product } from './types';

export const CATEGORIES = [
  { id: 'electronics', name: 'Electronics', icon: 'Cpu' },
  { id: 'fashion', name: 'Fashion', icon: 'Shirt' },
  { id: 'home', name: 'Home & Kitchen', icon: 'Home' },
  { id: 'beauty', name: 'Beauty', icon: 'Sparkles' },
  { id: 'toys', name: 'Toys', icon: 'Gamepad2' },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    description: 'The best noise cancelling headphones on the market with 30 hours battery life, crystal clear hands-free calling, and Alexa built-in.',
    price: 348.00,
    originalPrice: 399.99,
    rating: 4.8,
    reviewCount: 12453,
    category: 'electronics',
    image: 'https://picsum.photos/400/400?random=1',
    isBestSeller: true,
    stock: 15,
    specifications: {
      "Brand": "Sony",
      "Color": "Black",
      "Connectivity": "Bluetooth 5.2",
      "Battery Life": "30 Hours"
    }
  },
  {
    id: '2',
    title: 'Samsung Galaxy S24 Ultra AI Smartphone',
    description: 'Unleash new levels of creativity, productivity and possibility with the Galaxy S24 Ultra. Powered by Galaxy AI.',
    price: 1199.99,
    originalPrice: 1299.99,
    rating: 4.9,
    reviewCount: 3201,
    category: 'electronics',
    image: 'https://picsum.photos/400/400?random=2',
    stock: 50,
    specifications: {
      "Brand": "Samsung",
      "Storage": "512GB",
      "Camera": "200MP",
      "Screen": "6.8 inch QHD+"
    }
  },
  {
    id: '3',
    title: 'Men\'s Slim Fit Premium Cotton Suit',
    description: 'Sharp, stylish, and sophisticated. This premium cotton suit is perfect for weddings, business meetings, or formal events.',
    price: 159.50,
    originalPrice: 299.00,
    rating: 4.5,
    reviewCount: 890,
    category: 'fashion',
    image: 'https://picsum.photos/400/400?random=3',
    stock: 100,
    specifications: {
      "Material": "100% Cotton",
      "Fit": "Slim",
      "Care": "Dry Clean Only",
      "Color": "Navy Blue"
    }
  },
  {
    id: '4',
    title: 'Dyson V15 Detect Cordless Vacuum',
    description: 'Laser reveals microscopic dust. Intelligently adapts suction and run time. Scientific proof of a deep clean.',
    price: 649.99,
    originalPrice: 749.99,
    rating: 4.7,
    reviewCount: 5621,
    category: 'home',
    image: 'https://picsum.photos/400/400?random=4',
    isBestSeller: true,
    stock: 8,
    specifications: {
      "Brand": "Dyson",
      "Type": "Stick",
      "Runtime": "60 Minutes",
      "Weight": "6.8 lbs"
    }
  },
  {
    id: '5',
    title: 'Luxury Gel Memory Foam Mattress - Queen',
    description: 'Cooling gel memory foam contours to your body for the ultimate sleep experience. Medium-firm feel.',
    price: 499.00,
    originalPrice: 899.00,
    rating: 4.6,
    reviewCount: 2100,
    category: 'home',
    image: 'https://picsum.photos/400/400?random=5',
    stock: 20,
    specifications: {
      "Size": "Queen",
      "Thickness": "12 Inch",
      "Material": "Gel Memory Foam",
      "Firmness": "Medium"
    }
  },
  {
    id: '6',
    title: 'Advanced Night Repair Serum',
    description: 'Fight key signs of aging. The #1 serum in the US. Reveals a smoother, more radiant, younger look.',
    price: 79.00,
    originalPrice: 105.00,
    rating: 4.8,
    reviewCount: 9800,
    category: 'beauty',
    image: 'https://picsum.photos/400/400?random=6',
    isBestSeller: true,
    stock: 200,
    specifications: {
      "Brand": "Estee Lauder",
      "Volume": "1.7 oz",
      "Skin Type": "All",
      "Benefits": "Anti-aging"
    }
  }
];

export const MOCK_PRICE_HISTORY: Record<string, { date: string; price: number }[]> = {
  '1': [
    { date: '2023-10', price: 399.99 },
    { date: '2023-11', price: 348.00 },
    { date: '2023-12', price: 329.00 },
    { date: '2024-01', price: 399.99 },
    { date: '2024-02', price: 378.00 },
    { date: '2024-03', price: 348.00 },
  ],
  'default': [
    { date: '2023-10', price: 100 },
    { date: '2023-11', price: 90 },
    { date: '2023-12', price: 85 },
    { date: '2024-01', price: 100 },
    { date: '2024-02', price: 95 },
    { date: '2024-03', price: 92 },
  ]
};