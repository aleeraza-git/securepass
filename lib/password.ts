import zxcvbn from 'zxcvbn'

export interface PasswordAnalysis {
  score: 0 | 1 | 2 | 3 | 4
  label: string
  color: string
  bgColor: string
  borderColor: string
  crackTime: string
  entropy: number
  suggestions: string[]
  warning: string
  percentage: number
}

export function analyzePassword(password: string): PasswordAnalysis {
  if (!password) {
    return {
      score: 0, label: 'No Password', color: 'text-slate-500',
      bgColor: 'bg-slate-700', borderColor: 'border-slate-600',
      crackTime: '—', entropy: 0, suggestions: [], warning: '', percentage: 0
    }
  }

  const result = zxcvbn(password)
  const score = result.score as 0 | 1 | 2 | 3 | 4

  const scoreMap = {
    0: { label: 'Very Weak', color: 'text-red-400', bgColor: 'bg-red-500', borderColor: 'border-red-500/40', percentage: 15 },
    1: { label: 'Weak',      color: 'text-orange-400', bgColor: 'bg-orange-500', borderColor: 'border-orange-500/40', percentage: 35 },
    2: { label: 'Fair',      color: 'text-yellow-400', bgColor: 'bg-yellow-500', borderColor: 'border-yellow-500/40', percentage: 55 },
    3: { label: 'Strong',    color: 'text-brand-400', bgColor: 'bg-brand-500', borderColor: 'border-brand-500/40', percentage: 78 },
    4: { label: 'Very Strong', color: 'text-emerald-300', bgColor: 'bg-emerald-400', borderColor: 'border-emerald-400/40', percentage: 100 },
  }

  const crackDisplay = result.crack_times_display.offline_slow_hashing_1e4_per_second as string

  // Calculate entropy
  const charsetSize = getCharsetSize(password)
  const entropy = Math.round(password.length * Math.log2(charsetSize) * 10) / 10

  // Build suggestions
  const suggestions: string[] = [...(result.feedback.suggestions || [])]
  if (password.length < 12) suggestions.unshift('Use at least 12 characters for better security')
  if (!/[A-Z]/.test(password)) suggestions.push('Add uppercase letters (A–Z)')
  if (!/[a-z]/.test(password)) suggestions.push('Add lowercase letters (a–z)')
  if (!/[0-9]/.test(password)) suggestions.push('Include numbers (0–9)')
  if (!/[^A-Za-z0-9]/.test(password)) suggestions.push('Add special characters (!@#$%^&*)')

  return {
    score,
    ...scoreMap[score],
    crackTime: formatCrackTime(crackDisplay),
    entropy,
    suggestions: suggestions.slice(0, 4),
    warning: result.feedback.warning || '',
  }
}

function getCharsetSize(password: string): number {
  let size = 0
  if (/[a-z]/.test(password)) size += 26
  if (/[A-Z]/.test(password)) size += 26
  if (/[0-9]/.test(password)) size += 10
  if (/[^A-Za-z0-9]/.test(password)) size += 32
  return size || 1
}

function formatCrackTime(raw: string): string {
  const map: Record<string, string> = {
    'less than a second': 'Instantly',
    'centuries': 'Millions of years',
  }
  return map[raw] || raw.charAt(0).toUpperCase() + raw.slice(1)
}

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LOWER = 'abcdefghijklmnopqrstuvwxyz'
const NUMBERS = '0123456789'
const SYMBOLS = '!@#$%^&*()-_=+[]{}|;:,.<>?'

export interface GeneratorOptions {
  length: number
  uppercase: boolean
  lowercase: boolean
  numbers: boolean
  symbols: boolean
}

export function generatePassword(opts: GeneratorOptions): string {
  let charset = ''
  const required: string[] = []

  if (opts.uppercase) { charset += UPPER; required.push(UPPER[Math.floor(Math.random() * UPPER.length)]) }
  if (opts.lowercase) { charset += LOWER; required.push(LOWER[Math.floor(Math.random() * LOWER.length)]) }
  if (opts.numbers)   { charset += NUMBERS; required.push(NUMBERS[Math.floor(Math.random() * NUMBERS.length)]) }
  if (opts.symbols)   { charset += SYMBOLS; required.push(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]) }

  if (!charset) return ''

  const remaining = Array.from({ length: opts.length - required.length }, () =>
    charset[Math.floor(Math.random() * charset.length)]
  )

  return [...required, ...remaining]
    .sort(() => Math.random() - 0.5)
    .join('')
}
