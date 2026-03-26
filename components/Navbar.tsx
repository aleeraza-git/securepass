'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Menu, X, Zap, Lock, Info } from 'lucide-react'

const navLinks = [
  { href: '/generator', label: 'Generator', icon: Zap },
  { href: '/checker',   label: 'Strength Checker', icon: Lock },
  { href: '/about',     label: 'About', icon: Info },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass border-b border-brand-500/10 shadow-panel' : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div whileHover={{ rotate: 15 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Shield size={24} className="text-brand-500" />
          </motion.div>
          <span className="font-display font-bold text-xl tracking-wider">
            <span className="text-white">Secure</span>
            <span className="neon-text">Pass</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link key={href} href={href}>
                <motion.div
                  whileHover={{ y: -1 }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-display text-sm font-semibold tracking-wide transition-all ${
                    active
                      ? 'text-brand-400 bg-brand-500/10 border border-brand-500/20'
                      : 'text-slate-400 hover:text-brand-400 hover:bg-brand-500/5'
                  }`}
                >
                  <Icon size={15} />
                  {label}
                  {active && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-px bg-brand-500"
                    />
                  )}
                </motion.div>
              </Link>
            )
          })}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-slate-400 hover:text-brand-400 transition-colors"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-brand-500/10 px-6 pb-4"
          >
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} onClick={() => setMobileOpen(false)}>
                <div className={`flex items-center gap-2 px-4 py-3 rounded-lg my-1 font-display font-semibold text-sm tracking-wide transition-all ${
                  pathname === href
                    ? 'text-brand-400 bg-brand-500/10'
                    : 'text-slate-400 hover:text-brand-400'
                }`}>
                  <Icon size={16} />
                  {label}
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
