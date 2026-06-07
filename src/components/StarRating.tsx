import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
  showValue?: boolean;
}

export default function StarRating({
  rating,
  onRatingChange,
  size = 'md',
  readonly = false,
  showValue = false,
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
  };

  const handleClick = (value: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly && onRatingChange) {
      onRatingChange(rating);
    }
  };

  const safeRating = Math.max(0, Math.min(5, rating || 0));

  if (readonly) {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= safeRating;
          return (
            <div
              key={star}
              className="relative cursor-default"
            >
              <Star
                className={`${sizeClasses[size]} transition-colors ${
                  isFilled
                    ? 'text-neon-yellow fill-neon-yellow'
                    : 'text-gray-600'
                }`}
                style={
                  isFilled
                    ? { filter: 'drop-shadow(0 0 3px #ffd700)' }
                    : undefined
                }
              />
            </div>
          );
        })}
        {showValue && safeRating > 0 && (
          <span className="font-pixel text-xs text-neon-yellow ml-1">
            {safeRating.toFixed(1)}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1" onMouseLeave={handleMouseLeave}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= safeRating;
        return (
          <button
            key={star}
            type="button"
            onClick={() => handleClick(star)}
            className="relative transition-transform cursor-pointer hover:scale-125"
            onMouseEnter={() => {
              if (onRatingChange) {
                onRatingChange(star);
              }
            }}
          >
            <Star
              className={`${sizeClasses[size]} transition-colors ${
                isFilled
                  ? 'text-neon-yellow fill-neon-yellow'
                  : 'text-gray-600'
              }`}
              style={
                isFilled
                  ? { filter: 'drop-shadow(0 0 3px #ffd700)' }
                  : undefined
              }
            />
          </button>
        );
      })}
      {showValue && safeRating > 0 && (
        <span className="font-pixel text-xs text-neon-yellow ml-1">
          {safeRating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
