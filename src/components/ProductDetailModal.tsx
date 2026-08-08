import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ExternalLink, 
  CheckCircle2, 
  XCircle, 
  TrendingDown, 
  ShieldCheck, 
  Truck, 
  Tag, 
  Calendar, 
  Share2, 
  ThumbsUp, 
  Sparkles,
  GitCompare
} from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onTrackAffiliateClick: (productId: string, store: string) => void;
  onToggleCompare: (product: Product) => void;
  isCompared: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onTrackAffiliateClick,
  onToggleCompare,
  isCompared
}) => {
  const [selectedImage, setSelectedImage] = useState(product.mainImage);
  const [activeTab, setActiveTab] = useState<'prices' | 'specs' | 'history' | 'reviews'>('prices');
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Find max price for Price History Chart scaling
  const allHistoryPrices = product.priceHistory.flatMap(h => [h.amazon, h.flipkart, h.croma]).filter(Boolean);
  const maxHistoryPrice = Math.max(...allHistoryPrices, product.originalPrice);
  const minHistoryPrice = Math.min(...allHistoryPrices, product.bestPrice);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div 
        className="bg-white text-[#202124] p-6 max-w-4xl w-full rounded-3xl border border-[#E8EAED] shadow-2xl space-y-6 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#E8EAED]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-[#1A73E8] uppercase tracking-widest bg-[#E8F0FE] px-2 py-0.5 rounded-full">
                {product.brand} • {product.category}
              </span>
              {product.badge && (
                <span className="badge-best-price">{product.badge}</span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#202124]">{product.title}</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-slate-900 text-gray-300 hover:text-white border border-white/10 hover:border-white/20 transition-all text-xs font-semibold flex items-center gap-1"
              title="Share deal"
            >
              <Share2 size={16} />
              {copiedLink ? <span className="text-emerald-400">Copied!</span> : <span className="hidden sm:inline">Share</span>}
            </button>

            <button
              onClick={() => onToggleCompare(product)}
              className={`p-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1 ${
                isCompared
                  ? 'bg-indigo-600 text-white border-indigo-400'
                  : 'bg-slate-900 text-gray-300 border-white/10 hover:border-indigo-400'
              }`}
            >
              <GitCompare size={16} />
              <span className="hidden sm:inline">{isCompared ? 'Comparing' : 'Compare'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 text-gray-400 hover:text-white border border-white/10 hover:bg-slate-800 transition-all"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Top Product Hero Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-6 border-b border-white/10">
          {/* Gallery Image Column */}
          <div className="md:col-span-5 space-y-3">
            <div className="bg-slate-950/60 p-4 rounded-2xl border border-white/10 flex items-center justify-center h-64">
              <img
                src={selectedImage}
                alt={product.title}
                className="max-h-56 w-auto object-contain"
              />
            </div>

            {/* Thumbnail Carousel */}
            {product.galleryImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                {product.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-14 h-14 rounded-lg bg-slate-950 p-1 border transition-all ${
                      selectedImage === img ? 'border-indigo-500 ring-2 ring-indigo-500/30' : 'border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Summary Column */}
          <div className="md:col-span-7 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-amber-400/10 text-amber-400 font-bold px-2.5 py-1 rounded-lg border border-amber-400/30 text-sm">
                  <Star size={16} className="fill-amber-400" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-xs text-gray-400">{product.reviewCount.toLocaleString('en-IN')} Customer Ratings</span>
                <span className="text-xs text-emerald-400 font-semibold">✓ Verified Stores Only</span>
              </div>

              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-3xl font-extrabold text-emerald-400 font-heading">
                  ₹{product.bestPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-base text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-sm font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                  Save ₹{(product.originalPrice - product.bestPrice).toLocaleString('en-IN')} ({product.discountPercentage}% OFF)
                </span>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed pt-1">
                Compared across <strong className="text-white">{product.stores.length} partner stores</strong>. Lowest price guaranteed with direct affiliate tracking and verified bank offers.
              </p>
            </div>

            {/* Pros & Cons Preview */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-3">
                <span className="text-[11px] font-extrabold text-emerald-400 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                  <CheckCircle2 size={13} /> Pros
                </span>
                <ul className="text-[11px] text-gray-300 space-y-1">
                  {product.pros.slice(0, 2).map((pro, i) => (
                    <li key={i} className="line-clamp-1">• {pro}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-rose-950/20 border border-rose-500/20 rounded-xl p-3">
                <span className="text-[11px] font-extrabold text-rose-400 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                  <XCircle size={13} /> Cons
                </span>
                <ul className="text-[11px] text-gray-300 space-y-1">
                  {product.cons.slice(0, 2).map((con, i) => (
                    <li key={i} className="line-clamp-1">• {con}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quick Action Top Store Button */}
            {product.stores[0] && (
              <a
                href={product.stores[0].url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onTrackAffiliateClick(product.id, product.stores[0].store)}
                className="glow-btn-emerald w-full justify-center py-3 text-sm font-extrabold shadow-lg"
              >
                Buy at Lowest Price on {product.stores[0].store} (₹{product.stores[0].price.toLocaleString('en-IN')}) <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>

        {/* Content Navigation Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 border-b border-white/10 pt-4 text-xs font-bold overflow-x-auto no-scrollbar whitespace-nowrap">
          <button
            onClick={() => setActiveTab('prices')}
            className={`py-2 px-3 sm:px-4 rounded-t-lg transition-colors shrink-0 ${
              activeTab === 'prices' ? 'bg-indigo-600 text-white border-b-2 border-indigo-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            Store Prices ({product.stores.length})
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`py-2 px-3 sm:px-4 rounded-t-lg transition-colors shrink-0 ${
              activeTab === 'history' ? 'bg-indigo-600 text-white border-b-2 border-indigo-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            Price History Chart
          </button>

          <button
            onClick={() => setActiveTab('specs')}
            className={`py-2 px-3 sm:px-4 rounded-t-lg transition-colors shrink-0 ${
              activeTab === 'specs' ? 'bg-indigo-600 text-white border-b-2 border-indigo-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            Specifications
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-2 px-3 sm:px-4 rounded-t-lg transition-colors shrink-0 ${
              activeTab === 'reviews' ? 'bg-indigo-600 text-white border-b-2 border-indigo-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            Reviews ({product.reviewsList?.length || 0})
          </button>
        </div>

        {/* Tab 1: Multi-store comparison table */}
        {activeTab === 'prices' && (
          <div className="py-4 space-y-3">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400 font-bold uppercase text-[10px]">
                    <th className="py-3 px-3">Store</th>
                    <th className="py-3 px-3">Price</th>
                    <th className="py-3 px-3">Discount</th>
                    <th className="py-3 px-3">Available Coupon</th>
                    <th className="py-3 px-3">Shipping Info</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-medium">
                  {product.stores.map((st, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-white text-sm">{st.store}</span>
                          {st.badge && (
                            <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold uppercase">
                              {st.badge}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-base font-extrabold text-emerald-400 font-heading">
                          ₹{st.price.toLocaleString('en-IN')}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-rose-400 font-bold">
                        {st.discount}% OFF
                      </td>
                      <td className="py-3 px-3">
                        {st.couponCode ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono bg-amber-500/10 text-amber-300 px-2 py-1 rounded border border-amber-500/30">
                            <Tag size={10} /> {st.couponCode}
                          </span>
                        ) : (
                          <span className="text-gray-500">—</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-gray-300">
                        <div className="flex items-center gap-1 text-[11px]">
                          <Truck size={12} className="text-indigo-400" /> {st.shipping}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <a
                          href={st.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => onTrackAffiliateClick(product.id, st.store)}
                          className="inline-flex items-center gap-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs px-3 py-1.5 rounded-lg shadow transition-all"
                        >
                          Buy ↗
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Interactive SVG Price History Chart */}
        {activeTab === 'history' && (
          <div className="py-4 space-y-4">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>30-Day Historical Price Fluctuation</span>
              <div className="flex items-center gap-4 text-[11px] font-bold">
                <span className="flex items-center gap-1 text-amber-400"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Amazon</span>
                <span className="flex items-center gap-1 text-blue-400"><span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block" /> Flipkart</span>
                <span className="flex items-center gap-1 text-emerald-400"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" /> Croma</span>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-white/10">
              <svg className="w-full h-48" viewBox="0 0 500 150">
                {/* Horizontal Grid lines */}
                <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />
                <line x1="0" y1="75" x2="500" y2="75" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />
                <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />

                {/* Plot Amazon trend line */}
                <polyline
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="3"
                  points={product.priceHistory.map((h, i) => {
                    const x = (i / (product.priceHistory.length - 1)) * 480 + 10;
                    const y = 140 - ((h.amazon - minHistoryPrice) / (maxHistoryPrice - minHistoryPrice || 1)) * 110;
                    return `${x},${y}`;
                  }).join(' ')}
                />

                {/* Plot Flipkart trend line */}
                <polyline
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth="3"
                  points={product.priceHistory.map((h, i) => {
                    const x = (i / (product.priceHistory.length - 1)) * 480 + 10;
                    const y = 140 - ((h.flipkart - minHistoryPrice) / (maxHistoryPrice - minHistoryPrice || 1)) * 110;
                    return `${x},${y}`;
                  }).join(' ')}
                />

                {/* Data Points */}
                {product.priceHistory.map((h, i) => {
                  const x = (i / (product.priceHistory.length - 1)) * 480 + 10;
                  const yAmz = 140 - ((h.amazon - minHistoryPrice) / (maxHistoryPrice - minHistoryPrice || 1)) * 110;
                  return (
                    <g key={i}>
                      <circle cx={x} cy={yAmz} r="4" fill="#fbbf24" />
                      <text x={x} y="148" fill="#9ca3af" fontSize="10" textAnchor="middle">{h.date}</text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-xl p-3 text-xs text-indigo-300 flex items-center gap-2">
              <Sparkles size={16} className="text-indigo-400 shrink-0" />
              <span>
                <strong>Price Drop Prediction:</strong> Prices are currently at a <strong>30-day low</strong>. Highly recommended time to buy!
              </span>
            </div>
          </div>
        )}

        {/* Tab 3: Technical Specifications Grid */}
        {activeTab === 'specs' && (
          <div className="py-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(product.specs).map(([key, val], idx) => (
                <div key={idx} className="bg-slate-900/60 p-3 rounded-xl border border-white/5">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">{key}</span>
                  <span className="text-xs font-semibold text-white mt-0.5 block">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Verified User Reviews */}
        {activeTab === 'reviews' && (
          <div className="py-4 space-y-3">
            {product.reviewsList && product.reviewsList.length > 0 ? (
              product.reviewsList.map(rev => (
                <div key={rev.id} className="bg-slate-900/60 p-4 rounded-xl border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{rev.userName}</span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold">
                        Verified {rev.store} Buyer
                      </span>
                    </div>
                    <span className="text-gray-400">{rev.date}</span>
                  </div>

                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} className={i < rev.rating ? 'fill-amber-400' : 'text-gray-600'} />
                    ))}
                    <span className="font-bold text-white text-xs ml-2">{rev.title}</span>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed">{rev.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400 text-center py-6">No user reviews yet for this model.</p>
            )}
          </div>
        )}

        {/* Mandatory Affiliate Disclosure Notice */}
        <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-gray-400 flex items-center justify-between bg-slate-950/80 p-3 rounded-xl border border-white/5">
          <span>
            ⚖️ <strong>Affiliate Disclosure:</strong> When you click links to merchant stores and make purchases, IntelliBuy may earn a referral commission at zero extra cost to you.
          </span>
          <span className="font-bold text-emerald-400 shrink-0">100% Price Match Transparency</span>
        </div>
      </div>
    </div>
  );
};
