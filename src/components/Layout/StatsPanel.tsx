import { useGameStore } from '@/store/useGameStore';
import { PLATFORM_COLORS, STATUS_LABELS, STATUS_ICONS } from '@/utils/constants';

function PieChart({ data }: { data: Record<string, number> }) {
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((sum, [, count]) => sum + count, 0);
  
  if (total === 0) {
    return (
      <div className="w-full h-40 flex items-center justify-center text-gray-500 font-retro text-xl">
        暂无数据
      </div>
    );
  }

  let currentAngle = 0;
  const paths = entries.map(([platform, count]) => {
    const percentage = (count / total) * 100;
    const angle = (count / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;
    
    const x1 = 100 + 70 * Math.cos(startRad);
    const y1 = 100 + 70 * Math.sin(startRad);
    const x2 = 100 + 70 * Math.cos(endRad);
    const y2 = 100 + 70 * Math.sin(endRad);
    
    const largeArcFlag = angle > 180 ? 1 : 0;
    const color = PLATFORM_COLORS[platform] || '#666666';

    return {
      path: `M 100 100 L ${x1} ${y1} A 70 70 0 ${largeArcFlag} 1 ${x2} ${y2} Z`,
      color,
      platform,
      count,
      percentage,
    };
  });

  return (
    <div className="flex flex-col lg:flex-row items-center gap-4">
      <svg viewBox="0 0 200 200" className="w-40 h-40">
        {paths.map((p, i) => (
          <path
            key={i}
            d={p.path}
            fill={p.color}
            className="transition-all hover:opacity-80"
            style={{ filter: `drop-shadow(0 0 4px ${p.color})` }}
          />
        ))}
        <circle cx="100" cy="100" r="40" fill="#0a0a12" />
        <text
          x="100"
          y="95"
          textAnchor="middle"
          className="fill-white font-pixel text-[10px]"
        >
          {total}
        </text>
        <text
          x="100"
          y="115"
          textAnchor="middle"
          className="fill-gray-400 font-retro text-sm"
        >
          款游戏
        </text>
      </svg>

      <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
        {entries.map(([platform, count]) => (
          <div
            key={platform}
            className="flex items-center gap-2 px-2 py-1 bg-bg-darker border border-white/10"
          >
            <div
              className="w-3 h-3"
              style={{
                backgroundColor: PLATFORM_COLORS[platform] || '#666',
                boxShadow: `0 0 6px ${PLATFORM_COLORS[platform] || '#666'}`,
              }}
            />
            <span className="font-retro text-sm text-gray-300">{platform}</span>
            <span className="font-pixel text-xs text-white">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StatsPanel() {
  const { stats } = useGameStore();

  return (
    <aside className="w-full lg:w-80 flex-shrink-0 space-y-4">
      <div className="bg-bg-card border-2 border-neon-blue/30 p-4">
        <h3 className="font-pixel text-xs text-neon-blue mb-4 neon-text">
          收藏统计
        </h3>

        <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 mb-6">
          <div className="bg-bg-darker p-3 border border-neon-green/30">
            <div className="font-pixel text-2xl text-neon-green neon-text">
              {stats.total}
            </div>
            <div className="font-retro text-sm text-gray-400">总游戏数</div>
          </div>
          <div className="bg-bg-darker p-3 border border-neon-pink/30">
            <div className="font-pixel text-2xl text-neon-pink neon-text">
              {Object.keys(stats.byPlatform).length}
            </div>
            <div className="font-retro text-sm text-gray-400">平台数量</div>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <h4 className="font-retro text-lg text-white">状态分布</h4>
          {(['playing', 'completed', 'wishlist', 'none'] as const).map((status) => (
            <div key={status} className="flex items-center gap-3">
              <span className={`status-badge ${status}`} style={{ minWidth: '80px' }}>
                {STATUS_ICONS[status]} {STATUS_LABELS[status]}
              </span>
              <div className="flex-1 h-2 bg-bg-darker border border-white/10">
                <div
                  className={`h-full transition-all ${
                    status === 'playing' ? 'bg-status-playing' :
                    status === 'completed' ? 'bg-status-completed' :
                    status === 'wishlist' ? 'bg-status-wishlist' :
                    'bg-gray-600'
                  }`}
                  style={{
                    width: `${stats.total > 0 ? (stats.byStatus[status] / stats.total) * 100 : 0}%`,
                    boxShadow: status !== 'none' ? `0 0 8px currentColor` : 'none',
                  }}
                />
              </div>
              <span className="font-pixel text-xs text-white w-8">
                {stats.byStatus[status]}
              </span>
            </div>
          ))}
        </div>

        <h4 className="font-retro text-lg text-white mb-3">平台分布</h4>
        <PieChart data={stats.byPlatform} />
      </div>

      {stats.oldestGame && stats.newestGame && (
        <div className="bg-bg-card border-2 border-neon-yellow/30 p-4">
          <h3 className="font-pixel text-xs text-neon-yellow mb-4 neon-text">
            时间跨度
          </h3>
          
          <div className="space-y-4">
            <div className="relative pl-4 border-l-2 border-status-completed">
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-status-completed rounded-full animate-pulse" style={{ boxShadow: '0 0 10px #39ff14' }} />
              <div className="font-pixel text-xs text-status-completed">最老游戏</div>
              <div className="font-retro text-lg text-white">{stats.oldestGame.name}</div>
              <div className="font-retro text-sm text-gray-400">
                {stats.oldestGame.platform} · {stats.oldestGame.releaseYear}
              </div>
            </div>

            <div className="w-px h-8 bg-gray-600 ml-1.5" />

            <div className="relative pl-4 border-l-2 border-status-playing">
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-status-playing rounded-full animate-pulse" style={{ boxShadow: '0 0 10px #00d9ff' }} />
              <div className="font-pixel text-xs text-status-playing">最新游戏</div>
              <div className="font-retro text-lg text-white">{stats.newestGame.name}</div>
              <div className="font-retro text-sm text-gray-400">
                {stats.newestGame.platform} · {stats.newestGame.releaseYear}
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
