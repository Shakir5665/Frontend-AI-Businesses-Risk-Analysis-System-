import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Brain, LogIn, Loader } from 'lucide-react';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import { parseError } from '../../utils/helpers';

const Login = () => {
  const [form, setForm]       = useState({ email: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login }             = useAuth();
  const navigate              = useNavigate();

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      await login(form);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(parseError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: 'radial-gradient(ellipse at top, #1a1a2e 0%, #0f0f1a 60%)',
      }}
    >
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)' }}
      />

      <div className="glass-card p-8 w-full max-w-md animate-fade-in relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 animate-pulse-ring"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
          >
            <Brain size={28} className="text-white" />
          </div>
          <h2 className="text-2xl font-extrabold gradient-text">RiskAI</h2>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="login-email" className="block text-xs font-semibold mb-1.5"
              style={{ color: 'var(--color-text-secondary)' }}>
              Email Address
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="input-field"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="login-password" className="block text-xs font-semibold mb-1.5"
              style={{ color: 'var(--color-text-secondary)' }}>
              Password
            </label>
            <div className="relative">
              <input
                id="login-password"
                name="password"
                type={showPwd ? 'text' : 'password'}
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="input-field pr-12"
                required
              />
              <button type="button" tabIndex={-1}
                onClick={() => setShowPwd((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--color-text-secondary)' }}
                aria-label="Toggle password visibility"
              >
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            id="login-submit-btn"
            type="submit"
            disabled={loading}
            className="btn-glow w-full flex items-center justify-center gap-2 mt-2"
          >
            {loading ? <Loader size={18} className="animate-spin" /> : <LogIn size={18} />}
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm mt-6" style={{ color: 'var(--color-text-secondary)' }}>
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold" style={{ color: 'var(--color-accent-light)' }}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
