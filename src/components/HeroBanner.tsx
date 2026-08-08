import React from 'react';
import { Search, ArrowRight, TrendingDown, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
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
    <div className="relative overflow-hidden rounded-3xl bg-white border border-[#E8EAED] p-6 sm:p-10 lg:p-12 mb-10 shadow-xs">
      {/* Background Subtle Tech Gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#E8F0FE]/50 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        
        {/* Brand Tagline Chip */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F0FE] text-[#1A73E8] text-xs font-bold uppercase tracking-wider">
          <Sparkles size={14} className="text-[#1A73E8]" />
          <span>India's Premier Tech Price Engine</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#202124] tracking-tight leading-tight">
          Find the best tech deal.
        </h1>

        {/* Supporting text */}
        <p className="text-base sm:text-lg text-[#5F6368] font-normal max-w-2xl mx-auto leading-relaxed">
          Compare prices, track price history, and buy smarter across Amazon, Flipkart, Croma, and Reliance Digital.
        </p>

        {/* Hero Large Search Bar */}
        <div className="max-w-2xl mx-auto pt-2">
          <div className="relative flex items-center shadow-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5F6368] w-5 h-5" />
            <input
              type="text"
              placeholder="Search phones, laptops, headphones, gadgets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F8F9FA] text-[#202124] text-sm sm:text-base rounded-full pl-12 pr-32 py-3.5 sm:py-4 border border-[#E8EAED] focus:border-[#1A73E8] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#1A73E8]/15 transition-all placeholder:text-[#5F6368]"
            />
            <button
              onClick={onExploreDeals}
              className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary text-xs sm:text-sm font-semibold px-4 py-2 sm:py-2.5 rounded-full"
            >
              Search
            </button>
          </div>
        </div>

        {/* Primary & Secondary CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
          <button
            onClick={onExploreDeals}
            className="btn-primary text-sm sm:text-base font-semibold px-6 py-3"
          >
            <span>Explore Best Deals</span>
            <ArrowRight size={18} />
          </button>

          <button
            onClick={onOpenCompare}
            className="btn-secondary text-sm sm:text-base font-semibold px-6 py-3"
          >
            <span>Compare Products</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-[#5F6368] font-medium border-t border-[#E8EAED]/60 max-w-xl mx-auto">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={16} className="text-[#188038]" /> 100% Free & Transparent
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingDown size={16} className="text-[#188038]" /> 6-Month Price Graphs
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={16} className="text-[#1A73E8]" /> Verified Coupon Offers
          </div>
        </div>

      </div>
    </div>
  );
};
