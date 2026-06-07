import { Edit2, Trash2, Play, Check, Star, Circle } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';
import { PLATFORM_COLORS, STATUS_LABELS } from '@/utils/constants';
import type { Game, GameStatus } from '@/types/game';

interface GameCardTimelineProps {
  game: Game;
  index: number;
}

export default function GameCardTimeline({ game, index }: GameCardTimelineProps) {
  const { setGameStatus, openModal, deleteGame } = useGameStore();

  const platformColor = PLATFORM_COLORS[game.platform] || '#666666';
  
  const statusConfig: Record<GameStatus, { icon: typeof Play; color: string; label: string }> = {
    none: { icon: Circle, color: 'text-gray-500', label: STATUS_LABELS.none },
    playing: { icon: Play, color: 'text-status-playing', label: STATUS_LABELS.playing },
    completed: { icon: Check, color: 'text-status-completed', label: STATUS_LABELS.completed },
    wishlist: { icon: Star, color: 'text-status-wishlist', label: STATUS_LABELS.wishlist },
  };

  const statusCycle: GameStatus[] = ['none', 'playing', 'completed', 'wishlist'];

  const cycleStatus = () => {
    const currentIndex = statusCycle.indexOf(game.status);
    const nextStatus = statusCycle[(currentIndex + 1) % statusCycle.length];
    setGameStatus(game.id, nextStatus);
  };

  const handleDelete = () => {
    if (confirm(`确定要删除 "${game.name}" 吗？`)) {
      deleteGame(game.id);
    }
  };

  const currentStatus = statusConfig[game.status];
  const StatusIcon = currentStatus.icon;
  const isLeft = index % 2 === 0;
  const staggerClass = `animate-stagger-${(index % 8) + 1}` as const;

  return (
    <div
      className={`opacity-0 animate-fade-in-up ${staggerClass} relative flex items-center ${
        isLeft ? 'flex-row' : 'flex-row-reverse'
      }`}
    >
      <div className={`w-1/2 ${isLeft ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
        <div className="group bg-bg-card border-2 border-white/10 hover:border-neon-blue/50 transition-all duration-300 overflow-hidden hover:shadow-cartridge-hover">
          <div className="flex gap-4 p-3">
            <div
              className={`w-16 h-20 flex-shrink-0 overflow-hidden bg-bg-darker border border-white/10 ${
                isLeft ? 'order-2' : 'order-1'
              }`}
            >
              <img
                src={game.coverImage}
                alt={game.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className={`flex-1 min-w-0 ${isLeft ? 'order-1' : 'order-2'}`}>
              <div className="flex items-center gap-2 justify-end">
                <h3 className="font-retro text-lg text-white truncate">
                  {game.name}
                </h3>
                <span
                  className="px-2 py-0.5 font-pixel text-[8px] text-white flex-shrink-0"
                  style={{ backgroundColor: platformColor }}
                >
                  {game.platform}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1 font-retro text-sm text-gray-400 justify-end">
                <span>{game.genre}</span>
                <span>·</span>
                <span>{game.publisher}</span>
              </div>
              <div className={`mt-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity ${isLeft ? 'justify-end' : 'justify-start'}`}>
                <button
                  onClick={cycleStatus}
                  className={`p-1.5 border-2 transition-all ${
                    game.status !== 'none'
                      ? `border-current ${currentStatus.color} hover:bg-current/10`
                      : 'border-gray-600 text-gray-500 hover:border-white/50 hover:text-white'
                  }`}
                  title="切换状态"
                >
                  <StatusIcon className="w-3 h-3" />
                </button>
                <button
                  onClick={() => openModal(game)}
                  className="p-1.5 border-2 border-neon-blue/50 text-neon-blue hover:bg-neon-blue/10 transition-all"
                  title="编辑"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-1.5 border-2 border-neon-pink/50 text-neon-pink hover:bg-neon-pink/10 transition-all"
                  title="删除"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
          {game.status !== 'none' && (
            <div className={`px-3 py-1.5 font-pixel text-[8px] uppercase border-t-2 border-current ${currentStatus.color} bg-current/10`}>
              <StatusIcon className="w-3 h-3 inline mr-1" />
              {currentStatus.label}
            </div>
          )}
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div
          className="w-6 h-6 border-4 border-bg-dark rounded-full z-10"
          style={{
            backgroundColor: platformColor,
            boxShadow: `0 0 15px ${platformColor}`,
          }}
        />
        <div className="font-pixel text-[10px] text-neon-yellow mt-2 neon-text bg-bg-darker px-2 py-1">
          {game.releaseYear}
        </div>
      </div>

      <div className="w-1/2" />
    </div>
  );
}
