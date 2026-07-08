import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Share2, AlertTriangle } from 'lucide-react';
import Layout from '../components/common/Layout';
import Footer from '../components/common/Footer';
import HealthScoreCard from '../components/dashboard/HealthScoreCard';
import BusinessStatusCard from '../components/dashboard/BusinessStatusCard';
import SentimentChart from '../components/dashboard/SentimentChart';
import AspectChart from '../components/dashboard/AspectChart';
import EvidenceList from '../components/dashboard/EvidenceList';
import RecommendationList from '../components/dashboard/RecommendationList';
import mockData from '../mock/analysis.json';
import { formatDateTime } from '../utils/helpers';

const AnalysisResult = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const timer = setTimeout(() => {
      // Replace with: analysisAPI.getAnalysisById(id)
      setData(mockData);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [id]);

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

  const tabs = ['overview', 'evidence', 'recommendations'];

  return (
    <Layout>
      <div className="animate-fade-in">
        {/* Back + actions bar */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <button onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm transition-colors hover:text-white"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <ArrowLeft size={16} /> Back
          </button>
          <div className="flex gap-2">
            <button id="analysis-share-btn"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all hover:bg-white/10"
              style={{ border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}
            >
              <Share2 size={15} /> Share
            </button>
            <button id="analysis-download-btn"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all"
              style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid var(--color-accent)', color: 'var(--color-accent-light)' }}
            >
              <Download size={15} /> Export PDF
            </button>
          </div>
        </div>

        {/* Product header */}
        <div className="glass-card p-5 mb-5">
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-lg font-bold text-white">{data.productName}</h2>
              <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                {data.platform} • {data.totalReviewsAnalyzed} reviews • Analysed {formatDateTime(data.analyzedAt)}
              </p>
            </div>
            <span className="badge badge-success">✓ Completed</span>
          </div>
        </div>

        {/* Risk flags */}
        {data.riskFlags?.length > 0 && (
          <div className="rounded-xl p-4 mb-5 flex items-start gap-3"
            style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}
          >
            <AlertTriangle size={18} style={{ color: '#ef4444', flexShrink: 0 }} />
            <div>
              <p className="text-sm font-semibold" style={{ color: '#ef4444' }}>Risk Flags Detected</p>
              <ul className="mt-1 space-y-0.5">
                {data.riskFlags.map((flag, i) => (
                  <li key={i} className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    • {flag.flag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 mb-5 p-1 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--color-border)', width: 'fit-content' }}
        >
          {tabs.map((tab) => (
            <button key={tab} id={`result-tab-${tab}`}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all"
              style={{
                background: activeTab === tab ? 'var(--color-accent)' : 'transparent',
                color: activeTab === tab ? '#fff' : 'var(--color-text-secondary)',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'overview' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <HealthScoreCard score={data.healthScore} />
              <div className="md:col-span-2">
                <BusinessStatusCard status={data.businessStatus}
                  totalReviews={data.totalReviewsAnalyzed}
                  platform={data.platform} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <SentimentChart data={data.sentimentBreakdown} />
              <AspectChart    data={data.aspectScores}       />
            </div>
          </div>
        )}

        {activeTab === 'evidence' && (
          <div className="glass-card p-5">
            <h3 className="text-sm font-bold text-white mb-4">Review Evidence</h3>
            <EvidenceList evidence={data.evidence} />
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="glass-card p-5">
            <h3 className="text-sm font-bold text-white mb-4">AI Recommendations</h3>
            <RecommendationList recommendations={data.recommendations} />
          </div>
        )}
      </div>
      <Footer />
    </Layout>
  );
};

export default AnalysisResult;
