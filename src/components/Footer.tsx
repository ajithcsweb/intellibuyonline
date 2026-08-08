import React from 'react';
import { Sparkles, ShieldCheck, Mail, Heart, Globe, Share2, MessageSquare, ExternalLink } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onSelectCategory: (catId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onSelectCategory }) => {
  return (
    <footer className="bg-slate-950 border-t border-white/10 text-gray-400 text-xs mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Column 1: Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('shop')}>
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Sparkles size={18} />
              </div>
              <span className="font-extrabold text-xl text-white font-heading">
                Intelli<span className="text-indigo-400">Buy</span>.in
              </span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              India's leading smart price comparison engine and affiliate deals aggregator. We scan Amazon, Flipkart, Croma, Reliance Digital, and Vijay Sales every 15 minutes to guarantee you get the best price.
            </p>

            <div className="flex items-center gap-3 pt-2 text-gray-300">
              <a href="#" className="p-2 rounded-lg bg-slate-900 border border-white/10 hover:text-indigo-400 transition-colors" title="Official Website">
                <Globe size={16} />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 border border-white/10 hover:text-indigo-400 transition-colors" title="Community Chat">
                <MessageSquare size={16} />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 border border-white/10 hover:text-indigo-400 transition-colors" title="Share Deals">
                <Share2 size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Popular Categories */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider font-heading">Categories</h4>
            <ul className="space-y-2">
              {['mobiles', 'laptops', 'smartwatches', 'earbuds', 'tvs', 'home-appliances'].map(cat => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat);
                      setActiveTab('shop');
                    }}
                    className="hover:text-white capitalize transition-colors"
                  >
                    {cat.replace('-', ' ')}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider font-heading">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('shop')} className="hover:text-white transition-colors">
                  Product Catalog
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('deals')} className="hover:text-white transition-colors">
                  Today's Deals & Coupons
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('compare')} className="hover:text-white transition-colors">
                  Side-by-Side Compare
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('ai-assistant')} className="hover:text-white transition-colors text-indigo-400 font-bold">
                  AI Smart Advisor
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('blog')} className="hover:text-white transition-colors">
                  Buying Guides & Reviews
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('admin')} className="hover:text-white transition-colors">
                  Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider font-heading">Deal Digest</h4>
            <p className="text-[11px] text-gray-400">Get top 5 price drops sent to your inbox every Friday.</p>
            
            <form onSubmit={e => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="Enter email address..."
                className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-white/10 text-xs focus:outline-none focus:border-indigo-400"
              />
              <button type="submit" className="glow-btn w-full justify-center py-2 text-xs font-bold">
                Subscribe Free
              </button>
            </form>
          </div>
        </div>

        {/* Affiliate Legal Disclosure */}
        <div className="border-t border-white/10 pt-6 text-[11px] text-gray-500 leading-relaxed bg-slate-900/40 p-4 rounded-xl border border-white/5 space-y-2">
          <p>
            <strong>Mandatory Affiliate Disclosure:</strong> IntelliBuy.in is an independent product discovery and price comparison platform. We participate in affiliate advertising programs (including Amazon Associates Program, Flipkart Affiliate Network, Croma Partner Program, and others) designed to provide a means for sites to earn advertising fees by linking to merchant stores. Product prices and availability are accurate as of the date/time indicated and are subject to change without notice.
          </p>
          <div className="flex flex-wrap items-center justify-between text-gray-400 font-medium">
            <span>© 2026 IntelliBuy.in. All Rights Reserved.</span>
            <div className="flex items-center gap-4 text-[11px]">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms of Service</a>
              <a href="#" className="hover:underline">Affiliate Disclosure</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
