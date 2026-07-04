'use client'

import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (stored) {
      setTheme(stored)
    } else {
      setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme, mounted])

  if (!mounted) return <div className="w-8 h-3" />

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <button
      onClick={toggleTheme}
      className="group cursor-pointer transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] hover:scale-105"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <span className="relative block overflow-hidden leading-none flex flex-col">
        <span className="block text-[18px] tracking-[0.18em] uppercase font-medium text-muted-high transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full group-hover:text-foreground">
          {theme === 'dark' ? 'Dark' : 'Light'}
        </span>
        <span className="absolute top-full left-0 right-0 block text-[18px] tracking-[0.18em] uppercase font-semibold text-foreground transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
          {theme === 'dark' ? 'Light' : 'Dark'}
        </span>
      </span>
    </button>
  )
}
