import { TrendingUp } from 'lucide-react';

const priorityConfig = {
  high:   { color: '#ef4444', bg: 'rgba(239,68,68,0.12)',   label: 'High Priority'   },
  medium: { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',  label: 'Medium Priority' },
  low:    { color: '#10b981', bg: 'rgba(16,185,129,0.12)',  label: 'Low Priority'    },
};

const OpportunityCard = ({ title, description, priority = 'medium', index = 0 }) => {
  const cfg = priorityConfig[priority] || priorityConfig.medium;

  return (
    <div
      className="glass-card p-4 flex items-start gap-4 animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center"
        style={{ background: cfg.bg }}
      >
        <TrendingUp size={18} style={{ color: cfg.color }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <p className="text-sm font-semibold text-white truncate">{title}</p>
          <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
            style={{ background: cfg.bg, color: cfg.color }}
          >
            {cfg.label}
          </span>
        </div>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default OpportunityCard;
