import { useState } from 'react';
import { toast } from 'react-toastify';
import { Bell, Globe, Lock, Moon, Save, Loader, Shield } from 'lucide-react';
import Layout from '../components/common/Layout';
import Footer from '../components/common/Footer';
import mockProfile from '../mock/profile.json';

const Toggle = ({ id, checked, onChange, label, description }) => (
  <div className="flex items-center justify-between py-3"
    style={{ borderBottom: '1px solid var(--color-border)' }}
  >
    <div>
      <p className="text-sm font-medium text-white">{label}</p>
      {description && (
        <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>{description}</p>
      )}
    </div>
    <label htmlFor={id} className="relative cursor-pointer">
      <input id={id} type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <div className="w-10 h-5 rounded-full transition-all"
        style={{ background: checked ? 'var(--color-accent)' : 'rgba(255,255,255,0.15)' }}
      >
        <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all"
          style={{ left: checked ? '1.375rem' : '0.125rem' }} />
      </div>
    </label>
  </div>
);

const Settings = () => {
  const defaultSettings = mockProfile.settings;
  const [notifications, setNotifications] = useState(defaultSettings.notifications);
  const [language, setLanguage]           = useState(defaultSettings.language);
  const [timezone, setTimezone]           = useState(defaultSettings.timezone);
  const [saving, setSaving]               = useState(false);

  const toggleNotif = (key) =>
    setNotifications((n) => ({ ...n, [key]: !n[key] }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 700));
    toast.success('Settings saved!');
    setSaving(false);
  };

  const sections = [
    {
      title: 'Notifications', icon: Bell,
      content: (
        <div className="space-y-0">
          <Toggle id="setting-email-notif"     checked={notifications.email}            onChange={() => toggleNotif('email')}            label="Email Notifications"   description="Receive analysis reports via email"           />
          <Toggle id="setting-push-notif"      checked={notifications.push}             onChange={() => toggleNotif('push')}             label="Push Notifications"    description="Browser push notifications"                   />
          <Toggle id="setting-analysis-notif"  checked={notifications.analysisComplete} onChange={() => toggleNotif('analysisComplete')} label="Analysis Complete"     description="Notify when an analysis finishes"             />
          <Toggle id="setting-weekly-notif"    checked={notifications.weeklyReport}     onChange={() => toggleNotif('weeklyReport')}     label="Weekly Report"         description="Receive a weekly business health summary"     />
        </div>
      ),
    },
    {
      title: 'Preferences', icon: Globe,
      content: (
        <div className="space-y-4 pt-2">
          <div>
            <label htmlFor="setting-language" className="block text-xs font-semibold mb-1.5"
              style={{ color: 'var(--color-text-secondary)' }}>Language</label>
            <select id="setting-language" value={language} onChange={(e) => setLanguage(e.target.value)}
              className="input-field">
              <option value="en">English</option>
              <option value="ar">Arabic</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
          <div>
            <label htmlFor="setting-timezone" className="block text-xs font-semibold mb-1.5"
              style={{ color: 'var(--color-text-secondary)' }}>Timezone</label>
            <select id="setting-timezone" value={timezone} onChange={(e) => setTimezone(e.target.value)}
              className="input-field">
              <option value="Asia/Colombo">Asia/Colombo (IST)</option>
              <option value="UTC">UTC</option>
              <option value="America/New_York">America/New_York (EST)</option>
              <option value="Europe/London">Europe/London (GMT)</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      title: 'Security', icon: Shield,
      content: (
        <div className="space-y-3 pt-2">
          <button id="settings-change-password-btn"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all hover:bg-white/10 w-full"
            style={{ border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
          >
            <Lock size={15} /> Change Password
          </button>
          <button id="settings-2fa-btn"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all hover:bg-white/10 w-full"
            style={{ border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
          >
            <Shield size={15} /> Enable 2FA
          </button>
          <div className="rounded-xl p-4 mt-2"
            style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)' }}
          >
            <p className="text-sm font-semibold" style={{ color: '#ef4444' }}>Danger Zone</p>
            <p className="text-xs mt-1 mb-3" style={{ color: 'var(--color-text-secondary)' }}>
              Permanently delete your account and all data.
            </p>
            <button id="settings-delete-account-btn"
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:bg-red-500/30"
              style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)' }}
            >
              Delete Account
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="max-w-2xl mx-auto animate-fade-in">
        <h2 className="text-xl font-bold text-white mb-6">Settings</h2>
        <form onSubmit={handleSave} className="space-y-5">
          {sections.map(({ title, icon: Icon, content }) => (
            <div key={title} className="glass-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <Icon size={16} style={{ color: 'var(--color-accent-light)' }} />
                <h3 className="text-sm font-bold text-white">{title}</h3>
              </div>
              {content}
            </div>
          ))}

          <div className="flex justify-end">
            <button id="settings-save-btn" type="submit" disabled={saving}
              className="btn-glow flex items-center gap-2"
            >
              {saving ? <Loader size={16} className="animate-spin" /> : <Save size={16} />}
              {saving ? 'Saving…' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </Layout>
  );
};

export default Settings;
