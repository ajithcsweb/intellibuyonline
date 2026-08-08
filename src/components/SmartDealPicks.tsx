import React, { useState } from 'react';
import { Flame, DollarSign, TrendingDown, Star, Award, ExternalLink, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface SmartDealPicksProps {
  products: Product[];
  onOpenProduct: (product: Product) => void;
  onTrackAffiliateClick: (productId: string, store: string) => void;
}

const PICK_TYPES = [
  { id: 'best-value', label: 'Best Value', icon: '🔥', description: 'Maximum features for your money' },
  { id: 'biggest-discount', label: 'Biggest Discount', icon: '💰', description: 'Highest percentage savings' },
  { id: 'price-drop', label: 'Price Drop', icon: '📉', description: 'Recent price decrease' },
  { id: 'best-rated', label: 'Best Rated', icon: '⭐', description: 'Highest buyer satisfaction' },
  { id: 'best-overall', label: 'Best Overall', icon: '🏆', description: 'Top recommended product' },
] as const;

export const SmartDealPicks: React.FC<SmartDealPicksProps> = ({
  products,
  onOpenProduct,
  onTrackAffiliateClick
}) => {
  const [activePick, setActivePick] = useState<string>('best-value');

  // Filter products based on selected intelligence pick
  const filteredProducts = React.useMemo(() => {
    const list = [...products];
    if (activePick === 'biggest-discount') {
      return list.sort((a, b) => b.discountPercentage - a.discountPercentage).slice(0, 4);
    }
    if (activePick === 'best-rated') {
      return list.sort((a, b) => b.rating - a.rating).slice(0, 4);
    }
    if (activePick === 'price-drop') {
      return list.filter(p => p.discountPercentage >= 15).slice(0, 4);
    }
    if (activePick === 'best-overall') {
      return list.filter(p => p.isFeatured || p.badge).slice(0, 4);
    }
    // Default best-value
    return list.slice(0, 4);
  }, [products, activePick]);

  return (
    <section className="mb-14">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#202124] tracking-tight">
            Smart Deal Picks
          </h2>
          <p className="text-sm text-[#5F6368] mt-1">
            Curated intelligence highlights based on value, rating, and verified price drops.
          </p>
        </div>

        {/* Intelligence Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {PICK_TYPES.map(pick => (
            <button
              key={pick.id}
              onClick={() => setActivePick(pick.id)}
              className={`px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                activePick === pick.id
                  ? 'bg-[#1A73E8] text-white border-[#1A73E8] shadow-xs font-bold'
                  : 'bg-white text-[#5F6368] border-[#E8EAED] hover:bg-[#F8F9FA]'
              }`}
            >
              <span>{pick.icon}</span>
              <span>{pick.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredProducts.map(product => {
          const topStore = product.stores[0];

          return (
            <div
              key={product.id}
              onClick={() => onOpenProduct(product)}
              className="material-card p-4 rounded-2xl bg-white border border-[#E8EAED] hover:border-[#BDC1C6] cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-[#1A73E8] uppercase tracking-wider">
                    {product.brand}
                  </span>
                  <span className="badge-discount">
                    -{product.discountPercentage}%
                  </span>
                </div>

                <div className="h-36 bg-[#F8F9FA] rounded-xl p-3 flex items-center justify-center mb-3">
                  <img
                    src={product.mainImage}
                    alt={product.title}
                    className="max-h-32 object-contain hover:scale-105 transition-transform"
                  />
                </div>

                <h3 className="font-semibold text-sm text-[#202124] line-clamp-2">
                  {product.title}
                </h3>

                <div className="flex items-center gap-1 text-xs text-[#F9AB00] font-bold mt-1">
                  <Star size={12} className="fill-[#F9AB00]" />
                  <span>{product.rating}</span>
                  <span className="text-[#5F6368] font-normal">({product.reviewCount})</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E8EAED] mt-3">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-xl font-bold text-[#202124]">
                    ₹{product.bestPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-[#5F6368] line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenProduct(product);
                  }}
                  className="btn-secondary text-xs font-semibold py-2 w-full justify-center"
                >
                  Compare Prices
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
