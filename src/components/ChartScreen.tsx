import React, { useState, useMemo } from 'react';
import { MarketItem } from '../types/market';
import { ALL_ITEMS } from '../data/mockMarketData';
import { TickerIcon } from './TickerIcon';

interface ChartScreenProps {
  initialItem?: MarketItem;
  onSelectTicker: (item: MarketItem) => void;
  onOpenSearch: () => void;
}

export const ChartScreen: React.FC<ChartScreenProps> = ({
  initialItem,
  onSelectTicker,
  onOpenSearch
}) => {
  const currentItem = initialItem || ALL_ITEMS[0];
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1D' | '5D' | '1M' | '6M' | '1Y' | 'ALL'>('1D');
  const [chartType, setChartType] = useState<'candle' | 'line' | 'area'>('candle');
  const [showMA, setShowMA] = useState(true);
  const [showVolume, setShowVolume] = useState(true);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [tradeMessage, setTradeMessage] = useState<string | null>(null);

  // Generate synthetic candles based on item's base price and timeframe
  const candles = useMemo(() => {
    const base = currentItem.price;
    const isUp = currentItem.changePercent >= 0;
    const count = 16;
    const result = [];
    let currentPrice = isUp ? base * 0.97 : base * 1.03;

    for (let i = 0; i < count; i++) {
      const volatility = base * 0.012;
      const step = (base - currentPrice) / (count - i) + (Math.random() - 0.48) * volatility;
      const open = currentPrice;
      const close = i === count - 1 ? base : open + step;
      const high = Math.max(open, close) + Math.random() * (volatility * 0.8);
      const low = Math.min(open, close) - Math.random() * (volatility * 0.8);
      const volume = Math.floor(10000 + Math.random() * 80000);
      currentPrice = close;

      const hour = 9 + Math.floor(i / 2);
      const minute = (i % 2) * 30;
      const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

      result.push({
        time: timeStr,
        open,
        high,
        low,
        close,
        volume
      });
    }
    return result;
  }, [currentItem, selectedTimeframe]);

  // Derived stats
  const minPrice = Math.min(...candles.map((c) => c.low));
  const maxPrice = Math.max(...candles.map((c) => c.high));
  const priceRange = maxPrice - minPrice || 1;
  const maxVolume = Math.max(...candles.map((c) => c.volume));

  // Chart dimensions
  const svgWidth = 360;
  const svgHeight = 220;
  const candleWidth = 14;

  const hoveredCandle = hoverIndex !== null ? candles[hoverIndex] : candles[candles.length - 1];

  const handleSimulateTrade = (type: 'buy' | 'sell') => {
    setTradeMessage(`Simulated ${type.toUpperCase()} order for 10 ${currentItem.symbol} @ $${currentItem.price.toFixed(2)} executed!`);
    setTimeout(() => setTradeMessage(null), 3500);
  };

  const isPositive = currentItem.changePercent >= 0;

  return (
    <div className="flex-1 pb-24 px-4 pt-3">
      {/* Top Ticker Bar & Switcher */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 text-left group cursor-pointer"
          type="button"
        >
          <TickerIcon
            symbol={currentItem.symbol}
            badgeText={currentItem.badgeText}
            badgeBg={currentItem.badgeBg}
            badgeTextColor={currentItem.badgeTextColor}
            type={currentItem.iconType}
            size="md"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                {currentItem.symbol}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                {currentItem.category}
              </span>
              <svg className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[170px]">
              {currentItem.name}
            </div>
          </div>
        </button>

        {/* Chart Style Switcher */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg">
          <button
            onClick={() => setChartType('candle')}
            className={`p-1.5 rounded-md text-xs transition-colors cursor-pointer ${
              chartType === 'candle' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
            }`}
            title="Candlestick"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <line x1="9" y1="2" x2="9" y2="22" stroke="currentColor" strokeWidth="2" />
              <rect x="6" y="6" width="6" height="12" rx="1" />
              <line x1="17" y1="4" x2="17" y2="20" stroke="currentColor" strokeWidth="2" />
              <rect x="14" y="9" width="6" height="8" rx="1" />
            </svg>
          </button>
          <button
            onClick={() => setChartType('area')}
            className={`p-1.5 rounded-md text-xs transition-colors cursor-pointer ${
              chartType === 'area' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
            }`}
            title="Area Chart"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 18 L8 12 L13 15 L21 6 L21 21 L3 21 Z" />
            </svg>
          </button>
          <button
            onClick={() => setChartType('line')}
            className={`p-1.5 rounded-md text-xs transition-colors cursor-pointer ${
              chartType === 'line' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
            }`}
            title="Line Chart"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <polyline points="3 18 8 12 13 15 21 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Quote & Change */}
      <div className="bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-2xl p-4 shadow-xs mb-3">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tight tabular-nums">
              ${hoveredCandle ? hoveredCandle.close.toFixed(2) : currentItem.price.toFixed(2)}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`text-xs font-bold tabular-nums ${
                  isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                }`}
              >
                {isPositive ? `+${currentItem.change.toFixed(2)}` : `${currentItem.change.toFixed(2)}`} (
                {isPositive ? `+${currentItem.changePercent.toFixed(2)}%` : `${currentItem.changePercent.toFixed(2)}%`})
              </span>
              <span className="text-[11px] text-slate-400">Today</span>
            </div>
          </div>

          {/* Timeframe pill selector */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-full text-xs font-semibold">
            {(['1D', '5D', '1M', '6M', '1Y', 'ALL'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setSelectedTimeframe(tf)}
                className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  selectedTimeframe === tf
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* OHLC Bar */}
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 tabular-nums">
          <div>O <span className="text-slate-800 dark:text-slate-200 font-semibold">{hoveredCandle.open.toFixed(2)}</span></div>
          <div>H <span className="text-[#089981] font-semibold">{hoveredCandle.high.toFixed(2)}</span></div>
          <div>L <span className="text-[#f23645] font-semibold">{hoveredCandle.low.toFixed(2)}</span></div>
          <div>C <span className="text-slate-800 dark:text-slate-200 font-semibold">{hoveredCandle.close.toFixed(2)}</span></div>
          <div>Vol <span className="text-slate-800 dark:text-slate-200 font-semibold">{(hoveredCandle.volume / 1000).toFixed(0)}k</span></div>
        </div>

        {/* Technical Indicators Pill toggles */}
        <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setShowMA(!showMA)}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
              showMA ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
            }`}
          >
            MA (20)
          </button>
          <button
            onClick={() => setShowVolume(!showVolume)}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
              showVolume ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
            }`}
          >
            Volume
          </button>
          <span className="text-[10px] text-slate-400 ml-auto">
            {hoveredCandle.time} EST
          </span>
        </div>

        {/* Interactive SVG Chart Area */}
        <div
          className="relative w-full h-[220px] mt-2 select-none"
          onMouseLeave={() => setHoverIndex(null)}
          onTouchEnd={() => setHoverIndex(null)}
        >
          <svg
            className="w-full h-full overflow-visible"
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={isPositive ? '#089981' : '#f23645'} stopOpacity="0.35" />
                <stop offset="100%" stopColor={isPositive ? '#089981' : '#f23645'} stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid horizontal lines */}
            {[0.2, 0.4, 0.6, 0.8].map((ratio, idx) => (
              <line
                key={idx}
                x1={0}
                y1={svgHeight * ratio}
                x2={svgWidth}
                y2={svgHeight * ratio}
                stroke="#e2e8f0"
                strokeDasharray="3 3"
                className="dark:stroke-slate-800"
              />
            ))}

            {/* Volume bars */}
            {showVolume &&
              candles.map((c, idx) => {
                const x = (idx / (candles.length - 1)) * (svgWidth - 30) + 15;
                const vHeight = (c.volume / maxVolume) * 35;
                const isCandleGreen = c.close >= c.open;
                return (
                  <rect
                    key={`vol-${idx}`}
                    x={x - candleWidth / 2}
                    y={svgHeight - vHeight}
                    width={candleWidth - 2}
                    height={vHeight}
                    fill={isCandleGreen ? '#089981' : '#f23645'}
                    opacity={0.3}
                  />
                );
              })}

            {/* Candlesticks or Line or Area */}
            {chartType === 'candle' &&
              candles.map((c, idx) => {
                const x = (idx / (candles.length - 1)) * (svgWidth - 30) + 15;
                const isCandleGreen = c.close >= c.open;
                const candleColor = isCandleGreen ? '#089981' : '#f23645';

                const topWickY = svgHeight - ((c.high - minPrice) / priceRange) * (svgHeight - 45) - 40;
                const bottomWickY = svgHeight - ((c.low - minPrice) / priceRange) * (svgHeight - 45) - 40;
                const bodyTopY = svgHeight - ((Math.max(c.open, c.close) - minPrice) / priceRange) * (svgHeight - 45) - 40;
                const bodyBottomY = svgHeight - ((Math.min(c.open, c.close) - minPrice) / priceRange) * (svgHeight - 45) - 40;
                const bodyHeight = Math.max(3, bodyBottomY - bodyTopY);

                return (
                  <g key={`candle-${idx}`}>
                    {/* Wick */}
                    <line
                      x1={x}
                      y1={topWickY}
                      x2={x}
                      y2={bottomWickY}
                      stroke={candleColor}
                      strokeWidth="1.5"
                    />
                    {/* Candle body */}
                    <rect
                      x={x - candleWidth / 2}
                      y={bodyTopY}
                      width={candleWidth}
                      height={bodyHeight}
                      fill={candleColor}
                      rx="1"
                    />
                  </g>
                );
              })}

            {chartType === 'line' && (
              <polyline
                fill="none"
                stroke={isPositive ? '#089981' : '#f23645'}
                strokeWidth="2.5"
                strokeLinecap="round"
                points={candles
                  .map((c, idx) => {
                    const x = (idx / (candles.length - 1)) * (svgWidth - 30) + 15;
                    const y = svgHeight - ((c.close - minPrice) / priceRange) * (svgHeight - 45) - 40;
                    return `${x},${y}`;
                  })
                  .join(' ')}
              />
            )}

            {chartType === 'area' && (
              <>
                <polygon
                  fill="url(#areaGradient)"
                  points={`15,${svgHeight} ${candles
                    .map((c, idx) => {
                      const x = (idx / (candles.length - 1)) * (svgWidth - 30) + 15;
                      const y = svgHeight - ((c.close - minPrice) / priceRange) * (svgHeight - 45) - 40;
                      return `${x},${y}`;
                    })
                    .join(' ')} ${svgWidth - 15},${svgHeight}`}
                />
                <polyline
                  fill="none"
                  stroke={isPositive ? '#089981' : '#f23645'}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  points={candles
                    .map((c, idx) => {
                      const x = (idx / (candles.length - 1)) * (svgWidth - 30) + 15;
                      const y = svgHeight - ((c.close - minPrice) / priceRange) * (svgHeight - 45) - 40;
                      return `${x},${y}`;
                    })
                    .join(' ')}
                />
              </>
            )}

            {/* Moving Average Line */}
            {showMA && (
              <polyline
                fill="none"
                stroke="#f59e0b"
                strokeWidth="1.5"
                points={candles
                  .map((c, idx) => {
                    const x = (idx / (candles.length - 1)) * (svgWidth - 30) + 15;
                    const pseudoMA = c.close * 0.995 + Math.sin(idx) * 2;
                    const y = svgHeight - ((pseudoMA - minPrice) / priceRange) * (svgHeight - 45) - 40;
                    return `${x},${y}`;
                  })
                  .join(' ')}
              />
            )}

            {/* Hover Crosshair */}
            {hoverIndex !== null && (
              <g>
                <line
                  x1={(hoverIndex / (candles.length - 1)) * (svgWidth - 30) + 15}
                  y1={0}
                  x2={(hoverIndex / (candles.length - 1)) * (svgWidth - 30) + 15}
                  y2={svgHeight}
                  stroke="#94a3b8"
                  strokeDasharray="2 2"
                  strokeWidth="1"
                />
              </g>
            )}

            {/* Interactive touch targets */}
            {candles.map((_, idx) => {
              const x = (idx / (candles.length - 1)) * (svgWidth - 30) + 15;
              return (
                <rect
                  key={`hit-${idx}`}
                  x={x - candleWidth}
                  y={0}
                  width={candleWidth * 2}
                  height={svgHeight}
                  fill="transparent"
                  onMouseEnter={() => setHoverIndex(idx)}
                  onTouchStart={() => setHoverIndex(idx)}
                  className="cursor-crosshair"
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Trade notification banner */}
      {tradeMessage && (
        <div className="mb-3 p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 rounded-xl text-xs font-semibold text-emerald-800 dark:text-emerald-200 animate-in fade-in slide-in-from-top-2">
          ✓ {tradeMessage}
        </div>
      )}

      {/* Buy / Sell Quick Execution Bar */}
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        <button
          onClick={() => handleSimulateTrade('sell')}
          className="py-3 px-4 bg-[#f23645] hover:bg-red-700 text-white font-bold text-sm rounded-xl active:scale-98 transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          type="button"
        >
          <span>SELL</span>
          <span className="text-xs opacity-90">${(currentItem.price * 0.999).toFixed(2)}</span>
        </button>

        <button
          onClick={() => handleSimulateTrade('buy')}
          className="py-3 px-4 bg-[#089981] hover:bg-emerald-700 text-white font-bold text-sm rounded-xl active:scale-98 transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          type="button"
        >
          <span>BUY</span>
          <span className="text-xs opacity-90">${(currentItem.price * 1.001).toFixed(2)}</span>
        </button>
      </div>

      {/* Key Statistics Grid */}
      <div className="bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-2xl p-4 shadow-xs">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          Key Statistics
        </h3>

        <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
          <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
            <span className="text-slate-500 dark:text-slate-400">Market Cap</span>
            <span className="font-bold text-slate-900 dark:text-white tabular-nums">{currentItem.marketCap || '$3.18T'}</span>
          </div>

          <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
            <span className="text-slate-500 dark:text-slate-400">Volume</span>
            <span className="font-bold text-slate-900 dark:text-white tabular-nums">{currentItem.volume || '28.4M'}</span>
          </div>

          <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
            <span className="text-slate-500 dark:text-slate-400">52W High</span>
            <span className="font-bold text-slate-900 dark:text-white tabular-nums">${currentItem.high52w || (currentItem.price * 1.15).toFixed(2)}</span>
          </div>

          <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
            <span className="text-slate-500 dark:text-slate-400">52W Low</span>
            <span className="font-bold text-slate-900 dark:text-white tabular-nums">${currentItem.low52w || (currentItem.price * 0.75).toFixed(2)}</span>
          </div>

          <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
            <span className="text-slate-500 dark:text-slate-400">P/E Ratio</span>
            <span className="font-bold text-slate-900 dark:text-white tabular-nums">{currentItem.peRatio || '34.2'}</span>
          </div>

          <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
            <span className="text-slate-500 dark:text-slate-400">Sector</span>
            <span className="font-bold text-slate-900 dark:text-white truncate max-w-[90px]">{currentItem.sector || 'Technology'}</span>
          </div>
        </div>

        {currentItem.description && (
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {currentItem.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
