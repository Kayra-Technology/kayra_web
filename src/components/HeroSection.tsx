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
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
          style={{
            left: `${(i * 37 + 13) % 100}%`,
            top: `${(i * 53 + 7) % 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 4 + (i % 9) * 0.5,
            repeat: Infinity,
            delay: (i % 8) * 0.5,
            ease: 'easeInOut',
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
          quality={100}
          className="object-cover object-[50%_20%] sm:object-[70%_30%] md:object-right"
          sizes="100vw"
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
