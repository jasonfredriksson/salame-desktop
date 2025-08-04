
export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  category: string;
  brand?: string;
  condition: 'Nuevo' | 'Como nuevo' | 'Muy bueno' | 'Bueno' | 'Aceptable';
  size?: string;
  seller: User;
  location: string;
  createdAt: string;
  views: number;
  favorites: number;
  isAvailable: boolean;
  proximityKm?: number; // Distance in kilometers from user's location
  specialOffer?: boolean; // Whether this product is part of a special offer
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  joinedDate: string;
  isVerified: boolean;
  location: string;
  badges?: string[];
  description?: string;
  specialization?: string;
  responseRate?: number;
  salamePay?: {
    balance: number;
    isVerified: boolean;
  };
}

export interface Conversation {
  id: string;
  participants: User[];
  product: Product;
  messages: Message[];
  lastMessage: Message;
  createdAt: string;
  isRead: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'offer' | 'image';
  offer?: {
    id: string;
    amount: number;
    status: 'pending' | 'accepted' | 'rejected';
    expiresAt: string;
  };
  image?: string;
}

export interface Offer {
  id: string;
  amount: number;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  expiresAt: string;
}

export interface OfferWithDetails {
  id: string;
  product: Product;
  amount: number;
  status: 'pending' | 'accepted' | 'rejected';
  date: string;
  otherUser: User;
  message?: string;
  isUserSender: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: string[];
}

export interface Favorite {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
}

export interface SoldProduct {
  id: string;
  productId: string;
  sellerId: string;
  buyerId: string;
  saleDate: string;
  salePrice: number;
  review?: Review;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  reviewDate: string;
}
