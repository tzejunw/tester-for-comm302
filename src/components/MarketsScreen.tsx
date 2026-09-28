import React, { useState } from 'react';
import { MarketItem, AssetCategory, MarketRegion } from '../types/market';
import {
  MAJOR_INDICES,
  WORLD_INDICES,
  US_STOCKS,
  MARKET_MOVERS,
  FUTURES_DATA,
  FOREX_DATA,
  BONDS_DATA
} from '../data/mockMarketData';
import { Sparkline } from './Sparkline';
import { TickerIcon, USFlagIcon } from './TickerIcon';

interface MarketsScreenProps {
  onSelectTicker: (item: MarketItem) => void;
  onNavigateToChart: (item: MarketItem) => void;
  onNavigateToWatchlist?: () => void;
}

export const MarketsScreen: React.FC<MarketsScreenProps> = ({
  onSelectTicker,
  onNavigateToChart,
  onNavigateToWatchlist
}) => {
  const [activeCategory, setActiveCategory] = useState<AssetCategory | 'all'>('indices');
  const [selectedRegion, setSelectedRegion] = useState<MarketRegion>('everywhere');
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);
  const [moverFilter, setMoverFilter] = useState<'all' | 'gainers' | 'losers' | 'active'>('all');
  const [showAllMovers, setShowAllMovers] = useState(false);

  const filterPills: { id: AssetCategory; label: string }[] = [
    { id: 'indices', label: 'Indices' },
    { id: 'futures', label: 'Futures' },
    { id: 'forex', label: 'Forex' },
    { id: 'bonds', label: 'Government bonds' },
    { id: 'crypto', label: 'Crypto' },
    { id: 'stocks', label: 'Stocks' }
  ];

  const regions: { id: MarketRegion; label: string }[] = [
    { id: 'everywhere', label: 'everywhere' },
    { id: 'americas', label: 'Americas' },
    { id: 'europe', label: 'Europe' },
    { id: 'asia', label: 'Asia-Pacific' }
  ];

  // Filter market movers
  const filteredMovers = MARKET_MOVERS.filter((item) => {
    if (moverFilter === 'gainers') return item.changePercent > 0;
    if (moverFilter === 'losers') return item.changePercent < 0;
    if (moverFilter === 'active') return (item.volume && item.volume.includes('M')) || (item.volume && item.volume.includes('B'));
    return true;
  });

  const displayedMovers = showAllMovers ? filteredMovers : filteredMovers.slice(0, 4);

  return (
    <div className="flex-1 pb-16">
      {/* BEGIN: HeroTitleSection */}
      <section className="px-4 pt-5 pb-3">
        {/* Main Section Title with Chevron Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsRegionDropdownOpen(!isRegionDropdownOpen)}
            className="group flex items-center gap-2 text-left w-full focus:outline-hidden cursor-pointer"
            type="button"
          >
            <h1 className="text-[30px] font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">
              Markets, {regions.find((r) => r.id === selectedRegion)?.label}
            </h1>
            <svg
              className={`w-6 h-6 text-slate-900 dark:text-white transition-transform duration-200 mt-0.5 shrink-0 ${
                isRegionDropdownOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.6"
              viewBox="0 0 24 24"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {/* Region Dropdown Menu */}
          {isRegionDropdownOpen && (
            <div className="absolute top-10 left-0 z-30 w-52 bg-white dark:bg-[#1e222d] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-1.5 mt-2 animate-in fade-in zoom-in-95 duration-150">
              <div className="text-[11px] font-semibold text-slate-400 px-3 py-1 uppercase tracking-wider">
                Select Region
              </div>
              {regions.map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => {
                    setSelectedRegion(reg.id);
                    setIsRegionDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm font-medium rounded-xl flex items-center justify-between transition-colors ${
                    selectedRegion === reg.id
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-[#2962ff] font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="capitalize">{reg.label}</span>
                  {selectedRegion === reg.id && (
                    <svg className="w-4 h-4 text-[#2962ff]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Horizontal Filter Pills */}
        <div className="mt-4 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {filterPills.map((pill) => {
            const isActive = activeCategory === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => setActiveCategory(pill.id)}
                type="button"
                className={`px-4 py-1.5 text-[13px] font-medium rounded-full shrink-0 whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs font-semibold'
                    : 'bg-[#f0f3fa] dark:bg-[#1e222d] text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 active:bg-slate-300'
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>
      </section>
      {/* END: HeroTitleSection */}

      {/* Conditional rendering based on category pills or full dashboard */}
      {(activeCategory === 'indices' || activeCategory === 'all') && (
        <>
          {/* BEGIN: MajorIndicesCarousel */}
          <section className="mt-2">
            <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-2 pt-1 snap-x snap-mandatory">
              {MAJOR_INDICES.map((item) => {
                const isPositive = item.changePercent >= 0;
                return (
                  <div
                    key={item.id}
                    onClick={() => onSelectTicker(item)}
                    className="card-tap snap-start min-w-[245px] w-[245px] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-2xl p-4 flex flex-col justify-between h-[180px] bg-white dark:bg-[#1e222d] shadow-xs shrink-0 cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <TickerIcon
                          symbol={item.symbol}
                          badgeText={item.badgeText}
                          badgeBg={item.badgeBg}
                          badgeTextColor={item.badgeTextColor}
                          size="sm"
                        />
                        <span className="text-[15px] font-bold text-slate-900 dark:text-white leading-tight">
                          {item.name}
                        </span>
                      </div>
                      <div className="mt-2.5 flex items-baseline gap-2">
                        <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white tabular-nums">
                          {item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                        <span
                          className={`text-[12px] font-semibold flex items-center tabular-nums ${
                            isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                          }`}
                        >
                          {isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                        </span>
                      </div>
                    </div>

                    {/* Sparkline Canvas Chart */}
                    <div className="w-full h-14 relative mt-auto">
                      <Sparkline
                        data={item.sparkline}
                        isPositive={isPositive}
                        height={56}
                        width={200}
                        strokeWidth={2.5}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
          {/* END: MajorIndicesCarousel */}

          {/* BEGIN: WorldIndicesSection */}
          <section className="mt-7">
            {/* Section Header Link */}
            <div className="px-4 flex items-center justify-between mb-3">
              <button
                onClick={() => onSelectTicker(WORLD_INDICES[0])}
                className="group flex items-center gap-1.5 focus:outline-hidden cursor-pointer"
                type="button"
              >
                <h2 className="text-[20px] font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  World indices
                </h2>
                <svg
                  className="w-4 h-4 text-slate-900 dark:text-white stroke-[2.8] group-hover:translate-x-0.5 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            {/* Horizontal scrollable cards for World Indices */}
            <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-2 snap-x snap-mandatory">
              {WORLD_INDICES.map((item) => {
                const isPositive = item.changePercent >= 0;
                return (
                  <div
                    key={item.id}
                    onClick={() => onSelectTicker(item)}
                    className="card-tap snap-start min-w-[210px] w-[210px] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-2xl p-4 bg-white dark:bg-[#1e222d] shadow-xs flex flex-col justify-between shrink-0 h-[156px] cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div>
                      <div className="flex items-center gap-2.5">
                        <TickerIcon
                          symbol={item.symbol}
                          badgeText={item.badgeText}
                          badgeBg={item.badgeBg}
                          badgeTextColor={item.badgeTextColor}
                          size="md"
                        />
                        <div className="overflow-hidden">
                          <div className="text-[14px] font-extrabold text-slate-900 dark:text-white leading-none truncate">
                            {item.symbol}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                            {item.name}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="text-[17px] font-extrabold text-slate-900 dark:text-white tabular-nums">
                          {item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </div>
                        <div
                          className={`text-[11px] font-semibold mt-0.5 tabular-nums ${
                            isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                          }`}
                        >
                          {isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                        </div>
                      </div>
                    </div>

                    {/* Mini Sparkline */}
                    <div className="w-full h-8 mt-1">
                      <Sparkline
                        data={item.sparkline}
                        isPositive={isPositive}
                        height={32}
                        width={100}
                        showFill={false}
                        strokeWidth={2}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
          {/* END: WorldIndicesSection */}
        </>
      )}

      {/* Futures Section if chosen or overview */}
      {activeCategory === 'futures' && (
        <section className="mt-4 px-4">
          <h2 className="text-[20px] font-extrabold text-slate-900 dark:text-white mb-3">
            Commodity & Energy Futures
          </h2>
          <div className="grid grid-cols-1 gap-2.5">
            {FUTURES_DATA.map((item) => {
              const isPositive = item.changePercent >= 0;
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectTicker(item)}
                  className="p-3.5 bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-2xl flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <TickerIcon symbol={item.symbol} badgeText={item.badgeText} badgeBg={item.badgeBg} badgeTextColor={item.badgeTextColor} />
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">{item.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{item.symbol} • {item.sector}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-extrabold text-slate-900 dark:text-white tabular-nums">${item.price.toFixed(2)}</div>
                    <span className={`inline-block mt-0.5 px-1.5 py-0.5 rounded text-[11px] font-bold tabular-nums ${
                      isPositive ? 'bg-[#e6f4f1] text-[#089981] dark:bg-[#089981]/20' : 'bg-[#fde8eb] text-[#f23645] dark:bg-[#f23645]/20'
                    }`}>
                      {isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Forex Section */}
      {activeCategory === 'forex' && (
        <section className="mt-4 px-4">
          <h2 className="text-[20px] font-extrabold text-slate-900 dark:text-white mb-3">
            Major Forex Pairs
          </h2>
          <div className="grid grid-cols-1 gap-2.5">
            {FOREX_DATA.map((item) => {
              const isPositive = item.changePercent >= 0;
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectTicker(item)}
                  className="p-3.5 bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-2xl flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <TickerIcon symbol={item.symbol} badgeText={item.badgeText} badgeBg={item.badgeBg} badgeTextColor={item.badgeTextColor} />
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">{item.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{item.symbol} • {item.sector}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-extrabold text-slate-900 dark:text-white tabular-nums">{item.price.toFixed(4)}</div>
                    <span className={`inline-block mt-0.5 px-1.5 py-0.5 rounded text-[11px] font-bold tabular-nums ${
                      isPositive ? 'bg-[#e6f4f1] text-[#089981] dark:bg-[#089981]/20' : 'bg-[#fde8eb] text-[#f23645] dark:bg-[#f23645]/20'
                    }`}>
                      {isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Government Bonds Section */}
      {activeCategory === 'bonds' && (
        <section className="mt-4 px-4">
          <h2 className="text-[20px] font-extrabold text-slate-900 dark:text-white mb-3">
            Government Bonds & Yields
          </h2>
          <div className="grid grid-cols-1 gap-2.5">
            {BONDS_DATA.map((item) => {
              const isPositive = item.changePercent >= 0;
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectTicker(item)}
                  className="p-3.5 bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-2xl flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <TickerIcon symbol={item.symbol} badgeText={item.badgeText} badgeBg={item.badgeBg} badgeTextColor={item.badgeTextColor} />
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">{item.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{item.symbol} • {item.sector}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-extrabold text-slate-900 dark:text-white tabular-nums">{item.price.toFixed(3)}%</div>
                    <span className={`inline-block mt-0.5 px-1.5 py-0.5 rounded text-[11px] font-bold tabular-nums ${
                      isPositive ? 'bg-[#e6f4f1] text-[#089981] dark:bg-[#089981]/20' : 'bg-[#fde8eb] text-[#f23645] dark:bg-[#f23645]/20'
                    }`}>
                      {isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* BEGIN: USStocksSection */}
      {(activeCategory === 'indices' || activeCategory === 'stocks' || activeCategory === 'all') && (
        <section className="mt-7">
          {/* US Flag Header */}
          <div className="px-4 flex items-center justify-between mb-3">
            <button
              onClick={() => onSelectTicker(US_STOCKS[0])}
              className="group flex items-center gap-2 focus:outline-hidden cursor-pointer"
              type="button"
            >
              {/* Round US Flag Icon */}
              <USFlagIcon className="w-6 h-6" />
              <h2 className="text-[20px] font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                US stocks
              </h2>
              <svg
                className="w-4 h-4 text-slate-900 dark:text-white stroke-[2.8] group-hover:translate-x-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* US Stock Cards Carousel */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-2 snap-x snap-mandatory">
            {US_STOCKS.map((item) => {
              const isPositive = item.changePercent >= 0;
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectTicker(item)}
                  className="card-tap snap-start min-w-[190px] w-[190px] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-2xl p-4 bg-white dark:bg-[#1e222d] shadow-xs flex flex-col justify-between shrink-0 h-[150px] cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <TickerIcon symbol={item.symbol} type={item.iconType} size="md" />
                      <div className="overflow-hidden">
                        <div className="text-[14px] font-bold text-slate-900 dark:text-white truncate">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                          {item.symbol}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="text-[17px] font-extrabold text-slate-900 dark:text-white tracking-tight tabular-nums">
                        ${item.price.toFixed(2)}
                      </div>
                      <div
                        className={`text-[11px] font-semibold mt-0.5 tabular-nums ${
                          isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                        }`}
                      >
                        {isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-7 mt-1">
                    <Sparkline
                      data={item.sparkline}
                      isPositive={isPositive}
                      height={28}
                      width={100}
                      showFill={false}
                      strokeWidth={2}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
      {/* END: USStocksSection */}

      {/* BEGIN: MarketMoversList */}
      <section className="mt-8 px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[20px] font-extrabold text-slate-900 dark:text-white">
            Market movers
          </h2>
          <button
            onClick={() => setShowAllMovers(!showAllMovers)}
            className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
            type="button"
          >
            {showAllMovers ? 'Show less' : 'See all'}
          </button>
        </div>

        {/* Filter sub-tabs for movers */}
        <div className="flex items-center gap-2 mb-3">
          {(['all', 'gainers', 'losers', 'active'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setMoverFilter(tab)}
              type="button"
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors capitalize ${
                moverFilter === tab
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-black font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {tab === 'active' ? 'Most Active' : tab}
            </button>
          ))}
        </div>

        {/* Ticker List */}
        <div className="bg-white dark:bg-[#1e222d] rounded-2xl border border-[#e0e3eb] dark:border-[#2a2e39] divide-y divide-[#e0e3eb]/70 dark:divide-slate-800 overflow-hidden shadow-xs">
          {displayedMovers.map((item) => {
            const isPositive = item.changePercent >= 0;
            return (
              <div
                key={item.id}
                onClick={() => onSelectTicker(item)}
                className="p-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/60 active:bg-slate-100 dark:active:bg-slate-800 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0"
                    style={{
                      backgroundColor: item.badgeBg || '#f1f5f9',
                      color: item.badgeTextColor || '#0f172a'
                    }}
                  >
                    {item.symbol.length <= 4 ? item.symbol : item.symbol.slice(0, 3)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                      {item.name}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {item.volume ? `Vol ${item.volume} • ` : ''}{item.sector || 'Market'}
                    </div>
                  </div>
                </div>

                <div className="text-right">
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
              </div>
            );
          })}
        </div>
      </section>
      {/* END: MarketMoversList */}

      {/* BEGIN: Footer */}
      <footer className="mt-10 px-4 pt-6 pb-6 border-t border-[#e0e3eb] dark:border-[#2a2e39] text-center text-slate-500 dark:text-slate-400 text-xs">
        <div className="flex items-center justify-center gap-4 text-slate-900 dark:text-slate-200 font-semibold mb-4 text-[13px]">
          <button onClick={() => setActiveCategory('indices')} className="hover:underline cursor-pointer">
            Markets
          </button>
          <button onClick={() => onNavigateToWatchlist?.()} className="hover:underline cursor-pointer">
            Screeners
          </button>
          <button onClick={() => {}} className="hover:underline cursor-pointer">
            Community
          </button>
          <button onClick={() => {}} className="hover:underline cursor-pointer">
            Help center
          </button>
        </div>
        <p className="leading-relaxed">
          Quotes & market data provided by financial exchanges around the globe.
        </p>
        <p className="mt-2 text-[11px] text-slate-400 dark:text-slate-500">
          © 2025 TradingView. Look first / Then leap.
        </p>
      </footer>
      {/* END: Footer */}
    </div>
  );
};
