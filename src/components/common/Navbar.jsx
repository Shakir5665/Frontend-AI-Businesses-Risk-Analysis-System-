import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, Search, ChevronDown, LogOut, User, Settings } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const pageTitle = {
    '/dashboard':       'Dashboard',
    '/analyze':         'Analyze Product',
    '/history':         'Analysis History',
    '/profile':         'My Profile',
    '/settings':        'Settings',
    '/analysis-result': 'Analysis Result',
  }[location.pathname] || 'AI Risk Analysis';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-4"
      style={{
        background: 'rgba(26, 26, 46, 0.8)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(99, 102, 241, 0.15)',
      }}
    >
      {/* Page title */}
      <div>
        <h1 className="text-lg font-semibold text-white">{pageTitle}</h1>
        <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
          AI-Powered Business Risk Analysis
        </p>
      </div>

      {/* Search bar */}
      <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)', minWidth: '280px' }}
      >
        <Search size={16} style={{ color: 'var(--color-text-secondary)' }} />
        <input
          type="text"
          placeholder="Search analyses..."
          className="bg-transparent outline-none text-sm flex-1"
          style={{ color: 'var(--color-text-primary)' }}
        />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-4">
        {/* Bell */}
        <button className="relative p-2 rounded-xl transition-all hover:bg-white/10"
          aria-label="Notifications"
        >
          <Bell size={20} style={{ color: 'var(--color-text-secondary)' }} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500" />
        </button>

        {/* User dropdown */}
        <div className="relative">
          <button
            id="navbar-user-menu"
            onClick={() => setDropdownOpen((o) => !o)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all hover:bg-white/10"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
            >
              {user?.firstName?.[0] || 'U'}
            </div>
            <span className="hidden sm:block text-sm font-medium text-white">
              {user?.firstName || 'User'}
            </span>
            <ChevronDown size={14} style={{ color: 'var(--color-text-secondary)' }} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 rounded-xl py-2 z-50"
              style={{
                background: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <Link to="/profile" onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-white/5"
                style={{ color: 'var(--color-text-primary)' }}
              >
                <User size={15} /> My Profile
              </Link>
              <Link to="/settings" onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-white/5"
                style={{ color: 'var(--color-text-primary)' }}
              >
                <Settings size={15} /> Settings
              </Link>
              <div style={{ borderTop: '1px solid var(--color-border)', margin: '0.5rem 0' }} />
              <button
                id="navbar-logout-btn"
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-white/5"
                style={{ color: '#ef4444' }}
              >
                <LogOut size={15} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
