import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Sparkles, 
  Tag, 
  GitCompare, 
  BookOpen, 
  ShieldCheck, 
  Bell, 
  Heart, 
  X, 
  Flame,
  ArrowRight,
  ChevronDown,
  Menu,
  Grid,
  Smartphone,
  Laptop,
  Watch,
  Headphones,
  Tv,
  Home,
  Coffee,
  ShoppingBasket,
  SlidersHorizontal,
  Zap,
  Star
} from 'lucide-react';
import { Product, Category } from '../types';
import { UserProfile } from '../services/authService';
import { User, LogOut } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  products: Product[];
  categories: Category[];
  wishlistCount: number;
  compareCount: number;
  unreadNotifCount: number;
  onOpenProduct: (product: Product) => void;
  onToggleNotif: () => void;
  onSelectCategory: (categoryId: string) => void;
  selectedCategory: string;
  user: UserProfile | null;
  onOpenAuth: (tab?: 'login' | 'register' | 'forgot') => void;
  onSignOut: () => void;
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  mobiles: Smartphone,
  laptops: Laptop,
  smartwatches: Watch,
  earbuds: Headphones,
  tvs: Tv,
  'home-appliances': Home,
  kitchen: Coffee,
  fashion: ShoppingBag,
  beauty: Sparkles,
  furniture: Home,
  grocery: ShoppingBasket
};

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  products,
  categories,
  wishlistCount,
  compareCount,
  unreadNotifCount,
  onOpenProduct,
  onToggleNotif,
  onSelectCategory,
  selectedCategory,
  user,
  onOpenAuth,
  onSignOut
}) => {
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);
  const [showDealsMenu, setShowDealsMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categoriesRef = useRef<HTMLDivElement>(null);
  const dealsRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
        setShowCategoriesMenu(false);
      }
      if (dealsRef.current && !dealsRef.current.contains(event.target as Node)) {
        setShowDealsMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = searchQuery.trim()
    ? products.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/10 shadow-2xl">
      {/* Top Banner Ticker */}
      <div className="bg-gradient-to-r from-indigo-900/90 via-purple-900/90 to-indigo-900/90 text-xs py-1.5 px-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-gray-300">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="bg-rose-500/30 text-rose-300 font-extrabold px-2 py-0.5 rounded text-[10px] uppercase flex items-center gap-1 shadow">
              <Flame size={12} /> LIVE DEALS
            </span>
            <span className="truncate text-white font-medium">🔥 iPhone 15 Pro Max ₹25,000 Off | Sony WF-1000XM5 flat 20% discount on Amazon!</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-gray-300 text-[11px] font-semibold">
            <span>🛡️ 100% Verified Stores</span>
            <span>⚡ Real-Time Price Tracker</span>
            <button 
              onClick={() => setActiveTab('admin')} 
              className="text-indigo-300 hover:text-white flex items-center gap-1 font-bold transition-colors bg-indigo-600/30 px-2 py-0.5 rounded border border-indigo-500/30"
            >
              <ShieldCheck size={14} /> Admin Portal
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-slate-900 text-gray-300 border border-white/10 hover:text-white"
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Brand Logo */}
        <div 
          onClick={() => {
            onSelectCategory('all');
            setActiveTab('shop');
          }}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-emerald-500 p-0.5 shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-xl tracking-tight text-white font-heading">Intelli<span className="text-indigo-400">Buy</span></span>
              <span className="text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30">.online</span>
            </div>
            <p className="text-[11px] text-gray-400 tracking-wide font-medium hidden sm:block">Smart Price Comparison & AI Deals Engine</p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="relative flex-1 max-w-xl">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search 100,000+ products (e.g. iPhone 15, MacBook M3)..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              className="w-full bg-slate-900/90 text-white text-xs sm:text-sm rounded-xl pl-9 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-2.5 border border-white/10 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-gray-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Search Dropdown Results */}
          {showSearchDropdown && searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-slate-900/95 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 backdrop-blur-xl">
              <div className="px-3 py-2 text-xs font-bold text-gray-400 border-b border-white/5 flex items-center justify-between">
                <span>SUGGESTED PRODUCTS</span>
                <span>{searchResults.length} matches</span>
              </div>
              {searchResults.map(product => (
                <div
                  key={product.id}
                  onClick={() => {
                    onOpenProduct(product);
                    setShowSearchDropdown(false);
                  }}
                  className="px-3 py-2.5 hover:bg-indigo-600/10 cursor-pointer flex items-center gap-3 border-b border-white/5 last:border-0 transition-colors"
                >
                  <img src={product.mainImage} alt={product.title} className="w-10 h-10 object-cover rounded-md bg-slate-800" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{product.title}</p>
                    <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-0.5">
                      <span className="text-emerald-400 font-bold">₹{product.bestPrice.toLocaleString('en-IN')}</span>
                      <span>•</span>
                      <span>{product.stores.length} Stores compared</span>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-gray-500" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setActiveTab('ai-assistant')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'ai-assistant'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-indigo-950/80 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-900/50'
            }`}
          >
            <Sparkles size={15} className="text-indigo-400 animate-pulse" />
            <span className="hidden sm:inline">AI Smart Advisor</span>
          </button>

          <button
            onClick={() => setActiveTab('compare')}
            className={`relative p-2.5 rounded-xl text-xs font-semibold border transition-all ${
              activeTab === 'compare'
                ? 'bg-indigo-600/20 text-indigo-400 border-indigo-500/40'
                : 'bg-slate-900/80 text-gray-300 border-white/10 hover:border-white/20'
            }`}
            title="Product Comparison Tray"
          >
            <GitCompare size={18} />
            {compareCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-indigo-500 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-950">
                {compareCount}
              </span>
            )}
          </button>

          <button
            onClick={onToggleNotif}
            className="relative p-2.5 rounded-xl text-xs font-semibold bg-slate-900/80 text-gray-300 border border-white/10 hover:border-white/20 transition-all"
            title="Price Drop Notifications"
          >
            <Bell size={18} />
            {unreadNotifCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-950 animate-bounce">
                {unreadNotifCount}
              </span>
            )}
          </button>

          {/* User Member Authentication Control */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-600/20 text-white border border-indigo-500/40 hover:bg-indigo-600/30 transition-all text-xs font-bold"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 flex items-center justify-center text-[10px] font-extrabold uppercase">
                  {user.fullName ? user.fullName[0] : user.email[0]}
                </div>
                <span className="hidden lg:inline truncate max-w-[100px]">{user.fullName || user.email.split('@')[0]}</span>
                <ChevronDown size={14} className={`transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-slate-900 border border-indigo-500/40 rounded-2xl shadow-2xl p-3 z-50 space-y-2 backdrop-blur-2xl animate-slideDown text-xs">
                  <div className="pb-2 border-b border-white/10 px-2">
                    <p className="font-extrabold text-white truncate">{user.fullName || 'Member'}</p>
                    <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
                  </div>

                  <button
                    onClick={() => {
                      onSignOut();
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-rose-600/20 text-rose-300 font-extrabold flex items-center gap-2 border border-white/5 transition-colors"
                  >
                    <LogOut size={15} className="text-rose-400" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => onOpenAuth('login')}
              className="glow-btn px-3.5 py-2 text-xs font-extrabold flex items-center gap-1.5 shrink-0 shadow-lg shadow-indigo-600/30"
            >
              <User size={15} />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="border-t border-white/10 bg-slate-950/95 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-2 text-xs font-bold text-gray-200">
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar py-0.5">
            
            {/* Catalog Home */}
            <button
              onClick={() => {
                onSelectCategory('all');
                setActiveTab('shop');
              }}
              className={`py-1.5 px-3 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'shop' && selectedCategory === 'all'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-gray-300 border border-white/5'
              }`}
            >
              <Grid size={15} /> All Products
            </button>

            {/* Mega Categories Dropdown */}
            <div className="relative" ref={categoriesRef}>
              <button
                onClick={() => {
                  setShowCategoriesMenu(!showCategoriesMenu);
                  setShowDealsMenu(false);
                }}
                className={`py-1.5 px-3.5 rounded-xl transition-all flex items-center gap-1.5 border ${
                  showCategoriesMenu 
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg' 
                    : 'bg-slate-900/80 hover:bg-slate-800 text-indigo-300 border-indigo-500/30'
                }`}
              >
                <Grid size={15} className="text-indigo-400" /> Categories Menu <ChevronDown size={14} className={`transition-transform duration-200 ${showCategoriesMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Categories Mega Menu Grid */}
              {showCategoriesMenu && (
                <div className="absolute left-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-[540px] max-w-[540px] bg-slate-900 border border-indigo-500/40 rounded-2xl shadow-2xl p-3 sm:p-4 z-50 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 backdrop-blur-2xl animate-slideDown">
                  <div className="col-span-full pb-2 border-b border-white/10 flex items-center justify-between text-xs font-extrabold text-indigo-400">
                    <span className="flex items-center gap-1.5"><Grid size={14} /> SELECT PRODUCT CATEGORY</span>
                    <button onClick={() => setShowCategoriesMenu(false)} className="text-gray-400 hover:text-white"><X size={16} /></button>
                  </div>

                  {categories.filter(c => c.id !== 'all').map(cat => {
                    const IconComp = CATEGORY_ICONS[cat.id] || Grid;
                    const isSelected = selectedCategory === cat.id;

                    return (
                      <div
                        key={cat.id}
                        onClick={() => {
                          onSelectCategory(cat.id);
                          setActiveTab('shop');
                          setShowCategoriesMenu(false);
                        }}
                        className={`p-3 rounded-xl cursor-pointer transition-all border ${
                          isSelected
                            ? 'bg-indigo-600/30 border-indigo-400 text-white'
                            : 'bg-slate-950/70 hover:bg-indigo-600/20 border-white/5 hover:border-indigo-500/40 text-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-extrabold text-xs text-white flex items-center gap-2">
                            <IconComp size={16} className="text-indigo-400" /> {cat.name}
                          </span>
                          <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-extrabold px-2 py-0.5 rounded border border-indigo-500/30">
                            {cat.count} Items
                          </span>
                        </div>
                        {cat.subcategories.length > 0 && (
                          <p className="text-[10px] text-gray-400 line-clamp-1">
                            {cat.subcategories.join(' • ')}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quick Category Buttons for Mobiles, Laptops, Smartwatches */}
            {categories.filter(c => ['mobiles', 'laptops', 'smartwatches', 'earbuds', 'tvs'].includes(c.id)).map(cat => {
              const IconComp = CATEGORY_ICONS[cat.id] || Grid;
              const isActive = selectedCategory === cat.id && activeTab === 'shop';

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    setActiveTab('shop');
                  }}
                  className={`py-1.5 px-3 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? 'bg-indigo-600 text-white border border-indigo-400 shadow-md'
                      : 'bg-slate-900/80 hover:bg-slate-800 text-gray-300 border border-white/5'
                  }`}
                >
                  <IconComp size={14} className={isActive ? 'text-white' : 'text-indigo-400'} />
                  <span>{cat.name}</span>
                </button>
              );
            })}

            {/* Deals Menu Dropdown */}
            <div className="relative" ref={dealsRef}>
              <button
                onClick={() => {
                  setShowDealsMenu(!showDealsMenu);
                  setShowCategoriesMenu(false);
                }}
                className={`py-1.5 px-3.5 rounded-xl transition-all flex items-center gap-1.5 border ${
                  activeTab === 'deals' || showDealsMenu
                    ? 'bg-rose-600 text-white border-rose-400 shadow-md'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-rose-400 border-rose-500/30'
                }`}
              >
                <Tag size={15} className="text-rose-400" /> Today's Deals <ChevronDown size={14} className={`transition-transform duration-200 ${showDealsMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Deals Menu Dropdown Card */}
              {showDealsMenu && (
                <div className="absolute left-0 top-full mt-2 w-64 bg-slate-900 border border-rose-500/40 rounded-2xl shadow-2xl p-3 z-50 space-y-1.5 backdrop-blur-2xl animate-slideDown">
                  <button
                    onClick={() => {
                      setActiveTab('deals');
                      setShowDealsMenu(false);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-rose-600/20 text-white font-extrabold flex items-center gap-2 text-xs border border-white/5"
                  >
                    <Flame size={16} className="text-rose-500" /> Today's Flash Deals
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('deals');
                      setShowDealsMenu(false);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-indigo-600/20 text-indigo-300 font-extrabold flex items-center gap-2 text-xs border border-white/5"
                  >
                    <Tag size={16} className="text-indigo-400" /> Verified Coupon Codes
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('deals');
                      setShowDealsMenu(false);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-amber-600/20 text-amber-300 font-extrabold flex items-center gap-2 text-xs border border-white/5"
                  >
                    <ShieldCheck size={16} className="text-amber-400" /> Bank & Card Cashbacks
                  </button>
                </div>
              )}
            </div>

            {/* Buying Guides */}
            <button
              onClick={() => setActiveTab('blog')}
              className={`py-1.5 px-3 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'blog'
                  ? 'bg-emerald-600 text-white border border-emerald-400 shadow-md'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-emerald-400 border border-white/5'
              }`}
            >
              <BookOpen size={15} /> Buying Guides
            </button>
          </div>

          <div className="hidden xl:flex items-center gap-3 text-xs font-semibold text-gray-400">
            <span>Stores:</span>
            <span className="text-amber-400 font-extrabold">Amazon</span>
            <span className="text-blue-400 font-extrabold">Flipkart</span>
            <span className="text-emerald-400 font-extrabold">Croma</span>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-white/10 p-4 space-y-4 animate-slideDown">
          {/* Mobile Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 text-white text-xs rounded-xl pl-9 pr-4 py-2.5 border border-white/10"
            />
          </div>

          <div className="space-y-1.5 text-xs font-extrabold text-gray-200">
            <div className="text-[10px] text-gray-400 uppercase tracking-widest px-2 py-1 font-bold">NAVIGATION PAGES</div>
            <button
              onClick={() => {
                onSelectCategory('all');
                setActiveTab('shop');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left p-2.5 rounded-xl bg-slate-950 flex items-center justify-between border border-white/5"
            >
              <span className="flex items-center gap-2"><ShoppingBag size={16} className="text-indigo-400" /> Catalog Homepage</span>
              <ArrowRight size={14} className="text-gray-500" />
            </button>
            <button
              onClick={() => {
                setActiveTab('deals');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left p-2.5 rounded-xl bg-slate-950 flex items-center justify-between text-rose-400 border border-white/5"
            >
              <span className="flex items-center gap-2"><Tag size={16} /> Deals & Coupon Codes</span>
              <ArrowRight size={14} className="text-gray-500" />
            </button>
            <button
              onClick={() => {
                setActiveTab('compare');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left p-2.5 rounded-xl bg-slate-950 flex items-center justify-between border border-white/5"
            >
              <span className="flex items-center gap-2"><GitCompare size={16} className="text-indigo-400" /> Side-by-Side Comparison ({compareCount})</span>
              <ArrowRight size={14} className="text-gray-500" />
            </button>
            <button
              onClick={() => {
                setActiveTab('ai-assistant');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left p-2.5 rounded-xl bg-slate-950 flex items-center justify-between text-indigo-300 border border-white/5"
            >
              <span className="flex items-center gap-2"><Sparkles size={16} className="text-indigo-400" /> AI Smart Advisor</span>
              <ArrowRight size={14} className="text-gray-500" />
            </button>
            <button
              onClick={() => {
                setActiveTab('blog');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left p-2.5 rounded-xl bg-slate-950 flex items-center justify-between text-emerald-400 border border-white/5"
            >
              <span className="flex items-center gap-2"><BookOpen size={16} /> Buying Guides & Reviews</span>
              <ArrowRight size={14} className="text-gray-500" />
            </button>
            <button
              onClick={() => {
                setActiveTab('admin');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left p-2.5 rounded-xl bg-slate-950 flex items-center justify-between text-gray-400 border border-white/5"
            >
              <span className="flex items-center gap-2"><ShieldCheck size={16} /> Admin Portal</span>
              <ArrowRight size={14} className="text-gray-500" />
            </button>

            <div className="text-[10px] text-gray-400 uppercase tracking-widest px-2 py-2 font-bold">CATEGORIES</div>
            <div className="grid grid-cols-2 gap-2">
              {categories.filter(c => c.id !== 'all').map(cat => {
                const IconComp = CATEGORY_ICONS[cat.id] || Grid;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      setActiveTab('shop');
                      setIsMobileMenuOpen(false);
                    }}
                    className="p-2 rounded-xl bg-slate-950 border border-white/5 text-[11px] font-bold text-gray-300 flex items-center gap-1.5"
                  >
                    <IconComp size={14} className="text-indigo-400" />
                    <span className="truncate">{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
