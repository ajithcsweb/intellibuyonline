import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategoryNav } from './components/CategoryNav';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ComparisonTool } from './components/ComparisonTool';
import { DealsHub } from './components/DealsHub';
import { AIAssistant } from './components/AIAssistant';
import { BlogSection } from './components/BlogSection';
import { AdminDashboard } from './components/AdminDashboard';
import { NotificationDrawer } from './components/NotificationDrawer';
import { AuthModal } from './components/AuthModal';
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
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Track Affiliate Click
  const handleTrackAffiliateClick = (productId: string, store: string) => {
    const targetProduct = products.find(p => p.id === productId);
    const newLog: AffiliateClickLog = {
      id: `log-${Date.now()}`,
      productId,
      productTitle: targetProduct?.title || 'Unknown Product',
      store: store as StoreName,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      commissionEarned: Math.round((targetProduct?.bestPrice || 10000) * 0.02),
      status: 'Clicked',
      userRegion: 'Live Visitor'
    };

    setAffiliateLogs(prev => [newLog, ...prev]);
    setAdminStats(prev => ({
      ...prev,
      totalAffiliateClicks: prev.totalAffiliateClicks + 1
    }));

    // Async log into Supabase
    logAffiliateClickService(newLog);

    showToast(`Redirecting to ${store} with affiliate tracking...`);
  };

  // Toggle Wishlist
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds(prev => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`Removed ${product.title} from Wishlist`);
        return prev.filter(id => id !== product.id);
      } else {
        showToast(`Added ${product.title} to Wishlist`);
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
      category: newProdData.category || 'mobiles',
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

    // Async save to Supabase
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
      return 0; // featured default
    });
  }, [products, selectedCategory, searchQuery, selectedStoreFilter, sortBy, onlyDeals]);

  const unreadNotifCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-indigo-500/50 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle size={16} className="text-emerald-400" />
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
        />

        {/* Main Body View Content */}
        <main className="max-w-7xl mx-auto px-4 py-6">
          {activeTab === 'shop' && (
            <div className="space-y-6">
              {/* Hero Banner */}
              <HeroBanner
                featuredProduct={products[0]}
                onOpenProduct={(p) => setSelectedDetailProduct(p)}
                onOpenAI={() => setActiveTab('ai-assistant')}
              />

              {/* Category Pills Navigation */}
              <CategoryNav
                categories={INITIAL_CATEGORIES}
                selectedCategory={selectedCategory}
                onSelectCategory={(catId) => setSelectedCategory(catId)}
              />

              {/* Filter Controls Bar */}
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-semibold">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <Filter size={15} className="text-indigo-400" />
                    <span>Store:</span>
                  </div>
                  {['all', 'Amazon', 'Flipkart', 'Croma'].map(st => (
                    <button
                      key={st}
                      onClick={() => setSelectedStoreFilter(st)}
                      className={`px-3 py-1.5 rounded-xl border transition-all capitalize ${
                        selectedStoreFilter === st
                          ? 'bg-indigo-600 text-white border-indigo-400'
                          : 'bg-slate-950/60 text-gray-300 border-white/10 hover:border-white/20'
                      }`}
                    >
                      {st}
                    </button>
                  ))}

                  <button
                    onClick={() => setOnlyDeals(!onlyDeals)}
                    className={`px-3 py-1.5 rounded-xl border transition-all ${
                      onlyDeals
                        ? 'bg-rose-600 text-white border-rose-400'
                        : 'bg-slate-950/60 text-gray-300 border-white/10'
                    }`}
                  >
                    🔥 Today's Deals Only
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-gray-400 flex items-center gap-1">
                    <ArrowUpDown size={14} /> Sort By:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-slate-950 text-white text-xs font-semibold px-3 py-1.5 rounded-xl border border-white/10 focus:outline-none focus:border-indigo-400 cursor-pointer"
                  >
                    <option value="featured">Featured Deals</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="discount">Highest Discount %</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>

              {/* Product Grid */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-gray-400 font-semibold">
                  <span>Showing {filteredProducts.length} verified comparison results</span>
                  {selectedCategory !== 'all' && (
                    <span className="text-indigo-400 capitalize font-bold">Category: {selectedCategory}</span>
                  )}
                </div>

                {filteredProducts.length > 0 ? (
                  <div className="grid-products">
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
                  <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-white/10 space-y-3">
                    <p className="text-gray-400 text-sm">No products found matching your active filters.</p>
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setSearchQuery('');
                        setSelectedStoreFilter('all');
                        setOnlyDeals(false);
                      }}
                      className="glow-btn px-4 py-2 text-xs font-bold"
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'compare' && (
            <ComparisonTool
              comparedProducts={comparedProducts}
              allProducts={products}
              onRemoveFromCompare={(p) => setComparedProducts(prev => prev.filter(cp => cp.id !== p.id))}
              onAddProduct={(p) => handleToggleCompare(p)}
              onTrackAffiliateClick={handleTrackAffiliateClick}
            />
          )}

          {activeTab === 'deals' && (
            <DealsHub
              deals={deals}
              coupons={coupons}
              onTrackAffiliateClick={handleTrackAffiliateClick}
            />
          )}

          {activeTab === 'ai-assistant' && (
            <AIAssistant
              products={products}
              onOpenProduct={(p) => setSelectedDetailProduct(p)}
              onTrackAffiliateClick={handleTrackAffiliateClick}
            />
          )}

          {activeTab === 'blog' && (
            <BlogSection
              posts={INITIAL_BLOG_POSTS}
              products={products}
              onOpenProduct={(p) => setSelectedDetailProduct(p)}
            />
          )}

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

      {/* User Auth Membership Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialTab={authModalTab}
        onLoginSuccess={(loggedInUser) => {
          setUser(loggedInUser);
          showToast(`Welcome back, ${loggedInUser.fullName || loggedInUser.email}!`);
        }}
      />

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
