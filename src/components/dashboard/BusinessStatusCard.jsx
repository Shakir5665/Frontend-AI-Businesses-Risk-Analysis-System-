import { TrendingUp, TrendingDown, Minus, Star } from 'lucide-react';

const BusinessStatusCard = ({ status, totalReviews, avgRating, platform }) => {
  const statusConfig = {
    'Healthy':        { icon: TrendingUp,   color: '#10b981', bg: 'rgba(16,185,129,0.12)'  },
    'Moderate Risk':  { icon: Minus,        color: '#f59e0b', bg: 'rgba(245,158,11,0.12)'  },
    'High Risk':      { icon: TrendingDown, color: '#ef4444', bg: 'rgba(239,68,68,0.12)'   },
  };

  const config = statusConfig[status] || statusConfig['Moderate Risk'];
  const Icon = config.icon;

  const stats = [
    { label: 'Total Reviews', value: totalReviews?.toLocaleString() || '—' },
    { label: 'Avg Rating',    value: avgRating ? `${avgRating} ★` : '—'    },
    { label: 'Platform',      value: platform || '—'                         },
  ];

  return (
    <div className="glass-card p-6 animate-fade-in">
      <p className="text-xs font-semibold mb-4" style={{ color: 'var(--color-text-secondary)' }}>
        Business Status
      </p>

      {/* Status pill */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: config.bg }}>
          <Icon size={20} style={{ color: config.color }} />
        </div>
        <div>
          <p className="text-lg font-bold text-white">{status}</p>
          <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Current assessment</p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map(({ label, value }) => (
          <div key={label} className="rounded-xl p-3 text-center"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--color-border)' }}
          >
            <p className="text-sm font-bold text-white">{value}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessStatusCard;
