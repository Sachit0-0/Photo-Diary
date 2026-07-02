import { Navigation } from '@/components/navigation'
import { ContactForm } from '@/components/contact-form'
import { Footer } from '@/components/footer'

export default function ContactPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Navigation />

      <section className="max-w-2xl mx-auto px-6 md:px-8 pt-40 pb-24 md:pt-48 md:pb-32">
        <div className="space-y-4 mb-16">
          <div className="flex items-center gap-3 text-sm font-light tracking-widest uppercase text-foreground/40">
            <span className="text-foreground/25">03 /</span>
            <span>Contact</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold font-playfair leading-[0.9] text-balance">
            Leave a <span className="text-accent font-light">Note</span>
          </h1>
          <p className="text-base font-light text-foreground/55 leading-relaxed max-w-md pt-1">
            No name needed. A thought, a correction, nothing in particular.
          </p>
        </div>

        <ContactForm />
      </section>

      <Footer />
    </main>
  )
}