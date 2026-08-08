import React, { useState } from 'react';
import { Tag, Clock, ExternalLink, Copy, Check, Flame, Percent } from 'lucide-react';
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
      <div className="relative overflow-hidden rounded-3xl bg-white p-6 md:p-8 border border-[#E8EAED] shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <span className="badge-discount inline-flex items-center gap-1">
              <Flame size={13} /> Verified Today's Offers
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#202124]">Deals, Coupons & Bank Offers</h1>
            <p className="text-xs text-[#5F6368] max-w-xl">
              Verified daily coupon codes, bank cashbacks (HDFC, ICICI, Axis), and price drops directly synced from merchant affiliate APIs.
            </p>
          </div>

          {/* Bank Offer Highlights */}
          <div className="bg-[#F8F9FA] p-4 rounded-2xl border border-[#E8EAED] flex items-center gap-4 text-xs font-semibold w-full md:w-auto justify-around">
            <div className="text-center border-r border-[#E8EAED] pr-4">
              <span className="text-[#F9AB00] font-bold block text-sm">HDFC Bank</span>
              <span className="text-[10px] text-[#5F6368]">₹3,000 Off</span>
            </div>
            <div className="text-center border-r border-[#E8EAED] pr-4">
              <span className="text-[#1A73E8] font-bold block text-sm">ICICI Card</span>
              <span className="text-[10px] text-[#5F6368]">10% Instant</span>
            </div>
            <div className="text-center">
              <span className="text-[#188038] font-bold block text-sm">Axis Bank</span>
              <span className="text-[10px] text-[#5F6368]">5% Unlimited</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: Today's Deals Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-[#202124] flex items-center gap-2">
            <Flame className="text-[#D93025]" size={20} /> Today's Flash Deals
          </h2>
          <span className="text-xs text-[#5F6368] flex items-center gap-1">
            <Clock size={14} className="text-[#D93025]" /> Verified today
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {deals.map(deal => (
            <div 
              key={deal.id}
              className="material-card p-5 border border-[#E8EAED] hover:border-[#BDC1C6] bg-white flex flex-col justify-between space-y-4 rounded-2xl"
            >
              <div className="space-y-3">
                <div className="relative h-40 bg-[#F8F9FA] rounded-xl overflow-hidden p-2 flex items-center justify-center border border-[#E8EAED]">
                  <img src={deal.image} alt={deal.title} className="max-h-36 w-auto object-contain" />
                  <span className="absolute top-2 left-2 badge-best-price">
                    {deal.discount}
                  </span>
                  <span className="absolute top-2 right-2 bg-white text-[#202124] font-bold text-[10px] px-2 py-0.5 rounded-full border border-[#E8EAED]">
                    {deal.store}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-widest">{deal.category}</span>
                  <h3 className="text-sm font-bold text-[#202124] line-clamp-2 mt-0.5">{deal.title}</h3>
                  <p className="text-xs text-[#5F6368] mt-1">{deal.description}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E8EAED] flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-[#188038]">
                    ₹{deal.dealPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-[#5F6368] line-through ml-1.5">
                    ₹{deal.originalPrice.toLocaleString('en-IN')}
                  </span>
                </div>

                <a
                  href={deal.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onTrackAffiliateClick(deal.id, deal.store)}
                  className="btn-primary text-xs font-semibold py-2 px-3"
                >
                  Claim Deal <ExternalLink size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Verified Coupons */}
      <div className="space-y-4 pt-4 border-t border-[#E8EAED]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-xl sm:text-2xl font-bold text-[#202124] flex items-center gap-2">
            <Tag className="text-[#1A73E8]" size={20} /> Verified Store Coupon Codes
          </h2>

          {/* Store Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {['All', 'Amazon', 'Flipkart', 'Croma', 'Reliance Digital'].map(st => (
              <button
                key={st}
                onClick={() => setSelectedStoreFilter(st)}
                className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all ${
                  selectedStoreFilter === st
                    ? 'bg-[#1A73E8] text-white border-[#1A73E8]'
                    : 'bg-white text-[#5F6368] border-[#E8EAED] hover:bg-[#F8F9FA]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredCoupons.map(coupon => (
            <div
              key={coupon.id}
              className="material-card p-5 border border-[#E8EAED] bg-white rounded-2xl flex flex-col justify-between space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold bg-[#E8F0FE] text-[#1A73E8] px-2 py-0.5 rounded-full">
                    {coupon.store}
                  </span>
                  <h3 className="text-base font-bold text-[#202124] mt-2">{coupon.discountText}</h3>
                  <p className="text-xs text-[#5F6368] mt-1">{coupon.description}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E8EAED] flex items-center justify-between">
                <div className="bg-[#F8F9FA] px-3 py-1.5 rounded-xl border border-dashed border-[#BDC1C6] font-mono text-xs font-bold text-[#202124]">
                  {coupon.code}
                </div>

                <button
                  onClick={() => handleCopyCode(coupon.id, coupon.code)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
                    copiedCouponId === coupon.id
                      ? 'bg-[#E6F4EA] text-[#188038] border border-[#CEEAD6]'
                      : 'btn-secondary'
                  }`}
                >
                  {copiedCouponId === coupon.id ? (
                    <>
                      <Check size={14} /> Copied!
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
