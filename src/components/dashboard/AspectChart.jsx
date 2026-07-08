import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, ResponsiveContainer, Tooltip,
} from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div className="px-3 py-2 rounded-lg text-sm"
        style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
      >
        <span className="text-white font-semibold">{payload[0].payload.aspect}: </span>
        <span style={{ color: '#818cf8' }}>{payload[0].value}</span>
      </div>
    );
  }
  return null;
};

const AspectChart = ({ data = [] }) => (
  <div className="glass-card p-6 animate-fade-in">
    <p className="text-sm font-semibold mb-4 text-white">Aspect Scores</p>
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={260}>
        <RadarChart cx="50%" cy="50%" outerRadius={90} data={data}>
          <PolarGrid stroke="rgba(255,255,255,0.08)" />
          <PolarAngleAxis
            dataKey="aspect"
            tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'var(--color-text-secondary)', fontSize: 10 }} />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.25}
            strokeWidth={2}
          />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default AspectChart;
