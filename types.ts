export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  category: string;
  image: string;
  isBestSeller?: boolean;
  stock: number;
  specifications: Record<string, string>;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
}

export enum Page {
  HOME = 'HOME',
  PRODUCT_DETAILS = 'PRODUCT_DETAILS',
  CART = 'CART',
  CHECKOUT = 'CHECKOUT',
  SEARCH = 'SEARCH'
}

export interface PricePoint {
  date: string;
  price: number;
}
