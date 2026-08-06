import React from 'react';
import { GitCompare, X, Plus, ExternalLink, CheckCircle2, XCircle, Star, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ComparisonToolProps {
  comparedProducts: Product[];
  allProducts: Product[];
  onRemoveFromCompare: (product: Product) => void;
  onAddProduct: (product: Product) => void;
  onTrackAffiliateClick: (productId: string, store: string) => void;
}

export const ComparisonTool: React.FC<ComparisonToolProps> = ({
  comparedProducts,
  allProducts,
  onRemoveFromCompare,
  onAddProduct,
  onTrackAffiliateClick
}) => {
  const availableToAdd = allProducts.filter(
    p => !comparedProducts.some(cp => cp.id === p.id)
  );

  return (
    <div className="space-y-6">
      {/* Tool Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-2xl border border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-indigo-500/20 text-indigo-400 p-1.5 rounded-lg border border-indigo-500/30">
              <GitCompare size={18} />
            </span>
            <h1 className="text-2xl font-extrabold text-white">Side-by-Side Product Comparison</h1>
          </div>
          <p className="text-xs text-gray-400">
            Compare prices across Amazon, Flipkart, Croma, key specifications, and user ratings for up to 4 items.
          </p>
        </div>

        {comparedProducts.length < 4 && availableToAdd.length > 0 && (
          <div className="relative">
            <select
              onChange={(e) => {
                const prod = availableToAdd.find(p => p.id === e.target.value);
                if (prod) onAddProduct(prod);
                e.target.value = '';
              }}
              defaultValue=""
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl border border-indigo-400 cursor-pointer shadow-lg transition-all"
            >
              <option value="" disabled>+ Add Product to Compare ({comparedProducts.length}/4)</option>
              {availableToAdd.map(p => (
                <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                  {p.brand} - {p.title} (₹{p.bestPrice.toLocaleString('en-IN')})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {comparedProducts.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/60 rounded-2xl border border-white/10 space-y-4">
          <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto text-indigo-400">
            <GitCompare size={32} />
          </div>
          <h3 className="text-lg font-bold text-white">No Products Selected for Comparison</h3>
          <p className="text-xs text-gray-400 max-w-md mx-auto">
            Click the <strong className="text-indigo-400">Compare icon</strong> on product cards in the catalog to add items here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left min-w-[700px]">
            <thead>
              <tr>
                <th className="w-48 p-4 bg-slate-950/80 text-xs font-bold text-gray-400 uppercase tracking-wider rounded-tl-2xl border-b border-r border-white/10">
                  Feature / Specs
                </th>
                {comparedProducts.map(product => (
                  <th key={product.id} className="p-4 bg-slate-900/90 border-b border-r border-white/10 relative min-w-[220px]">
                    <button
                      onClick={() => onRemoveFromCompare(product)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-800 text-gray-400 hover:text-white hover:bg-rose-600 transition-colors"
                      title="Remove"
                    >
                      <X size={14} />
                    </button>

                    <div className="space-y-3 text-center pt-2">
                      <img src={product.mainImage} alt={product.title} className="w-24 h-24 object-contain mx-auto bg-slate-950 p-2 rounded-xl border border-white/10" />
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block">{product.brand}</span>
                      <h4 className="text-xs font-bold text-white line-clamp-2 px-1">{product.title}</h4>
                      
                      <div className="flex items-center justify-center gap-1 text-amber-400 font-bold text-xs">
                        <Star size={13} className="fill-amber-400" />
                        <span>{product.rating}</span>
                        <span className="text-gray-500 font-normal">({product.reviewCount})</span>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-xs">
              {/* Row: Best Price */}
              <tr className="bg-slate-950/40">
                <td className="p-4 font-bold text-gray-300 border-r border-white/10">Lowest Price</td>
                {comparedProducts.map(p => (
                  <td key={p.id} className="p-4 border-r border-white/10 text-center">
                    <div className="text-xl font-extrabold text-emerald-400 font-heading">
                      ₹{p.bestPrice.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[11px] text-gray-400 line-through">₹{p.originalPrice.toLocaleString('en-IN')}</div>
                    {p.stores[0] && (
                      <a
                        href={p.stores[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => onTrackAffiliateClick(p.id, p.stores[0].store)}
                        className="mt-2 inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-[11px] px-3 py-1.5 rounded-lg transition-all"
                      >
                        Buy on {p.stores[0].store} ↗
                      </a>
                    )}
                  </td>
                ))}
              </tr>

              {/* Row: Stores Count */}
              <tr>
                <td className="p-4 font-bold text-gray-300 border-r border-white/10">Stores Compared</td>
                {comparedProducts.map(p => (
                  <td key={p.id} className="p-4 border-r border-white/10 text-center font-semibold text-gray-200">
                    {p.stores.length} Partner Stores
                  </td>
                ))}
              </tr>

              {/* Specs Rows */}
              {['Display', 'Processor', 'Camera', 'RAM & Storage', 'Battery'].map(specKey => (
                <tr key={specKey} className="hover:bg-slate-900/40">
                  <td className="p-4 font-bold text-gray-300 border-r border-white/10">{specKey}</td>
                  {comparedProducts.map(p => (
                    <td key={p.id} className="p-4 border-r border-white/10 text-gray-200">
                      {p.specs[specKey] || '—'}
                    </td>
                  ))}
                </tr>
              ))}

              {/* Pros Row */}
              <tr className="bg-emerald-950/10">
                <td className="p-4 font-bold text-emerald-400 border-r border-white/10">Top Advantages</td>
                {comparedProducts.map(p => (
                  <td key={p.id} className="p-4 border-r border-white/10 space-y-1">
                    {p.pros.map((pro, i) => (
                      <div key={i} className="flex items-start gap-1 text-[11px] text-gray-300">
                        <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </div>
                    ))}
                  </td>
                ))}
              </tr>

              {/* Cons Row */}
              <tr className="bg-rose-950/10">
                <td className="p-4 font-bold text-rose-400 border-r border-white/10">Limitations</td>
                {comparedProducts.map(p => (
                  <td key={p.id} className="p-4 border-r border-white/10 space-y-1">
                    {p.cons.map((con, i) => (
                      <div key={i} className="flex items-start gap-1 text-[11px] text-gray-300">
                        <XCircle size={13} className="text-rose-400 shrink-0 mt-0.5" />
                        <span>{con}</span>
                      </div>
                    ))}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
