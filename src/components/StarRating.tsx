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

  return (
    <div className="flex items-center gap-1" onMouseLeave={handleMouseLeave}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          disabled={readonly}
          className={`relative transition-transform ${
            !readonly ? 'cursor-pointer hover:scale-125' : 'cursor-default'
          }`}
          onMouseEnter={() => {
            if (!readonly && onRatingChange) {
              onRatingChange(star);
            }
          }}
        >
          <Star
            className={`${sizeClasses[size]} transition-colors ${
              star <= rating
                ? 'text-neon-yellow fill-neon-yellow'
                : 'text-gray-600'
            }`}
            style={
              star <= rating
                ? { filter: 'drop-shadow(0 0 3px #ffd700)' }
                : undefined
            }
          />
        </button>
      ))}
      {showValue && rating > 0 && (
        <span className="font-pixel text-xs text-neon-yellow ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
