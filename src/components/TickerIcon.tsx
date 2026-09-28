import React from 'react';

interface TickerIconProps {
  type?: string;
  symbol: string;
  badgeText?: string;
  badgeBg?: string;
  badgeTextColor?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const TickerIcon: React.FC<TickerIconProps> = ({
  type,
  symbol,
  badgeText,
  badgeBg,
  badgeTextColor = '#ffffff',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6 text-[10px]',
    md: 'w-7 h-7 text-xs',
    lg: 'w-9 h-9 text-xs font-bold'
  }[size];

  // Specific brand logos matching TradingView
  if (symbol === 'NVDA' || type === 'nvidia') {
    return (
      <div className={`${sizeClasses} rounded-full bg-[#76b900] text-white flex items-center justify-center shrink-0 shadow-xs`}>
        <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
          <path d="M8.9 7.7c-.5 0-.9.2-1.2.6-.9 1-1.3 2.7-1.3 4.8 0 3.2.9 5.3 2.4 6 1 .5 2.1.2 3.1-.7l1.1 1.3c-1.4 1.3-3 1.7-4.6 1.1-2.2-.9-3.4-3.5-3.4-7.5 0-2.6.6-4.7 1.8-6 1.1-1.2 2.6-1.7 4.1-1.7.9 0 1.9.2 2.8.6l-.9 1.5c-.7-.3-1.4-.4-2-.4l-.9-.1zm4.7 2.1c-.8.8-1.2 2.1-1.2 3.8 0 2.4.6 3.9 1.7 4.2.7.2 1.4 0 2-.6l1 1.2c-.9.9-2 1.3-3.2 1-1.7-.5-2.8-2.3-2.8-5.7 0-2 .5-3.6 1.4-4.6.8-.9 1.9-1.3 3.1-1.3.8 0 1.6.2 2.4.6l-.8 1.4c-.6-.3-1.2-.5-1.7-.5-.7 0-1.3.3-1.9.9z" />
        </svg>
      </div>
    );
  }

  if (symbol === 'AAPL' || type === 'apple') {
    return (
      <div className={`${sizeClasses} rounded-full bg-black text-white flex items-center justify-center shrink-0 shadow-xs dark:bg-white dark:text-black`}>
        <svg className="w-4 h-4 fill-current" viewBox="0 0 170 170">
          <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.77-8.08-12.24-15.01-6.19-9.59-11.08-20.73-14.67-33.43-3.59-12.7-5.39-24.63-5.39-35.8 0-14.56 3.63-26.79 10.88-36.68 7.26-9.9 16.48-14.99 27.67-15.28 4.24 0 9.27 1.25 15.08 3.75 5.81 2.5 9.77 3.87 11.88 4.12 1.95-.25 5.92-1.66 11.89-4.24 5.97-2.58 10.88-3.75 14.74-3.51 11.75.58 21.05 4.96 27.89 13.14-10.42 6.32-15.51 15.11-15.27 26.36.24 8.78 3.51 16.14 9.8 22.08 6.3 5.94 13.88 9.38 22.75 10.33-2.12 6.33-4.66 12.78-7.61 19.35zm-33.15-104.7c0-6.19 2.29-12.13 6.87-17.81 4.58-5.68 10.34-9.35 17.29-11.01.25 1.5.38 2.87.38 4.12 0 6.07-2.4 12.08-7.21 18.03-4.8 5.95-10.74 9.47-17.81 10.56-.25-1.25-.38-2.54-.38-3.89z" />
        </svg>
      </div>
    );
  }

  if (symbol === 'AMZN' || type === 'amazon') {
    return (
      <div className={`${sizeClasses} rounded-full bg-[#ff9900] text-black font-extrabold flex items-center justify-center shrink-0 shadow-xs`}>
        a
      </div>
    );
  }

  if (symbol === 'TSLA' || type === 'tesla') {
    return (
      <div className={`${sizeClasses} rounded-full bg-[#e82127] text-white font-black flex items-center justify-center shrink-0 shadow-xs`}>
        T
      </div>
    );
  }

  if (symbol === 'BTC') {
    return (
      <div className={`${sizeClasses} rounded-full bg-[#f7931a] text-white font-bold flex items-center justify-center shrink-0 shadow-xs`}>
        ₿
      </div>
    );
  }

  if (symbol === 'ETH') {
    return (
      <div className={`${sizeClasses} rounded-full bg-[#627eea] text-white font-bold flex items-center justify-center shrink-0 shadow-xs`}>
        Ξ
      </div>
    );
  }

  if (badgeText) {
    return (
      <div
        className={`${sizeClasses} rounded-full font-black flex items-center justify-center shrink-0 shadow-xs tracking-tight`}
        style={{
          backgroundColor: badgeBg || '#2962ff',
          color: badgeTextColor
        }}
      >
        {badgeText}
      </div>
    );
  }

  // Fallback initial badge
  return (
    <div
      className={`${sizeClasses} rounded-xl font-bold flex items-center justify-center shrink-0`}
      style={{
        backgroundColor: badgeBg || '#f1f5f9',
        color: badgeTextColor || '#1e293b'
      }}
    >
      {symbol.slice(0, 4)}
    </div>
  );
};

export const USFlagIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <div className={`${className} rounded-full overflow-hidden shrink-0 shadow-xs border border-slate-200 flex items-center justify-center`}>
    <svg className="w-full h-full" viewBox="0 0 512 512">
      <g fill="none">
        <path d="M0 0h512v512H0z" fill="#d80027" />
        <path d="M0 39.4h512v39.4H0zm0 78.8h512v39.4H0zm0 78.8h512v39.4H0zm0 78.8h512v39.4H0zm0 78.8h512v39.4H0zm0 78.8h512v39.4H0z" fill="#f0f0f0" />
        <path d="M0 0h256v275.9H0z" fill="#0052b4" />
        <g fill="#f0f0f0">
          <circle cx="36" cy="30" r="10" />
          <circle cx="85" cy="30" r="10" />
          <circle cx="134" cy="30" r="10" />
          <circle cx="183" cy="30" r="10" />
          <circle cx="232" cy="30" r="10" />
          <circle cx="60" cy="65" r="10" />
          <circle cx="109" cy="65" r="10" />
          <circle cx="158" cy="65" r="10" />
          <circle cx="207" cy="65" r="10" />
          <circle cx="36" cy="100" r="10" />
          <circle cx="85" cy="100" r="10" />
          <circle cx="134" cy="100" r="10" />
          <circle cx="183" cy="100" r="10" />
          <circle cx="232" cy="100" r="10" />
          <circle cx="60" cy="135" r="10" />
          <circle cx="109" cy="135" r="10" />
          <circle cx="158" cy="135" r="10" />
          <circle cx="207" cy="135" r="10" />
        </g>
      </g>
    </svg>
  </div>
);
