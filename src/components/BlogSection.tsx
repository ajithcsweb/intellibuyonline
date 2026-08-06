import React, { useState } from 'react';
import { BookOpen, Clock, User, ArrowRight, Tag, Share2, ArrowLeft, Sparkles, ExternalLink } from 'lucide-react';
import { BlogPost, Product } from '../types';

interface BlogSectionProps {
  posts: BlogPost[];
  products: Product[];
  onOpenProduct: (product: Product) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  posts,
  products,
  onOpenProduct
}) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  if (selectedPost) {
    const relatedProd = products.find(p => p.id === selectedPost.relatedProductId);

    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
        <button
          onClick={() => setSelectedPost(null)}
          className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 bg-slate-900 px-4 py-2 rounded-xl border border-white/10"
        >
          <ArrowLeft size={16} /> Back to All Buying Guides
        </button>

        {/* Article Container */}
        <div className="bg-slate-900/90 rounded-3xl border border-white/10 p-6 md:p-10 space-y-6">
          <div className="space-y-3">
            <span className="badge-tag badge-indigo">{selectedPost.category}</span>
            <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight font-heading">
              {selectedPost.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 border-b border-white/10 pb-4">
              <span className="flex items-center gap-1 text-white font-semibold">
                <User size={14} className="text-indigo-400" /> {selectedPost.author} ({selectedPost.authorRole})
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock size={14} /> {selectedPost.readTime}
              </span>
              <span>•</span>
              <span>Published: {selectedPost.date}</span>
            </div>
          </div>

          <div className="h-72 sm:h-96 rounded-2xl overflow-hidden border border-white/10 relative">
            <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
          </div>

          {/* Article Body Content */}
          <div className="prose prose-invert max-w-none text-gray-300 text-sm leading-relaxed space-y-4 whitespace-pre-line">
            {selectedPost.content}
          </div>

          {/* Embedded Related Product Box */}
          {relatedProd && (
            <div className="bg-gradient-to-r from-indigo-950/80 to-slate-900 border border-indigo-500/40 rounded-2xl p-5 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img src={relatedProd.mainImage} alt={relatedProd.title} className="w-16 h-16 object-contain bg-slate-950 p-2 rounded-xl border border-white/10" />
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase">Featured In This Article</span>
                  <h4 className="text-sm font-bold text-white line-clamp-1">{relatedProd.title}</h4>
                  <span className="text-base font-extrabold text-emerald-400 font-heading">₹{relatedProd.bestPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={() => onOpenProduct(relatedProd)}
                className="glow-btn px-4 py-2 text-xs font-bold shrink-0"
              >
                Compare Prices ↗
              </button>
            </div>
          )}

          {/* Article Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/10">
            <span className="text-xs font-bold text-gray-400">Tags:</span>
            {selectedPost.tags.map((tag, i) => (
              <span key={i} className="text-[11px] bg-slate-950 text-indigo-300 px-3 py-1 rounded-lg border border-white/5">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-slate-900/80 p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="text-emerald-400" size={20} />
            <h1 className="text-2xl font-extrabold text-white">Buying Guides & Tech Reviews</h1>
          </div>
          <p className="text-xs text-gray-400">
            In-depth comparisons, camera tests, and buying advice written by tech analysts to help you make informed decisions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map(post => (
          <div
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="glass-card overflow-hidden cursor-pointer border border-white/10 hover:border-indigo-500/40 bg-slate-900/90 flex flex-col justify-between"
          >
            <div>
              <div className="h-48 overflow-hidden relative">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 badge-tag badge-indigo shadow">
                  {post.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                </div>

                <h3 className="text-lg font-bold text-white hover:text-indigo-300 transition-colors">
                  {post.title}
                </h3>

                <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                  {post.summary}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between text-xs font-bold text-indigo-400">
              <span>Read Full Article</span>
              <ArrowRight size={16} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
