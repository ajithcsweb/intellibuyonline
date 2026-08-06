import React from 'react';
import { Star, Heart, GitCompare, ExternalLink, ArrowRight, TrendingDown, Tag } from 'lucide-react';
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

  return (
    <div 
      className="glass-card flex flex-col justify-between overflow-hidden relative group border border-white/10 hover:border-indigo-500/50 bg-slate-900/90"
      onClick={() => onOpenDetail(product)}
    >
      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
        <div className="flex items-center gap-1.5">
          {product.badge && (
            <span className="badge-tag badge-deal shadow-md">
              {product.badge}
            </span>
          )}
          {product.discountPercentage >= 15 && (
            <span className="badge-tag badge-emerald shadow-md flex items-center gap-1">
              <TrendingDown size={11} /> {product.discountPercentage}% OFF
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleCompare(product);
            }}
            className={`p-2 rounded-lg text-xs transition-all backdrop-blur-md ${
              isCompared 
                ? 'bg-indigo-600 text-white border border-indigo-400' 
                : 'bg-slate-950/70 text-gray-300 hover:text-indigo-400 border border-white/10'
            }`}
            title={isCompared ? 'Remove from Compare' : 'Add to Compare'}
          >
            <GitCompare size={15} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className={`p-2 rounded-lg text-xs transition-all backdrop-blur-md ${
              isWishlisted
                ? 'bg-rose-600 text-white border border-rose-400'
                : 'bg-slate-950/70 text-gray-300 hover:text-rose-400 border border-white/10'
            }`}
            title={isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
          >
            <Heart size={15} className={isWishlisted ? 'fill-white' : ''} />
          </button>
        </div>
      </div>

      {/* Product Image Container */}
      <div className="p-3 sm:p-6 bg-slate-950/40 flex items-center justify-center relative overflow-hidden group-hover:bg-slate-950/60 transition-colors h-40 sm:h-56">
        <img
          src={product.mainImage}
          alt={product.title}
          className="max-h-32 sm:max-h-44 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute bottom-1 sm:bottom-2 left-2 sm:left-3 text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-slate-900/80 px-1.5 sm:px-2 py-0.5 rounded border border-white/5 truncate max-w-[80%]">
          {product.brand} • {product.subcategory}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
        <div>
          {/* Rating & Reviews */}
          <div className="flex items-center gap-1.5 text-xs mb-1">
            <div className="flex items-center gap-1 text-amber-400 font-bold bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20 text-[10px] sm:text-xs">
              <Star size={11} className="fill-amber-400" />
              <span>{product.rating}</span>
            </div>
            <span className="text-gray-400 text-[10px] sm:text-[11px] truncate">({product.reviewCount.toLocaleString('en-IN')})</span>
          </div>

          {/* Product Title */}
          <h3 className="font-bold text-xs sm:text-sm text-white line-clamp-2 hover:text-indigo-300 transition-colors cursor-pointer">
            {product.title}
          </h3>
        </div>

        {/* Store Comparison Price Chips */}
        <div className="space-y-1.5 sm:space-y-2 pt-2 border-t border-white/5">
          <div className="flex items-baseline justify-between flex-wrap gap-1">
            <span className="text-[10px] sm:text-xs text-gray-400 font-medium">Best Price:</span>
            <div className="flex items-baseline gap-1">
              <span className="text-base sm:text-lg font-extrabold text-emerald-400 font-heading">
                ₹{product.bestPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] sm:text-xs text-gray-500 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Available Stores Badge List */}
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-gray-400 bg-slate-950/60 p-1.5 sm:p-2 rounded-lg border border-white/5">
            <span className="font-medium truncate">{product.stores.length} Stores:</span>
            <div className="flex items-center gap-1">
              {product.stores.slice(0, 2).map((st, i) => (
                <span 
                  key={i} 
                  className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-extrabold bg-white/10 text-gray-200"
                >
                  {st.store}
                </span>
              ))}
              {product.stores.length > 2 && (
                <span className="text-[9px] text-indigo-400 font-bold">+{product.stores.length - 2}</span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 pt-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail(product);
            }}
            className="w-full py-1.5 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-200 text-[11px] sm:text-xs font-bold transition-all border border-white/10 flex items-center justify-center gap-1"
          >
            Compare
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
              className="w-full py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-[11px] sm:text-xs font-extrabold shadow-md shadow-emerald-900/30 transition-all flex items-center justify-center gap-1 truncate"
            >
              Buy {topStore.store} <ExternalLink size={11} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
