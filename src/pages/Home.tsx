import Header from '@/components/Layout/Header';
import StatsPanel from '@/components/Layout/StatsPanel';
import FilterBar from '@/components/FilterBar';
import GameModal from '@/components/GameModal';
import GameCardGrid from '@/components/GameCard/GameCardGrid';
import GameCardList from '@/components/GameCard/GameCardList';
import GameCardTimeline from '@/components/GameCard/GameCardTimeline';
import { useGameStore } from '@/store/useGameStore';

export default function Home() {
  const { filteredGames, viewMode } = useGameStore();
  const totalGames = useGameStore((state) => state.games.length);

  const renderGames = () => {
    if (filteredGames.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="font-pixel text-6xl text-neon-blue/30 mb-4">
            ∅
          </div>
          <h3 className="font-pixel text-lg text-neon-blue mb-2">
            暂无游戏
          </h3>
          <p className="font-retro text-xl text-gray-400 max-w-md">
            点击右上角的"添加游戏"按钮，开始整理你的复古游戏收藏吧！
          </p>
        </div>
      );
    }

    if (viewMode === 'grid') {
      return (
        <div className="shelf-bg pb-8 -mx-4 px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 pt-4">
            {filteredGames.map((game, index) => (
              <GameCardGrid key={game.id} game={game} index={index} />
            ))}
          </div>
        </div>
      );
    }

    if (viewMode === 'list') {
      return (
        <div className="space-y-1">
          {filteredGames.map((game, index) => (
            <GameCardList key={game.id} game={game} index={index} />
          ))}
        </div>
      );
    }

    if (viewMode === 'timeline') {
      const gamesByYear = filteredGames.reduce((acc, game) => {
        const year = game.releaseYear;
        if (!acc[year]) {
          acc[year] = [];
        }
        acc[year].push(game);
        return acc;
      }, {} as Record<number, typeof filteredGames>);

      const years = Object.keys(gamesByYear)
        .map(Number)
        .sort((a, b) => a - b);

      return (
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-blue via-neon-pink to-neon-yellow" />
          
          {years.map((year, yearIndex) => (
            <div key={year} className="mb-12">
              <div className="flex justify-center mb-8">
                <div className="bg-bg-darker border-2 border-neon-yellow px-6 py-2 relative z-10">
                  <span className="font-pixel text-lg text-neon-yellow neon-text">
                    {year}
                  </span>
                </div>
              </div>
              <div className="space-y-8">
                {gamesByYear[year].map((game, gameIndex) => (
                  <GameCardTimeline
                    key={game.id}
                    game={game}
                    index={yearIndex * 100 + gameIndex}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen relative">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-pixel text-sm text-gray-300">
                游戏列表 <span className="text-neon-blue">{filteredGames.length}</span> / {totalGames}
              </h2>
            </div>
            
            <FilterBar />
            
            <div key={viewMode} className="transition-all duration-300">
              {renderGames()}
            </div>
          </div>

          <StatsPanel />
        </div>
      </main>

      <footer className="border-t-2 border-neon-blue/20 py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="font-retro text-lg text-gray-500">
            RETROARCHIVE · 复古游戏收藏管理工具
          </p>
          <p className="font-retro text-sm text-gray-600 mt-1">
            本地存储 · 无需联网 · 数据保存在浏览器中
          </p>
        </div>
      </footer>

      <GameModal />
    </div>
  );
}
