import type { GameStatus } from '../types/game';

export const PLATFORMS = [
  'NES', 'SNES', 'N64', 'GameCube', 'Wii',
  'PlayStation', 'PlayStation 2', 'PSP',
  'Genesis', 'Saturn', 'Dreamcast',
  'Game Boy', 'Game Boy Advance', 'Nintendo DS',
  'Arcade', 'PC', 'Other'
] as const;

export const GENRES = [
  '动作', '冒险', '角色扮演', '策略', '射击',
  '格斗', '竞速', '体育', '益智', '模拟', '其他'
] as const;

export const PLATFORM_COLORS: Record<string, string> = {
  'NES': '#c41e3a',
  'SNES': '#5c4033',
  'N64': '#4a2c7a',
  'GameCube': '#7a00ff',
  'Wii': '#ffffff',
  'PlayStation': '#003087',
  'PlayStation 2': '#003087',
  'PSP': '#003087',
  'Genesis': '#000000',
  'Saturn': '#1a1a1a',
  'Dreamcast': '#ff6600',
  'Game Boy': '#c0c0c0',
  'Game Boy Advance': '#7d7d7d',
  'Nintendo DS': '#7d7d7d',
  'Arcade': '#ff006e',
  'PC': '#00d9ff',
  'Other': '#666666'
};

export const STATUS_LABELS: Record<GameStatus, string> = {
  none: '未标记',
  playing: '正在玩',
  completed: '已通关',
  wishlist: '想玩'
};

export const STATUS_ICONS: Record<GameStatus, string> = {
  none: '○',
  playing: '▶',
  completed: '✓',
  wishlist: '★'
};

export const SORT_FIELDS = [
  { value: 'name', label: '名称' },
  { value: 'releaseYear', label: '发行年份' },
  { value: 'platform', label: '平台' },
  { value: 'createdAt', label: '添加时间' }
] as const;

export const SORT_ORDERS = [
  { value: 'asc', label: '升序' },
  { value: 'desc', label: '降序' }
] as const;

export const VIEW_MODES = [
  { value: 'grid', label: '封面墙', icon: 'LayoutGrid' },
  { value: 'list', label: '列表', icon: 'List' },
  { value: 'timeline', label: '时间轴', icon: 'Clock' }
] as const;

export const DEFAULT_COVER = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI4MCIgdmlld0JveD0iMCAwIDIwMCAyODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjgwIiBmaWxsPSIjMWExYTJlIi8+CjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIyNjAiIGZpbGw9IiMwYTBhMTIiIHN0cm9rZT0iIzAwZDlmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwZDlmZiIgc3Ryb2tlLXdpZHRoPSIyIiBvcGFjaXR5PSIwLjUiLz4KPHBhdGggZD0iTTcwIDEwMEgxMzBNMTAwIDcwVjEzMCIgc3Ryb2tlPSIjMDBkOWZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgb3BhY2l0eT0iMC41Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjY2IiBmb250LWZhbWlseT0iVfQzMjMiIGZvbnQtc2l6ZT0iMjAiPkhPTExT1c8L3RleHQ+Cjx0ZXh0IHg9IjEwMCIgeT0iMjMwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjY2IiBmb250LWZhbWlseT0iVfQzMjMiIGZvbnQtc2l6ZT0iMTQiPk5PIENPVkVSPC90ZXh0Pgo8L3N2Zz4K';
