import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Brain, UserPlus, Loader } from 'lucide-react';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import { parseError } from '../../utils/helpers';

const Register = () => {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', company: '', password: '', confirmPassword: '',
  });
  const [showPwd, setShowPwd]     = useState(false);
  const [loading, setLoading]     = useState(false);
  const { register }              = useAuth();
  const navigate                  = useNavigate();

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.password) {
      toast.error('Please fill in all required fields.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    if (form.password.length < 8) {
      toast.error('Password must be at least 8 characters.');
      return;
    }
    setLoading(true);
    try {
      const { confirmPassword, ...payload } = form;
      await register(payload);
      toast.success('Account created! Welcome to RiskAI.');
      navigate('/dashboard');
    } catch (err) {
      toast.error(parseError(err));
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { id: 'reg-firstName', name: 'firstName', label: 'First Name *', type: 'text',     placeholder: 'Alex',               half: true  },
    { id: 'reg-lastName',  name: 'lastName',  label: 'Last Name',    type: 'text',     placeholder: 'Johnson',            half: true  },
    { id: 'reg-email',     name: 'email',     label: 'Email *',      type: 'email',    placeholder: 'you@example.com',    half: false },
    { id: 'reg-company',   name: 'company',   label: 'Company',      type: 'text',     placeholder: 'TechVentures Inc.',  half: false },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{ background: 'radial-gradient(ellipse at top, #1a1a2e 0%, #0f0f1a 60%)' }}
    >
      <div className="glass-card p-8 w-full max-w-lg animate-fade-in">
        {/* Logo */}
        <div className="flex flex-col items-center mb-7">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
          >
            <Brain size={28} className="text-white" />
          </div>
          <h2 className="text-2xl font-extrabold gradient-text">Create Account</h2>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
            Start analysing your business risks
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name row */}
          <div className="grid grid-cols-2 gap-4">
            {fields.filter(f => f.half).map(({ id, name, label, type, placeholder }) => (
              <div key={name}>
                <label htmlFor={id} className="block text-xs font-semibold mb-1.5"
                  style={{ color: 'var(--color-text-secondary)' }}>{label}</label>
                <input id={id} name={name} type={type} value={form[name]}
                  onChange={handleChange} placeholder={placeholder} className="input-field" />
              </div>
            ))}
          </div>

          {/* Full-width fields */}
          {fields.filter(f => !f.half).map(({ id, name, label, type, placeholder }) => (
            <div key={name}>
              <label htmlFor={id} className="block text-xs font-semibold mb-1.5"
                style={{ color: 'var(--color-text-secondary)' }}>{label}</label>
              <input id={id} name={name} type={type} value={form[name]}
                onChange={handleChange} placeholder={placeholder} className="input-field" />
            </div>
          ))}

          {/* Password */}
          <div>
            <label htmlFor="reg-password" className="block text-xs font-semibold mb-1.5"
              style={{ color: 'var(--color-text-secondary)' }}>Password *</label>
            <div className="relative">
              <input id="reg-password" name="password" type={showPwd ? 'text' : 'password'}
                value={form.password} onChange={handleChange}
                placeholder="Min. 8 characters" className="input-field pr-12" />
              <button type="button" tabIndex={-1}
                onClick={() => setShowPwd((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Confirm password */}
          <div>
            <label htmlFor="reg-confirm-password" className="block text-xs font-semibold mb-1.5"
              style={{ color: 'var(--color-text-secondary)' }}>Confirm Password *</label>
            <input id="reg-confirm-password" name="confirmPassword"
              type={showPwd ? 'text' : 'password'} value={form.confirmPassword}
              onChange={handleChange} placeholder="••••••••" className="input-field" />
          </div>

          <button id="register-submit-btn" type="submit" disabled={loading}
            className="btn-glow w-full flex items-center justify-center gap-2 mt-2"
          >
            {loading ? <Loader size={18} className="animate-spin" /> : <UserPlus size={18} />}
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm mt-5" style={{ color: 'var(--color-text-secondary)' }}>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold" style={{ color: 'var(--color-accent-light)' }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
