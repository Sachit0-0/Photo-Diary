'use client'

import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { motion } from 'framer-motion'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null
    setTheme(stored || 'system')
  }, [])

  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement
    let resolvedTheme = theme

    if (theme === 'system') {
      resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    if (resolvedTheme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
    }

    localStorage.setItem('theme', theme)
  }, [theme, mounted])

  if (!mounted) return <div className="w-8 h-8" />

  const toggleTheme = () => {
    setTheme(current => {
      if (current === 'light') return 'dark'
      if (current === 'dark') return 'system'
      return 'light'
    })
  }

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="p-2 rounded transition-colors hover:bg-foreground/5"
      aria-label="Toggle theme"
    >
      {theme === 'dark' && <Moon className="w-5 h-5" />}
      {theme === 'light' && <Sun className="w-5 h-5" />}
      {theme === 'system' && <Sun className="w-5 h-5" />}
    </motion.button>
  )
}
