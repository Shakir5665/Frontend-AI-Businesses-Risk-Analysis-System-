import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Trash2, Eye, ArrowUpDown, Filter } from 'lucide-react';
import Layout from '../components/common/Layout';
import Footer from '../components/common/Footer';
import mockHistory from '../mock/history.json';
import { formatDate, scoreToColor, scoreToBadge } from '../utils/helpers';

const History = () => {
  const [data, setData]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [sortAsc, setSortAsc]   = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(mockHistory.results);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const filtered = data
    .filter((a) =>
      a.productName.toLowerCase().includes(search.toLowerCase()) ||
      a.platform.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortAsc
        ? new Date(a.analyzedAt) - new Date(b.analyzedAt)
        : new Date(b.analyzedAt) - new Date(a.analyzedAt)
    );

  return (
    <Layout>
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h2 className="text-xl font-bold text-white">Analysis History</h2>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              {data.length} total analyses
            </p>
          </div>
          <button onClick={() => navigate('/analyze')} className="btn-glow text-sm px-4 py-2">
            + New Analysis
          </button>
        </div>

        {/* Filters */}
        <div className="glass-card p-4 mb-5 flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--color-text-secondary)' }} />
            <input
              id="history-search"
              type="text"
              placeholder="Search by product or platform…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-9 py-2 text-sm"
            />
          </div>
          <button id="history-sort-btn"
            onClick={() => setSortAsc((s) => !s)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all hover:bg-white/10"
            style={{ border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}
          >
            <ArrowUpDown size={14} />
            {sortAsc ? 'Oldest first' : 'Newest first'}
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 rounded-full animate-spin"
              style={{ borderColor: 'var(--color-accent)', borderTopColor: 'transparent' }} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <p className="text-white font-semibold mb-1">No analyses found</p>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Try adjusting your search or run a new analysis.
            </p>
          </div>
        ) : (
          <div className="glass-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  {['Product', 'Platform', 'Score', 'Date', 'Actions'].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold"
                      style={{ color: 'var(--color-text-secondary)' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, i) => (
                  <tr key={item.id}
                    className="transition-colors hover:bg-white/5"
                    style={{ borderBottom: i < filtered.length - 1 ? '1px solid var(--color-border)' : 'none' }}
                  >
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-white truncate max-w-[200px]">{item.productName}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                        {item.totalReviews} reviews
                      </p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="badge badge-info">{item.platform}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-sm font-bold ${scoreToColor(item.healthScore)}`}>
                        {item.healthScore}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                      {formatDate(item.analyzedAt)}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <button id={`history-view-${item.id}`}
                          onClick={() => navigate(`/analysis-result/${item.id}`)}
                          className="p-1.5 rounded-lg transition-all hover:bg-indigo-500/20"
                          style={{ color: 'var(--color-accent-light)' }}
                          title="View"
                        >
                          <Eye size={15} />
                        </button>
                        <button id={`history-delete-${item.id}`}
                          onClick={() => setData((d) => d.filter((x) => x.id !== item.id))}
                          className="p-1.5 rounded-lg transition-all hover:bg-red-500/20"
                          style={{ color: '#ef4444' }}
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </Layout>
  );
};

export default History;
