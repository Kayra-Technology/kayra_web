'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Waves, Plane, Anchor, Satellite, Server, Rocket } from 'lucide-react'

/* Node layout: C-USV is the hub at dead center, SATCOM directly above it,
   UAV top-left, Ground Control mid-left, ROV and TORPEDO on the bottom row.
   Positions are chosen so no connection line passes over another node or
   crosses another line. */
const ecosystemNodes = [
  {
    id: 'satellite',
    icon: Satellite,
    label: 'SATCOM',
    position: { x: '50%', y: '8%' },
    color: 'text-purple-400',
    description: 'Satellite uplink for beyond-line-of-sight C-USV missions',
  },
  {
    id: 'uav',
    icon: Plane,
    label: 'UAV',
    position: { x: '26%', y: '14%' },
    color: 'text-cyan-400',
    description: 'Aerial reconnaissance — MAVLink telemetry, 2+ km custom RC link',
  },
  {
    id: 'cusv',
    icon: Waves,
    label: 'C-USV',
    position: { x: '50%', y: '46%' },
    color: 'text-blue-400',
    description: 'Catamaran command node — 22h+ endurance, SAT + 40 km reach',
  },
  {
    id: 'rov',
    icon: Anchor,
    label: 'ROV',
    position: { x: '38%', y: '80%' },
    color: 'text-yellow-400',
    description: 'Subsea inspection — 50 m tethered low-latency Ethernet link',
  },
  {
    id: 'torpedo',
    icon: Rocket,
    label: 'TORPEDO · DEV',
    position: { x: '64%', y: '80%' },
    color: 'text-teal-400',
    description: 'Fiber-optic guided subsurface platform — in development',
  },
  {
    id: 'gcs',
    icon: Server,
    label: 'Ground Control',
    position: { x: '26%', y: '48%' },
    color: 'text-green-400',
    description: 'Shore station — mission planning, live monitoring and emergency stop',
  },
]

const connections = [
  { from: 'satellite', to: 'cusv' },
  { from: 'gcs', to: 'cusv' },
  { from: 'gcs', to: 'uav' },
  { from: 'cusv', to: 'rov' },
  { from: 'cusv', to: 'torpedo' },
]

export default function AutonomousEcosystem() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  return (
    <section className="relative py-16 sm:py-32 overflow-hidden">
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-20"
        >
          {/* drop-shadow lives on the h2, not the gradient span — a filter on the
              same element as background-clip:text makes the text invisible in Chromium */}
          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-black text-white mb-4 sm:mb-6 tracking-tight [filter:drop-shadow(0_2px_10px_rgba(0,0,0,0.6))]">
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">HIVE MIND</span>
          </h2>
          <p className="font-body text-base sm:text-xl text-slate-400 max-w-2xl mx-auto px-4">
            One integrated fleet — air, surface and subsurface platforms sharing a single command network.
          </p>
        </motion.div>

        {/* 3D Holographic Map Container - Hidden on mobile, simplified */}
        <div ref={ref} className="relative h-[300px] sm:h-[600px] perspective-1000 hidden sm:block">
          {/* Tilted Plane */}
          <motion.div
            initial={{ rotateX: 45, scale: 0.8, opacity: 0 }}
            animate={isInView ? { rotateX: 25, scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative w-full h-full transform-style-3d bg-navy-900/30 border border-cyan-500/20 rounded-[2.5rem] shadow-[0_0_100px_rgba(0,240,255,0.1)] backdrop-blur-sm"
          >
            {/* Radar visual — kept circular in its own centered box so it doesn't
                stretch into a stadium shape and clip nodes near the container edges */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-[90%] aspect-square max-h-full rounded-full overflow-hidden">
                {/* Radar Scan Effect */}
                <div className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(0,240,255,0.15)_60deg,transparent_60deg)] animate-[spin_4s_linear_infinite]" />

                {/* Concentric Rings */}
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/20"
                    style={{ width: `${i * 30}%`, height: `${i * 30}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {connections.map((conn, index) => {
                const fromNode = ecosystemNodes.find((n) => n.id === conn.from)
                const toNode = ecosystemNodes.find((n) => n.id === conn.to)
                if (!fromNode || !toNode) return null

                return (
                  <g key={`${conn.from}-${conn.to}`}>
                    {/* Base Line */}
                    <motion.line
                      x1={fromNode.position.x}
                      y1={fromNode.position.y}
                      x2={toNode.position.x}
                      y2={toNode.position.y}
                      stroke="url(#connectionGradient)"
                      strokeWidth="1"
                      strokeDasharray="4,4"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={isInView ? { pathLength: 1, opacity: 0.3 } : {}}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />

                    {/* Moving Data Packet */}
                    <motion.circle
                      r="3"
                      fill="#00F0FF"
                      initial={{ cx: fromNode.position.x, cy: fromNode.position.y, opacity: 0 }}
                      animate={{
                        cx: [fromNode.position.x, toNode.position.x],
                        cy: [fromNode.position.y, toNode.position.y],
                        opacity: [0, 1, 1, 0]
                      }}
                      transition={{
                        duration: 1.5 + (index % 3) * 0.4,
                        repeat: Infinity,
                        ease: "linear",
                        delay: (index % 4) * 0.5
                      }}
                    />

                    {/* Flowing Dash Animation */}
                    <motion.line
                      x1={fromNode.position.x}
                      y1={fromNode.position.y}
                      x2={toNode.position.x}
                      y2={toNode.position.y}
                      stroke="url(#connectionGradient)"
                      strokeWidth="2"
                      strokeDasharray="4,8"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 0.6 } : {}}
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="0"
                        to="-12"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </motion.line>
                  </g>
                )
              })}
              <defs>
                {/* userSpaceOnUse: default objectBoundingBox breaks on perfectly
                    vertical/horizontal lines (zero-area bbox → invisible stroke) */}
                <linearGradient id="connectionGradient" gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00F0FF" />
                  <stop offset="100%" stopColor="#0077BE" />
                </linearGradient>
              </defs>
            </svg>

            {/* Nodes */}
            {ecosystemNodes.map((node, index) => {
              const Icon = node.icon
              const isHovered = hoveredNode === node.id

              return (
                <motion.div
                  key={node.id}
                  className="absolute"
                  style={{ left: node.position.x, top: node.position.y }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <div className="relative -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                    {/* Pulse Effect */}
                    <div className={`absolute inset-0 -m-4 rounded-full bg-cyan-400/20 blur-xl transition-all duration-300 ${isHovered ? 'scale-150 opacity-100' : 'scale-100 opacity-0'}`} />

                    {/* Icon Circle */}
                    <div className={`relative w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${isHovered ? 'bg-cyan-500 border-cyan-400 shadow-[0_0_30px_rgba(0,240,255,0.5)]' : 'bg-navy-900/80 border-cyan-500/30'}`}>
                      <Icon className={`w-5 h-5 transition-colors ${isHovered ? 'text-white' : node.color}`} />
                    </div>

                    {/* Label */}
                    <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 whitespace-nowrap transition-all duration-300 ${isHovered ? 'opacity-100 transform-none' : 'opacity-60 translate-y-1'}`}>
                      <span className="font-mono text-xs font-bold text-cyan-300 bg-navy-900/80 px-2 py-1 rounded border border-cyan-500/30">
                        {node.label}
                      </span>
                    </div>

                    {/* Description Tooltip */}
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 p-3 bg-navy-800/90 backdrop-blur-md border border-cyan-500/50 rounded-lg text-center z-50"
                      >
                        <p className="text-xs text-cyan-100">{node.description}</p>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-navy-800 border-r border-b border-cyan-500/50" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
