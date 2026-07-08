import { ThumbsUp, ThumbsDown, Minus } from 'lucide-react';
import { formatDate } from '../../utils/helpers';

const typeConfig = {
  positive: { Icon: ThumbsUp,   color: '#10b981', bg: 'rgba(16,185,129,0.12)',  border: 'rgba(16,185,129,0.25)'  },
  negative: { Icon: ThumbsDown, color: '#ef4444', bg: 'rgba(239,68,68,0.12)',   border: 'rgba(239,68,68,0.25)'   },
  neutral:  { Icon: Minus,      color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.25)'  },
};

const EvidenceCard = ({ item, index = 0 }) => {
  const { type = 'neutral', text, source, rating, date } = item;
  const cfg = typeConfig[type] || typeConfig.neutral;
  const { Icon } = cfg;

  return (
    <div
      className="rounded-xl p-4 animate-fade-in"
      style={{
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        animationDelay: `${index * 0.08}s`,
      }}
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        >
          <Icon size={14} style={{ color: cfg.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm leading-relaxed text-white">"{text}"</p>
          <div className="flex items-center gap-3 mt-2">
            {source && (
              <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                📍 {source}
              </span>
            )}
            {rating && (
              <span className="text-xs" style={{ color: '#f59e0b' }}>
                {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
              </span>
            )}
            {date && (
              <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                {formatDate(date)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvidenceCard;
