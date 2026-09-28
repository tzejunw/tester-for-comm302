import React, { useState } from 'react';
import { MarketItem } from '../types/market';
import { TickerIcon } from './TickerIcon';
import { Sparkline } from './Sparkline';

interface WatchlistScreenProps {
  watchlistItems: MarketItem[];
  onSelectTicker: (item: MarketItem) => void;
  onRemoveFromWatchlist: (id: string) => void;
  onOpenSearch: () => void;
}

export const WatchlistScreen: React.FC<WatchlistScreenProps> = ({
  watchlistItems,
  onSelectTicker,
  onRemoveFromWatchlist,
  onOpenSearch
}) => {
  const [activeList, setActiveList] = useState('Tech & Growth');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'cards'>('list');

  const filteredItems = watchlistItems.filter(
    (item) =>
      item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const gainersCount = watchlistItems.filter((i) => i.changePercent >= 0).length;
  const losersCount = watchlistItems.filter((i) => i.changePercent < 0).length;

  return (
    <div className="flex-1 pb-20 px-4 pt-4">
      {/* Watchlist Top Selector */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-1.5 cursor-pointer">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {activeList}
            </h1>
            <svg className="w-5 h-5 text-slate-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-2">
            <span>{watchlistItems.length} symbols</span>
            <span>•</span>
            <span className="text-[#089981] font-semibold">{gainersCount} up</span>
            <span>•</span>
            <span className="text-[#f23645] font-semibold">{losersCount} down</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setViewMode(viewMode === 'list' ? 'cards' : 'list')}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
            title="Toggle View Mode"
            type="button"
          >
            {viewMode === 'list' ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <line x1="8" y1="6" x2="21" y2="6" strokeWidth="2" />
                <line x1="8" y1="12" x2="21" y2="12" strokeWidth="2" />
                <line x1="8" y1="18" x2="21" y2="18" strokeWidth="2" />
                <line x1="3" y1="6" x2="3.01" y2="6" strokeWidth="2" />
                <line x1="3" y1="12" x2="3.01" y2="12" strokeWidth="2" />
                <line x1="3" y1="18" x2="3.01" y2="18" strokeWidth="2" />
              </svg>
            )}
          </button>

          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1 bg-[#2962ff] text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-blue-700 active:scale-95 transition-all cursor-pointer shadow-xs"
            type="button"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* Filter / Search input inside watchlist */}
      <div className="relative mb-3">
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
          placeholder="Filter watchlist..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#f0f3fa] dark:bg-[#1e222d] text-slate-900 dark:text-white text-xs rounded-xl pl-9 pr-3 py-2 border-none focus:outline-hidden focus:ring-1 focus:ring-blue-500"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        )}
      </div>

      {/* Watchlist Items */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-[#1e222d] border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl p-6">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No symbols found</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
            Search and add stocks, crypto, or indices to your watchlist.
          </p>
          <button
            onClick={onOpenSearch}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2962ff] text-white text-xs font-semibold rounded-full shadow-xs cursor-pointer"
          >
            <span>Search Markets</span>
          </button>
        </div>
      ) : viewMode === 'list' ? (
        <div className="bg-white dark:bg-[#1e222d] rounded-2xl border border-[#e0e3eb] dark:border-[#2a2e39] divide-y divide-[#e0e3eb]/70 dark:divide-slate-800 overflow-hidden shadow-xs">
          {filteredItems.map((item) => {
            const isPositive = item.changePercent >= 0;
            return (
              <div
                key={item.id}
                className="p-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group cursor-pointer"
                onClick={() => onSelectTicker(item)}
              >
                <div className="flex items-center gap-3">
                  <TickerIcon
                    symbol={item.symbol}
                    badgeText={item.badgeText}
                    badgeBg={item.badgeBg}
                    badgeTextColor={item.badgeTextColor}
                    type={item.iconType}
                    size="md"
                  />
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>{item.symbol}</span>
                      <span className="text-[10px] text-slate-400 uppercase font-normal">{item.category}</span>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[140px]">
                      {item.name}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Mini sparkline */}
                  <div className="w-16 h-6 hidden sm:block">
                    <Sparkline
                      data={item.sparkline}
                      isPositive={isPositive}
                      height={24}
                      width={64}
                      showFill={false}
                      strokeWidth={1.8}
                    />
                  </div>

                  <div className="text-right min-w-[75px]">
                    <div className="text-sm font-extrabold text-slate-900 dark:text-white tabular-nums">
                      ${item.price >= 1000 ? item.price.toLocaleString() : item.price.toFixed(2)}
                    </div>
                    <span
                      className={`inline-block mt-0.5 px-1.5 py-0.5 rounded text-[11px] font-bold tabular-nums ${
                        isPositive
                          ? 'bg-[#e6f4f1] text-[#089981] dark:bg-[#089981]/20'
                          : 'bg-[#fde8eb] text-[#f23645] dark:bg-[#f23645]/20'
                      }`}
                    >
                      {isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                    </span>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveFromWatchlist(item.id);
                    }}
                    className="p-1 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    title="Remove from watchlist"
                    type="button"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2" />
                      <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2.5">
          {filteredItems.map((item) => {
            const isPositive = item.changePercent >= 0;
            return (
              <div
                key={item.id}
                onClick={() => onSelectTicker(item)}
                className="p-3.5 bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-2xl shadow-xs flex flex-col justify-between h-[140px] cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TickerIcon symbol={item.symbol} type={item.iconType} size="sm" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{item.symbol}</span>
                  </div>
                  <span
                    className={`text-[11px] font-bold tabular-nums ${
                      isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                    }`}
                  >
                    {isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                  </span>
                </div>

                <div className="mt-2">
                  <div className="text-base font-extrabold text-slate-900 dark:text-white tabular-nums">
                    ${item.price >= 1000 ? item.price.toLocaleString() : item.price.toFixed(2)}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {item.name}
                  </div>
                </div>

                <div className="w-full h-6 mt-1">
                  <Sparkline
                    data={item.sparkline}
                    isPositive={isPositive}
                    height={24}
                    width={120}
                    showFill={false}
                    strokeWidth={1.8}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
