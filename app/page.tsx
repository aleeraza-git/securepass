'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Shield, Zap, Lock, ChevronRight, Terminal } from 'lucide-react'

const features = [
  { icon: Shield, title: 'Strength Analysis', desc: 'Real-time scoring using the zxcvbn algorithm trusted by security professionals.' },
  { icon: Zap, title: 'Crack Time Estimate', desc: 'See exactly how long it would take an attacker to crack your password.' },
  { icon: Lock, title: 'Secure Generator', desc: 'Generate cryptographically strong passwords with custom character rules.' },
]

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-100 pointer-events-none" />
      <div className="absolute inset-0 bg-glow-green pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-400 text-sm font-mono mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse-slow" />
          SYSTEM ONLINE — SECURITY TOOLS ACTIVE
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6 max-w-4xl"
        >
          Test & Generate{' '}
          <span className="neon-text">Unbreakable</span>
          {' '}Passwords
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-slate-400 text-lg md:text-xl max-w-2xl mb-10 font-body leading-relaxed"
        >
          Instantly analyze password strength and generate secure passwords using
          enterprise-grade cryptographic algorithms.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/generator">
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(34,197,94,0.4)' }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-4 bg-brand-500 hover:bg-brand-400 text-black font-display font-bold text-lg rounded-lg transition-colors"
            >
              <Lock size={20} />
              Generate Password
              <ChevronRight size={18} />
            </motion.button>
          </Link>
          <Link href="/checker">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-4 glass glass-hover text-brand-400 font-display font-bold text-lg rounded-lg border border-brand-500/30 transition-all"
            >
              <Terminal size={20} />
              Check Strength
            </motion.button>
          </Link>
        </motion.div>

        {/* Terminal preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 w-full max-w-2xl glass rounded-xl overflow-hidden shadow-panel border border-brand-500/20"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700/50 bg-surface-800/50">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-2 text-xs font-mono text-slate-500">securepass — terminal</span>
          </div>
          <div className="p-6 font-mono text-sm space-y-2">
            <p><span className="text-brand-500">$</span> <span className="text-slate-300">analyze --password "MyP@ss123"</span></p>
            <p className="text-slate-500">{'>'} Running analysis...</p>
            <p><span className="text-slate-500">Strength:</span> <span className="text-yellow-400">■■■□ Strong</span></p>
            <p><span className="text-slate-500">Crack time:</span> <span className="text-brand-400">~3 months</span></p>
            <p><span className="text-slate-500">Entropy:</span> <span className="text-brand-400">52.4 bits</span></p>
            <p><span className="text-slate-500">Suggestions:</span> <span className="text-orange-400">Add more length</span></p>
            <p className="cursor-blink"><span className="text-brand-500">$</span> <span className="text-slate-400"> </span></p>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-brand-500 font-mono text-sm tracking-widest uppercase mb-3">CAPABILITIES</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white">
            Built for Security Professionals
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass glass-hover rounded-xl p-6 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-4 group-hover:bg-brand-500/20 transition-colors">
                <f.icon size={22} className="text-brand-400" />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-2">{f.title}</h3>
              <p className="text-slate-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass rounded-2xl p-12 border border-brand-500/20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-glow-green opacity-50 pointer-events-none" />
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 relative z-10">
            Is your password secure enough?
          </h2>
          <p className="text-slate-400 mb-8 text-lg relative z-10">
            Find out in seconds. No signup required.
          </p>
          <Link href="/checker">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(34,197,94,0.5)' }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-4 bg-brand-500 hover:bg-brand-400 text-black font-display font-bold text-xl rounded-lg transition-all relative z-10"
            >
              Check Your Password →
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
