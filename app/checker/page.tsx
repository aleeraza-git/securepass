'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Clock, Zap, Hash, Shield } from 'lucide-react'
import { analyzePassword } from '@/lib/password'
import StrengthMeter from '@/components/StrengthMeter'
import TipsPanel from '@/components/TipsPanel'

export default function CheckerPage() {
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)
  const analysis = analyzePassword(password)

  const stats = [
    { icon: Clock, label: 'Time to crack', value: password ? analysis.crackTime : '—', color: analysis.color },
    { icon: Hash,  label: 'Entropy', value: password ? `${analysis.entropy} bits` : '—', color: 'text-brand-400' },
    { icon: Zap,   label: 'Characters', value: password ? `${password.length}` : '—', color: 'text-slate-300' },
  ]

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-6">
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <p className="text-brand-500 font-mono text-xs tracking-widest uppercase mb-2">TOOL — 02</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-3">
            Strength <span className="neon-text">Checker</span>
          </h1>
          <p className="text-slate-400">Analyze any password's strength, crack time, and security gaps.</p>
        </motion.div>

        {/* Input card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6 md:p-8 shadow-panel space-y-6"
        >
          {/* Password input */}
          <div>
            <label className="text-slate-400 text-sm font-display font-semibold mb-2 block">
              Enter your password
            </label>
            <div className="relative">
              <input
                type={visible ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Type a password to analyze..."
                className="w-full px-5 pr-12 py-4 rounded-xl bg-surface-700 border border-slate-700 focus:border-brand-500/50 text-white font-mono text-lg tracking-wider placeholder:text-slate-600 placeholder:font-body placeholder:text-base placeholder:tracking-normal transition-all input-glow outline-none"
                autoComplete="off"
                spellCheck={false}
              />
              <button
                onClick={() => setVisible(!visible)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-brand-400 transition-colors"
              >
                {visible ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Strength meter */}
          <StrengthMeter analysis={analysis} password={password} />

          {/* Stats row */}
          <AnimatePresence>
            {password && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-3 gap-3"
              >
                {stats.map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="text-center p-4 rounded-xl bg-surface-700 border border-slate-700/50">
                    <Icon size={16} className={`${color} mx-auto mb-2`} />
                    <p className="text-slate-500 text-xs font-mono uppercase tracking-wider mb-1">{label}</p>
                    <p className={`font-display font-bold text-sm ${color}`}>{value}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Character breakdown */}
          <AnimatePresence>
            {password && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-4 gap-2"
              >
                {[
                  { label: 'A–Z', check: /[A-Z]/, count: (password.match(/[A-Z]/g) || []).length },
                  { label: 'a–z', check: /[a-z]/, count: (password.match(/[a-z]/g) || []).length },
                  { label: '0–9', check: /[0-9]/, count: (password.match(/[0-9]/g) || []).length },
                  { label: '!@#', check: /[^A-Za-z0-9]/, count: (password.match(/[^A-Za-z0-9]/g) || []).length },
                ].map(({ label, check, count }) => {
                  const has = check.test(password)
                  return (
                    <div key={label} className={`text-center p-3 rounded-lg border text-xs font-mono transition-all ${
                      has ? 'border-brand-500/30 bg-brand-500/10 text-brand-400' : 'border-slate-700 bg-surface-700 text-slate-600'
                    }`}>
                      <p className="font-bold text-sm">{count}</p>
                      <p>{label}</p>
                    </div>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Tips panel */}
        <AnimatePresence>
          {password && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.1 }}
              className="mt-6 glass rounded-2xl p-6 md:p-8 shadow-panel"
            >
              <TipsPanel analysis={analysis} password={password} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Privacy note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex items-start gap-3 px-4 py-3 rounded-xl bg-surface-700/50 border border-slate-700/50"
        >
          <Shield size={15} className="text-brand-500 mt-0.5 shrink-0" />
          <p className="text-slate-500 text-xs leading-relaxed">
            Analysis happens entirely in your browser. Your password is never sent to any server.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
