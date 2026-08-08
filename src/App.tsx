import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategoryNav } from './components/CategoryNav';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ComparisonTool } from './components/ComparisonTool';
import { DealsHub } from './components/DealsHub';
import { PriceHistorySection } from './components/PriceHistorySection';
import { SmartDealPicks } from './components/SmartDealPicks';
import { HowItWorks } from './components/HowItWorks';
import { BlogSection } from './components/BlogSection';
import { AdminDashboard } from './components/AdminDashboard';
import { NotificationDrawer } from './components/NotificationDrawer';
import { AuthModal } from './components/AuthModal';
import { ProfileSettingsModal } from './components/ProfileSettingsModal';
import { Footer } from './components/Footer';

import { 
  INITIAL_CATEGORIES, 
  INITIAL_PRODUCTS, 
  INITIAL_DEALS, 
  INITIAL_COUPONS, 
  INITIAL_BLOG_POSTS, 
  INITIAL_NOTIFICATIONS 
} from './data/mockData';

import { Product, NotificationItem } from './types';
import { getProductsService, getDealsService, getCouponsService, getAffiliateLogsService, insertProductService } from './services/supabaseService';
import { getCurrentUser, signOutUser, UserProfile } from './services/authService';
import { CheckCircle, Star, Flame, Tag, Grid, ArrowRight } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('shop');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStoreFilter, setSelectedStoreFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high' | 'discount' | 'rating'>('featured');
  const [onlyDeals, setOnlyDeals] = useState<boolean>(false);

  // App Data State
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [deals, setDeals] = useState(INITIAL_DEALS);
  const [coupons, setCoupons] = useState(INITIAL_COUPONS);
  const [affiliateLogs, setAffiliateLogs] = useState<any[]>([]);

  // Selected Detail Modal State
  const [selectedDetailProduct, setSelectedDetailProduct] = useState<Product | null>(null);

  // Compare & Wishlist State
  const [wishlistIds, setWishlistIds] = useState<string[]>(['p1', 'p3']);
  const [comparedProducts, setComparedProducts] = useState<Product[]>([INITIAL_PRODUCTS[0], INITIAL_PRODUCTS[1]]);

  // Notifications State
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [isNotifOpen, setIsNotifOpen] = useState<boolean>(false);

  // User Auth State
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authInitialTab, setAuthInitialTab] = useState<'login' | 'register' | 'forgot'>('login');

  // Profile Settings Modal State
  const [isProfileSettingsOpen, setIsProfileSettingsOpen] = useState<boolean>(false);

  // Admin Stats State
  const [adminStats, setAdminStats] = useState({
    totalProducts: 8,
    totalDeals: 6,
    totalClicks: 24,
    estCommission: 2980
  });

  // Global Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Sync Supabase Data on Load
  useEffect(() => {
    async function loadSupabaseData() {
      const [fetchedProducts, fetchedDeals, fetchedCoupons, fetchedLogs, fetchedUser] = await Promise.all([
        getProductsService(),
        getDealsService(),
        getCouponsService(),
        getAffiliateLogsService(),
        getCurrentUser()
      ]);

      if (fetchedProducts.length > 0) setProducts(fetchedProducts);
      if (fetchedDeals.length > 0) setDeals(fetchedDeals);
      if (fetchedCoupons.length > 0) setCoupons(fetchedCoupons);
      if (fetchedLogs.length > 0) {
        setAffiliateLogs(fetchedLogs);
        setAdminStats(prev => ({
          ...prev,
          totalClicks: fetchedLogs.length,
          estCommission: fetchedLogs.reduce((acc: number, curr: any) => acc + (curr.commission_earned || 250), 0)
        }));
      }
      if (fetchedUser) setUser(fetchedUser);
    }

    loadSupabaseData();
  }, []);

  // Open Auth Modal Helper
  const handleOpenAuth = (tab: 'login' | 'register' | 'forgot' = 'login') => {
    setAuthInitialTab(tab);
    setIsAuthModalOpen(true);
  };

  // Sign Out Helper
  const handleSignOut = async () => {
    await signOutUser();
    setUser(null);
    showToast('Signed out of IntelliBuy');
  };

  // Toggle Wishlist Helper
  const handleToggleWishlist = (productId: string) => {
    setWishlistIds(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to wishlist');
        return [...prev, productId];
      }
    });
  };

  // Toggle Compare Helper
  const handleToggleCompare = (product: Product) => {
    setComparedProducts(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        showToast(`Removed ${product.title} from comparison`);
        return prev.filter(p => p.id !== product.id);
      } else {
        if (prev.length >= 4) {
          showToast('Comparison limit reached (max 4 products)');
          return prev;
        }
        showToast(`Added ${product.title} to comparison tray`);
        return [...prev, product];
      }
    });
  };

  // Track Affiliate Clicks
  const handleTrackAffiliateClick = (productId: string, store: string) => {
    setAdminStats(prev => ({
      ...prev,
      totalClicks: prev.totalClicks + 1,
      estCommission: prev.estCommission + 320
    }));

    const prod = products.find(p => p.id === productId);
    const newLog = {
      id: `clk-${Date.now()}`,
      product_id: productId,
      product_title: prod ? prod.title : 'Tech Device',
      store,
      click_timestamp: new Date().toISOString(),
      commission_earned: 320,
      status: 'Clicked',
      user_region: 'India Visitor'
    };

    setAffiliateLogs(prev => [newLog, ...prev]);
    showToast(`Redirecting to ${store} partner store...`);
  };

  // Add Product from Admin
  const handleAddProduct = (newProd: Product) => {
    setProducts(prev => [newProd, ...prev]);
    setAdminStats(prev => ({
      ...prev,
      totalProducts: prev.totalProducts + 1
    }));

    insertProductService(newProd);
    showToast(`Added ${newProd.title} to catalog`);
  };

  // Delete Product
  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast(`Product deleted`);
  };

  // Filtered & Sorted Products List
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        if (!matchesTitle && !matchesBrand && !matchesCategory) return false;
      }
      if (selectedStoreFilter !== 'all') {
        const hasStore = product.stores.some(st => st.store.toLowerCase() === selectedStoreFilter.toLowerCase());
        if (!hasStore) return false;
      }
      if (onlyDeals && !product.isTodayDeal) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.bestPrice - b.bestPrice;
      if (sortBy === 'price_high') return b.bestPrice - a.bestPrice;
      if (sortBy === 'discount') return b.discountPercentage - a.discountPercentage;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [products, selectedCategory, searchQuery, selectedStoreFilter, sortBy, onlyDeals]);

  const unreadNotifCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#202124] flex flex-col justify-between selection:bg-[#E52E2E] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E2530] text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-[#2D3748]">
          <CheckCircle size={16} className="text-[#E52E2E]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        {/* Header Component */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          products={products}
          categories={INITIAL_CATEGORIES}
          wishlistCount={wishlistIds.length}
          compareCount={comparedProducts.length}
          unreadNotifCount={unreadNotifCount}
          onOpenProduct={(p) => setSelectedDetailProduct(p)}
          onToggleNotif={() => setIsNotifOpen(true)}
          onSelectCategory={(catId) => setSelectedCategory(catId)}
          selectedCategory={selectedCategory}
          user={user}
          onOpenAuth={handleOpenAuth}
          onSignOut={handleSignOut}
          onOpenProfileSettings={() => setIsProfileSettingsOpen(true)}
        />

        {/* Main Body View Content */}
        <main className="max-w-7xl mx-auto px-4 py-6">
          
          {/* HOMEPAGE FLOW & PRODUCTS CATALOG */}
          {(activeTab === 'shop' || activeTab === 'products') && (
            <div className="space-y-8">
              
              {/* 1. Hero Section */}
              <HeroBanner
                featuredProduct={products[0]}
                onOpenProduct={(p) => setSelectedDetailProduct(p)}
                onExploreDeals={() => setActiveTab('deals')}
                onOpenCompare={() => setActiveTab('compare')}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />

              {/* 2. Service Guarantees Strip */}
              <HowItWorks onExploreClick={() => setActiveTab('deals')} />

              {/* 3. MAIN EMARKET TWO-COLUMN LAYOUT (Left Sidebar Widgets + Right Product Grid) */}
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                
                {/* LEFT SIDEBAR WIDGETS (eMarket Style) */}
                <aside className="w-full lg:w-64 shrink-0 space-y-6">
                  
                  {/* LATEST PRODUCTS MINI LIST WIDGET */}
                  <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 shadow-xs space-y-3">
                    <div className="pb-2 border-b border-[#E5E7EB] flex items-center justify-between">
                      <h3 className="text-xs font-black text-[#1E2530] uppercase tracking-wider">LATEST PRICE DROPS</h3>
                      <div className="w-2 h-2 rounded-full bg-[#E52E2E]" />
                    </div>

                    <div className="space-y-3">
                      {products.slice(0, 4).map(p => (
                        <div 
                          key={p.id}
                          onClick={() => setSelectedDetailProduct(p)}
                          className="flex items-center gap-3 cursor-pointer hover:bg-[#F8F9FA] p-1.5 rounded-lg transition-colors border border-transparent hover:border-[#E5E7EB]"
                        >
                          <img src={p.mainImage} alt="" className="w-12 h-12 object-contain bg-[#F4F5F7] p-1 rounded border border-[#E5E7EB]" />
                          <div>
                            <h4 className="text-xs font-bold text-[#1E2530] line-clamp-1 hover:text-[#E52E2E]">{p.title}</h4>
                            <div className="flex items-center gap-1 text-[10px] text-[#F59E0B]">
                              <Star size={10} className="fill-[#F59E0B]" />
                              <span>{p.rating}</span>
                            </div>
                            <div className="text-xs font-black text-[#E52E2E]">₹{p.bestPrice.toLocaleString('en-IN')}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PROMO POSTER WIDGET */}
                  <div className="bg-gradient-to-b from-[#1E2530] to-[#161C24] text-white p-5 rounded-xl text-center space-y-3 shadow-md">
                    <span className="bg-[#E52E2E] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">EXCLUSIVE DEALS</span>
                    <h4 className="text-base font-bold">Tech Accessories</h4>
                    <p className="text-xs text-gray-300">Up to 50% Off on Premium Audio & Chargers</p>
                    <button onClick={() => setActiveTab('deals')} className="btn-primary text-xs font-bold w-full justify-center py-2">
                      Shop Deals Now
                    </button>
                  </div>

                </aside>

                {/* RIGHT MAIN CATALOG GRID */}
                <div className="flex-1 space-y-6 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-xs">
                    <div>
                      <h2 className="text-lg font-black text-[#1E2530] tracking-tight">
                        TRENDING PRODUCTS
                      </h2>
                      <p className="text-xs text-[#5F6368]">
                        Compare prices across Amazon, Flipkart, Croma, and Reliance Digital.
                      </p>
                    </div>

                    {/* Filter Controls Bar */}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                      <select
                        value={selectedStoreFilter}
                        onChange={(e) => setSelectedStoreFilter(e.target.value)}
                        aria-label="Filter products by retailer store"
                        className="bg-[#F8F9FA] text-[#1E2530] text-xs font-bold px-3 py-2 rounded-md border border-[#E5E7EB] focus:outline-none cursor-pointer"
                      >
                        <option value="all">All Stores</option>
                        <option value="Amazon">Amazon</option>
                        <option value="Flipkart">Flipkart</option>
                        <option value="Croma">Croma</option>
                        <option value="Reliance Digital">Reliance Digital</option>
                      </select>

                      <button
                        onClick={() => setOnlyDeals(!onlyDeals)}
                        className={`px-3 py-2 rounded-md border transition-all text-xs font-bold ${
                          onlyDeals
                            ? 'bg-[#E52E2E] text-white border-[#E52E2E]'
                            : 'bg-[#F8F9FA] text-[#5F6368] border-[#E5E7EB] hover:bg-gray-100'
                        }`}
                      >
                        🔥 Deals Only
                      </button>

                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        aria-label="Sort products catalog"
                        className="bg-[#F8F9FA] text-[#1E2530] text-xs font-bold px-3 py-2 rounded-md border border-[#E5E7EB] focus:outline-none cursor-pointer"
                      >
                        <option value="featured">Sort: Featured</option>
                        <option value="price_low">Price: Low to High</option>
                        <option value="price_high">Price: High to Low</option>
                        <option value="discount">Highest Discount %</option>
                        <option value="rating">Top Rated</option>
                      </select>
                    </div>
                  </div>

                  {/* Product Grid (3 cols on desktop, 2 on tablet/mobile) */}
                  {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                      {filteredProducts.map(product => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onOpenDetail={(p) => setSelectedDetailProduct(p)}
                          onToggleWishlist={handleToggleWishlist}
                          isWishlisted={wishlistIds.includes(product.id)}
                          onToggleCompare={handleToggleCompare}
                          isCompared={comparedProducts.some(cp => cp.id === product.id)}
                          onTrackAffiliateClick={handleTrackAffiliateClick}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 bg-white rounded-xl border border-[#E5E7EB] space-y-3">
                      <p className="text-[#5F6368] text-sm font-medium">No products found matching your active filters.</p>
                      <button
                        onClick={() => {
                          setSelectedCategory('all');
                          setSearchQuery('');
                          setSelectedStoreFilter('all');
                          setOnlyDeals(false);
                        }}
                        className="btn-primary text-xs font-bold px-4 py-2"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  )}
                </div>

              </div>

              {/* 4. Price History Section */}
              <PriceHistorySection
                products={products}
                onOpenProduct={(p) => setSelectedDetailProduct(p)}
              />

              {/* 5. Smart Deal Picks */}
              <SmartDealPicks
                products={products}
                onOpenProduct={(p) => setSelectedDetailProduct(p)}
                onTrackAffiliateClick={handleTrackAffiliateClick}
              />

            </div>
          )}

          {/* DEDICATED PRICE HISTORY TAB */}
          {activeTab === 'price-history' && (
            <div className="space-y-6">
              <PriceHistorySection
                products={products}
                onOpenProduct={(p) => setSelectedDetailProduct(p)}
              />
            </div>
          )}

          {/* DEDICATED CATEGORIES TAB */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              <CategoryNav
                categories={INITIAL_CATEGORIES}
                selectedCategory={selectedCategory}
                onSelectCategory={(catId) => {
                  setSelectedCategory(catId);
                  setActiveTab('products');
                }}
              />
            </div>
          )}

          {/* COMPARE PRODUCTS TAB */}
          {activeTab === 'compare' && (
            <ComparisonTool
              comparedProducts={comparedProducts}
              allProducts={products}
              onRemoveFromCompare={(p) => setComparedProducts(prev => prev.filter(cp => cp.id !== p.id))}
              onAddProduct={(p) => handleToggleCompare(p)}
              onTrackAffiliateClick={handleTrackAffiliateClick}
            />
          )}

          {/* DEALS TAB */}
          {activeTab === 'deals' && (
            <DealsHub
              deals={deals}
              coupons={coupons}
              onTrackAffiliateClick={handleTrackAffiliateClick}
            />
          )}

          {/* BUYING GUIDES BLOG TAB */}
          {activeTab === 'blog' && (
            <BlogSection
              posts={INITIAL_BLOG_POSTS}
              products={products}
              onOpenProduct={(p) => setSelectedDetailProduct(p)}
            />
          )}

          {/* ADMIN TAB */}
          {activeTab === 'admin' && (
            <AdminDashboard
              stats={adminStats}
              products={products}
              deals={INITIAL_DEALS}
              affiliateLogs={affiliateLogs}
              onAddProduct={handleAddProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          )}
        </main>
      </div>

      {/* Product Detail Modal */}
      {selectedDetailProduct && (
        <ProductDetailModal
          product={selectedDetailProduct}
          onClose={() => setSelectedDetailProduct(null)}
          onTrackAffiliateClick={handleTrackAffiliateClick}
          onToggleCompare={handleToggleCompare}
          isCompared={comparedProducts.some(cp => cp.id === selectedDetailProduct.id)}
        />
      )}

      {/* Notification Drawer */}
      <NotificationDrawer
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
        notifications={notifications}
        onMarkAsRead={(id) => {
          setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
        }}
      />

      {/* User Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialTab={authInitialTab}
        onLoginSuccess={(loggedInUser) => {
          setUser(loggedInUser);
          showToast(`Welcome back, ${loggedInUser.fullName || loggedInUser.email}!`);
        }}
      />

      {/* Profile Settings Modal */}
      {user && (
        <ProfileSettingsModal
          isOpen={isProfileSettingsOpen}
          onClose={() => setIsProfileSettingsOpen(false)}
          user={user}
          onProfileUpdated={(updatedUser) => {
            setUser(updatedUser);
            showToast('Profile details updated successfully!');
          }}
        />
      )}

      {/* Footer Component */}
      <Footer
        setActiveTab={setActiveTab}
        onSelectCategory={(catId) => {
          setSelectedCategory(catId);
          setActiveTab('products');
        }}
      />
    </div>
  );
}

export default App;
