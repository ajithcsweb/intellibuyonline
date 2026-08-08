import React from 'react';
import { Sparkles, Globe, MessageSquare, Share2, Mail, ShieldCheck } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onSelectCategory: (catId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onSelectCategory }) => {
  return (
    <footer className="bg-white border-t border-[#E8EAED] text-[#5F6368] text-xs mt-20">
      <div className="max-w-7xl mx-auto px-4 py-14 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Column 1: IntelliBuy Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab('shop')}>
              <div className="w-8 h-8 rounded-xl bg-[#1A73E8] flex items-center justify-center text-white font-bold">
                <Sparkles size={18} />
              </div>
              <span className="font-extrabold text-xl text-[#202124]">
                Intelli<span className="text-[#1A73E8]">Buy</span>.in
              </span>
            </div>
            
            <p className="text-[#5F6368] text-xs leading-relaxed max-w-sm">
              "Find the best tech deal. Compare before you buy." <br />
              India's premier technology product discovery and price-comparison engine. We monitor Amazon, Flipkart, Croma, and Reliance Digital to guarantee verified savings.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a href="#" className="p-2 rounded-full bg-[#F8F9FA] border border-[#E8EAED] text-[#5F6368] hover:text-[#1A73E8] hover:bg-[#E8F0FE] transition-colors" title="Official Site">
                <Globe size={16} />
              </a>
              <a href="#" className="p-2 rounded-full bg-[#F8F9FA] border border-[#E8EAED] text-[#5F6368] hover:text-[#1A73E8] hover:bg-[#E8F0FE] transition-colors" title="Community">
                <MessageSquare size={16} />
              </a>
              <a href="#" className="p-2 rounded-full bg-[#F8F9FA] border border-[#E8EAED] text-[#5F6368] hover:text-[#1A73E8] hover:bg-[#E8F0FE] transition-colors" title="Share">
                <Share2 size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Explore Navigation */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#202124] text-xs uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2 font-medium">
              <li>
                <button onClick={() => setActiveTab('products')} className="hover:text-[#1A73E8] transition-colors">
                  Products Catalog
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('deals')} className="hover:text-[#1A73E8] transition-colors">
                  Today's Best Deals
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('price-history')} className="hover:text-[#1A73E8] transition-colors">
                  6-Month Price History
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('compare')} className="hover:text-[#1A73E8] transition-colors">
                  Compare Products
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('ai-assistant')} className="text-[#1A73E8] font-bold hover:underline">
                  Ask AI Advisor
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Popular Categories */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#202124] text-xs uppercase tracking-wider">Popular Categories</h4>
            <ul className="space-y-2 font-medium">
              {[
                { id: 'smartphones', label: 'Smartphones' },
                { id: 'laptops', label: 'Laptops' },
                { id: 'headphones', label: 'Headphones & Audio' },
                { id: 'smartwatches', label: 'Smartwatches' },
                { id: 'accessories', label: 'Computer Accessories' },
                { id: 'gaming', label: 'Gaming Consoles' }
              ].map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat.id);
                      setActiveTab('products');
                    }}
                    className="hover:text-[#1A73E8] transition-colors"
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter & Legal */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#202124] text-xs uppercase tracking-wider">Tech Deal Digest</h4>
            <p className="text-[11px] text-[#5F6368]">Get verified price drops sent to your inbox every Friday.</p>
            
            <form onSubmit={e => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="Enter email address..."
                className="w-full bg-[#F8F9FA] text-[#202124] p-2.5 rounded-xl border border-[#E8EAED] text-xs focus:outline-none focus:border-[#1A73E8] focus:bg-white"
              />
              <button type="submit" className="btn-primary w-full justify-center py-2 text-xs font-bold rounded-xl">
                Subscribe Free
              </button>
            </form>
          </div>
        </div>

        {/* Affiliate Legal Disclosure & Copyright */}
        <div className="border-t border-[#E8EAED] pt-6 text-[11px] text-[#5F6368] leading-relaxed bg-[#F8F9FA] p-5 rounded-2xl border border-[#E8EAED] space-y-3">
          <p>
            <strong>Mandatory Affiliate Disclosure:</strong> IntelliBuy is an independent tech product discovery and price comparison platform. We participate in affiliate advertising programs (including Amazon Associates Program, Flipkart Affiliate Network, Croma Partner Program, and others) designed to provide a means for sites to earn advertising fees by linking to merchant stores. Product prices and availability are accurate as of the date/time indicated and are subject to change without notice.
          </p>
          <div className="flex flex-wrap items-center justify-between text-[#5F6368] font-medium pt-2 border-t border-[#E8EAED]/60 gap-2">
            <span>© 2026 IntelliBuy. All rights reserved.</span>
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
