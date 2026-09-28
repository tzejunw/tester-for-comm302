import React from 'react';
import { ScreenTab } from './BottomNav';

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: ScreenTab) => void;
  onOpenGetStarted: () => void;
}

export const DrawerMenu: React.FC<DrawerMenuProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
  onOpenGetStarted
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-start animate-in fade-in duration-150">
      <div
        className="w-[82%] max-w-[320px] h-full bg-white dark:bg-[#1e222d] shadow-2xl p-5 flex flex-col justify-between animate-in slide-in-from-left duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Top Brand & Close */}
          <div className="flex items-center justify-between pb-5 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <svg className="h-6 w-auto text-black dark:text-white fill-current" viewBox="0 0 36 28">
                <path d="M12.5 0H7.8C7.1 0 6.5.6 6.5 1.3V19c0 .7.6 1.3 1.3 1.3h4.7c.7 0 1.3-.6 1.3-1.3V1.3C13.8.6 13.2 0 12.5 0z" />
                <path d="M2.6 7.8H0V26.7C0 27.4.6 28 1.3 28h4c.7 0 1.3-.6 1.3-1.3V7.8H2.6z" />
                <path d="M34.7 0H20.3c-.7 0-1.3.6-1.3 1.3v5.2c0 .7.6 1.3 1.3 1.3h5.7L18.4 26.2c-.3.7.2 1.8 1 1.8h5.3c.5 0 .9-.3 1.1-.7l9.9-24.8c.3-.8-.3-1.7-1-1.7v-.8z" />
              </svg>
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">TradingView</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Navigation Links */}
          <div className="mt-4 space-y-1">
            <button
              onClick={() => {
                onNavigateTab('markets');
                onClose();
              }}
              className="w-full text-left px-3 py-2.5 rounded-xl font-bold text-sm text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-3 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5 text-[#2962ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
              <span>Markets & Indices</span>
            </button>

            <button
              onClick={() => {
                onNavigateTab('chart');
                onClose();
              }}
              className="w-full text-left px-3 py-2.5 rounded-xl font-bold text-sm text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-3 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M3 3v18h18" />
                <path d="M19 9l-5 5-4-4-3 3" />
              </svg>
              <span>Supercharts</span>
            </button>

            <button
              onClick={() => {
                onNavigateTab('watchlist');
                onClose();
              }}
              className="w-full text-left px-3 py-2.5 rounded-xl font-bold text-sm text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-3 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="9" />
                <rect x="14" y="3" width="7" height="5" />
                <rect x="14" y="12" width="7" height="9" />
                <rect x="3" y="16" width="7" height="5" />
              </svg>
              <span>Watchlists</span>
            </button>

            <button
              onClick={() => {
                onNavigateTab('ideas');
                onClose();
              }}
              className="w-full text-left px-3 py-2.5 rounded-xl font-bold text-sm text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-3 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span>Community Ideas</span>
            </button>

            <button
              onClick={() => {
                onNavigateTab('menu');
                onClose();
              }}
              className="w-full text-left px-3 py-2.5 rounded-xl font-bold text-sm text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-3 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              <span>Settings & Preferences</span>
            </button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={() => {
              onOpenGetStarted();
              onClose();
            }}
            className="w-full py-3 bg-gradient-to-r from-[#2962ff] via-[#4d52ff] to-[#802cf6] text-white text-xs font-bold rounded-xl shadow-md active:scale-98 transition-all cursor-pointer"
          >
            Get started / Sign in
          </button>
          <div className="text-[11px] text-center text-slate-400 mt-2">
            Look first / Then leap
          </div>
        </div>
      </div>
    </div>
  );
};
