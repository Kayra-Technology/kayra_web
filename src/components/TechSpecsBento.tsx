'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  Brain, Disc3, Satellite, Anchor, Zap, Eye, Shield, Gauge,
  Waves, Plane, Radio, Navigation, Camera, Battery, Cpu, Rocket, Umbrella
} from 'lucide-react'

const platformTabs = [
  { id: 'all', label: 'All Platforms', icon: Brain },
  { id: 'usv', label: 'USV', icon: Waves },
  { id: 'cusv', label: 'C-USV', icon: Waves },
  { id: 'uav', label: 'UAV', icon: Plane },
  { id: 'rov', label: 'ROV', icon: Anchor },
  { id: 'rocket', label: 'Rocket', icon: Rocket },
]

const techSpecs = [
  {
    title: 'Edge AI Computing',
    icon: Brain,
    detail: 'Jetson Orin Nano Super running ROS 2 for onboard autonomy — real-time point cloud processing and YOLO-based computer vision at the edge.',
    stats: { label: 'Compute', value: 'Jetson Orin' },
    size: 'large',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    platforms: ['all', 'usv', 'cusv'],
  },
  {
    title: 'Navigation & State Estimation',
    icon: Navigation,
    detail: 'EKF-based sensor fusion integrating GNSS, IMU and 3D LiDAR for precise positioning and drift compensation in dynamic sea states.',
    stats: { label: 'Fusion', value: 'EKF' },
    size: 'large',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    platforms: ['all', 'usv', 'cusv'],
  },
  {
    title: 'Perception Suite',
    icon: Eye,
    detail: '3D LiDAR and stereo camera fused for 360° obstacle detection, target tracking and real-time environment mapping.',
    stats: { label: 'Coverage', value: '360°' },
    size: 'large',
    gradient: 'from-teal-500/20 to-cyan-500/20',
    platforms: ['all', 'usv', 'cusv'],
  },
  {
    title: 'Open Autopilot Stack',
    icon: Gauge,
    detail: 'Cube Orange and the ArduPilot ecosystem — ArduCopter in the air, ArduSub below the surface — unified over MAVLink.',
    stats: { label: 'Ecosystem', value: 'ArduPilot' },
    size: 'medium',
    gradient: 'from-cyan-500/20 to-teal-500/20',
    platforms: ['all', 'cusv', 'uav', 'rov'],
  },
  {
    title: 'Extended Endurance',
    icon: Battery,
    detail: 'Catamaran hull and high-capacity power architecture sustaining 22+ hours of continuous autonomous operation.',
    stats: { label: 'Operation', value: '22h+' },
    size: 'medium',
    gradient: 'from-blue-500/20 to-teal-500/20',
    platforms: ['cusv'],
  },
  {
    title: 'Long-Range Command',
    icon: Satellite,
    detail: 'Satellite link plus long-range RF for beyond-line-of-sight command, control and telemetry.',
    stats: { label: 'Range', value: 'SAT + 40km' },
    size: 'medium',
    gradient: 'from-cyan-500/10 to-blue-500/20',
    platforms: ['all', 'usv', 'cusv'],
  },
  {
    title: 'Dual Avionics Architecture',
    icon: Cpu,
    detail: 'One airframe, two configurations: an ultra-low-cost ESP32 stack, and a Gemstone companion computer running ArduCopter with ROS 2.',
    stats: { label: 'Configs', value: '2' },
    size: 'large',
    gradient: 'from-cyan-500/20 to-blue-400/20',
    platforms: ['all', 'uav'],
  },
  {
    title: 'Custom RC & Telemetry',
    icon: Radio,
    detail: 'Custom-built RC controller with 2+ km control range; Wi-Fi/BLE or MAVLink telemetry depending on configuration.',
    stats: { label: 'Range', value: '2+ km' },
    size: 'medium',
    gradient: 'from-blue-400/20 to-cyan-500/20',
    platforms: ['uav'],
  },
  {
    title: 'Aerial Vision',
    icon: Camera,
    detail: 'ArduCam2 camera with AI-ready onboard processing for aerial imaging.',
    stats: { label: 'Camera', value: 'ArduCam2' },
    size: 'small',
    gradient: 'from-cyan-500/15 to-transparent',
    platforms: ['uav'],
  },
  {
    title: 'Vectored Propulsion',
    icon: Disc3,
    detail: '6-thruster vectored layout delivering full 6-DOF maneuvering and precise station-keeping.',
    stats: { label: 'DOF', value: '6' },
    size: 'medium',
    gradient: 'from-yellow-500/20 to-orange-500/20',
    platforms: ['all', 'rov'],
  },
  {
    title: 'Subsea Sensing',
    icon: Waves,
    detail: 'Integrated depth & pressure sensor with MPU6050 6-axis IMU for attitude and depth hold.',
    stats: { label: 'IMU', value: '6-Axis' },
    size: 'medium',
    gradient: 'from-yellow-500/15 to-cyan-500/15',
    platforms: ['rov'],
  },
  {
    title: 'Tethered Data Link',
    icon: Zap,
    detail: '50 m RJ45 tether with low-latency Ethernet video streaming to the surface station.',
    stats: { label: 'Tether', value: '50 m' },
    size: 'small',
    gradient: 'from-orange-500/15 to-yellow-500/10',
    platforms: ['rov'],
  },
  {
    title: 'Mission Endurance',
    icon: Battery,
    detail: '4S6P Li-Ion battery pack powering 6+ hour underwater missions.',
    stats: { label: 'Runtime', value: '6h+' },
    size: 'small',
    gradient: 'from-yellow-500/15 to-transparent',
    platforms: ['rov'],
  },
  {
    title: 'Safety Systems',
    icon: Shield,
    detail: 'Remote emergency shutdown and watertight flanged O-ring sealing for fail-safe operation.',
    stats: { label: 'Safety', value: 'E-Stop' },
    size: 'small',
    gradient: 'from-cyan-500/10 to-blue-500/15',
    platforms: ['all', 'rov'],
  },
  {
    title: 'Aerodynamic Optimization',
    icon: Rocket,
    detail: '½ power nose cone with a 2.8 fineness ratio and clipped delta balsa fins — tuned for minimum drag across the flight speed profile.',
    stats: { label: 'Drag Coeff.', value: '1.165' },
    size: 'large',
    gradient: 'from-orange-500/20 to-red-500/20',
    platforms: ['all', 'rocket'],
  },
  {
    title: 'Passive Stability',
    icon: Gauge,
    detail: '2.41 caliber stability margin between center of gravity and center of pressure — straight, predictable flight.',
    stats: { label: 'Margin', value: '2.41' },
    size: 'medium',
    gradient: 'from-red-500/15 to-orange-500/20',
    platforms: ['rocket'],
  },
  {
    title: 'Recovery System',
    icon: Umbrella,
    detail: 'Polyethylene parachute descent with a safe 6.63 m/s touchdown — fully recoverable and re-flyable.',
    stats: { label: 'Touchdown', value: '6.63 m/s' },
    size: 'medium',
    gradient: 'from-orange-500/15 to-yellow-500/15',
    platforms: ['rocket'],
  },
  {
    title: 'Next: Fiber-Optic Torpedo',
    icon: Anchor,
    detail: 'In development — fiber-optic guided subsurface platform targeting 100+ km range and 500+ m depth.',
    stats: { label: 'Status', value: 'In Dev' },
    size: 'small',
    gradient: 'from-teal-500/20 to-cyan-500/15',
    platforms: ['all'],
  },
]

export default function TechSpecsBento() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeTab, setActiveTab] = useState('all')

  const filteredSpecs = techSpecs.filter((spec) => spec.platforms.includes(activeTab))

  return (
    <section id="technology" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark to-[#0B1C3E]" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 mb-4 font-heading text-sm tracking-widest text-[#00F0FF] border border-[#00F0FF]/30 rounded-full">
            TECHNOLOGY
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Engineering <span className="text-gradient">Excellence</span>
          </h2>
          <p className="font-body text-slate-300 max-w-2xl mx-auto">
            Proven, field-tested systems engineered across air, surface, and underwater domains.
          </p>
        </motion.div>

        {/* Platform tabs */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {platformTabs.map((tab) => {
            const Icon = tab.icon
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#00F0FF] to-[#0077BE] text-[#0B1C3E]'
                  : 'glass border border-[#0077BE]/30 text-slate-300 hover:border-[#00F0FF]/50'
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-heading text-sm font-semibold">{tab.label}</span>
              </motion.button>
            )
          })}
        </div>

        {/* Bento Grid */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {filteredSpecs.map((spec, index) => {
            const Icon = spec.icon
            const colSpan =
              spec.size === 'large'
                ? 'col-span-2'
                : spec.size === 'medium'
                  ? 'col-span-2 md:col-span-1'
                  : 'col-span-1'

            return (
              <motion.div
                key={spec.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: 'easeOut',
                }}
                className={`${colSpan} group`}
              >
                <div
                  className={`relative h-full p-6 rounded-xl glass border border-[#0077BE]/20 hover:border-[#00F0FF]/50 transition-all duration-500 overflow-hidden cursor-pointer`}
                >
                  {/* Gradient background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${spec.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  {/* Animated corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      className="absolute -top-10 -right-10 w-20 h-20 border border-[#00F0FF]/20 rounded-full"
                    />
                  </div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-[#00F0FF]/20 to-[#0077BE]/20 border border-[#00F0FF]/30"
                    >
                      <Icon className="w-6 h-6 text-[#00F0FF]" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="font-heading text-xl font-semibold text-white mb-2 group-hover:text-[#00F0FF] transition-colors">
                      {spec.title}
                    </h3>

                    {/* Description */}
                    <p className="font-body text-sm text-slate-300 mb-4 leading-relaxed">
                      {spec.detail}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#0077BE]/20">
                      <span className="font-body text-xs text-slate-400 uppercase tracking-wider">
                        {spec.stats.label}
                      </span>
                      <span className="font-heading text-lg font-bold text-[#00F0FF]">
                        {spec.stats.value}
                      </span>
                    </div>
                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-[#00F0FF]/10 blur-3xl" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
