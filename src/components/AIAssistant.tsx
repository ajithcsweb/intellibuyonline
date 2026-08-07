import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  ExternalLink, 
  RefreshCw, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Key,
  Check,
  Cpu
} from 'lucide-react';
import { Product } from '../types';
import { 
  fetchGeminiAdvice, 
  getStoredGeminiApiKey, 
  setStoredGeminiApiKey, 
  GeminiAdviceResult 
} from '../services/geminiService';

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
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [currentApiKey, setCurrentApiKey] = useState('');
  const [apiKeySavedSuccess, setApiKeySavedSuccess] = useState(false);

  const [response, setResponse] = useState<GeminiAdviceResult | null>(null);

  useEffect(() => {
    const key = getStoredGeminiApiKey();
    setCurrentApiKey(key);
    setApiKeyInput(key);
  }, []);

  const QUICK_PROMPTS = [
    'Best flagship camera phone under ₹1,40,000',
    'Best laptop for video editing & coding',
    'Top ANC earbuds for gym & travel',
    'Best 55-inch OLED gaming TV'
  ];

  const handleSaveApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    setStoredGeminiApiKey(apiKeyInput);
    setCurrentApiKey(apiKeyInput.trim());
    setApiKeySavedSuccess(true);
    setTimeout(() => {
      setApiKeySavedSuccess(false);
      setShowApiKeyModal(false);
    }, 1200);
  };

  const handleGenerate = async (customQuery?: string) => {
    const q = customQuery || prompt;
    if (!q.trim()) return;

    setIsGenerating(true);

    try {
      const res = await fetchGeminiAdvice(q, products);
      setResponse(res);
    } catch (err) {
      console.error('Failed to generate AI advice:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Gemini Engine Banner Status Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/90 p-4 rounded-2xl border border-indigo-500/30 text-xs shadow-lg">
        <div className="flex items-center gap-2 text-indigo-300 font-bold">
          <Cpu size={18} className="text-indigo-400 animate-pulse shrink-0" />
          <span>Google Gemini AI Engine:</span>
          {currentApiKey ? (
            <span className="bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-extrabold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              Connected (Gemini 2.5 Flash)
            </span>
          ) : (
            <span className="bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/30 font-semibold">
              Default Engine (Add API Key for live Gemini REST)
            </span>
          )}
        </div>

        <button
          onClick={() => setShowApiKeyModal(!showApiKeyModal)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-600/30 transition-all font-bold"
        >
          <Key size={14} className="text-indigo-400" />
          <span>{currentApiKey ? 'Change Gemini Key' : 'Configure Gemini API Key'}</span>
        </button>
      </div>

      {/* API Key Modal / Expandable Box */}
      {showApiKeyModal && (
        <form onSubmit={handleSaveApiKey} className="bg-slate-900 border border-indigo-500/40 p-5 rounded-2xl space-y-3 shadow-2xl animate-slideDown text-xs">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-white flex items-center gap-1.5">
              <Key size={16} className="text-indigo-400" /> Google Gemini API Credentials
            </h4>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:underline font-bold flex items-center gap-1 text-[11px]"
            >
              Get Free Gemini API Key <ExternalLink size={12} />
            </a>
          </div>
          <p className="text-gray-400 text-[11px]">
            Enter your Google Gemini API Key to run live generative AI model inference directly on your website catalog. Key is stored locally in your browser.
          </p>
          <div className="flex items-center gap-2">
            <input
              type="password"
              placeholder="AIzaSy..."
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              className="flex-1 bg-slate-950 text-white rounded-xl px-3 py-2.5 border border-white/10 focus:border-indigo-500 focus:outline-none"
            />
            <button
              type="submit"
              className="glow-btn px-4 py-2.5 font-extrabold shrink-0"
            >
              {apiKeySavedSuccess ? <Check size={16} className="text-emerald-300" /> : 'Save API Key'}
            </button>
          </div>
        </form>
      )}

      {/* Main Header Hero Banner */}
      <div className="text-center space-y-3 bg-gradient-to-b from-indigo-950/80 via-slate-900 to-slate-900 p-8 rounded-3xl border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30 uppercase tracking-widest">
          <Sparkles size={14} className="text-indigo-400 animate-spin" /> Next-Gen Google Gemini Product Advisor
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">Ask IntelliBuy AI</h1>
        <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto">
          Describe your budget, preferred features, or use-case. Google Gemini AI cross-references live products and store prices across Amazon, Flipkart & Croma to synthesize ideal recommendations.
        </p>

        {/* Prompt Input Field */}
        <div className="max-w-2xl mx-auto relative pt-4">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="e.g. Find me the best laptop for video editing under ₹1.5 Lakh with OLED screen..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              className="w-full bg-slate-950 text-white text-sm rounded-2xl pl-4 pr-36 py-4 border border-indigo-500/40 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 shadow-2xl placeholder:text-gray-500"
            />
            <button
              onClick={() => handleGenerate()}
              disabled={isGenerating || !prompt.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 glow-btn px-4 py-2.5 text-xs font-extrabold disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw size={14} className="animate-spin" /> Gemini AI...
                </>
              ) : (
                <>
                  Ask Gemini AI <Send size={14} />
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

      {/* AI Result Presentation Display Section */}
      {response && (
        <div className="bg-slate-900/90 border border-indigo-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-fadeIn">
          {/* AI Header Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/40 shrink-0">
                <Bot size={22} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-white text-base">IntelliBuy Gemini AI Synthesis</h3>
                  {response.isRealGemini ? (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-extrabold px-2 py-0.5 rounded border border-emerald-500/30">
                      ⚡ Google Gemini 2.5 Flash
                    </span>
                  ) : (
                    <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-bold px-2 py-0.5 rounded border border-indigo-500/30">
                      Smart Catalog AI Engine
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-gray-400">Query: "{response.query}"</p>
              </div>
            </div>
            <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-3 py-1 rounded-full border border-emerald-500/30 shrink-0">
              ✓ Verified Live Catalog Prices
            </span>
          </div>

          {/* AI Summary Text */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold text-indigo-400 uppercase tracking-wider font-heading">
              Market Inventory & Technical Analysis
            </h4>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-white/5">
              {response.summary}
            </p>
          </div>

          {/* Recommended Products Display Grid */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold text-indigo-400 uppercase tracking-wider font-heading">
              Matched Top Product Recommendations ({response.recommendedProducts.length})
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
          <div className="bg-indigo-950/40 border border-indigo-500/30 p-4 rounded-xl text-xs text-indigo-200 leading-relaxed font-medium flex items-start gap-2">
            <span className="text-base leading-none">💡</span>
            <div>
              <strong className="text-indigo-300 font-extrabold block mb-0.5">Gemini AI Final Buying Verdict:</strong>
              {response.verdict}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
