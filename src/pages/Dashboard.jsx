import { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';
import Footer from '../components/common/Footer';
import HealthScoreCard from '../components/dashboard/HealthScoreCard';
import BusinessStatusCard from '../components/dashboard/BusinessStatusCard';
import SentimentChart from '../components/dashboard/SentimentChart';
import AspectChart from '../components/dashboard/AspectChart';
import ComplaintChart from '../components/dashboard/ComplaintChart';
import StrengthCard from '../components/dashboard/StrengthCard';
import OpportunityCard from '../components/dashboard/OpportunityCard';
import RecommendationList from '../components/dashboard/RecommendationList';
import mockData from '../mock/dashboard.json';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch — replace with dashboardAPI.getDashboardData()
    const timer = setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="w-10 h-10 border-4 rounded-full animate-spin"
            style={{ borderColor: 'var(--color-accent)', borderTopColor: 'transparent' }} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Greeting */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          Welcome back, <span className="gradient-text">{user?.firstName || 'Analyst'}</span> 👋
        </h2>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
          Here's your latest business risk overview.
        </p>
      </div>

      {/* Top row — Health score + Business status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        <HealthScoreCard score={data.healthScore} />
        <div className="md:col-span-2">
          <BusinessStatusCard
            status={data.businessStatus}
            totalReviews={data.totalReviews}
            avgRating={data.avgRating}
            platform="Amazon"
          />
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        <SentimentChart data={data.sentimentBreakdown} />
        <AspectChart    data={data.aspectScores}       />
        <ComplaintChart data={data.complaintTrend}     />
      </div>

      {/* Strengths & Opportunities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div className="glass-card p-5">
          <h3 className="text-sm font-bold text-white mb-4">💪 Strengths</h3>
          <div className="space-y-3">
            {data.strengths.map((s, i) => (
              <StrengthCard key={s.id} {...s} index={i} />
            ))}
          </div>
        </div>
        <div className="glass-card p-5">
          <h3 className="text-sm font-bold text-white mb-4">🚀 Opportunities</h3>
          <div className="space-y-3">
            {data.opportunities.map((o, i) => (
              <OpportunityCard key={o.id} {...o} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="glass-card p-5 mb-4">
        <h3 className="text-sm font-bold text-white mb-4">💡 Recent Recommendations</h3>
        <RecommendationList recommendations={data.recentRecommendations} />
      </div>

      <Footer />
    </Layout>
  );
};

export default Dashboard;
