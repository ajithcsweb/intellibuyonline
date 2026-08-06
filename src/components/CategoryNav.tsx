import React from 'react';
import { 
  Grid, 
  Smartphone, 
  Laptop, 
  Watch, 
  Headphones, 
  Tv, 
  Home, 
  Coffee, 
  ShoppingBag, 
  Sparkles, 
  Armchair, 
  ShoppingBasket 
} from 'lucide-react';
import { Category } from '../types';

interface CategoryNavProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Grid,
  Smartphone,
  Laptop,
  Watch,
  Headphones,
  Tv,
  Home,
  Coffee,
  ShoppingBag,
  Sparkles,
  Armchair,
  ShoppingBasket
};

export const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-extrabold uppercase tracking-wider text-gray-400 font-heading">
          Explore Product Categories
        </h2>
        <span className="text-xs text-indigo-400 font-semibold cursor-pointer hover:underline" onClick={() => onSelectCategory('all')}>
          View All ({categories.reduce((acc, c) => acc + c.count, 0)} Items)
        </span>
      </div>

      <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
        {categories.map(cat => {
          const IconComponent = ICON_MAP[cat.iconName] || Grid;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-400 shadow-lg shadow-indigo-600/30 scale-105'
                  : 'bg-slate-900/80 text-gray-300 border-white/10 hover:border-indigo-500/40 hover:bg-slate-800'
              }`}
            >
              <IconComponent size={16} className={isSelected ? 'text-white' : 'text-indigo-400'} />
              <span>{cat.name}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isSelected ? 'bg-white/20 text-white' : 'bg-slate-800 text-gray-400'
              }`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
