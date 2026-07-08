import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import useAuth from './hooks/useAuth';

// Pages
import Dashboard      from './pages/Dashboard';
import AnalyzeProduct from './pages/AnalyzeProduct';
import AnalysisResult from './pages/AnalysisResult';
import History        from './pages/History';
import Profile        from './pages/Profile';
import Settings       from './pages/Settings';
import NotFound       from './pages/NotFound';

// Auth components
import Login    from './components/auth/Login';
import Register from './components/auth/Register';

// ─── Protected route wrapper ─────────────────────────────────────────────────
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: 'var(--color-bg-primary)' }}
      >
        <div className="w-10 h-10 border-4 rounded-full animate-spin"
          style={{ borderColor: 'var(--color-accent)', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// ─── Guest route wrapper (redirect to dashboard if already logged in) ─────────
const GuestRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

// ─── App routes ───────────────────────────────────────────────────────────────
const AppRoutes = () => (
  <Routes>
    {/* Public / Auth routes */}
    <Route path="/login"    element={<GuestRoute><Login    /></GuestRoute>} />
    <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />

    {/* Protected routes */}
    <Route path="/dashboard"             element={<ProtectedRoute><Dashboard      /></ProtectedRoute>} />
    <Route path="/analyze"               element={<ProtectedRoute><AnalyzeProduct /></ProtectedRoute>} />
    <Route path="/analysis-result/:id"   element={<ProtectedRoute><AnalysisResult /></ProtectedRoute>} />
    <Route path="/analysis-result"       element={<ProtectedRoute><AnalysisResult /></ProtectedRoute>} />
    <Route path="/history"               element={<ProtectedRoute><History        /></ProtectedRoute>} />
    <Route path="/profile"               element={<ProtectedRoute><Profile        /></ProtectedRoute>} />
    <Route path="/settings"              element={<ProtectedRoute><Settings       /></ProtectedRoute>} />

    {/* Redirects & 404 */}
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

// ─── Root App ─────────────────────────────────────────────────────────────────
const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss={false}
        pauseOnHover
        theme="dark"
        toastStyle={{
          background: '#1a1a2e',
          border: '1px solid rgba(99,102,241,0.25)',
          borderRadius: '0.75rem',
          color: '#f1f5f9',
        }}
      />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
