import React, { useState } from 'react';
import { 
  ShieldCheck, 
  DollarSign, 
  MousePointerClick, 
  TrendingUp, 
  Package, 
  Tag, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  RefreshCw, 
  Globe, 
  Activity, 
  Database, 
  FileText,
  Search
} from 'lucide-react';
import { Product, AdminStats, AffiliateClickLog, Deal } from '../types';

interface AdminDashboardProps {
  stats: AdminStats;
  products: Product[];
  deals: Deal[];
  affiliateLogs: AffiliateClickLog[];
  onAddProduct: (product: Partial<Product>) => void;
  onDeleteProduct: (id: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  stats,
  products,
  deals,
  affiliateLogs,
  onAddProduct,
  onDeleteProduct
}) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'deals' | 'cron'>('analytics');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newBrand, setNewBrand] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('mobiles');

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;

    const priceNum = parseFloat(newPrice);
    onAddProduct({
      title: newTitle,
      brand: newBrand || 'Generic',
      category: newCategory,
      subcategory: 'Standard',
      bestPrice: priceNum,
      originalPrice: Math.round(priceNum * 1.15),
      discountPercentage: 15,
      rating: 4.5,
      reviewCount: 1,
      mainImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
      galleryImages: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80'],
      stores: [
        {
          store: 'Amazon',
          price: priceNum,
          originalPrice: Math.round(priceNum * 1.15),
          discount: 15,
          url: 'https://www.amazon.in',
          inStock: true,
          shipping: 'Free Shipping'
        }
      ],
      specs: { 'Display': 'FHD+ OLED', 'Processor': 'Octa-Core' },
      pros: ['Great performance'],
      cons: ['Average speaker'],
      priceHistory: [
        { date: 'Aug 1', amazon: priceNum, flipkart: priceNum, croma: priceNum }
      ]
    });

    setNewTitle('');
    setNewBrand('');
    setNewPrice('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900/90 p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">IntelliBuy Admin Control Center</h1>
            <p className="text-xs text-gray-400">
              Manage 100,000+ affiliate catalog items, multi-merchant API keys, link redirection logs & cron background automation.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="glow-btn px-4 py-2.5 text-xs font-extrabold shrink-0"
        >
          <Plus size={16} /> Add New Product
        </button>
      </div>

      {/* Analytics KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Total Catalog Products</span>
            <Package size={18} className="text-indigo-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-heading">
            {stats.totalProducts.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-emerald-400 font-semibold">100% Synced with Stores</span>
        </div>

        <div className="bg-slate-900/80 p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Total Affiliate Clicks</span>
            <MousePointerClick size={18} className="text-purple-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-heading">
            {stats.totalAffiliateClicks.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-indigo-400 font-semibold">+18.4% this week</span>
        </div>

        <div className="bg-slate-900/80 p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Conversion Rate</span>
            <TrendingUp size={18} className="text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400 font-heading">
            {stats.conversionRate}%
          </div>
          <span className="text-[11px] text-emerald-400 font-semibold">Top Store: {stats.topStore}</span>
        </div>

        <div className="bg-slate-900/80 p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Estimated Commission</span>
            <DollarSign size={18} className="text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-400 font-heading">
            ₹{stats.totalRevenue.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-amber-300 font-semibold">Ready for Payout</span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2 text-xs font-bold">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`py-2 px-4 rounded-xl transition-all ${
            activeTab === 'analytics' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          Affiliate Click Logs
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`py-2 px-4 rounded-xl transition-all ${
            activeTab === 'products' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          Product Catalog ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('cron')}
          className={`py-2 px-4 rounded-xl transition-all ${
            activeTab === 'cron' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          Cron Jobs & System Automation
        </button>
      </div>

      {/* Tab 1: Affiliate Click Logs */}
      {activeTab === 'analytics' && (
        <div className="bg-slate-900/90 rounded-2xl border border-white/10 p-5 space-y-4">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Live Affiliate Tracking Logs</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 uppercase text-[10px] font-bold">
                  <th className="py-2.5 px-3">Log ID</th>
                  <th className="py-2.5 px-3">Target Product</th>
                  <th className="py-2.5 px-3">Merchant</th>
                  <th className="py-2.5 px-3">Timestamp</th>
                  <th className="py-2.5 px-3">Region</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Earned Commission</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium">
                {affiliateLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-950/40">
                    <td className="py-3 px-3 font-mono text-indigo-400">{log.id}</td>
                    <td className="py-3 px-3 text-white max-w-xs truncate">{log.productTitle}</td>
                    <td className="py-3 px-3 font-bold text-amber-400">{log.store}</td>
                    <td className="py-3 px-3 text-gray-400">{log.timestamp}</td>
                    <td className="py-3 px-3 text-gray-300">{log.userRegion}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                        log.status === 'Converted' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-indigo-500/20 text-indigo-400'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-extrabold text-emerald-400">
                      ₹{log.commissionEarned.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Product Catalog Manager */}
      {activeTab === 'products' && (
        <div className="bg-slate-900/90 rounded-2xl border border-white/10 p-5 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 uppercase text-[10px] font-bold">
                  <th className="py-2.5 px-3">Product</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Best Price</th>
                  <th className="py-2.5 px-3">Stores</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-slate-950/40">
                    <td className="py-3 px-3 flex items-center gap-3">
                      <img src={p.mainImage} alt="" className="w-10 h-10 object-contain bg-slate-950 p-1 rounded" />
                      <div>
                        <div className="font-bold text-white line-clamp-1">{p.title}</div>
                        <span className="text-[10px] text-gray-400">{p.brand}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-indigo-300 font-bold uppercase">{p.category}</td>
                    <td className="py-3 px-3 font-extrabold text-emerald-400">₹{p.bestPrice.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-3 text-gray-300">{p.stores.length} Stores</td>
                    <td className="py-3 px-3 text-right space-x-2">
                      <button 
                        onClick={() => onDeleteProduct(p.id)}
                        className="p-1.5 rounded bg-rose-600/20 text-rose-400 hover:bg-rose-600 hover:text-white transition-colors"
                        title="Delete product"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Cron Jobs & Automation Status */}
      {activeTab === 'cron' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/90 rounded-2xl border border-white/10 p-5 space-y-4">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <Activity size={16} className="text-emerald-400" /> Active Background Cron Tasks
            </h3>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Price & Stock Updater</div>
                  <span className="text-gray-400 text-[11px]">Interval: Every 15 mins (Amazon, Flipkart)</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">Active</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Broken Affiliate Link Scanner</div>
                  <span className="text-gray-400 text-[11px]">Interval: Daily at Midnight</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">Active</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Dynamic XML Sitemap Generator</div>
                  <span className="text-gray-400 text-[11px]">Interval: Every 6 hours</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">Active</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/90 rounded-2xl border border-white/10 p-5 space-y-4">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <Globe size={16} className="text-indigo-400" /> SEO & Indexing Monitor
            </h3>
            
            <div className="space-y-3 text-xs text-gray-300">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span>Indexed Product Pages:</span>
                <strong className="text-white">104,280 URLs</strong>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span>Google Search Console Health:</span>
                <strong className="text-emerald-400">100% Healthy</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Canonical Tags & Schema Markup:</span>
                <strong className="text-indigo-400">Enabled (Product & Offer)</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content p-6 max-w-md" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-white mb-4">Add New Product to Catalog</h3>
            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="text-gray-400 font-bold block mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sony WH-1000XM5 Headphones"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full bg-slate-950 text-white p-2.5 rounded-xl border border-white/10"
                />
              </div>

              <div>
                <label className="text-gray-400 font-bold block mb-1">Brand</label>
                <input
                  type="text"
                  placeholder="e.g. Sony"
                  value={newBrand}
                  onChange={e => setNewBrand(e.target.value)}
                  className="w-full bg-slate-950 text-white p-2.5 rounded-xl border border-white/10"
                />
              </div>

              <div>
                <label className="text-gray-400 font-bold block mb-1">Best Price (INR ₹)</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 24990"
                  value={newPrice}
                  onChange={e => setNewPrice(e.target.value)}
                  className="w-full bg-slate-950 text-white p-2.5 rounded-xl border border-white/10"
                />
              </div>

              <div>
                <label className="text-gray-400 font-bold block mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                  className="w-full bg-slate-950 text-white p-2.5 rounded-xl border border-white/10"
                >
                  <option value="mobiles">Mobiles</option>
                  <option value="laptops">Laptops</option>
                  <option value="earbuds">Earbuds & Audio</option>
                  <option value="smartwatches">Smart Watches</option>
                  <option value="tvs font-bold">TVs</option>
                </select>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-full py-2 bg-slate-800 text-gray-300 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="glow-btn w-full justify-center py-2 text-xs"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
