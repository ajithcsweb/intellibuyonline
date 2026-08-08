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
import { AIAssistant } from './components/AIAssistant';
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
  INITIAL_AFFILIATE_LOGS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_ADMIN_STATS 
} from './data/mockData';
import { Product, StoreName, AffiliateClickLog, NotificationItem, Deal, Coupon } from './types';
import { SlidersHorizontal, ArrowUpDown, Filter, Sparkles, CheckCircle, ExternalLink } from 'lucide-react';
import { 
  getProductsService, 
  getDealsService, 
  getCouponsService, 
  insertProductService, 
  logAffiliateClickService, 
  getAffiliateLogsService 
} from './services/supabaseService';
import { getCurrentUser, signOutUser, UserProfile } from './services/authService';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('shop');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // User Auth State
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isProfileSettingsOpen, setIsProfileSettingsOpen] = useState<boolean>(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register' | 'forgot'>('login');

  // Filters State
  const [selectedStoreFilter, setSelectedStoreFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high' | 'discount' | 'rating'>('featured');
  const [onlyDeals, setOnlyDeals] = useState<boolean>(false);

  // Products & User Data State
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['prod-1']);
  const [comparedProducts, setComparedProducts] = useState<Product[]>([INITIAL_PRODUCTS[0], INITIAL_PRODUCTS[1]]);
  const [selectedDetailProduct, setSelectedDetailProduct] = useState<Product | null>(null);

  // Notifications & Admin State
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [isNotifOpen, setIsNotifOpen] = useState<boolean>(false);
  const [affiliateLogs, setAffiliateLogs] = useState<AffiliateClickLog[]>(INITIAL_AFFILIATE_LOGS);
  const [adminStats, setAdminStats] = useState(INITIAL_ADMIN_STATS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load live data & user session from Supabase on mount
  useEffect(() => {
    async function loadSupabaseData() {
      const [fetchedProducts, fetchedDeals, fetchedCoupons, fetchedLogs, fetchedUser] = await Promise.all([
        getProductsService(),
        getDealsService(),
        getCouponsService(),
        getAffiliateLogsService(),
        getCurrentUser()
      ]);

      if (fetchedUser) setUser(fetchedUser);

      if (fetchedProducts && fetchedProducts.length > 0) {
        setProducts(fetchedProducts);
        setComparedProducts([fetchedProducts[0], fetchedProducts[1] || fetchedProducts[0]]);
        setAdminStats(prev => ({ ...prev, totalProducts: fetchedProducts.length }));
      }
      if (fetchedDeals && fetchedDeals.length > 0) setDeals(fetchedDeals);
      if (fetchedCoupons && fetchedCoupons.length > 0) setCoupons(fetchedCoupons);
      if (fetchedLogs && fetchedLogs.length > 0) {
        setAffiliateLogs(fetchedLogs);
        setAdminStats(prev => ({ ...prev, totalAffiliateClicks: fetchedLogs.length }));
      }
    }
    loadSupabaseData();
  }, []);

  const handleOpenAuth = (tab: 'login' | 'register' | 'forgot' = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const handleSignOut = async () => {
    await signOutUser();
    setUser(null);
    showToast('Signed out successfully.');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Affiliate Click Tracker
  const handleTrackAffiliateClick = (productId: string, store: StoreName | string) => {
    const prod = products.find(p => p.id === productId);
    const storeObj = prod?.stores.find(s => s.store === store);

    const logEntry: AffiliateClickLog = {
      id: `log-${Date.now()}`,
      productId,
      productTitle: prod ? prod.title : 'Product',
      store: store as StoreName,
      timestamp: new Date().toISOString(),
      commissionEarned: storeObj ? Math.round(storeObj.price * 0.035) : 150,
      status: 'Clicked',
      userRegion: 'IN-MH'
    };

    setAffiliateLogs(prev => [logEntry, ...prev]);
    setAdminStats(prev => ({
      ...prev,
      totalAffiliateClicks: prev.totalAffiliateClicks + 1
    }));

    // Async log to Supabase
    logAffiliateClickService(logEntry);
  };

  // Toggle Wishlist
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds(prev => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`Removed from Wishlist`);
        return prev.filter(id => id !== product.id);
      } else {
        showToast(`Saved ${product.title} to Wishlist`);
        return [...prev, product.id];
      }
    });
  };

  // Toggle Compare
  const handleToggleCompare = (product: Product) => {
    setComparedProducts(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        showToast(`Removed from Compare list`);
        return prev.filter(p => p.id !== product.id);
      } else {
        if (prev.length >= 4) {
          showToast(`You can compare up to 4 products simultaneously`);
          return prev;
        }
        showToast(`Added ${product.title} to Compare tray`);
        return [...prev, product];
      }
    });
  };

  // Add Product from Admin
  const handleAddProduct = (newProdData: Partial<Product>) => {
    const newProd: Product = {
      id: `prod-${Date.now()}`,
      title: newProdData.title || 'New Product',
      slug: (newProdData.title || 'new-product').toLowerCase().replace(/\s+/g, '-'),
      brand: newProdData.brand || 'Brand',
      category: newProdData.category || 'smartphones',
      subcategory: newProdData.subcategory || 'Standard',
      mainImage: newProdData.mainImage || '',
      galleryImages: newProdData.galleryImages || [],
      bestPrice: newProdData.bestPrice || 9999,
      originalPrice: newProdData.originalPrice || 11999,
      discountPercentage: newProdData.discountPercentage || 15,
      rating: 4.5,
      reviewCount: 1,
      stores: newProdData.stores || [],
      specs: newProdData.specs || {},
      pros: newProdData.pros || [],
      cons: newProdData.cons || [],
      priceHistory: newProdData.priceHistory || [],
      createdDate: new Date().toISOString().slice(0, 10)
    };

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
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        if (!matchesTitle && !matchesBrand && !matchesCategory) return false;
      }
      // Store filter
      if (selectedStoreFilter !== 'all') {
        const hasStore = product.stores.some(st => st.store.toLowerCase() === selectedStoreFilter.toLowerCase());
        if (!hasStore) return false;
      }
      // Today deals filter
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
    <div className="min-h-screen bg-[#F8F9FA] text-[#202124] flex flex-col justify-between selection:bg-[#1A73E8] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#202124] text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2">
          <CheckCircle size={16} className="text-[#188038]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        {/* Main Header */}
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
        <main className="max-w-7xl mx-auto px-4 py-8">
          
          {/* HOMEPAGE FLOW & PRODUCTS CATALOG */}
          {(activeTab === 'shop' || activeTab === 'products') && (
            <div className="space-y-12">
              
              {/* 1. Hero Section */}
              <HeroBanner
                featuredProduct={products[0]}
                onOpenProduct={(p) => setSelectedDetailProduct(p)}
                onExploreDeals={() => setActiveTab('deals')}
                onOpenCompare={() => setActiveTab('compare')}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />

              {/* 2. Shop by Category */}
              <CategoryNav
                categories={INITIAL_CATEGORIES}
                selectedCategory={selectedCategory}
                onSelectCategory={(catId) => {
                  setSelectedCategory(catId);
                  setActiveTab('products');
                }}
              />

              {/* 3. Today's Best Deals & Filter Bar */}
              <section className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#202124] tracking-tight">
                      Today's Best Deals
                    </h2>
                    <p className="text-sm text-[#5F6368] mt-1">
                      Hand-picked products worth checking today. Compare prices across stores.
                    </p>
                  </div>

                  {/* Filter Controls Bar */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                    <select
                      value={selectedStoreFilter}
                      onChange={(e) => setSelectedStoreFilter(e.target.value)}
                      aria-label="Filter products by retailer store"
                      className="bg-white text-[#202124] text-xs font-semibold px-3 py-2 rounded-full border border-[#E8EAED] focus:outline-none focus:border-[#1A73E8] cursor-pointer shadow-xs"
                    >
                      <option value="all">All Stores</option>
                      <option value="Amazon">Amazon</option>
                      <option value="Flipkart">Flipkart</option>
                      <option value="Croma">Croma</option>
                      <option value="Reliance Digital">Reliance Digital</option>
                    </select>

                    <button
                      onClick={() => setOnlyDeals(!onlyDeals)}
                      className={`px-3 py-2 rounded-full border transition-all ${
                        onlyDeals
                          ? 'bg-[#188038] text-white border-[#188038]'
                          : 'bg-white text-[#5F6368] border-[#E8EAED] hover:bg-[#F8F9FA]'
                      }`}
                    >
                      🔥 Deals Only
                    </button>

                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      aria-label="Sort products catalog"
                      className="bg-white text-[#202124] text-xs font-semibold px-3 py-2 rounded-full border border-[#E8EAED] focus:outline-none focus:border-[#1A73E8] cursor-pointer shadow-xs"
                    >
                      <option value="featured">Sort: Featured</option>
                      <option value="price_low">Price: Low to High</option>
                      <option value="price_high">Price: High to Low</option>
                      <option value="discount">Highest Discount %</option>
                      <option value="rating">Top Rated</option>
                    </select>
                  </div>
                </div>

                {/* Product Grid (4 desktop, 3 tablet, 2 mobile) */}
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
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
                  <div className="text-center py-16 bg-white rounded-3xl border border-[#E8EAED] space-y-3">
                    <p className="text-[#5F6368] text-sm">No products found matching your active filters.</p>
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
              </section>

              {/* 4. Price History Component */}
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

              {/* 6. How IntelliBuy Works */}
              <HowItWorks
                onExploreClick={() => setActiveTab('deals')}
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

          {/* AI ADVISOR TAB */}
          {activeTab === 'ai-assistant' && (
            <AIAssistant
              products={products}
              onOpenProduct={(p) => setSelectedDetailProduct(p)}
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

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialTab={authModalTab}
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
            showToast('Profile updated successfully!');
          }}
        />
      )}

      {/* Notifications Drawer */}
      <NotificationDrawer
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
        notifications={notifications}
        onMarkAllRead={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
      />

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onSelectCategory={(catId) => setSelectedCategory(catId)}
      />
    </div>
  );
}

export default App;
