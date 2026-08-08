import React from 'react';
import { Truck, ShieldCheck, Gift, RefreshCw, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onExploreClick: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onExploreClick }) => {
  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-xs my-8">
      {/* 4 EMARKET SERVICE GUARANTEE WIDGET CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#E5E7EB]">
        
        {/* Card 1 */}
        <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4">
          <div className="w-12 h-12 rounded-lg bg-[#FEF2F2] text-[#E52E2E] flex items-center justify-center shrink-0 border border-[#FCA5A5]">
            <Truck size={24} />
          </div>
          <div>
            <h4 className="text-xs font-black text-[#1E2530] uppercase tracking-wider">FREE DELIVERY & DEALS</h4>
            <p className="text-[11px] text-gray-500 mt-0.5">On top verified merchant orders</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4">
          <div className="w-12 h-12 rounded-lg bg-[#FEF2F2] text-[#E52E2E] flex items-center justify-center shrink-0 border border-[#FCA5A5]">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h4 className="text-xs font-black text-[#1E2530] uppercase tracking-wider">STORE PROTECTION</h4>
            <p className="text-[11px] text-gray-500 mt-0.5">Verified Indian Retail Partners</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4">
          <div className="w-12 h-12 rounded-lg bg-[#FEF2F2] text-[#E52E2E] flex items-center justify-center shrink-0 border border-[#FCA5A5]">
            <Gift size={24} />
          </div>
          <div>
            <h4 className="text-xs font-black text-[#1E2530] uppercase tracking-wider">BANK PROMOTION GIFTS</h4>
            <p className="text-[11px] text-gray-500 mt-0.5">Special HDFC & ICICI instant offers</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4">
          <div className="w-12 h-12 rounded-lg bg-[#FEF2F2] text-[#E52E2E] flex items-center justify-center shrink-0 border border-[#FCA5A5]">
            <RefreshCw size={24} />
          </div>
          <div>
            <h4 className="text-xs font-black text-[#1E2530] uppercase tracking-wider">PRICE DROP GUARANTEE</h4>
            <p className="text-[11px] text-gray-500 mt-0.5">6-month price drop graph tracking</p>
          </div>
        </div>

      </div>
    </div>
  );
};
