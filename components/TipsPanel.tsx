'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { Lightbulb, AlertTriangle, CheckCircle } from 'lucide-react'
import { PasswordAnalysis } from '@/lib/password'

interface Props {
  analysis: PasswordAnalysis
  password: string
}

export default function TipsPanel({ analysis, password }: Props) {
  if (!password || analysis.suggestions.length === 0) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="space-y-3"
      >
        <div className="flex items-center gap-2 text-slate-400 text-sm font-mono tracking-wider uppercase">
          <Lightbulb size={14} className="text-brand-500" />
          <span>Improvement Tips</span>
        </div>

        {/* Warning */}
        {analysis.warning && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-start gap-3 px-4 py-3 rounded-lg bg-orange-500/10 border border-orange-500/20"
          >
            <AlertTriangle size={16} className="text-orange-400 mt-0.5 shrink-0" />
            <p className="text-orange-300 text-sm">{analysis.warning}</p>
          </motion.div>
        )}

        {/* Tips */}
        <div className="grid gap-2">
          {analysis.suggestions.map((tip, i) => (
            <motion.div
              key={tip}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3 px-4 py-3 rounded-lg glass border border-slate-700/50 hover:border-brand-500/20 transition-colors"
            >
              <div className="w-5 h-5 rounded-full bg-brand-500/10 border border-brand-500/30 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-brand-400 text-xs font-mono font-bold">{i + 1}</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{tip}</p>
            </motion.div>
          ))}
        </div>

        {/* All good */}
        {analysis.score === 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-brand-500/10 border border-brand-500/20"
          >
            <CheckCircle size={16} className="text-brand-400" />
            <p className="text-brand-300 text-sm">Excellent! This password meets all security criteria.</p>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
