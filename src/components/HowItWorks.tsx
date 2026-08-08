import React from 'react';
import { Search, GitCompare, ShoppingBag, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onExploreClick: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onExploreClick }) => {
  const steps = [
    {
      number: '01',
      title: 'Search',
      description: 'Find the exact phone, laptop, or gadget you are looking for in seconds.',
      icon: Search
    },
    {
      number: '02',
      title: 'Compare',
      description: 'Compare prices live across Amazon, Flipkart, Croma, and Reliance Digital.',
      icon: GitCompare
    },
    {
      number: '03',
      title: 'Buy Smart',
      description: 'Choose the best verified deal with 6-month price history graphs & bank offers.',
      icon: ShoppingBag
    }
  ];

  return (
    <section className="mb-16">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#202124] tracking-tight">
          How IntelliBuy Works
        </h2>
        <p className="text-sm text-[#5F6368] mt-2">
          Three simple steps to make sure you never overpay on tech again.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, idx) => {
          const IconComp = step.icon;

          return (
            <div
              key={idx}
              className="material-card p-6 sm:p-8 rounded-3xl bg-white border border-[#E8EAED] relative text-center flex flex-col items-center justify-between"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#E8F0FE] text-[#1A73E8] flex items-center justify-center mb-4">
                <IconComp size={24} />
              </div>

              <span className="text-xs font-bold text-[#1A73E8] uppercase tracking-widest mb-1">
                STEP {step.number}
              </span>

              <h3 className="text-xl font-bold text-[#202124] mb-2">
                {step.title}
              </h3>

              <p className="text-sm text-[#5F6368] leading-relaxed">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
