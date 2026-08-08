import React from 'react';
import { Search, ArrowRight, TrendingDown, ShieldCheck, Sparkles, CheckCircle2, ChevronRight, Zap, Flame, Gift } from 'lucide-react';
import { Product } from '../types';

interface HeroBannerProps {
  onOpenProduct: (product: Product) => void;
  onExploreDeals: () => void;
  onOpenCompare: () => void;
  featuredProduct: Product;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onOpenProduct,
  onExploreDeals,
  onOpenCompare,
  featuredProduct,
  searchQuery,
  setSearchQuery
}) => {
  return (
    <div className="space-y-6 mb-8">
      {/* MAIN HERO GRID: Center Promo Carousel + Right Stacked Banners */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CENTER MAIN PROMOTIONAL BANNER */}
        <div className="lg:col-span-2 relative overflow-hidden rounded-xl bg-gradient-to-r from-[#FFF5F5] via-[#FFF0F0] to-[#E8F0FE] border border-[#E5E7EB] p-6 sm:p-10 flex flex-col justify-between shadow-xs min-h-[320px]">
          <div className="relative z-10 max-w-lg space-y-4">
            <span className="bg-[#E52E2E] text-white font-black text-[10px] uppercase px-2.5 py-1 rounded tracking-wider inline-flex items-center gap-1">
              <Flame size={12} /> TECH SUPER SALE UP TO 50% OFF
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E2530] tracking-tight leading-tight">
              Find the best tech deal. <br />
              <span className="text-[#E52E2E]">Compare before you buy.</span>
            </h1>

            <p className="text-xs sm:text-sm text-[#5F6368] font-medium leading-relaxed">
              Track 6-month historical price graphs and compare live store prices across Amazon, Flipkart, Croma & Reliance Digital.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onExploreDeals}
                className="btn-primary text-xs sm:text-sm font-bold px-6 py-3 rounded-md shadow-md"
              >
                <span>Shop Today's Flash Deals</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={onOpenCompare}
                className="btn-secondary text-xs sm:text-sm font-bold px-5 py-3 rounded-md"
              >
                <span>Compare Products</span>
              </button>
            </div>
          </div>

          {/* Banner Graphic Asset */}
          <div className="hidden sm:block absolute right-4 bottom-4 w-60 h-60 opacity-90 pointer-events-none">
            <img
              src={featuredProduct.mainImage || 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80'}
              alt="Featured Hero Product"
              className="w-full h-full object-contain filter drop-shadow-xl"
            />
          </div>
        </div>

        {/* RIGHT STACKED PROMO CARDS (eMarket Style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          
          {/* Card 1 */}
          <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-xs flex items-center justify-between gap-4 hover:border-[#E52E2E] transition-all">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#E52E2E] uppercase tracking-wider">SMARTPHONES DEALS</span>
              <h3 className="text-sm font-bold text-[#1E2530]">Flagship Mobiles</h3>
              <p className="text-[11px] text-gray-500 font-medium">Flat 25% Off on iPhones & Galaxy</p>
              <button onClick={onExploreDeals} className="text-xs font-bold text-[#E52E2E] hover:underline pt-1 inline-flex items-center gap-1">
                Explore Deals <ChevronRight size={14} />
              </button>
            </div>
            <img
              src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=150&q=80"
              alt=""
              className="w-20 h-20 object-contain shrink-0"
            />
          </div>

          {/* Card 2 */}
          <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-xs flex items-center justify-between gap-4 hover:border-[#E52E2E] transition-all">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#3B82F6] uppercase tracking-wider">LAPTOPS & MONITORS</span>
              <h3 className="text-sm font-bold text-[#1E2530]">Workstation PCs</h3>
              <p className="text-[11px] text-gray-500 font-medium">Extra ₹5,000 Exchange Bonus</p>
              <button onClick={onExploreDeals} className="text-xs font-bold text-[#3B82F6] hover:underline pt-1 inline-flex items-center gap-1">
                View Laptop Offers <ChevronRight size={14} />
              </button>
            </div>
            <img
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=150&q=80"
              alt=""
              className="w-20 h-20 object-contain shrink-0"
            />
          </div>

        </div>

      </div>

      {/* FULL-WIDTH PROMO STRIP BAR (eMarket Style Coupon Banner) */}
      <div className="bg-[#E52E2E] text-white p-3.5 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3 text-xs font-bold text-center sm:text-left">
          <span className="bg-white text-[#E52E2E] px-2.5 py-1 rounded font-black text-[11px] flex items-center gap-1 shrink-0">
            <Gift size={14} /> GIFT SPECIAL
          </span>
          <span>Wrap new offers / bank discount every weekend - New Coupon code: <strong>HAPPY2026</strong></span>
        </div>

        <button 
          onClick={onExploreDeals}
          className="bg-white hover:bg-gray-100 text-[#E52E2E] text-xs font-black px-4 py-1.5 rounded transition-colors shrink-0"
        >
          Get Coupon
        </button>
      </div>
    </div>
  );
};
