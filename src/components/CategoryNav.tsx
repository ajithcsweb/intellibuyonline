import React from 'react';
import { 
  Smartphone, 
  Laptop, 
  Headphones, 
  Keyboard, 
  Tv, 
  Camera, 
  Watch, 
  Gamepad2, 
  Home, 
  Zap,
  Grid
} from 'lucide-react';
import { Category } from '../types';

interface CategoryNavProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const CATEGORY_EMOJI: Record<string, string> = {
  smartphones: '📱',
  mobiles: '📱',
  laptops: '💻',
  headphones: '🎧',
  earbuds: '🎧',
  accessories: '⌨️',
  monitors: '🖥',
  cameras: '📷',
  smartwatches: '⌚',
  gaming: '🎮',
  'smart-home': '🏠',
  gadgets: '⚡'
};

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  smartphones: Smartphone,
  mobiles: Smartphone,
  laptops: Laptop,
  headphones: Headphones,
  accessories: Keyboard,
  monitors: Tv,
  cameras: Camera,
  smartwatches: Watch,
  gaming: Gamepad2,
  'smart-home': Home,
  gadgets: Zap
};

export const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  selectedCategory,
  onSelectCategory
}) => {
  const displayCategories = categories.filter(c => c.id !== 'all');

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#202124] tracking-tight">
            Shop by Category
          </h2>
          <p className="text-sm text-[#5F6368] mt-1">
            Browse top electronic categories to compare prices & discover deals.
          </p>
        </div>
        <button
          onClick={() => onSelectCategory('all')}
          className="text-sm font-semibold text-[#1A73E8] hover:underline"
        >
          View All ({categories.reduce((acc, c) => acc + c.count, 0)} Products)
        </button>
      </div>

      {/* Grid of Clean Material Category Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4">
        {displayCategories.map(cat => {
          const IconComp = CATEGORY_ICONS[cat.id] || Grid;
          const emoji = CATEGORY_EMOJI[cat.id] || '🏷️';
          const isSelected = selectedCategory === cat.id;

          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`material-card p-4 rounded-2xl cursor-pointer text-center group transition-all flex flex-col items-center justify-between ${
                isSelected
                  ? 'border-[#1A73E8] bg-[#E8F0FE] shadow-sm'
                  : 'bg-white border-[#E8EAED] hover:border-[#BDC1C6]'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-[#F8F9FA] group-hover:bg-[#E8F0FE] flex items-center justify-center text-xl mb-3 transition-colors">
                <span>{emoji}</span>
              </div>
              <h3 className={`text-sm font-semibold truncate w-full ${isSelected ? 'text-[#1A73E8]' : 'text-[#202124]'}`}>
                {cat.name}
              </h3>
              <span className="text-[11px] text-[#5F6368] font-medium mt-1">
                {cat.count} Deals
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
