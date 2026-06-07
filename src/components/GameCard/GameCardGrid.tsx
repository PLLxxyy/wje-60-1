import { useState } from 'react';
import { Edit2, Trash2, Play, Check, Star, Circle } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';
import { PLATFORM_COLORS, STATUS_LABELS } from '@/utils/constants';
import type { Game, GameStatus } from '@/types/game';

interface GameCardGridProps {
  game: Game;
  index: number;
}

export default function GameCardGrid({ game, index }: GameCardGridProps) {
  const { setGameStatus, openModal, deleteGame } = useGameStore();
  const [showActions, setShowActions] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  const platformColor = PLATFORM_COLORS[game.platform] || '#666666';
  
  const statusConfig: Record<GameStatus, { icon: typeof Play; color: string; label: string }> = {
    none: { icon: Circle, color: 'text-gray-500', label: STATUS_LABELS.none },
    playing: { icon: Play, color: 'text-status-playing', label: STATUS_LABELS.playing },
    completed: { icon: Check, color: 'text-status-completed', label: STATUS_LABELS.completed },
    wishlist: { icon: Star, color: 'text-status-wishlist', label: STATUS_LABELS.wishlist },
  };

  const statusOptions: GameStatus[] = ['none', 'playing', 'completed', 'wishlist'];
  const currentStatus = statusConfig[game.status];
  const StatusIcon = currentStatus.icon;

  const handleDelete = () => {
    if (confirm(`确定要删除 "${game.name}" 吗？`)) {
      deleteGame(game.id);
    }
  };

  const staggerClass = `animate-stagger-${(index % 8) + 1}` as const;

  return (
    <div
      className={`group relative opacity-0 animate-fade-in-up ${staggerClass} card-glow`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => {
        setShowActions(false);
        setShowStatusMenu(false);
      }}
    >
      <div className="relative bg-bg-card rounded-none border-2 border-white/10 hover:border-neon-blue/50 transition-all duration-300 overflow-hidden hover:-translate-y-2 hover:shadow-cartridge-hover shadow-cartridge">
        <div
          className="absolute top-0 left-0 right-0 h-2"
          style={{ backgroundColor: platformColor }}
        />
        
        <div className="pt-2">
          <div className="relative aspect-[3/4] overflow-hidden bg-bg-darker">
            <img
              src={game.coverImage}
              alt={game.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
            
            <div
              className="absolute top-2 left-2 px-2 py-1 font-pixel text-[8px] text-white uppercase"
              style={{ backgroundColor: platformColor }}
            >
              {game.platform}
            </div>

            {game.status !== 'none' && (
              <div className={`absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full ${currentStatus.color} animate-pulse-glow`} style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
                <StatusIcon className="w-4 h-4" />
              </div>
            )}

            <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-300 ${showActions ? 'opacity-100' : 'opacity-0'}`}>
              <div className="absolute bottom-0 left-0 right-0 p-3 space-y-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(game)}
                    className="flex-1 btn-retro text-[10px] py-1"
                  >
                    <Edit2 className="w-3 h-3 inline mr-1" />
                    编辑
                  </button>
                  <button
                    onClick={handleDelete}
                    className="btn-retro btn-retro-pink text-[10px] py-1"
                  >
                    <Trash2 className="w-3 h-3 inline mr-1" />
                    删除
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3">
            <h3 className="font-retro text-lg text-white truncate" title={game.name}>
              {game.name}
            </h3>
            <div className="flex items-center justify-between mt-1">
              <span className="font-retro text-sm text-gray-400">
                {game.releaseYear}
              </span>
              <span className="font-retro text-sm text-gray-500">
                {game.genre}
              </span>
            </div>
            <div className="font-retro text-xs text-gray-500 truncate mt-1">
              {game.publisher}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative">
            <button
              onClick={() => setShowStatusMenu(!showStatusMenu)}
              className={`w-full px-3 py-2 font-pixel text-[10px] uppercase border-t-2 transition-all flex items-center justify-center gap-2 ${
                game.status !== 'none'
                  ? `border-t-current ${currentStatus.color} bg-current/10`
                  : 'border-t-white/10 text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <StatusIcon className="w-3 h-3" />
              {currentStatus.label}
            </button>

            {showStatusMenu && (
              <div className="absolute bottom-full left-0 right-0 mb-1 bg-bg-card border-2 border-neon-blue/50 shadow-lg z-10">
                {statusOptions.map((status) => {
                  const config = statusConfig[status];
                  const Icon = config.icon;
                  return (
                    <button
                      key={status}
                      onClick={() => {
                        setGameStatus(game.id, status);
                        setShowStatusMenu(false);
                      }}
                      className={`w-full px-3 py-2 font-pixel text-[10px] uppercase flex items-center gap-2 transition-all hover:bg-white/10 ${
                        game.status === status ? config.color : 'text-gray-300'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      {config.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
