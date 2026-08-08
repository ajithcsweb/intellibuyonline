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
  Cpu,
  AlertTriangle
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
    <div className="space-y-8">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#E8EAED]">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#5F6368]">
          <Cpu size={16} className="text-[#1A73E8]" />
          <span>Model Engine: <strong>Google Gemini 3.6 Flash</strong></span>
        </div>

        <button
          onClick={() => setShowApiKeyModal(!showApiKeyModal)}
          className="text-xs font-semibold text-[#1A73E8] bg-[#E8F0FE] hover:bg-[#D2E3FC] px-3.5 py-1.5 rounded-full transition-all border border-[#1A73E8]/20 flex items-center gap-1.5"
        >
          <Key size={14} />
          <span>{currentApiKey ? 'Custom Gemini Key Configured' : 'Configure Custom API Key'}</span>
        </button>
      </div>

      {/* Optional Gemini Key Input Panel */}
      {showApiKeyModal && (
        <form onSubmit={handleSaveApiKey} className="bg-white p-5 rounded-2xl border border-[#E8EAED] space-y-3 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-[#202124]">
            <span className="flex items-center gap-1.5"><Key size={14} className="text-[#1A73E8]" /> ENTER GEMINI API KEY</span>
            <button type="button" onClick={() => setShowApiKeyModal(false)} className="text-[#5F6368] hover:text-[#202124]">✕</button>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="password"
              placeholder="AIzaSy..."
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              className="flex-1 bg-[#F8F9FA] text-[#202124] text-xs rounded-full px-4 py-2.5 border border-[#E8EAED] focus:border-[#1A73E8] focus:bg-white focus:outline-none"
            />
            <button
              type="submit"
              className="btn-primary px-4 py-2 text-xs font-bold shrink-0 rounded-full"
            >
              {apiKeySavedSuccess ? <Check size={16} className="text-white" /> : 'Save API Key'}
            </button>
          </div>
        </form>
      )}

      {/* Main Hero Header Banner */}
      <div className="text-center space-y-4 bg-white p-6 sm:p-10 rounded-3xl border border-[#E8EAED] shadow-xs relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8F0FE] text-[#1A73E8] text-xs font-bold uppercase tracking-wider">
          <Sparkles size={14} className="text-[#1A73E8]" /> Next-Gen Google Gemini AI Advisor
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#202124]">Ask IntelliBuy AI</h1>
        <p className="text-xs sm:text-sm text-[#5F6368] max-w-xl mx-auto leading-relaxed">
          Describe your budget or specs. Google Gemini AI synthesizes live product ratings and store prices across Amazon, Flipkart & Croma to find your ideal match.
        </p>

        {/* Prompt Input Field */}
        <div className="max-w-2xl mx-auto relative pt-2">
          <div className="relative flex flex-col sm:flex-row items-center gap-2">
            <input
              type="text"
              placeholder="e.g. Best laptop for video editing under ₹1.5 Lakh..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              className="w-full bg-[#F8F9FA] text-[#202124] text-xs sm:text-sm rounded-full pl-4 pr-4 sm:pr-36 py-3.5 border border-[#E8EAED] focus:border-[#1A73E8] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#1A73E8]/15"
            />
            <button
              onClick={() => handleGenerate()}
              disabled={isGenerating || !prompt.trim()}
              className="w-full sm:w-auto sm:absolute sm:right-2 sm:top-1/2 sm:-translate-y-1/2 btn-primary px-5 py-2.5 text-xs font-bold disabled:opacity-50 justify-center"
            >
              {isGenerating ? (
                <>
                  <RefreshCw size={14} className="animate-spin" /> Gemini AI...
                </>
              ) : (
                <>
                  Ask AI <Send size={13} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
          <span className="text-[11px] text-[#5F6368] font-semibold w-full sm:w-auto">Popular Queries:</span>
          {QUICK_PROMPTS.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPrompt(qp);
                handleGenerate(qp);
              }}
              className="text-[11px] bg-[#F8F9FA] hover:bg-[#E8F0FE] text-[#5F6368] hover:text-[#1A73E8] font-medium px-3 py-1 rounded-full border border-[#E8EAED] transition-all"
            >
              "{qp}"
            </button>
          ))}
        </div>
      </div>

      {/* AI Advice Output Result Container */}
      {response && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8EAED] shadow-xs space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between pb-4 border-b border-[#E8EAED]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#E8F0FE] text-[#1A73E8] flex items-center justify-center font-bold">
                <Bot size={22} />
              </div>
              <div>
                <h3 className="font-bold text-[#202124] text-base sm:text-lg">IntelliBuy Gemini AI Synthesis</h3>
                <p className="text-xs text-[#5F6368]">Synthesized recommendations for: "{prompt || 'Custom Search'}"</p>
              </div>
            </div>

            <span className="text-[10px] bg-[#E6F4EA] text-[#188038] font-bold px-2.5 py-1 rounded-full border border-[#CEEAD6] flex items-center gap-1">
              <ShieldCheck size={12} /> Verified Recommendations
            </span>
          </div>

          <div className="prose max-w-none text-xs sm:text-sm text-[#202124] leading-relaxed whitespace-pre-line bg-[#F8F9FA] p-5 rounded-2xl border border-[#E8EAED]">
            {response.summary}
          </div>

          {/* Recommended Products Grid */}
          {response.recommendedProducts && response.recommendedProducts.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-[#5F6368] uppercase tracking-wider">Top Matched Products</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {response.recommendedProducts.map(p => (
                  <div
                    key={p.id}
                    onClick={() => onOpenProduct(p)}
                    className="material-card p-4 rounded-2xl bg-white border border-[#E8EAED] hover:border-[#BDC1C6] cursor-pointer flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <img src={p.mainImage} alt={p.title} className="w-16 h-16 object-contain bg-[#F8F9FA] p-1.5 rounded-xl border border-[#E8EAED]" />
                      <div>
                        <span className="text-[10px] font-bold text-[#1A73E8] uppercase">{p.brand}</span>
                        <h5 className="text-xs font-bold text-[#202124] line-clamp-2">{p.title}</h5>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#E8EAED]">
                      <span className="text-base font-bold text-[#188038]">₹{p.bestPrice.toLocaleString('en-IN')}</span>
                      <button className="btn-secondary text-[11px] font-bold px-3 py-1">View Deal</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
