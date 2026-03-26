import type { Metadata } from 'next'
import '../styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'SecurePass — Password Strength Checker & Generator',
  description: 'Test & generate unbreakable passwords. Instantly analyze password strength, estimate crack time, and generate cryptographically secure passwords.',
  keywords: ['password strength', 'password generator', 'cybersecurity', 'password checker'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-surface-900 text-slate-200 font-body antialiased">
        <div className="scanline" />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
