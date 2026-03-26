'use client'
import { motion } from 'framer-motion'
import { PasswordAnalysis } from '@/lib/password'

interface Props {
  analysis: PasswordAnalysis
  password: string
}

export default function StrengthMeter({ analysis, password }: Props) {
  const segments = [0, 1, 2, 3, 4]

  return (
    <div className="space-y-4">
      {/* Segment bar */}
      <div className="flex gap-1.5">
        {segments.map((seg) => (
          <motion.div
            key={seg}
            className="h-2 flex-1 rounded-full overflow-hidden bg-slate-800"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: password && seg <= analysis.score ? 1 : 0 }}
              transition={{ duration: 0.4, delay: seg * 0.06, ease: 'easeOut' }}
              style={{ transformOrigin: 'left' }}
              className={`h-full w-full rounded-full ${
                password && seg <= analysis.score ? analysis.bgColor : 'bg-slate-800'
              }`}
            />
          </motion.div>
        ))}
      </div>

      {/* Label + score */}
      <div className="flex items-center justify-between">
        <motion.span
          key={analysis.label}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className={`font-display font-bold text-lg tracking-wide ${analysis.color}`}
        >
          {analysis.label}
        </motion.span>
        {password && (
          <span className="font-mono text-sm text-slate-500">
            {analysis.score}/4
          </span>
        )}
      </div>
    </div>
  )
}
