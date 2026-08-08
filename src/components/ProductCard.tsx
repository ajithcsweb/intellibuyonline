import React from 'react';
import { Star, Heart, GitCompare, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
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

  return (
    <div className="material-card bg-white rounded-xl border border-[#E5E7EB] hover:border-[#E52E2E] transition-all duration-300 flex flex-col justify-between overflow-hidden group relative shadow-xs">
      
      {/* Top Image Container */}
      <div className="relative h-44 sm:h-48 bg-[#F8F9FA] p-4 flex items-center justify-center border-b border-[#E5E7EB] overflow-hidden">
        
        {/* eMarket Style CIRCULAR RED DISCOUNT BADGE (Top Right) */}
        {product.discountPercentage > 0 && (
          <div className="absolute top-2.5 right-2.5 badge-discount-circle z-10">
            -{product.discountPercentage}%
          </div>
        )}

        {/* Today's Flash Deal Badge (Top Left) */}
        {product.isTodayDeal && (
          <span className="absolute top-2.5 left-2.5 bg-[#E52E2E] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded z-10 shadow-xs">
            HOT DEAL
          </span>
        )}

        {/* Product Image */}
        <img
          src={product.mainImage}
          alt={product.title}
          onClick={() => onOpenDetail(product)}
          className="max-h-36 sm:max-h-40 w-auto object-contain cursor-pointer group-hover:scale-105 transition-transform duration-300"
        />

        {/* Quick Action Overlay Buttons (Wishlist & Compare) */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onToggleWishlist(product.id)}
            className={`p-2 rounded-full border shadow-md transition-all ${
              isWishlisted
                ? 'bg-[#E52E2E] text-white border-[#E52E2E]'
                : 'bg-white text-gray-600 border-[#E5E7EB] hover:bg-[#FEF2F2] hover:text-[#E52E2E]'
            }`}
            title="Add to Wishlist"
          >
            <Heart size={14} className={isWishlisted ? 'fill-white' : ''} />
          </button>

          <button
            onClick={() => onToggleCompare(product)}
            className={`p-2 rounded-full border shadow-md transition-all ${
              isCompared
                ? 'bg-[#1E2530] text-white border-[#1E2530]'
                : 'bg-white text-gray-600 border-[#E5E7EB] hover:bg-[#F4F5F7] hover:text-[#1E2530]'
            }`}
            title="Add to Compare"
          >
            <GitCompare size={14} />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">
            {product.brand}
          </span>
          <h3
            onClick={() => onOpenDetail(product)}
            className="text-xs sm:text-sm font-bold text-[#1E2530] hover:text-[#E52E2E] cursor-pointer line-clamp-2 leading-snug transition-colors"
          >
            {product.title}
          </h3>
        </div>

        {/* Rating Stars & Review Count */}
        <div className="flex items-center gap-1.5 text-xs">
          <div className="flex items-center gap-0.5 text-[#F59E0B]">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.floor(product.rating) ? 'fill-[#F59E0B] text-[#F59E0B]' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-[11px] font-bold text-[#1E2530]">{product.rating}</span>
          <span className="text-[10px] text-gray-400">({product.reviewCount})</span>
        </div>

        {/* Price & Merchant Info */}
        <div className="pt-2 border-t border-[#E5E7EB] space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-black text-[#E52E2E]">
              ₹{product.bestPrice.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.bestPrice && (
              <span className="text-xs text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-gray-500 font-semibold">Available on:</span>
            <span className="font-extrabold text-[#1E2530] bg-[#F4F5F7] px-2 py-0.5 rounded border border-[#E5E7EB]">
              {topStore ? topStore.store : 'Top Retailers'}
            </span>
          </div>

          {/* Primary Action Button */}
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            <button
              onClick={() => onOpenDetail(product)}
              className="btn-secondary text-[11px] font-bold py-2 justify-center rounded"
            >
              Compare
            </button>

            {topStore ? (
              <a
                href={topStore.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onTrackAffiliateClick(product.id, topStore.store)}
                className="btn-primary text-[11px] font-bold py-2 justify-center rounded"
              >
                Buy Deal <ExternalLink size={11} />
              </a>
            ) : (
              <button
                onClick={() => onOpenDetail(product)}
                className="btn-primary text-[11px] font-bold py-2 justify-center rounded"
              >
                View Deal
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
