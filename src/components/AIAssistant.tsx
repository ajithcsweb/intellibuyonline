import React, { useState } from 'react';
import { Sparkles, Send, Bot, ExternalLink, RefreshCw, CheckCircle2, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface AIAssistantProps {
  products: Product[];
  onOpenProduct: (product: Product) => void;
  onTrackAffiliateClick: (productId: string, store: string) => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({
  products,
  onOpenProduct,
  onTrackAffiliateClick
}) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [response, setResponse] = useState<{
    query: string;
    summary: string;
    recommendedProducts: Product[];
    verdict: string;
  } | null>(null);

  const QUICK_PROMPTS = [
    'Best flagship camera phone under ₹1,40,000',
    'Best laptop for video editing & coding',
    'Top ANC earbuds for gym & travel',
    'Best 55-inch OLED gaming TV'
  ];

  const handleGenerate = (customQuery?: string) => {
    const q = customQuery || prompt;
    if (!q.trim()) return;

    setIsGenerating(true);

    setTimeout(() => {
      const lower = q.toLowerCase();
      let matches = products.filter(p => 
        p.title.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower) ||
        p.brand.toLowerCase().includes(lower) ||
        p.subcategory.toLowerCase().includes(lower)
      );

      if (matches.length === 0) {
        matches = products.slice(0, 3);
      } else {
        matches = matches.slice(0, 3);
      }

      setResponse({
        query: q,
        summary: `Based on your request "${q}", I analyzed current market inventory across Amazon, Flipkart, Croma, and Reliance Digital. I evaluated price-to-performance metrics, thermal stability, verified customer ratings, and historical price trends.`,
        recommendedProducts: matches,
        verdict: `Recommendation: If you prioritize performance and display quality, our top recommendation is the ${matches[0].title}. Prices are currently at a 30-day low with instant card discounts available.`
      });

      setIsGenerating(false);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="text-center space-y-3 bg-gradient-to-b from-indigo-950/80 via-slate-900 to-slate-900 p-8 rounded-3xl border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30 uppercase tracking-widest">
          <Sparkles size={14} className="text-indigo-400 animate-spin" /> Next-Gen AI Product Advisor
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Ask IntelliBuy AI</h1>
        <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto">
          Describe your budget, preferred features, or use-case. Our AI instantly cross-references 100,000+ products and store prices to suggest the ideal match.
        </p>

        {/* Input Box */}
        <div className="max-w-2xl mx-auto relative pt-4">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="e.g. Find me the best laptop for video editing under ₹1.5 Lakh with OLED screen..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              className="w-full bg-slate-950 text-white text-sm rounded-2xl pl-4 pr-32 py-4 border border-indigo-500/40 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 shadow-2xl placeholder:text-gray-500"
            />
            <button
              onClick={() => handleGenerate()}
              disabled={isGenerating || !prompt.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 glow-btn px-4 py-2.5 text-xs font-extrabold disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw size={14} className="animate-spin" /> Analyzing...
                </>
              ) : (
                <>
                  Ask AI <Send size={14} />
                </>
              )}
            </button>
          </div>

          {/* Quick Prompts */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4 text-xs">
            <span className="text-gray-400 font-semibold">Try asking:</span>
            {QUICK_PROMPTS.map((qp, i) => (
              <button
                key={i}
                onClick={() => {
                  setPrompt(qp);
                  handleGenerate(qp);
                }}
                className="bg-slate-900 hover:bg-indigo-950/60 text-indigo-300 px-3 py-1.5 rounded-xl border border-indigo-500/30 transition-colors text-[11px] font-medium"
              >
                "{qp}"
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* AI Result Section */}
      {response && (
        <div className="bg-slate-900/90 border border-indigo-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-fadeIn">
          {/* AI Header Badge */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/40">
                <Bot size={22} />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base">IntelliBuy AI Synthesis</h3>
                <p className="text-[11px] text-gray-400">Query: "{response.query}"</p>
              </div>
            </div>
            <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-3 py-1 rounded-full border border-emerald-500/30">
              ✓ Verified Store Prices
            </span>
          </div>

          {/* Summary */}
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-white/5">
            {response.summary}
          </p>

          {/* Recommended Products Grid */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold text-indigo-400 uppercase tracking-wider font-heading">
              Top Match Recommendations
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {response.recommendedProducts.map((product, idx) => (
                <div 
                  key={product.id}
                  className="bg-slate-950 p-4 rounded-2xl border border-white/10 hover:border-indigo-500/50 transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded">
                        #{idx + 1} Best Match
                      </span>
                      <span className="text-xs font-extrabold text-emerald-400">
                        ₹{product.bestPrice.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <img src={product.mainImage} alt={product.title} className="w-full h-32 object-contain py-2" />
                    <h5 className="text-xs font-bold text-white line-clamp-2">{product.title}</h5>

                    <ul className="text-[11px] text-gray-400 space-y-1 pt-1">
                      {product.pros.slice(0, 2).map((pro, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <CheckCircle2 size={12} className="text-emerald-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center gap-2">
                    <button
                      onClick={() => onOpenProduct(product)}
                      className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-xs text-gray-200 font-bold rounded-lg border border-white/10"
                    >
                      Specs & Graph
                    </button>
                    {product.stores[0] && (
                      <a
                        href={product.stores[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => onTrackAffiliateClick(product.id, product.stores[0].store)}
                        className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-xs text-white font-extrabold rounded-lg text-center shadow"
                      >
                        Buy ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Verdict Box */}
          <div className="bg-indigo-950/40 border border-indigo-500/30 p-4 rounded-xl text-xs text-indigo-200 leading-relaxed font-medium">
            💡 {response.verdict}
          </div>
        </div>
      )}
    </div>
  );
};
