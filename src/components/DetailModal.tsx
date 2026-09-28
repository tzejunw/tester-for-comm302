import React from 'react';
import { MarketItem } from '../types/market';
import { TickerIcon } from './TickerIcon';
import { Sparkline } from './Sparkline';

interface DetailModalProps {
  item: MarketItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenChart: (item: MarketItem) => void;
  onToggleWatchlist: (item: MarketItem) => void;
  isInWatchlist: boolean;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  item,
  isOpen,
  onClose,
  onOpenChart,
  onToggleWatchlist,
  isInWatchlist
}) => {
  if (!isOpen || !item) return null;

  const isPositive = item.changePercent >= 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end items-center animate-in fade-in duration-150">
      <div
        className="w-full max-w-[430px] bg-white dark:bg-[#1e222d] border-t border-slate-200 dark:border-slate-800 rounded-t-3xl shadow-2xl p-5 pb-8 animate-in slide-in-from-bottom-5 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="w-10 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-4" />

        {/* Top Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <TickerIcon
              symbol={item.symbol}
              type={item.iconType}
              badgeText={item.badgeText}
              badgeBg={item.badgeBg}
              badgeTextColor={item.badgeTextColor}
              size="lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-slate-900 dark:text-white">
                  {item.symbol}
                </span>
                <span className="text-[10px] font-bold uppercase text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                  {item.category}
                </span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {item.name}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Price & Change Banner */}
        <div className="flex items-baseline justify-between mb-3 bg-[#f0f3fa] dark:bg-slate-800/60 p-3.5 rounded-2xl">
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight tabular-nums">
              ${item.price >= 1000 ? item.price.toLocaleString('en-US', { minimumFractionDigits: 2 }) : item.price.toFixed(2)}
            </div>
            <div
              className={`text-xs font-bold mt-0.5 tabular-nums ${
                isPositive ? 'text-[#089981]' : 'text-[#f23645]'
              }`}
            >
              {isPositive ? `+${item.change.toFixed(2)}` : `${item.change.toFixed(2)}`} (
              {isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`})
            </div>
          </div>

          <div className="w-28 h-10">
            <Sparkline
              data={item.sparkline}
              isPositive={isPositive}
              height={40}
              width={112}
              showFill={true}
              strokeWidth={2}
            />
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs mb-4">
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
            <span className="text-slate-400 block text-[10px]">Volume</span>
            <span className="font-bold text-slate-900 dark:text-white">{item.volume || '24.5M'}</span>
          </div>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
            <span className="text-slate-400 block text-[10px]">Market Cap</span>
            <span className="font-bold text-slate-900 dark:text-white">{item.marketCap || '$2.4T'}</span>
          </div>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
            <span className="text-slate-400 block text-[10px]">52W Range</span>
            <span className="font-bold text-slate-900 dark:text-white">${item.low52w || (item.price * 0.75).toFixed(0)} - ${item.high52w || (item.price * 1.15).toFixed(0)}</span>
          </div>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
            <span className="text-slate-400 block text-[10px]">Sector</span>
            <span className="font-bold text-slate-900 dark:text-white truncate block">{item.sector || 'Equities'}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => onToggleWatchlist(item)}
            className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              isInWatchlist
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                : 'border border-[#2962ff] text-[#2962ff] hover:bg-blue-50 dark:hover:bg-blue-900/20'
            }`}
            type="button"
          >
            <svg className="w-4 h-4" fill={isInWatchlist ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span>{isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}</span>
          </button>

          <button
            onClick={() => {
              onOpenChart(item);
              onClose();
            }}
            className="py-3 px-4 bg-[#2962ff] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            type="button"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path d="M3 3v18h18" />
              <path d="M19 9l-5 5-4-4-3 3" />
            </svg>
            <span>Open Superchart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
