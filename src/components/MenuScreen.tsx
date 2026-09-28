import React from 'react';

interface MenuScreenProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenGetStarted: () => void;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({
  isDark,
  onToggleTheme,
  onOpenGetStarted
}) => {
  return (
    <div className="flex-1 pb-24 px-4 pt-4">
      {/* User / Profile Header Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white rounded-3xl p-5 shadow-lg mb-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center gap-3.5 mb-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-lg shadow-md">
            TV
          </div>
          <div>
            <div className="text-base font-extrabold flex items-center gap-1.5">
              <span>TradingView User</span>
              <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded">
                BASIC
              </span>
            </div>
            <div className="text-xs text-slate-300">trader_guest@tradingview.com</div>
          </div>
        </div>

        {/* Upgrade Pro banner */}
        <div className="mt-4 pt-3 border-t border-slate-700/80 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-amber-300">Upgrade to Essential / Plus</div>
            <div className="text-[11px] text-slate-400">Unlock 5 indicators per chart & custom intervals</div>
          </div>
          <button
            onClick={onOpenGetStarted}
            className="px-3 py-1.5 bg-gradient-to-r from-[#2962ff] to-[#802cf6] text-white text-xs font-bold rounded-full shadow-xs active:scale-95 transition-all whitespace-nowrap cursor-pointer"
            type="button"
          >
            Upgrade
          </button>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-2xl overflow-hidden shadow-xs mb-5">
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-b border-[#e0e3eb] dark:border-slate-800">
          <h2 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Preferences & Appearance
          </h2>
        </div>

        <div className="divide-y divide-[#e0e3eb]/70 dark:divide-slate-800 text-xs">
          {/* Dark Mode Toggle */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200">
                {isDark ? '🌙' : '☀️'}
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Dark Theme</div>
                <div className="text-slate-500 dark:text-slate-400">TradingView signature night mode</div>
              </div>
            </div>

            <button
              onClick={onToggleTheme}
              type="button"
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                isDark ? 'bg-[#2962ff]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform absolute top-0.5 ${
                  isDark ? 'right-0.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* Currency Display */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-700 dark:text-slate-200">
                $
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Default Currency</div>
                <div className="text-slate-500 dark:text-slate-400">USD - US Dollar</div>
              </div>
            </div>
            <span className="text-slate-400 font-semibold">USD</span>
          </div>

          {/* Sound & Haptics */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200">
                🔔
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Price Alerts</div>
                <div className="text-slate-500 dark:text-slate-400">Instant push notifications on price triggers</div>
              </div>
            </div>
            <span className="text-[#089981] font-bold">Enabled</span>
          </div>
        </div>
      </div>

      {/* TradingView Products Grid */}
      <div className="bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-2xl overflow-hidden shadow-xs mb-5">
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-b border-[#e0e3eb] dark:border-slate-800">
          <h2 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            TradingView Products
          </h2>
        </div>

        <div className="p-3 grid grid-cols-2 gap-2 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
            <div className="text-base mb-1">📈</div>
            <div className="font-bold text-slate-900 dark:text-white">Supercharts</div>
            <div className="text-[11px] text-slate-400">Multi-chart layouts & Pine Script</div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
            <div className="text-base mb-1">🔍</div>
            <div className="font-bold text-slate-900 dark:text-white">Screeners</div>
            <div className="text-[11px] text-slate-400">Filter stocks by 100+ metrics</div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
            <div className="text-base mb-1">🗺️</div>
            <div className="font-bold text-slate-900 dark:text-white">Heatmaps</div>
            <div className="text-[11px] text-slate-400">S&P 500 & Crypto sector map</div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
            <div className="text-base mb-1">📅</div>
            <div className="font-bold text-slate-900 dark:text-white">Economic Calendar</div>
            <div className="text-[11px] text-slate-400">Fed rates, CPI, earnings dates</div>
          </div>
        </div>
      </div>

      {/* Support & Legal */}
      <div className="text-center text-xs text-slate-400 py-3 space-y-1">
        <div className="flex justify-center gap-4 text-slate-600 dark:text-slate-400 font-semibold">
          <a href="#" className="hover:underline">Help Center</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
        </div>
        <div>TradingView Mobile Web v2.14.0</div>
        <div>© 2025 TradingView. Look first / Then leap.</div>
      </div>
    </div>
  );
};
