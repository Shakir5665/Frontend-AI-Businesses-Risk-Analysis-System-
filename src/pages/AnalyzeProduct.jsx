import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Search, Link as LinkIcon, ShoppingBag, Loader, Sparkles } from 'lucide-react';
import Layout from '../components/common/Layout';
import Footer from '../components/common/Footer';

const platforms = ['Amazon', 'eBay', 'Shopify', 'Etsy', 'Flipkart', 'Other'];

const AnalyzeProduct = () => {
  const [form, setForm] = useState({
    productUrl: '',
    productName: '',
    platform: 'Amazon',
    maxReviews: 200,
    analysisDepth: 'standard',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.productUrl && !form.productName) {
      toast.error('Please provide a product URL or name.');
      return;
    }
    setLoading(true);
    try {
      // Replace with: const res = await analysisAPI.analyzeProduct(form);
      // navigate(`/analysis-result/${res.data.id}`);
      await new Promise((r) => setTimeout(r, 1800)); // Mock delay
      toast.success('Analysis complete!');
      navigate('/analysis-result/analysis-001');
    } catch (err) {
      toast.error('Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles size={22} style={{ color: 'var(--color-accent-light)' }} />
            Analyze a Product
          </h2>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
            Enter a product URL or name to run an AI-powered risk analysis.
          </p>
        </div>

        <div className="glass-card p-7">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Product URL */}
            <div>
              <label htmlFor="analyze-url" className="block text-xs font-semibold mb-1.5"
                style={{ color: 'var(--color-text-secondary)' }}>
                Product URL
              </label>
              <div className="relative">
                <LinkIcon size={15} className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--color-text-secondary)' }} />
                <input id="analyze-url" name="productUrl" type="url"
                  value={form.productUrl} onChange={handleChange}
                  placeholder="https://amazon.com/dp/XXXXXX"
                  className="input-field pl-9" />
              </div>
            </div>

            {/* Product name */}
            <div>
              <label htmlFor="analyze-name" className="block text-xs font-semibold mb-1.5"
                style={{ color: 'var(--color-text-secondary)' }}>
                Product Name <span style={{ color: 'var(--color-text-secondary)', fontWeight: 400 }}>(or use URL above)</span>
              </label>
              <div className="relative">
                <ShoppingBag size={15} className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--color-text-secondary)' }} />
                <input id="analyze-name" name="productName" type="text"
                  value={form.productName} onChange={handleChange}
                  placeholder="Wireless Bluetooth Headphones Pro"
                  className="input-field pl-9" />
              </div>
            </div>

            {/* Platform */}
            <div>
              <label htmlFor="analyze-platform" className="block text-xs font-semibold mb-1.5"
                style={{ color: 'var(--color-text-secondary)' }}>Platform</label>
              <select id="analyze-platform" name="platform"
                value={form.platform} onChange={handleChange}
                className="input-field"
                style={{ cursor: 'pointer' }}
              >
                {platforms.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            {/* Max reviews */}
            <div>
              <label htmlFor="analyze-max-reviews" className="block text-xs font-semibold mb-1.5"
                style={{ color: 'var(--color-text-secondary)' }}>
                Max Reviews to Analyse: <span className="text-white">{form.maxReviews}</span>
              </label>
              <input id="analyze-max-reviews" name="maxReviews" type="range"
                min={50} max={1000} step={50} value={form.maxReviews}
                onChange={handleChange}
                className="w-full accent-indigo-500"
              />
              <div className="flex justify-between text-xs mt-1"
                style={{ color: 'var(--color-text-secondary)' }}>
                <span>50</span><span>1000</span>
              </div>
            </div>

            {/* Analysis depth */}
            <div>
              <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                Analysis Depth
              </p>
              <div className="grid grid-cols-3 gap-3">
                {['quick', 'standard', 'deep'].map((d) => (
                  <label key={d}
                    className="flex flex-col items-center gap-1 p-3 rounded-xl cursor-pointer transition-all"
                    style={{
                      border: `1px solid ${form.analysisDepth === d ? 'var(--color-accent)' : 'var(--color-border)'}`,
                      background: form.analysisDepth === d ? 'rgba(99,102,241,0.12)' : 'rgba(255,255,255,0.03)',
                    }}
                  >
                    <input type="radio" name="analysisDepth" value={d}
                      checked={form.analysisDepth === d} onChange={handleChange}
                      className="hidden" />
                    <span className="text-sm font-semibold capitalize text-white">{d}</span>
                    <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                      {d === 'quick' ? '~30s' : d === 'standard' ? '~1m' : '~3m'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button id="analyze-submit-btn" type="submit" disabled={loading}
              className="btn-glow w-full flex items-center justify-center gap-2 mt-2"
            >
              {loading ? <Loader size={18} className="animate-spin" /> : <Search size={18} />}
              {loading ? 'Analysing…' : 'Run Analysis'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default AnalyzeProduct;
