import React, { useState, useEffect } from 'react';
import { MarketItem } from './types/market';
import { ALL_ITEMS, MAJOR_INDICES, US_STOCKS, MARKET_MOVERS } from './data/mockMarketData';
import { Header } from './components/Header';
import { BottomNav, ScreenTab } from './components/BottomNav';
import { MarketsScreen } from './components/MarketsScreen';
import { WatchlistScreen } from './components/WatchlistScreen';
import { ChartScreen } from './components/ChartScreen';
import { IdeasScreen } from './components/IdeasScreen';
import { MenuScreen } from './components/MenuScreen';
import { SearchModal } from './components/SearchModal';
import { DetailModal } from './components/DetailModal';
import { DrawerMenu } from './components/DrawerMenu';
import { GetStartedModal } from './components/GetStartedModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ScreenTab>('markets');
  const [isDark, setIsDark] = useState(false);
  const [selectedTicker, setSelectedTicker] = useState<MarketItem | null>(null);
  const [chartItem, setChartItem] = useState<MarketItem>(US_STOCKS[0]); // NVDA default
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);

  // Watchlist items state (default initial list)
  const [watchlist, setWatchlist] = useState<MarketItem[]>([
    US_STOCKS[0], // NVDA
    US_STOCKS[1], // AAPL
    US_STOCKS[3], // TSLA
    MARKET_MOVERS[0], // MSFT
    MARKET_MOVERS[3], // BTC
    MAJOR_INDICES[0], // SPX
  ]);

  // Apply dark mode class to html element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Simulated live market price ticks
  useEffect(() => {
    const interval = setInterval(() => {
      setWatchlist((prevList) => {
        const randomIndex = Math.floor(Math.random() * prevList.length);
        const itemToUpdate = prevList[randomIndex];
        if (!itemToUpdate) return prevList;

        const deltaPercent = (Math.random() - 0.49) * 0.08;
        const newPrice = Number((itemToUpdate.price * (1 + deltaPercent / 100)).toFixed(2));
        const newChange = Number((itemToUpdate.change + (newPrice - itemToUpdate.price)).toFixed(2));
        const newChangePercent = Number((itemToUpdate.changePercent + deltaPercent).toFixed(2));

        const updated = [...prevList];
        updated[randomIndex] = {
          ...itemToUpdate,
          price: newPrice,
          change: newChange,
          changePercent: newChangePercent
        };
        return updated;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const handleSelectTicker = (item: MarketItem) => {
    setSelectedTicker(item);
    setIsDetailModalOpen(true);
  };

  const handleOpenChart = (item: MarketItem) => {
    setChartItem(item);
    setCurrentTab('chart');
    setIsDetailModalOpen(false);
  };

  const handleToggleWatchlist = (item: MarketItem) => {
    setWatchlist((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      } else {
        return [item, ...prev];
      }
    });
  };

  const handleRemoveFromWatchlist = (id: string) => {
    setWatchlist((prev) => prev.filter((i) => i.id !== id));
  };

  const handleSelectBySymbol = (symbol: string) => {
    const found = ALL_ITEMS.find((i) => i.symbol.toUpperCase() === symbol.toUpperCase());
    if (found) {
      handleOpenChart(found);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex justify-center selection:bg-blue-100 transition-colors">
      {/* Mobile Viewport Wrapper: Constrained to standard mobile bounds 390px - 430px */}
      <div className="w-full max-w-[430px] min-h-screen bg-white dark:bg-[#131722] shadow-2xl flex flex-col relative transition-colors">
        {/* Sticky Top Header */}
        <Header
          onOpenDrawer={() => setIsDrawerOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenGetStarted={() => setIsGetStartedOpen(true)}
          isDark={isDark}
        />

        {/* Main Active Screen Content */}
        <main className="flex-1 flex flex-col">
          {currentTab === 'markets' && (
            <MarketsScreen
              onSelectTicker={handleSelectTicker}
              onNavigateToChart={handleOpenChart}
              onNavigateToWatchlist={() => setCurrentTab('watchlist')}
            />
          )}

          {currentTab === 'watchlist' && (
            <WatchlistScreen
              watchlistItems={watchlist}
              onSelectTicker={handleSelectTicker}
              onRemoveFromWatchlist={handleRemoveFromWatchlist}
              onOpenSearch={() => setIsSearchOpen(true)}
            />
          )}

          {currentTab === 'chart' && (
            <ChartScreen
              initialItem={chartItem}
              onSelectTicker={handleSelectTicker}
              onOpenSearch={() => setIsSearchOpen(true)}
            />
          )}

          {currentTab === 'ideas' && (
            <IdeasScreen
              onSelectTickerBySymbol={handleSelectBySymbol}
            />
          )}

          {currentTab === 'menu' && (
            <MenuScreen
              isDark={isDark}
              onToggleTheme={() => setIsDark(!isDark)}
              onOpenGetStarted={() => setIsGetStartedOpen(true)}
            />
          )}
        </main>

        {/* Fixed Mobile Bottom Navigation */}
        <BottomNav
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* Overlays & Drawers */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectTicker={(item) => handleSelectTicker(item)}
          onAddToWatchlist={(item) => handleToggleWatchlist(item)}
          watchlistSymbols={watchlist.map((i) => i.symbol)}
        />

        <DetailModal
          item={selectedTicker}
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          onOpenChart={handleOpenChart}
          onToggleWatchlist={handleToggleWatchlist}
          isInWatchlist={Boolean(selectedTicker && watchlist.some((i) => i.id === selectedTicker.id))}
        />

        <DrawerMenu
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          onNavigateTab={(tab) => setCurrentTab(tab)}
          onOpenGetStarted={() => setIsGetStartedOpen(true)}
        />

        <GetStartedModal
          isOpen={isGetStartedOpen}
          onClose={() => setIsGetStartedOpen(false)}
        />
      </div>
    </div>
  );
}
