import React from 'react';

export type ScreenTab = 'markets' | 'watchlist' | 'chart' | 'ideas' | 'menu';

interface BottomNavProps {
  currentTab: ScreenTab;
  onSelectTab: (tab: ScreenTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  const tabs = [
    {
      id: 'markets' as ScreenTab,
      label: 'Markets',
      icon: (active: boolean) => (
        <svg className={`w-5 h-5 ${active ? 'stroke-[2.5]' : 'stroke-[2]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      )
    },
    {
      id: 'watchlist' as ScreenTab,
      label: 'Watchlist',
      icon: (active: boolean) => (
        <svg className={`w-5 h-5 ${active ? 'stroke-[2.5]' : 'stroke-[2]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect height="9" width="7" x="3" y="3" />
          <rect height="5" width="7" x="14" y="3" />
          <rect height="9" width="7" x="14" y="12" />
          <rect height="5" width="7" x="3" y="16" />
        </svg>
      )
    },
    {
      id: 'chart' as ScreenTab,
      label: 'Chart',
      icon: (active: boolean) => (
        <svg className={`w-5 h-5 ${active ? 'stroke-[2.5]' : 'stroke-[2]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M3 3v18h18" />
          <path d="M19 9l-5 5-4-4-3 3" />
        </svg>
      )
    },
    {
      id: 'ideas' as ScreenTab,
      label: 'Ideas',
      icon: (active: boolean) => (
        <svg className={`w-5 h-5 ${active ? 'stroke-[2.5]' : 'stroke-[2]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      )
    },
    {
      id: 'menu' as ScreenTab,
      label: 'Menu',
      icon: (active: boolean) => (
        <svg className={`w-5 h-5 ${active ? 'stroke-[2.5]' : 'stroke-[2]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      )
    }
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/95 dark:bg-[#131722]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-6 py-2 flex items-center justify-between text-xs z-50 transition-colors">
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            type="button"
            className={`flex flex-col items-center gap-1 min-w-[52px] py-1 transition-colors select-none ${
              isActive
                ? 'text-[#2962ff] font-semibold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {tab.icon(isActive)}
            <span className="text-[11px] leading-tight">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
