import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Search, History, User, Settings,
  LogOut, ChevronLeft, ChevronRight, Brain, BarChart2,
} from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard'   },
  { to: '/analyze',   icon: Search,          label: 'Analyze'     },
  { to: '/history',   icon: History,         label: 'History'     },
  { to: '/profile',   icon: User,            label: 'Profile'     },
  { to: '/settings',  icon: Settings,        label: 'Settings'    },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <aside
      className="flex flex-col h-screen sticky top-0 transition-all duration-300 z-50"
      style={{
        width: collapsed ? '72px' : '240px',
        background: 'var(--color-bg-secondary)',
        borderRight: '1px solid var(--color-border)',
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5" style={{ borderBottom: '1px solid var(--color-border)' }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
        >
          <Brain size={20} className="text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-white leading-tight">RiskAI</p>
            <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Analysis System</p>
          </div>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            id={`sidebar-${label.toLowerCase()}`}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive ? 'nav-link-active' : 'hover:bg-white/5'
              }`
            }
            style={({ isActive }) => ({
              color: isActive ? 'var(--color-accent-light)' : 'var(--color-text-secondary)',
            })}
            title={collapsed ? label : undefined}
          >
            <Icon size={18} className="flex-shrink-0 group-hover:scale-110 transition-transform" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="px-3 pb-3" style={{ borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem' }}>
        <button
          id="sidebar-collapse-btn"
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full transition-all hover:bg-red-500/10"
          style={{ color: '#ef4444' }}
          title={collapsed ? 'Sign Out' : undefined}
        >
          <LogOut size={18} className="flex-shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
        <button
          id="sidebar-toggle-btn"
          onClick={() => setCollapsed((c) => !c)}
          className="mt-2 flex items-center justify-center w-full py-2 rounded-xl transition-all hover:bg-white/5"
          style={{ color: 'var(--color-text-secondary)' }}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
