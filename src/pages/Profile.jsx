import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { User, Mail, Building2, Briefcase, Camera, Save, Loader } from 'lucide-react';
import Layout from '../components/common/Layout';
import Footer from '../components/common/Footer';
import mockProfile from '../mock/profile.json';
import useAuth from '../hooks/useAuth';
import { formatDate } from '../utils/helpers';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [form, setForm]       = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProfile(mockProfile);
      setForm({
        firstName: mockProfile.firstName,
        lastName:  mockProfile.lastName,
        email:     mockProfile.email,
        company:   mockProfile.company,
        role:      mockProfile.role,
      });
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    updateUser(form);
    toast.success('Profile updated!');
    setSaving(false);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-4 rounded-full animate-spin"
            style={{ borderColor: 'var(--color-accent)', borderTopColor: 'transparent' }} />
        </div>
      </Layout>
    );
  }

  const stats = [
    { label: 'Total Analyses', value: profile.stats.totalAnalyses },
    { label: 'Avg Health Score', value: profile.stats.avgHealthScore },
    { label: 'Fav Platform', value: profile.stats.mostAnalyzedPlatform },
    { label: 'Member Since', value: formatDate(profile.joinedAt) },
  ];

  return (
    <Layout>
      <div className="max-w-3xl mx-auto animate-fade-in">
        {/* Avatar + stats */}
        <div className="glass-card p-6 mb-5 flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
            >
              {form.firstName?.[0] || 'U'}
            </div>
            <button id="profile-avatar-btn"
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'var(--color-accent)', border: '2px solid var(--color-bg-primary)' }}
              title="Change avatar"
            >
              <Camera size={12} className="text-white" />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{form.firstName} {form.lastName}</h2>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{form.role}</p>
            <span className="badge badge-info mt-2">{profile.plan} Plan</span>
          </div>
          <div className="sm:ml-auto grid grid-cols-2 gap-3">
            {stats.map(({ label, value }) => (
              <div key={label} className="rounded-xl p-3 text-center"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--color-border)' }}
              >
                <p className="text-sm font-bold text-white">{value}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Edit form */}
        <div className="glass-card p-6">
          <h3 className="text-sm font-bold text-white mb-5">Edit Profile</h3>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 'profile-first', name: 'firstName', label: 'First Name', icon: User        },
                { id: 'profile-last',  name: 'lastName',  label: 'Last Name',  icon: User        },
                { id: 'profile-email', name: 'email',     label: 'Email',      icon: Mail,  type: 'email' },
                { id: 'profile-role',  name: 'role',      label: 'Role',       icon: Briefcase   },
              ].map(({ id, name, label, icon: Icon, type = 'text' }) => (
                <div key={name}>
                  <label htmlFor={id} className="block text-xs font-semibold mb-1.5"
                    style={{ color: 'var(--color-text-secondary)' }}>{label}</label>
                  <div className="relative">
                    <Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2"
                      style={{ color: 'var(--color-text-secondary)' }} />
                    <input id={id} name={name} type={type}
                      value={form[name] || ''} onChange={handleChange}
                      className="input-field pl-9" />
                  </div>
                </div>
              ))}
            </div>
            <div>
              <label htmlFor="profile-company" className="block text-xs font-semibold mb-1.5"
                style={{ color: 'var(--color-text-secondary)' }}>Company</label>
              <div className="relative">
                <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--color-text-secondary)' }} />
                <input id="profile-company" name="company" type="text"
                  value={form.company || ''} onChange={handleChange}
                  className="input-field pl-9" />
              </div>
            </div>
            <div className="flex justify-end">
              <button id="profile-save-btn" type="submit" disabled={saving}
                className="btn-glow flex items-center gap-2"
              >
                {saving ? <Loader size={16} className="animate-spin" /> : <Save size={16} />}
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default Profile;
