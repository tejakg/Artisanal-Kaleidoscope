/**
 * Admin Panel Type Definitions
 * These types support future admin functionality
 */

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  createdAt: string;
  lastLogin?: string;
}

export interface ProductFormData {
  name: string;
  category: string;
  description: string;
  price?: number;
  priceRange?: {
    min: number;
    max: number;
  };
  images: File[];
  materials: string[];
  craftsmanship: string;
  customizable: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  tags?: string[];
}

export interface PortfolioFormData {
  title: string;
  description?: string;
  image: File;
  category: string;
  tags?: string[];
  order?: number;
}

export interface TutorialFormData {
  title: string;
  description: string;
  youtubeUrl: string;
  playlist?: string;
  tags?: string[];
  order?: number;
}

export interface OrderInquiryStatus {
  id: string;
  status: 'new' | 'contacted' | 'in-progress' | 'completed' | 'cancelled';
  notes?: string;
  updatedAt: string;
  updatedBy: string;
}

export interface AdminStats {
  totalProducts: number;
  totalOrders: number;
  pendingOrders: number;
  totalPortfolioItems: number;
  totalTutorials: number;
}
