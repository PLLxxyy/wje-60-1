import { useState, useEffect } from 'react';
import { X, Upload, Star, MessageSquare } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';
import { PLATFORMS, GENRES, DEFAULT_COVER } from '@/utils/constants';
import { fileToBase64 } from '@/utils/storage';
import StarRating from '@/components/StarRating';
import type { GameStatus, Review } from '@/types/game';

interface GameFormData {
  name: string;
  platform: string;
  releaseYear: number;
  publisher: string;
  genre: string;
  coverImage: string;
  romFileName: string;
  status: GameStatus;
  rating: number;
}

export default function GameModal() {
  const { isModalOpen, selectedGame, closeModal, addGame, updateGame, addReview } = useGameStore();
  
  const [formData, setFormData] = useState<GameFormData>({
    name: '',
    platform: PLATFORMS[0],
    releaseYear: new Date().getFullYear(),
    publisher: '',
    genre: GENRES[0],
    coverImage: DEFAULT_COVER,
    romFileName: '',
    status: 'none',
    rating: 0,
  });

  const [coverPreview, setCoverPreview] = useState<string>(DEFAULT_COVER);
  const [newReviewRating, setNewReviewRating] = useState<number>(5);
  const [newReviewContent, setNewReviewContent] = useState<string>('');

  useEffect(() => {
    if (isModalOpen) {
      if (selectedGame) {
        setFormData({
          name: selectedGame.name,
          platform: selectedGame.platform,
          releaseYear: selectedGame.releaseYear,
          publisher: selectedGame.publisher,
          genre: selectedGame.genre,
          coverImage: selectedGame.coverImage,
          romFileName: selectedGame.romFileName,
          status: selectedGame.status,
          rating: selectedGame.rating || 0,
        });
        setCoverPreview(selectedGame.coverImage);
      } else {
        setFormData({
          name: '',
          platform: PLATFORMS[0],
          releaseYear: new Date().getFullYear(),
          publisher: '',
          genre: GENRES[0],
          coverImage: DEFAULT_COVER,
          romFileName: '',
          status: 'none',
          rating: 0,
        });
        setCoverPreview(DEFAULT_COVER);
      }
      setNewReviewRating(5);
      setNewReviewContent('');
    }
  }, [selectedGame?.id, isModalOpen]);

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        setCoverPreview(base64);
        setFormData(prev => ({ ...prev, coverImage: base64 }));
      } catch (error) {
        console.error('Failed to upload cover:', error);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('请输入游戏名称');
      return;
    }

    if (isNaN(formData.releaseYear) || formData.releaseYear < 1970 || formData.releaseYear > 2030) {
      alert('请输入有效的发行年份（1970-2030）');
      return;
    }

    const gameData = {
      ...formData,
      releaseYear: Number(formData.releaseYear),
      romFileName: formData.romFileName || `${formData.name.replace(/\s+/g, '_')}.rom`,
      rating: Number(formData.rating) || 0,
      reviews: selectedGame?.reviews || [],
    };

    if (selectedGame) {
      updateGame(selectedGame.id, gameData);
    } else {
      addGame(gameData);
    }
    
    closeModal();
  };

  const handleSubmitReview = () => {
    if (!selectedGame) return;
    if (!newReviewContent.trim()) {
      alert('请输入评价内容');
      return;
    }
    if (newReviewRating < 1 || newReviewRating > 5) {
      alert('请选择评分（1-5星）');
      return;
    }
    addReview(selectedGame.id, newReviewRating, newReviewContent);
    setNewReviewContent('');
    setNewReviewRating(5);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={closeModal}
      />
      
      <div className="relative w-full max-w-2xl bg-bg-card border-2 border-neon-blue shadow-neon-blue animate-fade-in-up">
        <div className="flex items-center justify-between p-4 border-b-2 border-neon-blue/30">
          <h2 className="font-pixel text-sm text-neon-blue neon-text">
            {selectedGame ? '编辑游戏' : '添加新游戏'}
          </h2>
          <button
            onClick={closeModal}
            className="p-2 text-gray-400 hover:text-neon-pink transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto scrollbar-retro">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <label className="block font-retro text-lg text-gray-300 mb-2">
                封面图
              </label>
              <div className="relative w-48 aspect-[3/4] bg-bg-darker border-2 border-neon-blue/30 overflow-hidden group">
                <img
                  src={coverPreview}
                  alt="封面预览"
                  className="w-full h-full object-cover"
                />
                <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Upload className="w-8 h-8 text-neon-blue mb-2" />
                  <span className="font-retro text-sm text-neon-blue">点击上传</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="font-retro text-xs text-gray-500 mt-2 text-center">
                支持 JPG、PNG、GIF 格式
              </p>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <label className="block font-retro text-lg text-gray-300 mb-1">
                  游戏名称 <span className="text-neon-pink">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="输入游戏名称"
                  className="input-retro"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-retro text-lg text-gray-300 mb-1">
                    平台
                  </label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData(prev => ({ ...prev, platform: e.target.value }))}
                    className="input-retro"
                  >
                    {PLATFORMS.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-retro text-lg text-gray-300 mb-1">
                    发行年份
                  </label>
                  <input
                    type="number"
                    min="1970"
                    max="2030"
                    value={formData.releaseYear}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (!isNaN(val) && val >= 1970 && val <= 2030) {
                        setFormData(prev => ({ ...prev, releaseYear: val }));
                      }
                    }}
                    className="input-retro"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-retro text-lg text-gray-300 mb-1">
                    发行厂商
                  </label>
                  <input
                    type="text"
                    value={formData.publisher}
                    onChange={(e) => setFormData(prev => ({ ...prev, publisher: e.target.value }))}
                    placeholder="如: Nintendo"
                    className="input-retro"
                  />
                </div>

                <div>
                  <label className="block font-retro text-lg text-gray-300 mb-1">
                    游戏类型
                  </label>
                  <select
                    value={formData.genre}
                    onChange={(e) => setFormData(prev => ({ ...prev, genre: e.target.value }))}
                    className="input-retro"
                  >
                    {GENRES.map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-retro text-lg text-gray-300 mb-1">
                  ROM 文件名
                </label>
                <input
                  type="text"
                  value={formData.romFileName}
                  onChange={(e) => setFormData(prev => ({ ...prev, romFileName: e.target.value }))}
                  placeholder="如: Super_Mario_Bros.nes"
                  className="input-retro"
                />
              </div>

              <div>
                <label className="block font-retro text-lg text-gray-300 mb-2">
                  游戏状态
                </label>
                <div className="flex flex-wrap gap-2">
                  {(['none', 'playing', 'completed', 'wishlist'] as const).map(status => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, status }))}
                      className={`status-badge ${status} ${
                        formData.status === status
                          ? 'animate-pulse-glow'
                          : 'opacity-50 hover:opacity-100'
                      }`}
                    >
                      {status === 'none' ? '未标记' :
                       status === 'playing' ? '正在玩' :
                       status === 'completed' ? '已通关' : '想玩'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-retro text-lg text-gray-300 mb-2">
                  我的评分
                </label>
                <StarRating
                  rating={formData.rating}
                  onRatingChange={(rating) => setFormData(prev => ({ ...prev, rating }))}
                  size="lg"
                  showValue
                />
              </div>
            </div>
          </div>

          {selectedGame && (
            <div className="border-t-2 border-neon-blue/20 pt-4 mt-4">
              <h3 className="font-pixel text-sm text-neon-yellow neon-text mb-4 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                玩家评价 ({selectedGame.reviews.length})
              </h3>

              <div className="mb-6 p-4 bg-bg-darker border border-neon-yellow/30">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-retro text-sm text-gray-300">写评价</span>
                  <StarRating
                    rating={newReviewRating}
                    onRatingChange={setNewReviewRating}
                    size="sm"
                  />
                </div>
                <textarea
                  value={newReviewContent}
                  onChange={(e) => setNewReviewContent(e.target.value)}
                  placeholder="分享你对这款游戏的看法..."
                  className="input-retro w-full h-24 resize-none"
                />
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={handleSubmitReview}
                    className="btn-retro btn-retro-yellow text-sm"
                  >
                    发布评价
                  </button>
                </div>
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-retro">
                {selectedGame.reviews.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 font-retro">
                    暂无评价，来写第一条评价吧！
                  </div>
                ) : (
                  [...selectedGame.reviews].reverse().map((review) => (
                    <div key={review.id} className="p-3 bg-bg-darker border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <StarRating rating={review.rating} size="sm" readonly />
                        <span className="font-pixel text-[10px] text-gray-500">
                          {formatDate(review.createdAt)}
                        </span>
                      </div>
                      <p className="font-retro text-sm text-gray-300 leading-relaxed">
                        {review.content}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t-2 border-neon-blue/20">
            <button
              type="button"
              onClick={closeModal}
              className="btn-retro"
            >
              取消
            </button>
            <button
              type="submit"
              className="btn-retro btn-retro-yellow"
            >
              {selectedGame ? '保存修改' : '添加游戏'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
