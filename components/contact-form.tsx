'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    contact: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 500))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ contact: '', message: '' })
    }, 3500)
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      onSubmit={handleSubmit}
      className="space-y-12"
    >
      {/* Message */}
      <div className="relative">
        <label
          htmlFor="message"
          className="block text-[10px] tracking-[0.2em] uppercase text-muted-med font-bold mb-4"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full bg-transparent border-b border-foreground/15 px-0 py-3 text-base font-light text-foreground placeholder:text-muted-med focus:outline-none focus:border-muted-high transition-colors duration-400 resize-none"
          placeholder="Say something..."
        />
      </div>

      {/* Contact */}
      <div>
        <label
          htmlFor="contact"
          className="block text-[10px] tracking-[0.2em] uppercase text-muted-med font-bold mb-4"
        >
          Way to reach you — optional
        </label>
        <input
          type="text"
          id="contact"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          className="w-full bg-transparent border-b border-foreground/15 px-0 py-2 text-base font-light text-foreground placeholder:text-muted-med focus:outline-none focus:border-muted-high transition-colors duration-400"
          placeholder="email, or leave blank"
        />
      </div>

      {/* Submit */}
      <div className="flex items-center gap-8">
        <button
          type="submit"
          disabled={isSubmitting || isSubmitted}
          className="group inline-flex items-center gap-6 disabled:opacity-40"
        >
          <span className="relative flex flex-col leading-none overflow-hidden h-[1em]">
            <span className="block text-[11px] tracking-[0.2em] uppercase font-semibold text-foreground transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
              {isSubmitted ? 'Sent ✓' : isSubmitting ? 'Sending…' : 'Send'}
            </span>
            <span className="absolute top-full block text-[11px] tracking-[0.2em] uppercase font-semibold text-muted-high transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
              {isSubmitted ? 'Sent ✓' : isSubmitting ? 'Sending…' : 'Send'}
            </span>
          </span>
          <span className="w-10 h-px bg-muted-high group-hover:w-20 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
        </button>

        <AnimatePresence>
          {isSubmitted && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-[11px] tracking-[0.15em] uppercase text-muted-high font-medium"
            >
              Landed safely
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.form>
  )
}