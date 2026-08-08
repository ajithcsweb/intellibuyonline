import React from 'react';
import { Star, Heart, GitCompare, ExternalLink, ArrowRight, TrendingDown, Tag, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onToggleCompare: (product: Product) => void;
  isCompared: boolean;
  onTrackAffiliateClick: (productId: string, store: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetail,
  onToggleWishlist,
  isWishlisted,
  onToggleCompare,
  isCompared,
  onTrackAffiliateClick
}) => {
  const topStore = product.stores[0];
  const savingsAmount = product.originalPrice - product.bestPrice;

  return (
    <div 
      className="material-card flex flex-col justify-between overflow-hidden relative group bg-white border border-[#E8EAED] hover:border-[#BDC1C6] rounded-2xl cursor-pointer"
      onClick={() => onOpenDetail(product)}
    >
      {/* Top Action & Badge Row */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
        <div className="flex items-center gap-1.5 pointer-events-auto">
          {product.discountPercentage > 0 && (
            <span className="badge-discount">
              -{product.discountPercentage}%
            </span>
          )}
          {product.badge && (
            <span className="badge-best-price">
              {product.badge}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleCompare(product);
            }}
            className={`p-1.5 rounded-full text-xs transition-all ${
              isCompared 
                ? 'bg-[#1A73E8] text-white' 
                : 'bg-white/90 text-[#5F6368] hover:text-[#202124] border border-[#E8EAED]'
            }`}
            title={isCompared ? 'Remove from Compare' : 'Add to Compare'}
          >
            <GitCompare size={14} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className={`p-1.5 rounded-full text-xs transition-all ${
              isWishlisted
                ? 'bg-[#D93025] text-white'
                : 'bg-white/90 text-[#5F6368] hover:text-[#D93025] border border-[#E8EAED]'
            }`}
            title={isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
          >
            <Heart size={14} className={isWishlisted ? 'fill-white' : ''} />
          </button>
        </div>
      </div>

      {/* Product Image Area */}
      <div className="p-4 bg-[#F8F9FA] flex items-center justify-center relative overflow-hidden h-44 sm:h-52">
        <img
          src={product.mainImage}
          alt={product.title}
          className="max-h-36 sm:max-h-44 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Brand & Category */}
          <div className="text-[11px] font-semibold text-[#5F6368] uppercase tracking-wider mb-1">
            {product.brand}
          </div>

          {/* Title */}
          <h3 className="font-medium text-sm sm:text-base text-[#202124] line-clamp-2 group-hover:text-[#1A73E8] transition-colors">
            {product.title}
          </h3>

          {/* Star Rating */}
          <div className="flex items-center gap-1.5 text-xs mt-2">
            <div className="flex items-center gap-1 text-[#F9AB00] font-bold text-xs">
              <Star size={13} className="fill-[#F9AB00] text-[#F9AB00]" />
              <span>{product.rating}</span>
            </div>
            <span className="text-[#5F6368] text-xs">({product.reviewCount.toLocaleString('en-IN')})</span>
          </div>
        </div>

        {/* Pricing Hierarchy */}
        <div className="pt-2 border-t border-[#E8EAED] space-y-1.5">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-xl sm:text-2xl font-bold text-[#202124]">
              ₹{product.bestPrice.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.bestPrice && (
              <span className="text-xs sm:text-sm text-[#5F6368] line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {savingsAmount > 0 && (
            <div className="flex items-center justify-between text-xs text-[#188038] font-semibold">
              <span>Save ₹{savingsAmount.toLocaleString('en-IN')}</span>
              <span className="text-[10px] bg-[#E6F4EA] px-2 py-0.5 rounded-full font-bold">
                Best Price
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail(product);
            }}
            className="btn-secondary text-xs font-semibold py-2 justify-center"
          >
            Compare Prices
          </button>

          {topStore && (
            <a
              href={topStore.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                onTrackAffiliateClick(product.id, topStore.store);
              }}
              className="btn-primary text-xs font-semibold py-2 justify-center truncate"
            >
              Buy {topStore.store} <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
