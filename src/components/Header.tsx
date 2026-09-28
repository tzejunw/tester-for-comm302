import React from 'react';

interface HeaderProps {
  onOpenDrawer: () => void;
  onOpenSearch: () => void;
  onOpenGetStarted: () => void;
  isDark?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDrawer,
  onOpenSearch,
  onOpenGetStarted,
  isDark = false
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#131722]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 h-14 flex items-center justify-between transition-colors">
      {/* Left side: Hamburger Menu & Official TradingView Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenDrawer}
          aria-label="Open navigation menu"
          type="button"
          className="p-1.5 -ml-1 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg active:scale-95 transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.2" viewBox="0 0 24 24">
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>

        {/* Official TradingView Logo Mark */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="TradingView Home"
          className="flex items-center gap-1.5 focus:outline-hidden group"
          type="button"
        >
          <svg
            className="h-6 w-auto text-black dark:text-white fill-current transition-transform group-hover:scale-105"
            viewBox="0 0 36 28"
            fill="none"
          >
            <path d="M12.5 0H7.8C7.1 0 6.5.6 6.5 1.3V19c0 .7.6 1.3 1.3 1.3h4.7c.7 0 1.3-.6 1.3-1.3V1.3C13.8.6 13.2 0 12.5 0z" />
            <path d="M2.6 7.8H0V26.7C0 27.4.6 28 1.3 28h4c.7 0 1.3-.6 1.3-1.3V7.8H2.6z" />
            <path d="M34.7 0H20.3c-.7 0-1.3.6-1.3 1.3v5.2c0 .7.6 1.3 1.3 1.3h5.7L18.4 26.2c-.3.7.2 1.8 1 1.8h5.3c.5 0 .9-.3 1.1-.7l9.9-24.8c.3-.8-.3-1.7-1-1.7v-.8z" />
          </svg>
        </button>
      </div>

      {/* Right side: Search Icon & Gradient 'Get started' Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenSearch}
          aria-label="Search markets and symbols"
          type="button"
          className="p-2 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full active:scale-90 transition-all"
        >
          <svg className="w-5 h-5 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" />
            <line strokeLinecap="round" x1="21" x2="16.65" y1="21" y2="16.65" />
          </svg>
        </button>

        {/* TradingView Signature Gradient Button */}
        <button
          onClick={onOpenGetStarted}
          type="button"
          className="bg-gradient-to-r from-[#2962ff] via-[#4d52ff] to-[#802cf6] text-white text-[13px] font-semibold px-3.5 py-1.5 rounded-full shadow-sm hover:opacity-95 active:opacity-90 active:scale-95 transition-all whitespace-nowrap"
        >
          Get started
        </button>
      </div>
    </header>
  );
};
