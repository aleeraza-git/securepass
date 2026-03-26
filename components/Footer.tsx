import { Shield, Github, Heart } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-surface-800/50 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Shield size={18} className="text-brand-500" />
          <span className="font-display font-bold text-white">
            Secure<span className="neon-text">Pass</span>
          </span>
        </div>

        {/* Credit */}
        <p className="text-slate-500 text-sm font-body flex items-center gap-1">
          Idea by{' '}
          <span className="text-brand-400 font-semibold ml-1">Tala Ahmad Mufarrij</span>
          <Heart size={12} className="text-brand-500 mx-1 fill-brand-500" />
        </p>

        {/* Links */}
        <div className="flex items-center gap-6">
          <p className="text-slate-600 text-xs font-mono">
            © {new Date().getFullYear()} SecurePass
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-brand-400 transition-colors"
          >
            <Github size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
