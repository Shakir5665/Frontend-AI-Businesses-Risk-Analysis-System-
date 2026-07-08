import { useNavigate } from 'react-router-dom';
import { Brain, Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{ background: 'radial-gradient(ellipse at top, #1a1a2e 0%, #0f0f1a 60%)' }}
    >
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)' }}
      />

      <div className="animate-fade-in relative z-10">
        {/* Logo */}
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
        >
          <Brain size={32} className="text-white" />
        </div>

        {/* 404 */}
        <h1 className="text-8xl font-black gradient-text mb-2">404</h1>
        <h2 className="text-2xl font-bold text-white mb-3">Page Not Found</h2>
        <p className="text-sm max-w-sm mb-8" style={{ color: 'var(--color-text-secondary)' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button id="notfound-back-btn"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm transition-all hover:bg-white/10"
            style={{ border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}
          >
            <ArrowLeft size={15} /> Go Back
          </button>
          <button id="notfound-home-btn"
            onClick={() => navigate('/dashboard')}
            className="btn-glow flex items-center gap-2 text-sm"
          >
            <Home size={15} /> Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
