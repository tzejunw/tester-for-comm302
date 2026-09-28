import React, { useState } from 'react';
import { CommunityIdea, MarketItem } from '../types/market';
import { COMMUNITY_IDEAS, ALL_ITEMS } from '../data/mockMarketData';

interface IdeasScreenProps {
  onSelectTickerBySymbol: (symbol: string) => void;
}

export const IdeasScreen: React.FC<IdeasScreenProps> = ({ onSelectTickerBySymbol }) => {
  const [ideas, setIdeas] = useState<CommunityIdea[]>(COMMUNITY_IDEAS);
  const [activeFilter, setActiveFilter] = useState<'all' | 'long' | 'short'>('all');
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  // New idea form state
  const [newTitle, setNewTitle] = useState('');
  const [newSymbol, setNewSymbol] = useState('NVDA');
  const [newSentiment, setNewSentiment] = useState<'long' | 'short'>('long');
  const [newContent, setNewContent] = useState('');

  const filteredIdeas = ideas.filter((idea) => {
    if (activeFilter === 'long') return idea.sentiment === 'long';
    if (activeFilter === 'short') return idea.sentiment === 'short';
    return true;
  });

  const toggleLike = (id: string) => {
    setLikedMap((prev) => {
      const isLiked = !prev[id];
      setIdeas((currentIdeas) =>
        currentIdeas.map((idea) => {
          if (idea.id === id) {
            return {
              ...idea,
              likes: isLiked ? idea.likes + 1 : idea.likes - 1
            };
          }
          return idea;
        })
      );
      return { ...prev, [id]: isLiked };
    });
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const created: CommunityIdea = {
      id: `idea-${Date.now()}`,
      author: {
        name: 'You (Trader)',
        username: 'trader_pro',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces',
        badge: 'PRO',
        reputation: 1250
      },
      symbol: newSymbol.toUpperCase(),
      title: newTitle,
      sentiment: newSentiment,
      timeframe: 'Daily',
      timestamp: 'Just now',
      content: newContent,
      likes: 1,
      comments: 0,
      tags: ['Technical Analysis', 'Community'],
      entryPrice: ALL_ITEMS.find((i) => i.symbol === newSymbol)?.price || 100
    };

    setIdeas([created, ...ideas]);
    setNewTitle('');
    setNewContent('');
    setIsPublishModalOpen(false);
  };

  return (
    <div className="flex-1 pb-24 px-4 pt-4">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Community Ideas
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Trading setups & market analysis from top traders
          </p>
        </div>

        <button
          onClick={() => setIsPublishModalOpen(true)}
          className="flex items-center gap-1 bg-[#2962ff] text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-blue-700 active:scale-95 transition-all shadow-xs cursor-pointer"
          type="button"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Publish</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto no-scrollbar py-0.5">
        {(['all', 'long', 'short'] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            type="button"
            className={`px-3.5 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors cursor-pointer ${
              activeFilter === filter
                ? 'bg-black text-white dark:bg-white dark:text-black font-bold shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {filter === 'all' ? 'All Ideas' : filter === 'long' ? '🟢 Bullish / Long' : '🔴 Bearish / Short'}
          </button>
        ))}
      </div>

      {/* Ideas Feed */}
      <div className="space-y-4">
        {filteredIdeas.map((idea) => {
          const isLiked = likedMap[idea.id];
          return (
            <div
              key={idea.id}
              className="bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-2xl p-4 shadow-xs"
            >
              {/* Author Row */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex items-center justify-center font-bold text-xs text-slate-700 dark:text-slate-200">
                    {idea.author.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {idea.author.name}
                      </span>
                      {idea.author.badge && (
                        <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-blue-50 text-[#2962ff] dark:bg-blue-900/30">
                          {idea.author.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400">
                      @{idea.author.username} • {idea.timestamp}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onSelectTickerBySymbol(idea.symbol)}
                    className="text-xs font-extrabold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    {idea.symbol}
                  </button>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      idea.sentiment === 'long'
                        ? 'bg-[#e6f4f1] text-[#089981] dark:bg-[#089981]/20'
                        : 'bg-[#fde8eb] text-[#f23645] dark:bg-[#f23645]/20'
                    }`}
                  >
                    {idea.sentiment}
                  </span>
                </div>
              </div>

              {/* Title & Content */}
              <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                {idea.title}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                {idea.content}
              </p>

              {/* Target / Trade Setup Pills if any */}
              {idea.entryPrice && (
                <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-2.5 mb-3 flex items-center justify-between text-[11px] font-mono tabular-nums">
                  <div>
                    <span className="text-slate-400">Entry: </span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">${idea.entryPrice}</span>
                  </div>
                  {idea.targetPrice && (
                    <div>
                      <span className="text-slate-400">Target: </span>
                      <span className="font-semibold text-[#089981]">${idea.targetPrice}</span>
                    </div>
                  )}
                  {idea.stopLoss && (
                    <div>
                      <span className="text-slate-400">Stop: </span>
                      <span className="font-semibold text-[#f23645]">${idea.stopLoss}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Action buttons footer */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
                <button
                  onClick={() => toggleLike(idea.id)}
                  className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isLiked ? 'text-red-500 font-bold' : 'hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <svg
                    className={`w-4 h-4 ${isLiked ? 'fill-current' : 'fill-none'}`}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span>{idea.likes}</span>
                </button>

                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <span>{idea.comments} comments</span>
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    alert('Idea link copied to clipboard!');
                  }}
                  className="hover:text-slate-900 dark:hover:text-slate-200 cursor-pointer"
                >
                  Share
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Publish Idea Modal */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1e222d] border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-sm p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Publish Trade Idea</h3>
              <button
                onClick={() => setIsPublishModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePublish} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Ticker Symbol
                </label>
                <input
                  type="text"
                  value={newSymbol}
                  onChange={(e) => setNewSymbol(e.target.value.toUpperCase())}
                  placeholder="e.g. NVDA, SPX, BTC"
                  className="w-full bg-[#f0f3fa] dark:bg-slate-800 text-slate-900 dark:text-white text-xs rounded-xl px-3 py-2 border-none focus:ring-2 focus:ring-blue-500 font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Sentiment
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewSentiment('long')}
                    className={`py-2 text-xs font-bold rounded-xl border transition-colors cursor-pointer ${
                      newSentiment === 'long'
                        ? 'bg-[#089981] text-white border-transparent'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    Bullish / Long
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewSentiment('short')}
                    className={`py-2 text-xs font-bold rounded-xl border transition-colors cursor-pointer ${
                      newSentiment === 'short'
                        ? 'bg-[#f23645] text-white border-transparent'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    Bearish / Short
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Key catalyst or technical pattern"
                  className="w-full bg-[#f0f3fa] dark:bg-slate-800 text-slate-900 dark:text-white text-xs rounded-xl px-3 py-2 border-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Analysis & Thesis
                </label>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Explain your support levels, targets, or macroeconomic catalyst..."
                  rows={3}
                  className="w-full bg-[#f0f3fa] dark:bg-slate-800 text-slate-900 dark:text-white text-xs rounded-xl px-3 py-2 border-none focus:ring-2 focus:ring-blue-500 resize-none"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#2962ff] text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
                >
                  Share to Community
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
