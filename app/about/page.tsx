'use client'
import { motion } from 'framer-motion'
import { Shield, Zap, Lock, Brain, Code, Github } from 'lucide-react'

const techStack = [
  { name: 'Next.js 14', desc: 'React framework with App Router' },
  { name: 'TypeScript', desc: 'Type-safe development' },
  { name: 'TailwindCSS', desc: 'Utility-first styling' },
  { name: 'Framer Motion', desc: 'Smooth animations' },
  { name: 'zxcvbn', desc: 'Realistic strength estimation by Dropbox' },
  { name: 'Vercel', desc: 'Zero-config deployment' },
]

const howItWorks = [
  { icon: Brain, title: 'zxcvbn Algorithm', desc: 'Uses Dropbox\'s open-source zxcvbn library to score passwords based on patterns, dictionary words, and brute-force estimates — not just character rules.' },
  { icon: Zap,   title: 'Entropy Calculation', desc: 'Calculates password entropy in bits based on the effective charset size and password length, giving a mathematical security score.' },
  { icon: Lock,  title: 'Crack Time Estimate', desc: 'Estimates time to crack based on offline slow-hash attacks at 10,000 guesses/second — a realistic threat model.' },
  { icon: Code,  title: '100% Client-Side', desc: 'Everything runs in your browser. No passwords are ever sent to a server. Open source and auditable.' },
]

export default function AboutPage() {
  return (
    <div className="relative min-h-screen pt-24 pb-16 px-6">
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <p className="text-brand-500 font-mono text-xs tracking-widest uppercase mb-2">ABOUT</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            About <span className="neon-text">SecurePass</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            A professional cybersecurity tool for analyzing and generating secure passwords.
            Built with modern web technologies and real security algorithms.
          </p>
        </motion.div>

        {/* Credit card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-8 mb-8 border border-brand-500/20 shadow-panel relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-brand-500/5 rounded-full blur-2xl" />
          <div className="flex items-center gap-3 mb-4">
            <Shield size={24} className="text-brand-500" />
            <h2 className="text-2xl font-display font-bold text-white">Project Idea</h2>
          </div>
          <p className="text-slate-400 text-lg mb-2">Original concept by</p>
          <p className="text-3xl font-display font-bold neon-text">Tala Mufarji</p>
          <p className="text-slate-500 mt-3 text-sm">
            Final Year Project — Cybersecurity Tool Development
          </p>
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-8 mb-8 shadow-panel"
        >
          <h2 className="text-2xl font-display font-bold text-white mb-6">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {howItWorks.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="p-5 rounded-xl bg-surface-700 border border-slate-700/50 hover:border-brand-500/20 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center">
                    <Icon size={16} className="text-brand-400" />
                  </div>
                  <h3 className="font-display font-bold text-white text-sm">{title}</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-8 shadow-panel"
        >
          <h2 className="text-2xl font-display font-bold text-white mb-6">Tech Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {techStack.map(({ name, desc }) => (
              <div key={name} className="p-4 rounded-xl bg-surface-700 border border-slate-700/50">
                <p className="font-mono text-brand-400 text-sm font-bold mb-1">{name}</p>
                <p className="text-slate-500 text-xs">{desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
