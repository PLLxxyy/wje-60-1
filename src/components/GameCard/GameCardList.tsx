import { Edit2, Trash2, Play, Check, Star, Circle } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';
import { PLATFORM_COLORS, STATUS_LABELS } from '@/utils/constants';
import StarRating from '@/components/StarRating';
import type { Game, GameStatus } from '@/types/game';

interface GameCardListProps {
  game: Game;
  index: number;
}

export default function GameCardList({ game, index }: GameCardListProps) {
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
  const staggerClass = `animate-stagger-${(index % 8) + 1}` as const;

  return (
    <div
      className={`opacity-0 animate-fade-in-up ${staggerClass} group`}
    >
      <div className={`flex items-center gap-4 p-3 bg-bg-card border-2 border-white/10 hover:border-neon-blue/50 transition-all duration-200 ${index % 2 === 0 ? '' : 'bg-bg-card/50'}`}>
        <div
          className="w-1 h-full self-stretch"
          style={{ backgroundColor: platformColor }}
        />

        <div className="w-16 h-20 flex-shrink-0 overflow-hidden bg-bg-darker border border-white/10">
          <img
            src={game.coverImage}
            alt={game.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h3 className="font-retro text-xl text-white truncate">
              {game.name}
            </h3>
            <span
              className="px-2 py-0.5 font-pixel text-[8px] text-white flex-shrink-0"
              style={{ backgroundColor: platformColor }}
            >
              {game.platform}
            </span>
            <span className={`status-badge ${game.status} flex-shrink-0`}>
              <StatusIcon className="w-3 h-3 inline mr-1" />
              {currentStatus.label}
            </span>
          </div>
          <div className="mt-1">
            <StarRating rating={game.rating} size="sm" readonly showValue />
          </div>
          <div className="flex items-center gap-4 mt-1 font-retro text-sm text-gray-400">
            <span>{game.releaseYear}</span>
            <span>·</span>
            <span>{game.genre}</span>
            <span>·</span>
            <span>{game.publisher}</span>
            <span className="text-gray-600 truncate">
              ROM: {game.romFileName}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={cycleStatus}
            className={`p-2 border-2 transition-all ${
              game.status !== 'none'
                ? `border-current ${currentStatus.color} hover:bg-current/10`
                : 'border-gray-600 text-gray-500 hover:border-white/50 hover:text-white'
            }`}
            title="切换状态"
          >
            <StatusIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => openModal(game)}
            className="p-2 border-2 border-neon-blue/50 text-neon-blue hover:bg-neon-blue/10 transition-all"
            title="编辑"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 border-2 border-neon-pink/50 text-neon-pink hover:bg-neon-pink/10 transition-all"
            title="删除"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
