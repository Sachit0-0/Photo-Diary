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
    // TODO: wire to backend / email service
    console.log('Form submitted:', formData)
    await new Promise((r) => setTimeout(r, 400))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ contact: '', message: '' })
    }, 3000)
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      onSubmit={handleSubmit}
      className="space-y-10"
    >
      <div>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full bg-transparent border-b border-foreground/15 px-0 py-3 text-lg font-light text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-foreground/60 transition-colors duration-300 resize-none"
          placeholder="Say something..."
        />
      </div>

      <div>
        <label
          htmlFor="contact"
          className="block text-xs font-light tracking-widest uppercase text-foreground/35 mb-2"
        >
          Way to reach you — optional
        </label>
        <input
          type="text"
          id="contact"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          className="w-full bg-transparent border-b border-foreground/15 px-0 py-2 text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-foreground/60 transition-colors duration-300"
          placeholder="email, or leave blank"
        />
      </div>

      <motion.button
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
        type="submit"
        disabled={isSubmitting}
        className="group inline-flex items-center gap-3 border-b border-foreground pb-2 text-sm font-bold tracking-widest uppercase text-foreground hover:text-foreground/70 transition-colors duration-300 disabled:opacity-40"
      >
        {isSubmitted ? 'Sent' : isSubmitting ? 'Sending' : 'Send'}
        <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
          →
        </span>
      </motion.button>

      <AnimatePresence>
        {isSubmitted && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-foreground/50 text-sm font-light"
          >
            Sent. No promises on when it's read, but it landed.
          </motion.p>
        )}
      </AnimatePresence>
    </motion.form>
  )
}