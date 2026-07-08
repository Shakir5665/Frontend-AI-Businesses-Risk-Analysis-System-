import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    const { name, value } = payload[0];
    return (
      <div className="px-3 py-2 rounded-lg text-sm"
        style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
      >
        <span className="font-semibold text-white">{name}: </span>
        <span style={{ color: 'var(--color-text-secondary)' }}>{value}%</span>
      </div>
    );
  }
  return null;
};

const SentimentChart = ({ data = [] }) => (
  <div className="glass-card p-6 animate-fade-in">
    <p className="text-sm font-semibold mb-4 text-white">Sentiment Breakdown</p>
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={100}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => (
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '12px' }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default SentimentChart;
