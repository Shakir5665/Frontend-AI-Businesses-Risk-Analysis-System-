import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="px-3 py-2 rounded-lg text-sm"
        style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
      >
        <p className="text-white font-semibold">{label}</p>
        <p style={{ color: '#ef4444' }}>Complaints: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const ComplaintChart = ({ data = [] }) => (
  <div className="glass-card p-6 animate-fade-in">
    <p className="text-sm font-semibold mb-4 text-white">Complaint Trend</p>
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="complaintGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}   />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="month" tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="complaints"
            stroke="#ef4444"
            strokeWidth={2}
            fill="url(#complaintGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default ComplaintChart;
