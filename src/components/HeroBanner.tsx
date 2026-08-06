import React from 'react';
import { Sparkles, TrendingDown, ArrowUpRight, ShieldCheck, Zap, Layers, RefreshCw } from 'lucide-react';
import { Product } from '../types';

interface HeroBannerProps {
  onOpenProduct: (product: Product) => void;
  onOpenAI: () => void;
  featuredProduct: Product;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onOpenProduct,
  onOpenAI,
  featuredProduct
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950/80 via-slate-900 to-purple-950/80 border border-white/10 p-6 md:p-10 mb-8 shadow-2xl">
      {/* Background Decorative Glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Heading & Call to action */}
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Zap size={14} className="animate-bounce text-emerald-400" />
            Real-time Price Engine Active
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Never Overpay Again. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400">
              Compare 100,000+ Products
            </span> Across Top Stores.
          </h1>

          <p className="text-gray-300 text-sm sm:text-base max-w-xl font-normal leading-relaxed">
            IntelliBuy automatically scans Amazon, Flipkart, Croma, Reliance Digital, and Vijay Sales every 15 minutes. Find the lowest verified price, track historical drops, and claim exclusive bank coupons.
          </p>

          {/* Quick Features Row */}
          <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-gray-300">
            <div className="flex items-center gap-1.5 bg-slate-950/40 px-3 py-1.5 rounded-lg border border-white/5">
              <TrendingDown size={15} className="text-emerald-400" /> 30-Day Price History
            </div>
            <div className="flex items-center gap-1.5 bg-slate-950/40 px-3 py-1.5 rounded-lg border border-white/5">
              <ShieldCheck size={15} className="text-indigo-400" /> Verified Affiliate Links
            </div>
            <div className="flex items-center gap-1.5 bg-slate-950/40 px-3 py-1.5 rounded-lg border border-white/5">
              <Sparkles size={15} className="text-purple-400" /> AI Buying Assistant
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => onOpenProduct(featuredProduct)}
              className="glow-btn px-6 py-3 text-sm"
            >
              View Featured Deal <ArrowUpRight size={16} />
            </button>

            <button
              onClick={onOpenAI}
              className="px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-indigo-300 text-sm font-semibold border border-indigo-500/30 flex items-center gap-2 transition-all hover:scale-105"
            >
              <Sparkles size={16} className="text-indigo-400" /> Ask AI Recommendation
            </button>
          </div>
        </div>

        {/* Right Column: Featured Product Card Preview */}
        <div className="lg:col-span-5">
          <div className="glass-panel rounded-xl p-5 border border-white/10 shadow-2xl relative group hover:border-indigo-500/40 transition-all">
            <div className="absolute -top-3 right-4 bg-gradient-to-r from-rose-500 to-amber-500 text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
              <Zap size={12} /> Save ₹{(featuredProduct.originalPrice - featuredProduct.bestPrice).toLocaleString('en-IN')}
            </div>

            <div className="flex items-start gap-4 mb-4">
              <img
                src={featuredProduct.mainImage}
                alt={featuredProduct.title}
                className="w-24 h-24 object-cover rounded-xl bg-slate-800 border border-white/10 group-hover:scale-105 transition-transform"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">{featuredProduct.brand} • {featuredProduct.subcategory}</span>
                <h3 className="text-sm font-bold text-white line-clamp-2 mt-1">{featuredProduct.title}</h3>
                
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-xl font-extrabold text-emerald-400 font-heading">₹{featuredProduct.bestPrice.toLocaleString('en-IN')}</span>
                  <span className="text-xs text-gray-500 line-through">₹{featuredProduct.originalPrice.toLocaleString('en-IN')}</span>
                  <span className="text-xs font-bold text-rose-400">{featuredProduct.discountPercentage}% OFF</span>
                </div>
              </div>
            </div>

            {/* Store Comparison Ticker inside Featured Card */}
            <div className="space-y-2 pt-3 border-t border-white/10">
              <div className="text-[11px] font-semibold text-gray-400 flex items-center justify-between">
                <span>Multi-Store Live Prices</span>
                <span className="text-emerald-400 flex items-center gap-1"><RefreshCw size={10} className="animate-spin" /> Live sync</span>
              </div>

              {featuredProduct.stores.map((store, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-center justify-between p-2 rounded-lg text-xs font-semibold ${
                    idx === 0 ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' : 'bg-slate-900/60 text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{store.store}</span>
                    {store.badge && (
                      <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded font-bold">{store.badge}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold">₹{store.price.toLocaleString('en-IN')}</span>
                    <a
                      href={store.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] bg-white/10 hover:bg-white/20 text-white px-2 py-1 rounded transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Buy ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onOpenProduct(featuredProduct)}
              className="w-full mt-4 py-2.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 hover:text-white font-bold text-xs transition-all border border-indigo-500/40 text-center"
            >
              View Full Price Graph & Specs ↗
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
