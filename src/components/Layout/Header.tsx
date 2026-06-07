import { Search, Plus, LayoutGrid, List, Clock } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';
import { VIEW_MODES } from '@/utils/constants';
import type { ViewMode } from '@/types/game';

export default function Header() {
  const { viewMode, setViewMode, setFilters, openModal, filters } = useGameStore();

  const viewIcons: Record<ViewMode, typeof LayoutGrid> = {
    grid: LayoutGrid,
    list: List,
    timeline: Clock,
  };

  return (
    <header className="sticky top-0 z-50 bg-bg-darker/95 backdrop-blur-sm border-b-2 border-neon-blue/30">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h1 className="font-pixel text-lg text-neon-blue neon-text tracking-wider">
              RETRO<span className="text-neon-pink">ARCHIVE</span>
            </h1>
            <span className="hidden sm:inline-block font-retro text-sm text-gray-400">
              复古游戏收藏管理
            </span>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neon-blue/60" />
              <input
                type="text"
                placeholder="搜索游戏..."
                value={filters.searchQuery}
                onChange={(e) => setFilters({ searchQuery: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-bg-card border-2 border-neon-blue/30 font-retro text-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue focus:shadow-neon-blue transition-all"
              />
            </div>

            <div className="flex items-center gap-1 bg-bg-card border-2 border-neon-pink/30 p-1">
              {VIEW_MODES.map((mode) => {
                const Icon = viewIcons[mode.value as ViewMode];
                const isActive = viewMode === mode.value;
                return (
                  <button
                    key={mode.value}
                    onClick={() => setViewMode(mode.value as ViewMode)}
                    title={mode.label}
                    className={`p-2 transition-all ${
                      isActive
                        ? 'bg-neon-pink text-bg-darker shadow-neon-pink'
                        : 'text-neon-pink/60 hover:text-neon-pink hover:bg-neon-pink/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => openModal()}
              className="btn-retro btn-retro-yellow flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">添加游戏</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
