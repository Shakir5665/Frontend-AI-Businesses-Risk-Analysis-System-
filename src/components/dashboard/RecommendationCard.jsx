import { Lightbulb, ArrowUpRight } from 'lucide-react';

const impactConfig = {
  High:   { color: '#ef4444', bg: 'rgba(239,68,68,0.12)'  },
  Medium: { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  Low:    { color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
};

const effortConfig = {
  High:   { color: '#818cf8' },
  Medium: { color: '#94a3b8' },
  Low:    { color: '#10b981' },
};

const RecommendationCard = ({ item, index = 0 }) => {
  const { title, description, category, impact, effort, priority } = item;
  const impactCfg = impactConfig[impact] || impactConfig.Medium;
  const effortCfg = effortConfig[effort] || effortConfig.Medium;

  return (
    <div
      className="glass-card p-4 flex items-start gap-4 animate-fade-in hover:border-indigo-500/40 transition-all"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Priority number */}
      {priority && (
        <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-sm font-bold"
          style={{ background: 'rgba(99,102,241,0.2)', color: '#818cf8' }}
        >
          {priority}
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-white">{title}</p>
          <ArrowUpRight size={14} style={{ color: 'var(--color-text-secondary)', flexShrink: 0 }} />
        </div>

        {description && (
          <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            {description}
          </p>
        )}

        <div className="flex items-center gap-2 mt-3 flex-wrap">
          {category && (
            <span className="badge badge-info">{category}</span>
          )}
          {impact && (
            <span className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: impactCfg.bg, color: impactCfg.color }}
            >
              {impact} Impact
            </span>
          )}
          {effort && (
            <span className="text-xs" style={{ color: effortCfg.color }}>
              {effort} Effort
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
