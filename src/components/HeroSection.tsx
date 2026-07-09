'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { ArrowDown, Cpu, Sparkles, Bot, Brain, Zap } from 'lucide-react'
import Image from 'next/image'

const platforms = [
  { id: 'autonomous', name: 'Autonomous', fullName: 'Self-Driving Systems', icon: Bot },
  { id: 'ai', name: 'AI', fullName: 'Artificial Intelligence', icon: Brain },
  { id: 'robotics', name: 'Robotics', fullName: 'Industrial Robotics', icon: Cpu },
]

// Floating particles for magical effect
// Deterministic positions — Math.random here causes an SSR hydration
// mismatch that mis-binds click handlers across the whole page.
// Pure CSS animation (keyframes in globals.css): 50 individually-animated
// framer-motion divs kept the main thread busy for a background flourish.
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
          style={{
            left: `${(i * 37 + 13) % 100}%`,
            top: `${(i * 53 + 7) % 100}%`,
            animation: `particle-float ${4 + (i % 9) * 0.5}s ease-in-out ${(i % 8) * 0.5}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

// Liquid Glass Card
function LiquidGlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {/* Glass background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl" />
      {/* Animated border */}
      <div className="absolute inset-0 rounded-2xl border border-white/20" />
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
      />
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activePlatform, setActivePlatform] = useState(0)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background photo — confined to the hero viewport only, so the
          logo scrolls away with it instead of following down the page.
          Its own bottom edge fades to transparent (mask, not a solid
          color) so what shows through is body's lacquer-navy-full
          sheen continuing underneath. */}
      <div
        className="absolute inset-0 z-0"
        style={{
          maskImage: 'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)',
        }}
      >
        <Image
          src="/images/hero-bg.png"
          alt="KAYRA Technology Background"
          fill
          priority
          quality={80}
          className="object-cover object-[50%_20%] sm:object-[70%_30%] md:object-right"
          sizes="100vw"
        />
        {/* The source photo blows out to a pale, washed-out highlight
            running the length of its right side, not just the corner —
            tame it back to the navy palette instead of re-exporting the
            asset for every crop variant. Stays clear until well past
            the centered logo (~63% width) so it doesn't wash the logo
            out too — only the glare further right gets covered. */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, transparent 0%, transparent 64%, rgba(11,28,62,0.65) 82%, #0B1C3E 100%)',
          }}
        />
      </div>

      {/* Floating particles */}
      <FloatingParticles />

      {/* Main content */}
      <motion.div
        style={{ opacity, y }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 pt-24"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left content - empty for clean background display */}
          <div className="space-y-8">
          </div>

          {/* Right content - 3D Visualization */}

        </div>
      </motion.div>
    </section>
  )
}
