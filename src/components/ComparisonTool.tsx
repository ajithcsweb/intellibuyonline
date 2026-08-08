import React from 'react';
import { GitCompare, X, Plus, ExternalLink, Star } from 'lucide-react';
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#E8EAED] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#E8F0FE] text-[#1A73E8] p-2 rounded-xl border border-[#1A73E8]/20">
              <GitCompare size={18} />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-[#202124]">Side-by-Side Product Comparison</h1>
          </div>
          <p className="text-xs text-[#5F6368]">
            Compare prices across Amazon, Flipkart, Croma, key specifications, and ratings for up to 4 products.
          </p>
        </div>

        {comparedProducts.length < 4 && availableToAdd.length > 0 && (
          <div className="relative w-full sm:w-auto">
            <select
              onChange={(e) => {
                const prod = availableToAdd.find(p => p.id === e.target.value);
                if (prod) onAddProduct(prod);
                e.target.value = '';
              }}
              defaultValue=""
              aria-label="Add product to comparison list"
              className="w-full sm:w-auto btn-primary text-xs font-semibold px-4 py-2.5 rounded-full cursor-pointer shadow-xs"
            >
              <option value="" disabled>+ Add Product to Compare ({comparedProducts.length}/4)</option>
              {availableToAdd.map(p => (
                <option key={p.id} value={p.id} className="bg-white text-[#202124]">
                  {p.brand} - {p.title} (₹{p.bestPrice.toLocaleString('en-IN')})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {comparedProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#E8EAED] space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#E8F0FE] text-[#1A73E8] border border-[#1A73E8]/20 flex items-center justify-center mx-auto">
            <GitCompare size={28} />
          </div>
          <h3 className="text-lg font-bold text-[#202124]">No Products Selected for Comparison</h3>
          <p className="text-xs text-[#5F6368] max-w-md mx-auto">
            Click the <strong className="text-[#1A73E8]">Compare icon</strong> on product cards in the catalog to add items here.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#E8EAED] overflow-x-auto shadow-xs">
          <table className="w-full border-collapse text-left min-w-[650px]">
            <thead>
              <tr>
                <th className="w-44 p-4 bg-[#F8F9FA] text-xs font-bold text-[#5F6368] uppercase tracking-wider border-b border-r border-[#E8EAED]">
                  Product Specs
                </th>
                {comparedProducts.map(product => (
                  <th key={product.id} className="p-4 bg-white border-b border-r border-[#E8EAED] relative min-w-[200px]">
                    <button
                      onClick={() => onRemoveFromCompare(product)}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-[#F8F9FA] text-[#5F6368] hover:text-[#D93025] hover:bg-[#FCE8E6] transition-colors border border-[#E8EAED]"
                      title="Remove"
                    >
                      <X size={14} />
                    </button>

                    <div className="space-y-2 text-center pt-2">
                      <img src={product.mainImage} alt={product.title} className="w-20 h-20 object-contain mx-auto bg-[#F8F9FA] p-2 rounded-xl border border-[#E8EAED]" />
                      <span className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-widest block">{product.brand}</span>
                      <h4 className="text-xs font-bold text-[#202124] line-clamp-2 px-1">{product.title}</h4>
                      
                      <div className="flex items-center justify-center gap-1 text-[#F9AB00] font-bold text-xs">
                        <Star size={13} className="fill-[#F9AB00]" />
                        <span>{product.rating}</span>
                        <span className="text-[#5F6368] font-normal">({product.reviewCount})</span>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8EAED] text-xs">
              {/* Best Price Row */}
              <tr>
                <td className="p-4 font-bold text-[#202124] bg-[#F8F9FA] border-r border-[#E8EAED]">Lowest Price</td>
                {comparedProducts.map(p => (
                  <td key={p.id} className="p-4 text-center border-r border-[#E8EAED]">
                    <div className="text-lg font-bold text-[#188038]">₹{p.bestPrice.toLocaleString('en-IN')}</div>
                    <div className="text-[11px] text-[#5F6368] line-through">₹{p.originalPrice.toLocaleString('en-IN')}</div>
                  </td>
                ))}
              </tr>

              {/* Retailers List Row */}
              <tr>
                <td className="p-4 font-bold text-[#202124] bg-[#F8F9FA] border-r border-[#E8EAED]">Stores Compared</td>
                {comparedProducts.map(p => (
                  <td key={p.id} className="p-3 border-r border-[#E8EAED]">
                    <div className="space-y-1.5">
                      {p.stores.map((st, i) => (
                        <div key={i} className="flex items-center justify-between p-1.5 rounded-lg bg-[#F8F9FA] text-[11px]">
                          <span className="font-semibold text-[#202124]">{st.store}</span>
                          <div className="flex items-center gap-1">
                            <span className="font-bold text-[#188038]">₹{st.price.toLocaleString('en-IN')}</span>
                            <a
                              href={st.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => onTrackAffiliateClick(p.id, st.store)}
                              className="text-[#1A73E8] font-bold hover:underline"
                            >
                              Buy↗
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Specifications Rows */}
              {['Display', 'Processor', 'RAM & Storage', 'Battery', 'Camera'].map(specKey => (
                <tr key={specKey}>
                  <td className="p-4 font-bold text-[#202124] bg-[#F8F9FA] border-r border-[#E8EAED]">{specKey}</td>
                  {comparedProducts.map(p => (
                    <td key={p.id} className="p-4 text-[#5F6368] border-r border-[#E8EAED]">
                      {p.specs[specKey] || 'N/A'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
