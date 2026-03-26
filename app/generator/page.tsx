'use client'
import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, RefreshCw, Check, Sliders, Shield, Eye, EyeOff } from 'lucide-react'
import { generatePassword, analyzePassword, GeneratorOptions } from '@/lib/password'
import StrengthMeter from '@/components/StrengthMeter'

export default function GeneratorPage() {
  const [options, setOptions] = useState<GeneratorOptions>({
    length: 16, uppercase: true, lowercase: true, numbers: true, symbols: true,
  })
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)
  const [visible, setVisible] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)

  const analysis = analyzePassword(password)

  const handleGenerate = useCallback(() => {
    setIsGenerating(true)
    // Animate through random chars then settle
    let count = 0
    const interval = setInterval(() => {
      setPassword(generatePassword(options))
      count++
      if (count >= 8) {
        clearInterval(interval)
        setIsGenerating(false)
      }
    }, 50)
  }, [options])

  const handleCopy = async () => {
    if (!password) return
    await navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const toggle = (key: keyof Omit<GeneratorOptions, 'length'>) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const toggles: { key: keyof Omit<GeneratorOptions, 'length'>; label: string; example: string }[] = [
    { key: 'uppercase', label: 'Uppercase', example: 'A–Z' },
    { key: 'lowercase', label: 'Lowercase', example: 'a–z' },
    { key: 'numbers',   label: 'Numbers',   example: '0–9' },
    { key: 'symbols',   label: 'Symbols',   example: '!@#$' },
  ]

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-6">
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <p className="text-brand-500 font-mono text-xs tracking-widest uppercase mb-2">TOOL — 01</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-3">
            Password <span className="neon-text">Generator</span>
          </h1>
          <p className="text-slate-400">Generate cryptographically secure passwords instantly.</p>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6 md:p-8 shadow-panel space-y-8"
        >
          {/* Password display */}
          <div>
            <div className="relative flex items-center">
              <div className={`flex-1 min-h-[64px] flex items-center px-5 pr-24 py-4 rounded-xl bg-surface-700 border ${
                password ? analysis.borderColor : 'border-slate-700'
              } font-mono text-lg tracking-widest transition-all duration-300 overflow-hidden`}>
                <AnimatePresence mode="wait">
                  {password ? (
                    <motion.span
                      key={password}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`break-all ${isGenerating ? 'text-brand-500' : 'text-white'}`}
                    >
                      {visible ? password : '•'.repeat(password.length)}
                    </motion.span>
                  ) : (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-slate-600 text-base font-body"
                    >
                      Click generate to create a password
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Action buttons */}
              <div className="absolute right-3 flex items-center gap-1">
                {password && (
                  <button
                    onClick={() => setVisible(!visible)}
                    className="p-2 text-slate-500 hover:text-brand-400 transition-colors"
                  >
                    {visible ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                )}
                <button
                  onClick={handleCopy}
                  disabled={!password}
                  className={`p-2 rounded-lg transition-all ${
                    copied ? 'text-brand-400' : 'text-slate-500 hover:text-brand-400'
                  } disabled:opacity-30`}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            {/* Copy feedback */}
            <AnimatePresence>
              {copied && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-brand-400 text-xs font-mono mt-2 ml-1"
                >
                  ✓ Copied to clipboard
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Strength meter (if password exists) */}
          {password && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <StrengthMeter analysis={analysis} password={password} />
              <div className="flex items-center gap-6 mt-4">
                <div className="text-center">
                  <p className="text-xs font-mono text-slate-500 uppercase tracking-wider">Crack time</p>
                  <p className={`font-display font-bold text-sm mt-1 ${analysis.color}`}>{analysis.crackTime}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-mono text-slate-500 uppercase tracking-wider">Entropy</p>
                  <p className="font-display font-bold text-sm text-brand-400 mt-1">{analysis.entropy} bits</p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-mono text-slate-500 uppercase tracking-wider">Length</p>
                  <p className="font-display font-bold text-sm text-slate-300 mt-1">{password.length} chars</p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="border-t border-slate-700/50 pt-6 space-y-6">
            {/* Length slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-slate-300 text-sm font-display font-semibold">
                  <Sliders size={15} className="text-brand-500" />
                  Password Length
                </div>
                <span className="font-mono text-brand-400 font-bold text-lg">{options.length}</span>
              </div>
              <input
                type="range" min="6" max="40" value={options.length}
                onChange={e => setOptions(prev => ({ ...prev, length: +e.target.value }))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer accent-brand-500 bg-slate-700"
              />
              <div className="flex justify-between text-xs font-mono text-slate-600 mt-1">
                <span>6</span><span>40</span>
              </div>
            </div>

            {/* Toggles */}
            <div>
              <p className="text-slate-400 text-sm font-display font-semibold mb-3">Character Types</p>
              <div className="grid grid-cols-2 gap-3">
                {toggles.map(({ key, label, example }) => (
                  <button
                    key={key}
                    onClick={() => toggle(key)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-display font-semibold transition-all ${
                      options[key]
                        ? 'border-brand-500/40 bg-brand-500/10 text-brand-300'
                        : 'border-slate-700 bg-surface-700 text-slate-500 hover:border-slate-600'
                    }`}
                  >
                    <span>{label}</span>
                    <span className={`font-mono text-xs ${options[key] ? 'text-brand-500' : 'text-slate-600'}`}>{example}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Generate button */}
          <motion.button
            onClick={handleGenerate}
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(34,197,94,0.35)' }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-3 py-4 bg-brand-500 hover:bg-brand-400 text-black font-display font-bold text-lg rounded-xl transition-all"
          >
            <motion.div animate={isGenerating ? { rotate: 360 } : {}} transition={{ duration: 0.5, repeat: isGenerating ? Infinity : 0, ease: 'linear' }}>
              <RefreshCw size={20} />
            </motion.div>
            {isGenerating ? 'Generating...' : 'Generate Password'}
          </motion.button>
        </motion.div>

        {/* Security note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex items-start gap-3 px-4 py-3 rounded-xl bg-surface-700/50 border border-slate-700/50"
        >
          <Shield size={15} className="text-brand-500 mt-0.5 shrink-0" />
          <p className="text-slate-500 text-xs leading-relaxed">
            Passwords are generated entirely in your browser using cryptographic randomness. Nothing is stored or transmitted.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
