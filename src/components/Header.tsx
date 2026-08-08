import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
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
  Keyboard,
  Camera,
  Gamepad2,
  Zap,
  TrendingUp,
  User, 
  LogOut,
  Sun,
  Moon
} from 'lucide-react';
import { Product, Category } from '../types';
import { UserProfile } from '../services/authService';
import { useTheme } from '../context/ThemeContext';

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
  onOpenProfileSettings: () => void;
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  smartphones: Smartphone,
  mobiles: Smartphone,
  laptops: Laptop,
  headphones: Headphones,
  earbuds: Headphones,
  accessories: Keyboard,
  monitors: Tv,
  tvs: Tv,
  cameras: Camera,
  smartwatches: Watch,
  gaming: Gamepad2,
  'smart-home': Home,
  gadgets: Zap
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
  onSignOut,
  onOpenProfileSettings
}) => {
  const { theme, toggleTheme } = useTheme();
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);
  const [showDealsMenu, setShowDealsMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categoriesRef = useRef<HTMLDivElement>(null);
  const dealsRef = useRef<HTMLDivElement>(null);

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
    <header className="sticky top-0 z-50 bg-white border-b border-[#E8EAED] shadow-xs transition-colors">
      {/* Top Banner Ticker */}
      <div className="bg-[#F8F9FA] text-xs py-1.5 px-4 border-b border-[#E8EAED]">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[#5F6368]">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="bg-[#E6F4EA] text-[#188038] font-bold px-2 py-0.5 rounded-full text-[10px] uppercase flex items-center gap-1">
              <Flame size={12} /> BEST DEALS TODAY
            </span>
            <span className="truncate text-[#202124] font-medium text-[11px] sm:text-xs">
              🔥 iPhone 15 Pro Max ₹25,000 Off | Sony WF-1000XM5 flat 20% discount across Amazon & Flipkart!
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[#5F6368] text-[11px] font-semibold">
            <span>🛡️ Verified Indian Retailers</span>
            <span>⚡ Real-Time Price Graph</span>
            <button 
              onClick={() => setActiveTab('admin')} 
              className="text-[#1A73E8] hover:underline flex items-center gap-1 font-bold"
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
          className="md:hidden p-2 rounded-lg bg-[#F8F9FA] text-[#5F6368] border border-[#E8EAED] hover:text-[#202124]"
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
          <div className="w-9 h-9 rounded-xl bg-[#1A73E8] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-[#202124] font-sans">
                Intelli<span className="text-[#1A73E8]">Buy</span>
              </span>
              <span className="text-[10px] font-bold bg-[#E6F4EA] text-[#188038] px-1.5 py-0.5 rounded-full">
                .in
              </span>
            </div>
            <p className="text-[10px] text-[#5F6368] font-medium hidden sm:block">
              Find the best tech deal. Compare before you buy.
            </p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="relative flex-1 max-w-xl hidden md:block">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5F6368] w-4 h-4" />
            <input
              type="text"
              placeholder="Search phones, laptops, headphones, gadgets..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              className="w-full bg-[#F8F9FA] text-[#202124] text-xs sm:text-sm rounded-full pl-10 pr-10 py-2.5 border border-[#E8EAED] focus:border-[#1A73E8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 transition-all placeholder:text-[#5F6368]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5F6368] hover:text-[#202124]"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Search Dropdown Results */}
          {showSearchDropdown && searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-[#E8EAED] rounded-2xl shadow-xl overflow-hidden z-50">
              <div className="px-3.5 py-2 text-xs font-bold text-[#5F6368] border-b border-[#E8EAED] flex items-center justify-between bg-[#F8F9FA]">
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
                  className="px-4 py-2.5 hover:bg-[#F8F9FA] cursor-pointer flex items-center gap-3 border-b border-[#E8EAED] last:border-0 transition-colors"
                >
                  <img src={product.mainImage} alt={product.title} className="w-10 h-10 object-contain rounded-lg bg-[#F8F9FA] p-1 border border-[#E8EAED]" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#202124] truncate">{product.title}</p>
                    <div className="flex items-center gap-2 text-[11px] text-[#5F6368] mt-0.5">
                      <span className="text-[#188038] font-bold">₹{product.bestPrice.toLocaleString('en-IN')}</span>
                      <span>•</span>
                      <span>{product.stores.length} Stores compared</span>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-[#5F6368]" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Compare Tray Toggle */}
          <button
            onClick={() => setActiveTab('compare')}
            className={`relative p-2.5 rounded-full text-xs font-semibold border transition-all ${
              activeTab === 'compare'
                ? 'bg-[#1A73E8] text-white border-[#1A73E8]'
                : 'bg-white text-[#5F6368] border-[#E8EAED] hover:bg-[#F8F9FA] hover:text-[#202124]'
            }`}
            title="Compare Tray"
          >
            <GitCompare size={18} />
            {compareCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#188038] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                {compareCount}
              </span>
            )}
          </button>

          {/* Notifications Button */}
          <button
            onClick={onToggleNotif}
            className="relative p-2.5 rounded-full text-xs font-semibold bg-white text-[#5F6368] border border-[#E8EAED] hover:bg-[#F8F9FA] hover:text-[#202124] transition-all"
            title="Price Alerts & Notifications"
          >
            <Bell size={18} />
            {unreadNotifCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D93025] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {unreadNotifCount}
              </span>
            )}
          </button>

          {/* User Account Control */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F8F9FA] text-[#202124] border border-[#E8EAED] hover:bg-[#E8EAED]/50 transition-all text-xs font-bold"
              >
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt="" className="w-6 h-6 rounded-full object-cover border border-[#1A73E8]" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-[#1A73E8] flex items-center justify-center text-white text-[10px] font-bold uppercase">
                    {user.fullName ? user.fullName[0] : user.email[0]}
                  </div>
                )}
                <span className="hidden lg:inline truncate max-w-[100px]">{user.fullName || user.email.split('@')[0]}</span>
                <ChevronDown size={14} className={`transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-[#E8EAED] rounded-2xl shadow-xl p-2.5 z-50 space-y-1 text-xs">
                  <div className="pb-2 border-b border-[#E8EAED] px-2">
                    <p className="font-bold text-[#202124] truncate">{user.fullName || 'Member'}</p>
                    <p className="text-[10px] text-[#5F6368] truncate">{user.email}</p>
                  </div>

                  <button
                    onClick={() => {
                      onOpenProfileSettings();
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-[#F8F9FA] text-[#202124] font-medium flex items-center gap-2 transition-colors"
                  >
                    <User size={15} className="text-[#1A73E8]" /> Profile Settings
                  </button>

                  <button
                    onClick={() => {
                      onSignOut();
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-[#FCE8E6] text-[#D93025] font-medium flex items-center gap-2 transition-colors"
                  >
                    <LogOut size={15} className="text-[#D93025]" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => onOpenAuth('login')}
              className="btn-primary text-xs font-semibold shrink-0"
            >
              <User size={15} />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="border-t border-[#E8EAED] bg-white px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-2 text-xs font-semibold text-[#202124]">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-0.5">
            
            {/* Products Page / Catalog */}
            <button
              onClick={() => {
                onSelectCategory('all');
                setActiveTab('products');
              }}
              className={`py-2 px-3.5 rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'products'
                  ? 'bg-[#1A73E8] text-white font-bold'
                  : 'hover:bg-[#F8F9FA] text-[#5F6368] hover:text-[#202124]'
              }`}
            >
              <Grid size={15} /> Products
            </button>

            {/* Deals Page */}
            <button
              onClick={() => setActiveTab('deals')}
              className={`py-2 px-3.5 rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'deals'
                  ? 'bg-[#1A73E8] text-white font-bold'
                  : 'hover:bg-[#F8F9FA] text-[#5F6368] hover:text-[#202124]'
              }`}
            >
              <Tag size={15} /> Today's Deals
            </button>

            {/* Price History View */}
            <button
              onClick={() => setActiveTab('price-history')}
              className={`py-2 px-3.5 rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'price-history'
                  ? 'bg-[#1A73E8] text-white font-bold'
                  : 'hover:bg-[#F8F9FA] text-[#5F6368] hover:text-[#202124]'
              }`}
            >
              <TrendingUp size={15} /> Price History
            </button>

            {/* Categories Dropdown */}
            <div className="relative" ref={categoriesRef}>
              <button
                onClick={() => {
                  setShowCategoriesMenu(!showCategoriesMenu);
                  setShowDealsMenu(false);
                }}
                className={`py-2 px-3.5 rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  showCategoriesMenu || activeTab === 'categories'
                    ? 'bg-[#F8F9FA] text-[#1A73E8] font-bold border border-[#E8EAED]'
                    : 'hover:bg-[#F8F9FA] text-[#5F6368] hover:text-[#202124]'
                }`}
              >
                <span>Categories</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${showCategoriesMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Categories Dropdown Menu */}
              {showCategoriesMenu && (
                <div className="absolute left-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-[500px] bg-white border border-[#E8EAED] rounded-2xl shadow-xl p-4 z-50 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="col-span-full pb-2 border-b border-[#E8EAED] flex items-center justify-between text-xs font-bold text-[#5F6368]">
                    <span>SHOP BY CATEGORY</span>
                    <button onClick={() => setShowCategoriesMenu(false)} className="text-[#5F6368] hover:text-[#202124]"><X size={16} /></button>
                  </div>

                  {categories.filter(c => c.id !== 'all').map(cat => {
                    const IconComp = CATEGORY_ICONS[cat.id] || Grid;
                    const isSelected = selectedCategory === cat.id;

                    return (
                      <div
                        key={cat.id}
                        onClick={() => {
                          onSelectCategory(cat.id);
                          setActiveTab('products');
                          setShowCategoriesMenu(false);
                        }}
                        className={`p-2.5 rounded-xl cursor-pointer transition-all border ${
                          isSelected
                            ? 'bg-[#E8F0FE] border-[#1A73E8] text-[#1A73E8]'
                            : 'bg-white hover:bg-[#F8F9FA] border-[#E8EAED] text-[#202124]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs flex items-center gap-2">
                            <IconComp size={16} className="text-[#1A73E8]" /> {cat.name}
                          </span>
                          <span className="text-[10px] bg-[#F8F9FA] text-[#5F6368] font-bold px-2 py-0.5 rounded-full border border-[#E8EAED]">
                            {cat.count}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Side-by-Side Compare Tool */}
            <button
              onClick={() => setActiveTab('compare')}
              className={`py-2 px-3.5 rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'compare'
                  ? 'bg-[#1A73E8] text-white font-bold'
                  : 'hover:bg-[#F8F9FA] text-[#5F6368] hover:text-[#202124]'
              }`}
            >
              <GitCompare size={15} /> Compare Products
            </button>

            {/* AI Advisor Tab */}
            <button
              onClick={() => setActiveTab('ai-assistant')}
              className={`py-2 px-3.5 rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap font-bold ${
                activeTab === 'ai-assistant'
                  ? 'bg-[#1A73E8] text-white'
                  : 'text-[#1A73E8] hover:bg-[#E8F0FE]'
              }`}
            >
              <Sparkles size={15} /> Ask AI Advisor
            </button>

          </div>

          <div className="hidden lg:flex items-center gap-3 text-xs font-medium text-[#5F6368]">
            <span>Supported Stores:</span>
            <span className="text-[#FF9900] font-bold">Amazon</span>
            <span className="text-[#2874F0] font-bold">Flipkart</span>
            <span className="text-[#10B981] font-bold">Croma</span>
            <span className="text-[#E11D48] font-bold">Reliance Digital</span>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E8EAED] p-4 space-y-4 shadow-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5F6368] w-4 h-4" />
            <input
              type="text"
              placeholder="Search phones, laptops, gadgets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F8F9FA] text-[#202124] text-xs rounded-full pl-9 pr-4 py-2.5 border border-[#E8EAED]"
            />
          </div>

          <div className="space-y-1 text-xs font-semibold text-[#202124]">
            <button
              onClick={() => {
                setActiveTab('products');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-[#F8F9FA] flex items-center gap-2"
            >
              <Grid size={16} className="text-[#1A73E8]" /> Products Catalog
            </button>

            <button
              onClick={() => {
                setActiveTab('deals');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-[#F8F9FA] flex items-center gap-2"
            >
              <Tag size={16} className="text-[#188038]" /> Today's Best Deals
            </button>

            <button
              onClick={() => {
                setActiveTab('price-history');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-[#F8F9FA] flex items-center gap-2"
            >
              <TrendingUp size={16} className="text-[#1A73E8]" /> Price History Graph
            </button>

            <button
              onClick={() => {
                setActiveTab('compare');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-[#F8F9FA] flex items-center gap-2"
            >
              <GitCompare size={16} className="text-[#1A73E8]" /> Compare Products ({compareCount})
            </button>

            <button
              onClick={() => {
                setActiveTab('ai-assistant');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left py-2.5 px-3 rounded-xl bg-[#E8F0FE] text-[#1A73E8] font-bold flex items-center gap-2"
            >
              <Sparkles size={16} /> AI Smart Advisor
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
