import { Activity } from 'lucide-react';
import { scoreToColor, scoreToBadge } from '../../utils/helpers';

const HealthScoreCard = ({ score = 0, label = 'Business Health Score' }) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const progress = ((100 - score) / 100) * circumference;
  const colorClass = scoreToColor(score);
  const badgeClass = scoreToBadge(score);

  const strokeColor = score >= 75 ? '#10b981' : score >= 50 ? '#f59e0b' : score >= 25 ? '#f97316' : '#ef4444';

  return (
    <div className="glass-card p-6 flex flex-col items-center gap-4 animate-fade-in">
      <div className="flex items-center gap-2 self-start">
        <Activity size={18} style={{ color: 'var(--color-accent-light)' }} />
        <span className="text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
          {label}
        </span>
      </div>

      {/* Circular progress */}
      <div className="relative w-36 h-36">
        <svg viewBox="0 0 136 136" className="transform -rotate-90 w-full h-full">
          {/* Track */}
          <circle cx="68" cy="68" r={radius} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="10" />
          {/* Progress */}
          <circle
            cx="68" cy="68" r={radius} fill="none"
            stroke={strokeColor} strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            style={{ transition: 'stroke-dashoffset 1s ease' }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-extrabold ${colorClass}`}>{score}</span>
          <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>/ 100</span>
        </div>
      </div>

      {/* Badge */}
      <span className={`badge ${badgeClass}`}>
        {score >= 75 ? '✓ Healthy' : score >= 50 ? '⚠ Moderate Risk' : '✕ High Risk'}
      </span>
    </div>
  );
};

export default HealthScoreCard;
