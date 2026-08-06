import React, { useState } from 'react';
import { Tag, Clock, ExternalLink, Copy, Check, Flame, ShieldAlert, Sparkles, Percent } from 'lucide-react';
import { Deal, Coupon } from '../types';

interface DealsHubProps {
  deals: Deal[];
  coupons: Coupon[];
  onTrackAffiliateClick: (productId: string, store: string) => void;
}

export const DealsHub: React.FC<DealsHubProps> = ({
  deals,
  coupons,
  onTrackAffiliateClick
}) => {
  const [copiedCouponId, setCopiedCouponId] = useState<string | null>(null);
  const [selectedStoreFilter, setSelectedStoreFilter] = useState<string>('All');

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCouponId(id);
    setTimeout(() => setCopiedCouponId(null), 2000);
  };

  const filteredCoupons = selectedStoreFilter === 'All'
    ? coupons
    : coupons.filter(c => c.store === selectedStoreFilter);

  return (
    <div className="space-y-10">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-950 via-slate-900 to-indigo-950 p-6 md:p-8 border border-white/10 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <span className="badge-tag badge-deal inline-flex items-center gap-1">
              <Flame size={13} /> Verified Today's Offers
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Deals, Coupons & Bank Offers</h1>
            <p className="text-xs text-gray-300 max-w-xl">
              Verified daily coupon codes, bank cashbacks (HDFC, ICICI, Axis), and price drops directly synced from merchant affiliate APIs.
            </p>
          </div>

          {/* Bank Offer Highlights */}
          <div className="bg-slate-900/80 p-4 rounded-xl border border-white/10 flex items-center gap-4 text-xs font-semibold">
            <div className="text-center border-r border-white/10 pr-4">
              <span className="text-amber-400 font-bold block text-sm">HDFC Bank</span>
              <span className="text-[10px] text-gray-400">₹3,000 Off</span>
            </div>
            <div className="text-center border-r border-white/10 pr-4">
              <span className="text-blue-400 font-bold block text-sm">ICICI Card</span>
              <span className="text-[10px] text-gray-400">10% Instant</span>
            </div>
            <div className="text-center">
              <span className="text-emerald-400 font-bold block text-sm">Axis Bank</span>
              <span className="text-[10px] text-gray-400">5% Unlimited</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: Today's Deals Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-white flex items-center gap-2 font-heading">
            <Flame className="text-rose-500" size={20} /> Today's Flash Deals
          </h2>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Clock size={14} className="text-rose-400" /> Resets in 6 hours
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deals.map(deal => (
            <div 
              key={deal.id}
              className="glass-card p-5 border border-white/10 hover:border-rose-500/40 bg-slate-900/90 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="relative h-40 bg-slate-950 rounded-xl overflow-hidden p-2 flex items-center justify-center">
                  <img src={deal.image} alt={deal.title} className="max-h-36 w-auto object-contain" />
                  <span className="absolute top-2 left-2 bg-rose-600 text-white font-extrabold text-[10px] uppercase px-2 py-0.5 rounded shadow">
                    {deal.discount}
                  </span>
                  <span className="absolute top-2 right-2 bg-slate-900/90 text-gray-300 font-bold text-[10px] px-2 py-0.5 rounded border border-white/10">
                    {deal.store}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">{deal.category}</span>
                  <h3 className="text-sm font-bold text-white line-clamp-2 mt-0.5">{deal.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">{deal.description}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-lg font-extrabold text-emerald-400 font-heading">
                    ₹{deal.dealPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-gray-500 line-through ml-2">
                    ₹{deal.originalPrice.toLocaleString('en-IN')}
                  </span>
                </div>

                <a
                  href={deal.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onTrackAffiliateClick(deal.id, deal.store)}
                  className="glow-btn-emerald px-3 py-1.5 text-xs font-bold"
                >
                  Claim Deal ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Verified Coupons */}
      <div className="space-y-4 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-extrabold text-white flex items-center gap-2 font-heading">
            <Tag className="text-indigo-400" size={20} /> Active Verified Coupon Codes
          </h2>

          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="text-gray-400">Filter Store:</span>
            {['All', 'Amazon', 'Flipkart', 'Croma'].map(st => (
              <button
                key={st}
                onClick={() => setSelectedStoreFilter(st)}
                className={`px-3 py-1 rounded-lg border transition-all ${
                  selectedStoreFilter === st
                    ? 'bg-indigo-600 text-white border-indigo-400'
                    : 'bg-slate-900 text-gray-400 border-white/10 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCoupons.map(coup => (
            <div 
              key={coup.id}
              className="bg-slate-900/90 border border-white/10 rounded-2xl p-5 space-y-4 relative overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-extrabold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30 uppercase">
                    {coup.store}
                  </span>
                  <h3 className="text-base font-extrabold text-emerald-400 mt-2">{coup.discountText}</h3>
                </div>
                <Percent size={24} className="text-indigo-400/40" />
              </div>

              <p className="text-xs text-gray-300">{coup.description}</p>

              <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t border-white/5">
                <span>Min Spend: {coup.minSpend || 'N/A'}</span>
                <span>Expires: {coup.expiresAt}</span>
              </div>

              {/* Coupon Code Copy Container */}
              <div className="bg-slate-950 p-2.5 rounded-xl border border-dashed border-indigo-500/40 flex items-center justify-between">
                <span className="font-mono font-bold text-sm text-indigo-300 tracking-wider">
                  {coup.code}
                </span>
                <button
                  onClick={() => handleCopyCode(coup.id, coup.code)}
                  className="glow-btn px-3 py-1 text-xs font-bold"
                >
                  {copiedCouponId === coup.id ? (
                    <>
                      <Check size={14} className="text-emerald-400" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> Copy Code
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
