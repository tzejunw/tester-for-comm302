import React, { useState } from 'react';
import { MarketItem, AssetCategory } from '../types/market';
import { ALL_ITEMS } from '../data/mockMarketData';
import { TickerIcon } from './TickerIcon';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTicker: (item: MarketItem) => void;
  onAddToWatchlist: (item: MarketItem) => void;
  watchlistSymbols: string[];
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTicker,
  onAddToWatchlist,
  watchlistSymbols
}) => {
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'stocks', label: 'Stocks' },
    { id: 'indices', label: 'Indices' },
    { id: 'crypto', label: 'Crypto' },
    { id: 'forex', label: 'Forex' },
    { id: 'futures', label: 'Futures' }
  ];

  const filtered = ALL_ITEMS.filter((item) => {
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesQuery =
      item.symbol.toLowerCase().includes(query.toLowerCase()) ||
      item.name.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end sm:justify-center items-center p-0 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#1e222d] border border-slate-200 dark:border-slate-800 w-full max-w-[430px] rounded-t-3xl sm:rounded-3xl max-h-[85vh] h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="relative flex-1">
            <svg
              className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" />
            </svg>
            <input
              type="text"
              autoFocus
              placeholder="Search symbol, market, company..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-[#f0f3fa] dark:bg-slate-800 text-slate-900 dark:text-white text-sm rounded-xl pl-9 pr-8 py-2.5 border-none focus:outline-hidden focus:ring-2 focus:ring-[#2962ff]"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 px-1 py-2 cursor-pointer"
          >
            Cancel
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                categoryFilter === cat.id
                  ? 'bg-black text-white dark:bg-white dark:text-black font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">
              No matching symbols found for &quot;{query}&quot;
            </div>
          ) : (
            filtered.map((item) => {
              const inWatchlist = watchlistSymbols.includes(item.symbol);
              const isPositive = item.changePercent >= 0;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectTicker(item);
                    onClose();
                  }}
                  className="p-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <TickerIcon symbol={item.symbol} type={item.iconType} badgeText={item.badgeText} badgeBg={item.badgeBg} badgeTextColor={item.badgeTextColor} size="md" />
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>{item.symbol}</span>
                        <span className="text-[10px] uppercase font-normal text-slate-400 bg-slate-100 dark:bg-slate-800 px-1 py-0.2 rounded">
                          {item.category}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[150px]">
                        {item.name}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-bold text-slate-900 dark:text-white tabular-nums">
                        ${item.price.toFixed(2)}
                      </div>
                      <div
                        className={`text-[11px] font-semibold tabular-nums ${
                          isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                        }`}
                      >
                        {isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToWatchlist(item);
                      }}
                      className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                        inWatchlist
                          ? 'text-[#2962ff] bg-blue-50 dark:bg-blue-900/30'
                          : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                      title={inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
                      type="button"
                    >
                      <svg className="w-4 h-4" fill={inWatchlist ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
