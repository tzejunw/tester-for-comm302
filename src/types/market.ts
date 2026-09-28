export type AssetCategory = 'indices' | 'futures' | 'forex' | 'bonds' | 'crypto' | 'stocks';

export type MarketRegion = 'everywhere' | 'americas' | 'europe' | 'asia';

export interface PricePoint {
  time: string;
  price: number;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  volume?: number;
}

export interface MarketItem {
  id: string;
  symbol: string;
  name: string;
  category: AssetCategory;
  region?: MarketRegion;
  price: number;
  change: number;
  changePercent: number;
  volume?: string;
  marketCap?: string;
  high52w?: number;
  low52w?: number;
  peRatio?: number;
  divYield?: string;
  sector?: string;
  badgeText?: string;
  badgeBg?: string;
  badgeTextColor?: string;
  iconType?: 'apple' | 'nvidia' | 'amazon' | 'tesla' | 'microsoft' | 'meta' | 'google' | 'crypto' | 'flag' | 'text';
  sparkline: number[];
  history: PricePoint[];
  description?: string;
}

export interface WatchlistGroup {
  id: string;
  name: string;
  symbols: string[];
}

export interface CommunityIdea {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
    badge?: string;
    reputation: number;
  };
  symbol: string;
  title: string;
  sentiment: 'long' | 'short' | 'neutral';
  timeframe: string;
  timestamp: string;
  content: string;
  likes: number;
  comments: number;
  tags: string[];
  entryPrice?: number;
  targetPrice?: number;
  stopLoss?: number;
}
