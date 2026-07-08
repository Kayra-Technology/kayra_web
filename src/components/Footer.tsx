'use client'

import { motion } from 'framer-motion'
import { Mail, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

/* Native contact form backed by the Kayra Google Form: submissions are POSTed
   to its formResponse endpoint, so every message lands in the same Google
   Forms responses/Sheet as before. Entry IDs come from the form's field IDs —
   if the form's questions are ever edited, these IDs must be refreshed. */
const GOOGLE_FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLScSdPLEacU7Khrsyy7lpJR7nPRNrCYbdTDY32i9hjsVP9se0Q/formResponse'
const FORM_FIELDS = {
  message: 'entry.1573123684',
  phone: 'entry.22136536',
  email: 'entry.922205624',
}

// Custom North Star icon - matching KAYRA background logo style
function NorthStar({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      {/* 4-pointed star with long elegant tapered points like background */}
      <path d="M12 0 L13.5 9 L24 12 L13.5 15 L12 24 L10.5 15 L0 12 L10.5 9 Z" fill="currentColor" />
    </svg>
  )
}

const footerLinks = {
  technology: [
    { name: 'AI Navigation', href: '#' },
    { name: 'Propulsion Systems', href: '#' },
    { name: 'Sensor Suite', href: '#' },
    { name: 'Communication', href: '#' },
  ],
  company: [
    { name: 'About Us', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'News & Press', href: '#' },
    { name: 'Partners', href: '#' },
  ],
  resources: [
    { name: 'Documentation', href: '#' },
    { name: 'Technical Specs', href: '#' },
    { name: 'Case Studies', href: '#' },
    { name: 'Support', href: '#' },
  ],
}

export default function Footer() {
  const [form, setForm] = useState({ email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    const body = new URLSearchParams({
      [FORM_FIELDS.message]: form.message,
      [FORM_FIELDS.phone]: form.phone,
      [FORM_FIELDS.email]: form.email,
    })
    try {
      // no-cors: Google Forms doesn't send CORS headers; the response is
      // opaque but the submission is recorded (endpoint verified manually)
      await fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
      setStatus('sent')
      setForm({ email: '', phone: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full px-4 py-3 rounded-lg bg-navy-900/60 border border-ocean-DEFAULT/30 text-sm text-white placeholder-metallic-dark focus:border-cyan-DEFAULT/70 focus:outline-none focus:ring-1 focus:ring-cyan-DEFAULT/40 transition-colors'

  return (
    <footer id="contact" className="relative pt-24 pb-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      {/* Top wave decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-DEFAULT/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-8 md:p-12 mb-16 border border-ocean-DEFAULT/20"
        >
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
                Get in <span className="text-gradient">Touch</span>
              </h3>
              <p className="font-body text-metallic-DEFAULT">
                Send us your message or partnership inquiries — we&apos;ll get back
                to you. You can also reach us directly at{' '}
                <a
                  href="mailto:kurumsal@kayra.technology"
                  className="text-cyan-DEFAULT hover:underline"
                >
                  kurumsal@kayra.technology
                </a>
                .
              </p>
            </div>
            <div>
              {status === 'sent' ? (
                <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
                  <CheckCircle2 className="w-10 h-10 text-cyan-DEFAULT" />
                  <p className="font-heading font-semibold text-white">Message sent</p>
                  <p className="font-body text-sm text-metallic-DEFAULT">
                    Thank you — we&apos;ll be in touch shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      type="email"
                      required
                      placeholder="Email address"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass}
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone number"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <textarea
                    required
                    rows={4}
                    placeholder="Your message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputClass} resize-none`}
                  />
                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-8 py-4 bg-gradient-to-r from-cyan-DEFAULT to-ocean-DEFAULT rounded-lg font-heading font-semibold text-navy-DEFAULT flex items-center justify-center gap-2 shadow-lg shadow-cyan-DEFAULT/20 hover:shadow-cyan-DEFAULT/40 transition-shadow disabled:opacity-60"
                  >
                    {status === 'sending' ? 'Sending…' : 'Send Message'}
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                  {status === 'error' && (
                    <p className="font-body text-sm text-red-400 text-center">
                      Something went wrong — please email us at kurumsal@kayra.technology.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </motion.div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Logo and description */}
          <div>
            <motion.a
              href="#"
              className="flex items-center gap-3 group mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex flex-col">
                <span className="font-heading text-xl font-bold tracking-wider text-white group-hover:text-cyan-DEFAULT transition-colors">
                  KAYRA
                </span>
                <span className="font-heading text-[10px] tracking-[0.3em] text-metallic-DEFAULT uppercase">
                  Technology
                </span>
              </div>
            </motion.a>
            <p className="font-body text-sm text-metallic-DEFAULT mb-6 max-w-xs">
              Pioneering the future of maritime autonomy with cutting-edge
              unmanned surface vehicle technology.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <a
                href="mailto:kurumsal@kayra.technology"
                className="flex items-center gap-3 text-sm text-metallic-DEFAULT hover:text-cyan-DEFAULT transition-colors"
              >
                <Mail className="w-4 h-4" />
                kurumsal@kayra.technology
              </a>
              <div className="flex items-center gap-3 text-sm text-metallic-DEFAULT">
                <MapPin className="w-4 h-4" />
                İTÜ Özdemir Bayraktar Tasarım ve Prototipleme Merkezi
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-ocean-DEFAULT/20">
          <div className="flex justify-center items-center">
            <p className="font-body text-sm text-metallic-dark">
              &copy; 2026 Kayra Technology. All rights reserved.
            </p>
          </div>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-DEFAULT via-ocean-DEFAULT to-cyan-DEFAULT opacity-50" />
      </div>
    </footer>
  )
}
