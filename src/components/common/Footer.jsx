import { Brain, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3"
      style={{ borderTop: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}
    >
      {/* Brand */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
        >
          <Brain size={12} className="text-white" />
        </div>
        <span className="text-xs font-medium text-white">RiskAI</span>
        <span className="text-xs">© {year} All rights reserved.</span>
      </div>

      {/* Social links */}
      <div className="flex items-center gap-3">
        <a href="https://github.com" target="_blank" rel="noreferrer"
          className="p-1.5 rounded-lg transition-all hover:bg-white/10 hover:text-white"
          aria-label="GitHub"
        >
          <Github size={15} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer"
          className="p-1.5 rounded-lg transition-all hover:bg-white/10 hover:text-white"
          aria-label="LinkedIn"
        >
          <Linkedin size={15} />
        </a>
        <a href="mailto:support@riskai.com"
          className="p-1.5 rounded-lg transition-all hover:bg-white/10 hover:text-white"
          aria-label="Email"
        >
          <Mail size={15} />
        </a>
      </div>

      <p className="text-xs">Final Year Project — AI Business Risk Analysis</p>
    </footer>
  );
};

export default Footer;
