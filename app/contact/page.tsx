import { Navigation } from '@/components/navigation'
import { ContactForm } from '@/components/contact-form'
import { Footer } from '@/components/footer'

export default function ContactPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Navigation />

      <section className="max-w-screen-xl mx-auto px-8 md:px-12 pt-40 pb-24 md:pt-48 md:pb-32">
        <div className="grid md:grid-cols-2 gap-20 md:gap-32 items-start">

          {/* Left — heading */}
          <div className="space-y-5">
            <div className="flex items-center gap-5">
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted-med font-medium">003</span>
              <div className="h-px w-10 bg-foreground/15" />
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted-high font-semibold">Contact</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.03em] leading-[0.85] uppercase">
              Leave a<br />
              <span className="text-muted-low">Note</span>
            </h1>
            <div className="h-px w-full bg-foreground/6 mt-8" />
            <p className="text-sm font-light text-muted-high leading-relaxed max-w-xs pt-4">
              No name needed. A thought, a correction, nothing in particular.
            </p>
          </div>

          {/* Right — form */}
          <div className="md:pt-24">
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}