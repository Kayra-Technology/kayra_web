'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Waves, Plane, Anchor, Rocket } from 'lucide-react'
import Image from 'next/image'

const gallery = [
  {
    id: 'usv',
    name: 'KAYRA USV',
    subtitle: 'Unmanned Surface Vehicle',
    icon: Waves,
    stages: [
      { name: 'Field Test', image: '/images/fleet-photos/usv.jpeg', caption: 'On-water trial run ahead of autonomy testing.' },
    ],
  },
  {
    id: 'cusv',
    name: 'KAYRA C-USV',
    subtitle: 'Catamaran Surface Vehicle',
    icon: Waves,
    stages: [
      { name: 'Field Test', image: '/images/fleet-photos/cusv.jpeg', caption: 'Catamaran hull with sensor mast and camera gimbal, on the lake.' },
    ],
  },
  {
    id: 'rov',
    name: 'KAYRA ROV',
    subtitle: 'Inspection Class ROV',
    icon: Anchor,
    stages: [
      { name: 'Field Test', image: '/images/fleet-photos/rov.jpeg', caption: 'Poolside dive test of the 6-thruster inspection ROV.' },
    ],
  },
  {
    id: 'uav',
    name: 'KAYRA UAV',
    subtitle: 'Unmanned Aerial Vehicle',
    icon: Plane,
    stages: [
      { name: 'ESP32 Based', image: '/images/fleet-photos/uav-esp32.jpeg', caption: 'Ultra-low-cost ESP32 flight controller builds, workshop bench test.' },
      { name: 'Gemstone UAV', image: '/images/fleet-photos/uav-gemstone.jpeg', caption: 'Gemstone companion-computer airframe running ArduCopter.' },
    ],
  },
  {
    id: 'rocket',
    name: 'KAYRA ROCKET',
    subtitle: 'Recoverable Model Rocket',
    icon: Rocket,
    stages: [
      { name: 'Field Test', image: '/images/fleet-photos/rocket.jpeg', caption: 'Model rocket kit ready for launch — 31.3cm airframe, 2.4 stability margin.', fit: 'contain' as const },
    ],
  },
]

export default function FleetGallery() {
  const [activeVehicle, setActiveVehicle] = useState(0)
  const [activeStage, setActiveStage] = useState(0)
  const vehicle = gallery[activeVehicle]
  const stage = vehicle.stages[activeStage] ?? vehicle.stages[0]

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 mb-4 font-heading text-sm tracking-widest text-cyan-DEFAULT border border-cyan-DEFAULT/30 rounded-full">
            FROM CAD TO REALITY
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Built &amp; <span className="text-gradient">Field-Tested</span>
          </h2>
          <p className="font-body text-metallic-DEFAULT max-w-2xl mx-auto">
            Real hardware, out of the workshop and onto the water — the same platforms shown above, built and tested.
          </p>
        </motion.div>

        {/* Vehicle selector tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
          {gallery.map((v, index) => {
            const Icon = v.icon
            return (
              <motion.button
                key={v.id}
                onClick={() => { setActiveVehicle(index); setActiveStage(0) }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-4 rounded-xl transition-all duration-300 ${activeVehicle === index
                  ? 'bg-gradient-to-r from-cyan-DEFAULT to-ocean-DEFAULT text-navy-DEFAULT glow-cyan'
                  : 'glass border border-ocean-DEFAULT/30 text-metallic-DEFAULT hover:border-cyan-DEFAULT/50'
                  }`}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                <div className="text-left">
                  <div className="font-heading text-sm sm:text-base font-bold">{v.name.split(' ')[1]}</div>
                  <div className="text-xs opacity-80 hidden sm:block">{v.subtitle}</div>
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Stage selector - only shown when a vehicle has more than one build */}
        {vehicle.stages.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {vehicle.stages.map((s, index) => (
              <button
                key={s.name}
                onClick={() => setActiveStage(index)}
                className={`px-4 py-1.5 rounded-full text-sm font-body transition-all duration-300 border ${activeStage === index
                  ? 'border-cyan-DEFAULT text-cyan-DEFAULT bg-cyan-DEFAULT/10'
                  : 'border-white/10 text-metallic-DEFAULT hover:border-white/30'
                  }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        )}

        {/* Photo showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${vehicle.id}-${stage.name}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-center"
          >
            {/* Left - Photo */}
            <div className="relative h-[320px] sm:h-[440px] lg:h-[520px] w-full">
              <div className="relative h-full glass rounded-2xl border border-ocean-DEFAULT/30 overflow-hidden">
                <Image
                  src={stage.image}
                  alt={`${vehicle.name} — ${stage.name}`}
                  fill
                  className={stage.fit === 'contain' ? 'object-contain bg-navy-DEFAULT' : 'object-cover'}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute bottom-4 right-4 pointer-events-none z-10">
                  <div className="px-3 py-1 glass rounded-full border border-white/10 text-xs font-mono text-white/50">
                    REAL HARDWARE
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Caption */}
            <div className="space-y-6">
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                {vehicle.name}
              </h3>
              <p className="font-body text-lg text-metallic-DEFAULT leading-relaxed">
                {stage.caption}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
