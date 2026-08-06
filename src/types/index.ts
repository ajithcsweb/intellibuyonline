export type StoreName = 'Amazon' | 'Flipkart' | 'Croma' | 'Reliance Digital' | 'Vijay Sales' | 'Tata Cliq';

export interface StorePrice {
  store: StoreName;
  price: number;
  originalPrice: number;
  discount: number; // percentage
  url: string;
  inStock: boolean;
  shipping: string;
  rating?: number;
  couponCode?: string;
  badge?: string;
}

export interface PriceHistoryPoint {
  date: string;
  amazon: number;
  flipkart: number;
  croma: number;
}

export interface ProductReview {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  store: StoreName;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  brand: string;
  category: string;
  subcategory: string;
  mainImage: string;
  galleryImages: string[];
  bestPrice: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  stores: StorePrice[];
  specs: Record<string, string>;
  pros: string[];
  cons: string[];
  priceHistory: PriceHistoryPoint[];
  reviewsList?: ProductReview[];
  isFeatured?: boolean;
  isTrending?: boolean;
  isTodayDeal?: boolean;
  badge?: string;
  createdDate: string;
  seoTitle?: string;
  metaDescription?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  count: number;
  subcategories: string[];
}

export interface Coupon {
  id: string;
  code: string;
  store: StoreName;
  discountText: string;
  minSpend?: string;
  category: string;
  expiresAt: string;
  verified: boolean;
  description: string;
}

export interface Deal {
  id: string;
  title: string;
  store: StoreName;
  discount: string;
  originalPrice: number;
  dealPrice: number;
  category: string;
  link: string;
  image: string;
  badge: string;
  description: string;
  endsInHours: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  summary: string;
  content: string;
  tags: string[];
  relatedProductId?: string;
}

export interface AffiliateClickLog {
  id: string;
  productId: string;
  productTitle: string;
  store: StoreName;
  timestamp: string;
  commissionEarned: number;
  status: 'Converted' | 'Pending' | 'Clicked';
  userRegion: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'price_drop' | 'stock' | 'deal' | 'system';
  productId?: string;
  read: boolean;
}

export interface AdminStats {
  totalProducts: number;
  totalAffiliateClicks: number;
  conversionRate: number; // percentage
  totalRevenue: number;
  activeDealsCount: number;
  activeCouponsCount: number;
  topStore: StoreName;
}

export interface FilterState {
  category: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  store: string;
  minRating: number;
  searchQuery: string;
  sortBy: 'featured' | 'price_low' | 'price_high' | 'discount' | 'rating';
  onlyDeals: boolean;
  onlyInStock: boolean;
}
