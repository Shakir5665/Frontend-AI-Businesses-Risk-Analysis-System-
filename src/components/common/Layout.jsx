import Navbar from './Navbar';
import Sidebar from './Sidebar';

/**
 * Main authenticated layout — sidebar + top navbar + content area
 */
const Layout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--color-bg-primary)' }}>
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
