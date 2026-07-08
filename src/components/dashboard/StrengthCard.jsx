import { Star } from 'lucide-react';

const StrengthCard = ({ title, description, icon = 'star', index = 0 }) => (
  <div
    className="glass-card p-4 flex items-start gap-4 animate-fade-in"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center"
      style={{ background: 'rgba(16, 185, 129, 0.15)' }}
    >
      <Star size={18} style={{ color: '#10b981' }} />
    </div>
    <div>
      <p className="text-sm font-semibold text-white mb-1">{title}</p>
      <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
        {description}
      </p>
    </div>
  </div>
);

export default StrengthCard;
