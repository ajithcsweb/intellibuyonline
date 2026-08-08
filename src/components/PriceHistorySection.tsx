import React, { useState } from 'react';
import { TrendingDown, Calendar, ArrowDownRight, ArrowUpRight, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';

interface PriceHistorySectionProps {
  products: Product[];
  onOpenProduct: (product: Product) => void;
}

export const PriceHistorySection: React.FC<PriceHistorySectionProps> = ({
  products,
  onOpenProduct
}) => {
  const [selectedRange, setSelectedRange] = useState<'1M' | '3M' | '6M' | '1Y'>('6M');
  const [selectedProductIndex, setSelectedProductIndex] = useState<number>(0);

  const product = products[selectedProductIndex] || products[0];

  if (!product) return null;

  // Calculate statistics from price history
  const historyPrices = product.priceHistory.flatMap(h => [h.amazon, h.flipkart, h.croma]);
  const lowestPrice = Math.min(...historyPrices);
  const highestPrice = Math.max(...historyPrices);
  const currentPrice = product.bestPrice;
  const percentageAboveLow = Math.round(((currentPrice - lowestPrice) / lowestPrice) * 100);

  return (
    <section className="mb-14">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0FE] text-[#1A73E8] text-xs font-bold uppercase tracking-wider mb-2">
            <TrendingDown size={14} /> Price Tracker Engine
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#202124] tracking-tight">
            6-Month Price History
          </h2>
          <p className="text-sm text-[#5F6368] mt-1">
            Track historical price drops across Amazon, Flipkart, and Croma before you buy.
          </p>
        </div>

        {/* Product selector tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {products.slice(0, 4).map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setSelectedProductIndex(idx)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedProductIndex === idx
                  ? 'bg-[#1A73E8] text-white border-[#1A73E8]'
                  : 'bg-white text-[#5F6368] border-[#E8EAED] hover:bg-[#F8F9FA]'
              }`}
            >
              {p.brand} {p.title.split(' ')[1] || p.title.slice(0, 10)}
            </button>
          ))}
        </div>
      </div>

      <div className="material-card p-6 rounded-3xl bg-white border border-[#E8EAED] shadow-xs">
        {/* Top Product Header & Controls */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-[#E8EAED] gap-4">
          <div className="flex items-center gap-4">
            <img
              src={product.mainImage}
              alt={product.title}
              className="w-14 h-14 object-contain bg-[#F8F9FA] p-2 rounded-xl border border-[#E8EAED]"
            />
            <div>
              <span className="text-xs font-bold text-[#1A73E8] uppercase">{product.brand}</span>
              <h3 className="text-base font-bold text-[#202124] line-clamp-1">{product.title}</h3>
              <p className="text-xs text-[#5F6368]">Best current price: <strong className="text-[#188038]">₹{currentPrice.toLocaleString('en-IN')}</strong></p>
            </div>
          </div>

          {/* Time Range Selector Buttons */}
          <div className="flex items-center gap-1.5 bg-[#F8F9FA] p-1 rounded-full border border-[#E8EAED]">
            {(['1M', '3M', '6M', '1Y'] as const).map(range => (
              <button
                key={range}
                onClick={() => setSelectedRange(range)}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                  selectedRange === range
                    ? 'bg-white text-[#1A73E8] shadow-xs font-bold'
                    : 'text-[#5F6368] hover:text-[#202124]'
                }`}
              >
                {range === '1M' ? '1 Month' : range === '3M' ? '3 Months' : range === '6M' ? '6 Months' : '1 Year'}
              </button>
            ))}
          </div>
        </div>

        {/* Stat Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
          <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-[#E8EAED]">
            <span className="text-xs text-[#5F6368] font-medium">Current Price</span>
            <div className="text-2xl font-bold text-[#202124] mt-1">₹{currentPrice.toLocaleString('en-IN')}</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#E6F4EA] border border-[#CEEAD6]">
            <span className="text-xs text-[#188038] font-bold">Lowest Price (6 Months)</span>
            <div className="text-2xl font-bold text-[#188038] mt-1 flex items-center gap-1">
              ₹{lowestPrice.toLocaleString('en-IN')}
              <ArrowDownRight size={20} />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-[#E8EAED]">
            <span className="text-xs text-[#5F6368] font-medium">Highest Price (6 Months)</span>
            <div className="text-2xl font-bold text-[#5F6368] mt-1 flex items-center gap-1">
              ₹{highestPrice.toLocaleString('en-IN')}
              <ArrowUpRight size={20} />
            </div>
          </div>
        </div>

        {/* Clean Interactive SVG Line Chart */}
        <div className="bg-[#F8F9FA] p-6 rounded-2xl border border-[#E8EAED] my-6">
          <div className="h-48 w-full relative flex items-end justify-between pt-6 px-4">
            {/* SVG Trend Line */}
            <svg className="absolute inset-0 w-full h-full p-4 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 50">
              <path
                d="M 0,35 Q 25,20 50,40 T 100,15"
                fill="none"
                stroke="#1A73E8"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M 0,35 Q 25,20 50,40 T 100,15 L 100,50 L 0,50 Z"
                fill="url(#blueGradient)"
                opacity="0.15"
              />
              <defs>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1A73E8" />
                  <stop offset="100%" stopColor="#FFFFFF" />
                </linearGradient>
              </defs>
            </svg>

            {/* Price Points Data Labels */}
            {product.priceHistory.map((point, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center">
                <span className="text-[11px] font-bold text-[#1A73E8] bg-white px-2 py-0.5 rounded-full border border-[#E8EAED] shadow-xs">
                  ₹{point.amazon.toLocaleString('en-IN')}
                </span>
                <div className="w-3 h-3 rounded-full bg-[#1A73E8] border-2 border-white my-2 shadow-xs" />
                <span className="text-[11px] text-[#5F6368] font-medium">{point.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Insight Callout */}
        <div className="flex items-center justify-between flex-wrap gap-4 p-4 rounded-2xl bg-[#E8F0FE] text-[#1A73E8] border border-[#D2E3FC]">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <CheckCircle2 size={18} className="text-[#1A73E8]" />
            <span>
              {percentageAboveLow === 0 
                ? "🔥 Lowest price recorded in 6 months! Great time to purchase."
                : `Current price is ${percentageAboveLow}% above the 6-month low (₹${lowestPrice.toLocaleString('en-IN')}).`}
            </span>
          </div>

          <button
            onClick={() => onOpenProduct(product)}
            className="btn-primary text-xs font-bold px-4 py-2"
          >
            View Product Details
          </button>
        </div>
      </div>
    </section>
  );
};
