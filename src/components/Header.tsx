import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Sparkles, 
  GitCompare, 
  Heart, 
  Bell, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  Grid, 
  Tag, 
  TrendingUp, 
  Flame, 
  ShieldCheck, 
  LogOut, 
  Smartphone, 
  Laptop, 
  Headphones, 
  Watch, 
  Tv, 
  Camera, 
  Gamepad2, 
  Home, 
  Keyboard, 
  Zap,
  PhoneCall,
  List
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
  const [showCategoryDrawer, setShowCategoryDrawer] = useState(false);
  const [searchCategory, setSearchCategory] = useState('all');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categoryDrawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryDrawerRef.current && !categoryDrawerRef.current.contains(event.target as Node)) {
        setShowCategoryDrawer(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = searchQuery.trim()
    ? products.filter(p => {
        const matchesCategory = searchCategory === 'all' || p.category === searchCategory;
        const matchesQuery = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             p.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesQuery;
      }).slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E5E7EB] shadow-xs">
      {/* 1. TOP DARK NAVY UTILITY BAR */}
      <div className="bg-[#1E2530] text-gray-300 text-[11px] py-1.5 px-4 border-b border-[#2D3748]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 truncate">
            <span className="bg-[#E52E2E] text-white font-bold px-2 py-0.5 rounded text-[10px] uppercase shrink-0">
              NEW OFFER
            </span>
            <span className="truncate text-gray-200">
              Welcome to IntelliBuy | Compare prices across Amazon, Flipkart, Croma & Reliance Digital! Coupon: <strong>HAPPY2026</strong>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-5 text-gray-300 font-semibold shrink-0">
            <div className="flex items-center gap-1">
              <span>🇮🇳 English / INR</span>
            </div>

            <div className="flex items-center gap-1 text-gray-300">
              <PhoneCall size={12} className="text-[#E52E2E]" />
              <span>Hotline: <strong>+91 1800 123 4567</strong></span>
            </div>

            {user ? (
              <span className="text-gray-300">Hi, <strong>{user.fullName || user.email.split('@')[0]}</strong></span>
            ) : (
              <button onClick={() => onOpenAuth('login')} className="hover:text-white flex items-center gap-1 text-gray-300">
                <User size={12} /> Login or Register
              </button>
            )}

            <button 
              onClick={() => setActiveTab('admin')} 
              className="text-[#E52E2E] hover:underline flex items-center gap-1 font-bold"
            >
              <ShieldCheck size={13} /> Admin
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER ROW (Logo, Category Dropdown, Search Bar, Quick Actions) */}
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Mobile Hamburger Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-md bg-[#F4F5F7] text-[#1E2530] border border-[#E5E7EB]"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Brand Logo */}
        <div 
          onClick={() => {
            onSelectCategory('all');
            setActiveTab('shop');
          }}
          className="flex items-center gap-2 cursor-pointer shrink-0"
        >
          <div className="w-10 h-10 rounded-lg bg-[#E52E2E] flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-black text-2xl tracking-tight text-[#1E2530]">
                Intelli<span className="text-[#E52E2E]">Buy</span>
              </span>
              <span className="text-[10px] font-black bg-[#E52E2E] text-white px-1.5 py-0.5 rounded">
                .in
              </span>
            </div>
            <p className="text-[10px] text-[#5F6368] font-bold hidden sm:block">
              Compare before you buy.
            </p>
          </div>
        </div>

        {/* INTEGRATED MULTI-CATEGORY SEARCH BAR */}
        <div className="relative flex-1 max-w-2xl hidden lg:block">
          <div className="flex items-center border-2 border-[#E52E2E] rounded-md overflow-hidden bg-white shadow-xs">
            
            {/* Search Category Dropdown */}
            <select
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              className="bg-[#F8F9FA] text-[#1E2530] text-xs font-bold px-3 py-3 border-r border-[#E5E7EB] outline-none cursor-pointer hover:bg-[#F1F5F9]"
            >
              <option value="all">All Categories</option>
              {categories.filter(c => c.id !== 'all').map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            {/* Input Field */}
            <input
              type="text"
              placeholder="Enter your keyword to compare prices across stores..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              className="w-full text-[#202124] text-xs px-4 py-3 outline-none placeholder:text-gray-400"
            />

            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="px-2 text-gray-400 hover:text-[#202124]"
              >
                <X size={16} />
              </button>
            )}

            {/* Coral Red Search Action Button */}
            <button 
              onClick={() => setActiveTab('products')}
              className="bg-[#E52E2E] hover:bg-[#C62828] text-white px-6 py-3 font-bold text-xs transition-colors flex items-center justify-center shrink-0"
            >
              <Search size={18} />
            </button>
          </div>

          {/* Search Dropdown Results */}
          {showSearchDropdown && searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-[#E5E7EB] rounded-lg shadow-xl overflow-hidden z-50">
              <div className="px-3.5 py-2 text-[11px] font-bold text-gray-500 border-b border-[#E5E7EB] flex items-center justify-between bg-[#F4F5F7]">
                <span>MATCHED PRODUCTS</span>
                <span>{searchResults.length} items</span>
              </div>
              {searchResults.map(product => (
                <div
                  key={product.id}
                  onClick={() => {
                    onOpenProduct(product);
                    setShowSearchDropdown(false);
                  }}
                  className="p-3 border-b border-[#E5E7EB] hover:bg-[#F8F9FA] cursor-pointer flex items-center justify-between gap-3 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img src={product.mainImage} alt="" className="w-10 h-10 object-contain bg-[#F4F5F7] p-1 rounded" />
                    <div>
                      <span className="text-[10px] font-bold text-[#E52E2E] uppercase">{product.brand}</span>
                      <h4 className="text-xs font-bold text-[#1E2530] line-clamp-1">{product.title}</h4>
                    </div>
                  </div>
                  <span className="text-xs font-black text-[#E52E2E] shrink-0">₹{product.bestPrice.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT QUICK ACTIONS (Compare, Wishlist, User Menu) */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          
          {/* Compare Badge */}
          <button
            onClick={() => setActiveTab('compare')}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F4F5F7] text-[#1E2530] relative"
            title="Side-by-Side Compare Tray"
          >
            <div className="relative">
              <GitCompare size={22} className="text-[#1E2530]" />
              {compareCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#E52E2E] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {compareCount}
                </span>
              )}
            </div>
            <div className="hidden xl:block text-left text-[11px] leading-tight">
              <span className="text-gray-400 block text-[10px]">Compare</span>
              <span className="font-bold text-[#1E2530]">{compareCount} Items</span>
            </div>
          </button>

          {/* Wishlist Badge */}
          <button
            onClick={() => setActiveTab('products')}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F4F5F7] text-[#1E2530] relative"
            title="Saved Wishlist"
          >
            <div className="relative">
              <Heart size={22} className="text-[#1E2530]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#E52E2E] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </div>
            <div className="hidden xl:block text-left text-[11px] leading-tight">
              <span className="text-gray-400 block text-[10px]">Wishlist</span>
              <span className="font-bold text-[#1E2530]">{wishlistCount} Saved</span>
            </div>
          </button>

          {/* Notifications */}
          <button
            onClick={onToggleNotif}
            className="p-2 rounded-lg hover:bg-[#F4F5F7] text-[#1E2530] relative"
            title="Price Alerts"
          >
            <Bell size={22} />
            {unreadNotifCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#E52E2E] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {unreadNotifCount}
              </span>
            )}
          </button>

          {/* User Account Button */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1.5 rounded-lg border border-[#E5E7EB] hover:bg-[#F4F5F7] transition-all"
              >
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt="" className="w-8 h-8 rounded-md object-cover border border-[#E52E2E]" />
                ) : (
                  <div className="w-8 h-8 rounded-md bg-[#E52E2E] text-white flex items-center justify-center font-bold text-xs uppercase">
                    {user.fullName ? user.fullName[0] : user.email[0]}
                  </div>
                )}
                <ChevronDown size={14} className="text-gray-500" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-[#E5E7EB] rounded-xl shadow-xl p-2.5 z-50 space-y-1 text-xs">
                  <div className="pb-2 border-b border-[#E5E7EB] px-2">
                    <p className="font-bold text-[#1E2530] truncate">{user.fullName || 'Member'}</p>
                    <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      onOpenProfileSettings();
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#F4F5F7] text-[#1E2530] font-semibold flex items-center gap-2"
                  >
                    <User size={15} className="text-[#E52E2E]" /> Profile Settings
                  </button>
                  <button
                    onClick={() => {
                      onSignOut();
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#FEF2F2] text-[#E52E2E] font-semibold flex items-center gap-2"
                  >
                    <LogOut size={15} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => onOpenAuth('login')}
              className="bg-[#E52E2E] text-white text-xs font-bold px-4 py-2 rounded-md hover:bg-[#C62828] transition-colors shrink-0"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* 3. SECONDARY DARK NAVY NAVIGATION BAR WITH VIBRANT RED "ALL DEPARTMENTS" BUTTON */}
      <div className="bg-[#1E2530] border-t border-[#2D3748] text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
          
          <div className="flex items-center gap-4">
            {/* VIBRANT RED "ALL CATEGORIES" BUTTON (EMARKET STYLE) */}
            <div className="relative" ref={categoryDrawerRef}>
              <button
                onClick={() => setShowCategoryDrawer(!showCategoryDrawer)}
                className="bg-[#E52E2E] hover:bg-[#C62828] text-white text-xs font-black uppercase px-5 py-3.5 flex items-center gap-3 transition-colors shadow-md cursor-pointer"
              >
                <List size={18} />
                <span>ALL CATEGORIES</span>
                <ChevronDown size={14} className={`ml-2 transition-transform ${showCategoryDrawer ? 'rotate-180' : ''}`} />
              </button>

              {/* Vertical Category Sidebar Drawer */}
              {showCategoryDrawer && (
                <div className="absolute left-0 top-full mt-0 w-64 bg-white text-[#1E2530] border border-[#E5E7EB] shadow-2xl z-50 py-2 rounded-b-xl">
                  {categories.filter(c => c.id !== 'all').map(cat => {
                    const IconComp = CATEGORY_ICONS[cat.id] || Grid;
                    const isSelected = selectedCategory === cat.id;

                    return (
                      <div
                        key={cat.id}
                        onClick={() => {
                          onSelectCategory(cat.id);
                          setActiveTab('products');
                          setShowCategoryDrawer(false);
                        }}
                        className={`px-4 py-2.5 hover:bg-[#FEF2F2] hover:text-[#E52E2E] cursor-pointer flex items-center justify-between text-xs font-bold transition-colors ${
                          isSelected ? 'bg-[#FEF2F2] text-[#E52E2E]' : 'text-[#1E2530]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <IconComp size={16} className="text-[#E52E2E]" />
                          <span>{cat.name}</span>
                        </div>
                        <span className="text-[10px] text-gray-400 font-semibold">{cat.count}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Horizontal Nav Links */}
            <nav className="hidden md:flex items-center gap-1 text-xs font-bold uppercase tracking-wider py-1">
              <button
                onClick={() => {
                  onSelectCategory('all');
                  setActiveTab('products');
                }}
                className={`px-4 py-2.5 rounded transition-colors ${
                  activeTab === 'products' ? 'bg-[#E52E2E] text-white' : 'hover:bg-[#2D3748] text-gray-200'
                }`}
              >
                PRODUCTS
              </button>

              <button
                onClick={() => setActiveTab('deals')}
                className={`px-4 py-2.5 rounded transition-colors flex items-center gap-1.5 ${
                  activeTab === 'deals' ? 'bg-[#E52E2E] text-white' : 'hover:bg-[#2D3748] text-gray-200'
                }`}
              >
                <span>TODAY'S DEALS</span>
                <span className="bg-[#E52E2E] text-white text-[9px] px-1.5 py-0.2 rounded font-black">HOT</span>
              </button>

              <button
                onClick={() => setActiveTab('price-history')}
                className={`px-4 py-2.5 rounded transition-colors flex items-center gap-1.5 ${
                  activeTab === 'price-history' ? 'bg-[#E52E2E] text-white' : 'hover:bg-[#2D3748] text-gray-200'
                }`}
              >
                <span>PRICE HISTORY</span>
                <span className="bg-[#3B82F6] text-white text-[9px] px-1.5 py-0.2 rounded font-black">NEW</span>
              </button>

              <button
                onClick={() => setActiveTab('compare')}
                className={`px-4 py-2.5 rounded transition-colors ${
                  activeTab === 'compare' ? 'bg-[#E52E2E] text-white' : 'hover:bg-[#2D3748] text-gray-200'
                }`}
              >
                COMPARE
              </button>

              <button
                onClick={() => setActiveTab('blog')}
                className={`px-4 py-2.5 rounded transition-colors ${
                  activeTab === 'blog' ? 'bg-[#E52E2E] text-white' : 'hover:bg-[#2D3748] text-gray-200'
                }`}
              >
                BUYING GUIDES
              </button>
            </nav>
          </div>

          <div className="hidden xl:flex items-center gap-2 text-xs font-semibold text-gray-300">
            <span>Verified Partners:</span>
            <span className="text-[#FF9900] font-bold">Amazon</span>
            <span>•</span>
            <span className="text-[#3B82F6] font-bold">Flipkart</span>
            <span>•</span>
            <span className="text-[#10B981] font-bold">Croma</span>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER NAVIGATION */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E5E7EB] p-4 space-y-4 shadow-lg text-xs font-bold text-[#1E2530]">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F4F5F7] text-[#1E2530] text-xs rounded-md pl-4 pr-4 py-2.5 border border-[#E5E7EB]"
            />
          </div>

          <div className="space-y-1">
            <button
              onClick={() => {
                setActiveTab('products');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left py-2.5 px-3 rounded-md hover:bg-[#FEF2F2] hover:text-[#E52E2E] flex items-center gap-2"
            >
              <Grid size={16} className="text-[#E52E2E]" /> Products Catalog
            </button>

            <button
              onClick={() => {
                setActiveTab('deals');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left py-2.5 px-3 rounded-md hover:bg-[#FEF2F2] hover:text-[#E52E2E] flex items-center gap-2"
            >
              <Tag size={16} className="text-[#E52E2E]" /> Today's Deals
            </button>

            <button
              onClick={() => {
                setActiveTab('price-history');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left py-2.5 px-3 rounded-md hover:bg-[#FEF2F2] hover:text-[#E52E2E] flex items-center gap-2"
            >
              <TrendingUp size={16} className="text-[#E52E2E]" /> Price History
            </button>

            <button
              onClick={() => {
                setActiveTab('compare');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left py-2.5 px-3 rounded-md hover:bg-[#FEF2F2] hover:text-[#E52E2E] flex items-center gap-2"
            >
              <GitCompare size={16} className="text-[#E52E2E]" /> Compare Products ({compareCount})
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
