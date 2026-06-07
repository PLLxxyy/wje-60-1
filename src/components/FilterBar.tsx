import { X, ChevronDown } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';
import { PLATFORMS, GENRES, SORT_FIELDS, SORT_ORDERS, STATUS_LABELS } from '@/utils/constants';
import type { GameStatus } from '@/types/game';

export default function FilterBar() {
  const { filters, sort, setFilters, setSort, games } = useGameStore();

  const years = Array.from(
    new Set(games.map(g => g.releaseYear))
  ).filter(y => !isNaN(y) && y >= 1970 && y <= 2030).sort((a, b) => b - a);

  const hasActiveFilters = filters.platform || filters.genre || filters.year || filters.status;

  const clearFilters = () => {
    setFilters({
      platform: null,
      genre: null,
      year: null,
      status: null,
    });
  };

  const statusOptions: { value: GameStatus | 'all'; label: string }[] = [
    { value: 'all', label: '全部状态' },
    { value: 'playing', label: STATUS_LABELS.playing },
    { value: 'completed', label: STATUS_LABELS.completed },
    { value: 'wishlist', label: STATUS_LABELS.wishlist },
    { value: 'none', label: STATUS_LABELS.none },
  ];

  return (
    <div className="bg-bg-card border-2 border-neon-blue/20 p-4 mb-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <select
            value={filters.platform || ''}
            onChange={(e) => setFilters({ platform: e.target.value || null })}
            className="appearance-none bg-bg-darker border-2 border-neon-blue/30 px-4 py-2 pr-10 font-retro text-lg text-white focus:outline-none focus:border-neon-blue transition-all cursor-pointer"
          >
            <option value="">全部平台</option>
            {PLATFORMS.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neon-blue pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={filters.genre || ''}
            onChange={(e) => setFilters({ genre: e.target.value || null })}
            className="appearance-none bg-bg-darker border-2 border-neon-pink/30 px-4 py-2 pr-10 font-retro text-lg text-white focus:outline-none focus:border-neon-pink transition-all cursor-pointer"
          >
            <option value="">全部类型</option>
            {GENRES.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neon-pink pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={filters.year || ''}
            onChange={(e) => setFilters({ year: e.target.value ? Number(e.target.value) : null })}
            className="appearance-none bg-bg-darker border-2 border-neon-yellow/30 px-4 py-2 pr-10 font-retro text-lg text-white focus:outline-none focus:border-neon-yellow transition-all cursor-pointer"
          >
            <option value="">全部年份</option>
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neon-yellow pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={filters.status || 'all'}
            onChange={(e) => setFilters({ status: e.target.value === 'all' ? null : e.target.value as GameStatus })}
            className="appearance-none bg-bg-darker border-2 border-neon-green/30 px-4 py-2 pr-10 font-retro text-lg text-white focus:outline-none focus:border-neon-green transition-all cursor-pointer"
          >
            {statusOptions.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neon-green pointer-events-none" />
        </div>

        <div className="h-8 w-px bg-gray-700 mx-2 hidden sm:block" />

        <div className="flex items-center gap-2">
          <span className="font-retro text-gray-400 text-lg">排序:</span>
          <select
            value={sort.field}
            onChange={(e) => setSort({ field: e.target.value as typeof sort.field })}
            className="appearance-none bg-bg-darker border-2 border-white/20 px-3 py-2 pr-8 font-retro text-lg text-white focus:outline-none focus:border-white/50 transition-all cursor-pointer"
          >
            {SORT_FIELDS.map(f => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
          <select
            value={sort.order}
            onChange={(e) => setSort({ order: e.target.value as typeof sort.order })}
            className="appearance-none bg-bg-darker border-2 border-white/20 px-3 py-2 pr-8 font-retro text-lg text-white focus:outline-none focus:border-white/50 transition-all cursor-pointer"
          >
            {SORT_ORDERS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="ml-auto flex items-center gap-2 px-3 py-2 text-neon-pink hover:bg-neon-pink/10 border border-neon-pink/30 font-retro text-lg transition-all"
          >
            <X className="w-4 h-4" />
            清除筛选
          </button>
        )}
      </div>
    </div>
  );
}
