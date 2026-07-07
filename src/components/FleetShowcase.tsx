'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  Waves, Plane, Anchor, Rocket, ChevronRight, Gauge, Battery, Radio,
  Eye, Ruler, Weight, Timer, CircleDollarSign, Gamepad2, Umbrella, Cpu
} from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamic import for 3D viewer
const ModelViewer = dynamic(() => import('./ModelViewer'), { ssr: false })

// Hook to detect mobile devices
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  return isMobile
}

const fleet = [
  {
    id: 'usv' as const,
    name: 'KAYRA USV',
    subtitle: 'Unmanned Surface Vehicle',
    turkishName: 'İDA - İnsansız Deniz Aracı',
    icon: Waves,
    description: 'Autonomous surface vessel powered by Jetson Orin Nano Super running ROS 2 Jazzy on Ubuntu 24.04. Features 3D LiDAR, stereo camera, and AI-powered computer vision with OpenCV & YOLO.',
    color: 'from-ocean-DEFAULT to-cyan-DEFAULT',
    bgColor: 'from-ocean-DEFAULT/20 to-cyan-DEFAULT/10',
    specs: [
      { icon: Ruler, label: 'Dimensions', value: '80x24x23cm' },
      { icon: Gauge, label: 'Speed', value: '2.5 kts' },
      { icon: Timer, label: 'Operation', value: '5+ hours' },
      { icon: Weight, label: 'Payload', value: '20 kg' },
      { icon: Battery, label: 'Computer', value: 'Jetson Orin' },
      { icon: Radio, label: 'Range', value: '40+ km' },
    ],
    capabilities: [
      'Jetson Orin Nano Super',
      'ROS 2 Jazzy + Ubuntu 24.04',
      '3D LiDAR & Stereo Camera',
      'OpenCV + YOLO AI Vision',
      'Dual-Motor Propulsion',
      'Point Cloud Processing',
    ],
  },
  {
    id: 'rov' as const,
    name: 'KAYRA ROV',
    subtitle: 'Inspection Class ROV',
    turkishName: 'ROV - Uzaktan Kumandalı Sualtı Aracı',
    icon: Anchor,
    description: 'Inspection Class Remotely Operated Vehicle featuring Cast Polyamide Chassis with Acrylic Watertight Enclosure. Powered by Raspberry Pi 5 or Gemstone running ROS 2 Humble Hawksbill on Ubuntu 22.04 LTS.',
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'from-yellow-500/20 to-orange-500/10',
    specs: [
      { icon: Ruler, label: 'Dimensions', value: '440x300x220mm' },
      { icon: Gauge, label: 'Thrusters', value: '6-Vector' },
      { icon: Timer, label: 'Computer', value: 'RPi 5 / Gemstone' },
      { icon: Weight, label: 'Battery / Mission', value: '4S6P · 6h+' },
      { icon: Battery, label: 'Data Link', value: '50m RJ45' },
      { icon: Eye, label: 'Gemstone ArduSub', value: 'Coming Soon' },
    ],
    capabilities: [
      '6-Thruster Vector Configuration',
      'ROS 2 Humble Hawksbill',
      'MPU6050 IMU (6-Axis)',
      'Integrated Depth & Pressure Sensor',
      'Remote Emergency Shutdown',
      '6+ Hour Mission Endurance',
      'Gemstone-Based ArduSub (Coming Soon)',
      'Low-Latency Ethernet Streaming',
      'Custom User Interface',
      'Flanged O-Ring Sealing',
    ],
  },
  {
    id: 'cusv' as const,
    name: 'KAYRA C-USV',
    subtitle: 'Catamaran Surface Vehicle',
    turkishName: 'C-USV - Katamaran İnsansız Deniz Aracı',
    icon: Waves,
    description: 'Autonomous catamaran surface vessel powered by Jetson Orin Nano Super running ROS 2 Humble. Features 3D LiDAR, stereo camera, Cube Orange autopilot, and AI-powered computer vision with OpenCV & YOLO.',
    color: 'from-ocean-DEFAULT to-cyan-DEFAULT',
    bgColor: 'from-ocean-DEFAULT/20 to-cyan-DEFAULT/10',
    specs: [
      { icon: Ruler, label: 'Dimensions', value: '120x85x40cm' },
      { icon: Gauge, label: 'Max Speed', value: '10 kts' },
      { icon: Timer, label: 'Operation', value: '22+ hours' },
      { icon: Weight, label: 'Payload', value: '50 kg' },
      { icon: Battery, label: 'Computer', value: 'Jetson Orin' },
      { icon: Radio, label: 'Range', value: 'SAT + 40km' },
    ],
    capabilities: [
      'Jetson Orin Nano Super',
      'ROS 2 Humble',
      'Cube Orange Autopilot',
      '3D LiDAR & Stereo Camera',
      'OpenCV + YOLO AI Vision',
      'Point Cloud Processing',
    ],
    stages: [
      {
        name: 'Cube Orange',
        specs: [
          { icon: Ruler, label: 'Dimensions', value: '120x85x40cm' },
          { icon: Gauge, label: 'Max Speed', value: '10 kts' },
          { icon: Timer, label: 'Operation', value: '22+ hours' },
          { icon: Weight, label: 'Payload', value: '50 kg' },
          { icon: Battery, label: 'Computer', value: 'Jetson Orin' },
          { icon: Radio, label: 'Range', value: 'SAT + 40km' },
        ],
        capabilities: [
          'Jetson Orin Nano Super',
          'ROS 2 Humble',
          'Cube Orange Autopilot',
          '3D LiDAR & Stereo Camera',
          'OpenCV + YOLO AI Vision',
          'Point Cloud Processing',
        ],
      },
      {
        name: 'Gemstone',
        specs: [
          { icon: Timer, label: 'Computer', value: 'Coming Soon' },
          { icon: Gauge, label: 'Autopilot', value: 'Coming Soon' },
          { icon: Eye, label: 'Sensors', value: 'Coming Soon' },
          { icon: Battery, label: 'Operation', value: 'Coming Soon' },
          { icon: Radio, label: 'Telemetry', value: 'Coming Soon' },
          { icon: Cpu, label: 'Framework', value: 'Coming Soon' },
        ],
        capabilities: [
          'Coming Soon',
          'Coming Soon',
          'Coming Soon',
          'Coming Soon',
          'Coming Soon',
          'Coming Soon',
        ],
      },
    ],
  },
  {
    id: 'rocket' as const,
    name: 'KAYRA ROCKET',
    subtitle: 'Recoverable Model Rocket',
    turkishName: 'Roket - Kurtarılabilir Model Roket',
    icon: Rocket,
    description: 'Low-cost, fully recoverable model rocket developed for research and competition missions. ½ power nose cone and clipped delta fins deliver minimum drag across its flight speed profile, with a 2.41 stability margin ensuring straight, stable flight.',
    color: 'from-orange-500 to-red-500',
    bgColor: 'from-orange-500/20 to-red-500/10',
    specs: [
      { icon: CircleDollarSign, label: 'Cost', value: 'Low-Cost' },
      { icon: Ruler, label: 'Dimensions', value: '32.3×2.5 cm' },
      { icon: Rocket, label: 'Apogee', value: '500+ m' },
      { icon: Gauge, label: 'Max Speed', value: '46.1 m/s' },
      { icon: Weight, label: 'Liftoff Mass', value: '68.9 g' },
      { icon: Umbrella, label: 'Recovery', value: 'Parachute' },
    ],
    capabilities: [
      'Low-Cost Educational Design',
      'Fully Recoverable via Parachute',
      '½ Power Nose Cone — 2.8 Fineness Ratio',
      'Clipped Delta Balsa Fins',
      'Stability Margin 2.41 — Stable Flight',
      'ABS Airframe & Nose Cone',
      '19 G Max Acceleration Tolerance',
      'Safe Descent — 6.63 m/s Touchdown',
    ],
  },
  {
    id: 'uav' as const,
    name: 'KAYRA UAV',
    subtitle: 'Unmanned Aerial Vehicle',
    turkishName: 'İHA - İnsansız Hava Aracı',
    icon: Plane,
    description: 'Tactical UAV platform for extended aerial surveillance, reconnaissance, and real-time intelligence gathering. One airframe, two avionics configurations — select a stage below.',
    color: 'from-cyan-DEFAULT to-blue-400',
    bgColor: 'from-cyan-DEFAULT/20 to-blue-400/10',
    specs: [
      { icon: Ruler, label: 'Specs', value: 'Coming Soon' },
      { icon: Gauge, label: 'Speed', value: 'Coming Soon' },
      { icon: Timer, label: 'Endurance', value: 'Coming Soon' },
      { icon: Weight, label: 'Payload', value: 'Coming Soon' },
      { icon: Battery, label: 'Power', value: 'Coming Soon' },
      { icon: Radio, label: 'Range', value: 'Coming Soon' },
    ],
    capabilities: [
      'Coming Soon',
      'Coming Soon',
      'Coming Soon',
      'Coming Soon',
      'Coming Soon',
      'Coming Soon',
    ],
    stages: [
      {
        name: 'ESP32 Based',
        specs: [
          { icon: CircleDollarSign, label: 'Cost', value: 'Ultra-Low' },
          { icon: Timer, label: 'Flight Ctrl', value: 'ESP32' },
          { icon: Gamepad2, label: 'Control', value: 'Custom RC' },
          { icon: Radio, label: 'Range', value: '2+ km' },
          { icon: Gauge, label: 'Telemetry', value: 'Wi-Fi / BLE' },
          { icon: Eye, label: 'GNSS', value: 'Coming Soon' },
        ],
        capabilities: [
          'Ultra-Low-Cost Platform',
          'ESP32-Based Flight Controller',
          'Custom-Built RC Controller',
          '2+ km Control Range',
          'Wi-Fi & Bluetooth Telemetry',
          'Manual & Stabilized Flight Modes',
        ],
      },
      {
        name: 'Gemstone UAV',
        specs: [
          { icon: Timer, label: 'Computer', value: 'Gemstone' },
          { icon: Gauge, label: 'Software', value: 'ArduCopter' },
          { icon: Eye, label: 'Camera', value: 'ArduCam2' },
          { icon: Battery, label: 'Flight Time', value: '1+ hour' },
          { icon: Radio, label: 'Telemetry', value: 'MAVLink' },
          { icon: Cpu, label: 'Framework', value: 'ROS 2' },
        ],
        capabilities: [
          'Gemstone Companion Computer',
          'ArduCopter Flight Software',
          'ArduCam2 Vision Camera',
          '1+ Hour Flight Endurance',
          'MAVLink Telemetry Link',
          'Linux + ROS 2 Autonomy Stack',
          'AI-Ready Onboard Processing',
          'Autonomous Mission Execution',
        ],
      },
    ],
  },
  {
    id: 'torpedo' as const,
    name: 'KAYRA TORPEDO',
    subtitle: 'Fiber Optic Torpedo',
    turkishName: 'Fiber Optik Torpido',
    icon: Rocket,
    description: 'Next-generation fiber-optic guided torpedo platform for high-speed subsurface missions. Currently in development — figures below are design targets.',
    color: 'from-teal-400 to-cyan-500',
    bgColor: 'from-teal-500/20 to-cyan-500/10',
    specs: [
      { icon: Ruler, label: 'Target Dimensions', value: '3.5m × Ø15cm' },
      { icon: Weight, label: 'Target Hull', value: 'Aluminum Tube' },
      { icon: Anchor, label: 'Target Depth', value: '500+ m' },
      { icon: Radio, label: 'Target Range', value: '100+ km' },
      { icon: Battery, label: 'Target Power', value: 'Full LiFePO4' },
      { icon: Cpu, label: 'Target Computer', value: 'Gemstone' },
    ],
    capabilities: [
      'Fiber-Optic Guidance — 100+ km Range',
      'Aluminum Pressure Hull (Ø15 cm)',
      '500+ m Operating Depth',
      'Full LiFePO4 Power System',
      'Gemstone Powered Autonomy',
      'High-Speed Subsurface Mission Profile',
    ],
  },
]

export default function FleetShowcase() {
  const [activeVehicle, setActiveVehicle] = useState(0)
  const [activeStage, setActiveStage] = useState(0)
  const vehicle = fleet[activeVehicle]
  const stages = 'stages' in vehicle ? vehicle.stages : null
  const stage = stages ? stages[activeStage] ?? stages[0] : null
  const activeSpecs = stage ? stage.specs : vehicle.specs
  const activeCapabilities = stage ? stage.capabilities : vehicle.capabilities
  const isMobile = useIsMobile()

  return (
    <section id="fleet" className="relative py-24 overflow-hidden">
      {/* Background */}
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
            AUTONOMOUS FLEET
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Multi-Domain <span className="text-gradient">Unmanned Systems</span>
          </h2>
          <p className="font-body text-metallic-DEFAULT max-w-2xl mx-auto">
            Integrated autonomous platforms operating seamlessly across air, surface, and underwater domains.
          </p>
        </motion.div>

        {/* Vehicle selector tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
          {fleet.map((v, index) => {
            const Icon = v.icon
            return (
              <motion.button
                key={v.id}
                onClick={() => { setActiveVehicle(index); setActiveStage(0) }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-4 rounded-xl transition-all duration-300 ${activeVehicle === index
                  ? `bg-gradient-to-r ${v.color} text-navy-DEFAULT glow-cyan`
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

        {/* Vehicle showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={vehicle.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-center"
          >
            {/* Left - Visualization */}
            <div className="relative h-[280px] sm:h-[400px] lg:h-[500px] w-full">
              <div className={`absolute inset-0 bg-gradient-to-br ${vehicle.bgColor} rounded-3xl blur-3xl opacity-50`} />
              <div className="relative h-full glass rounded-2xl border border-ocean-DEFAULT/30 overflow-hidden">
                {/* 3D Model Viewer */}
                <div className="relative w-full h-full">
                  <ModelViewer vehicleId={vehicle.id} />

                  {/* Subtle label */}
                  <div className="absolute bottom-4 right-4 pointer-events-none z-10">
                    <div className="px-3 py-1 glass rounded-full border border-white/10 text-xs font-mono text-white/50">
                      INTERACTIVE 3D
                    </div>
                  </div>

                  {/* Torpedo "Coming Soon" overlay — representative visual behind */}
                  {vehicle.id === 'torpedo' && (
                    <div className="absolute inset-0 backdrop-blur-md bg-navy-900/60 flex items-center justify-center z-20">
                      <div className="text-center">
                        <span className="inline-block px-6 sm:px-8 py-3 sm:py-4 font-heading text-lg sm:text-2xl font-bold tracking-widest text-white bg-gradient-to-r from-teal-500/30 to-cyan-500/30 border-cyan-400/50 shadow-[0_0_40px_rgba(0,240,255,0.3)] border-2 rounded-lg backdrop-blur-sm">
                          COMING SOON
                        </span>
                        <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-slate-400">Geliştirme aşamasında</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right - Details */}
            <div className="space-y-8">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2 sm:mb-4">
                  <h3 className="font-heading text-xl sm:text-3xl font-bold text-white">
                    {vehicle.name}
                  </h3>

                  {/* Stage selector - same airframe, different avionics */}
                  {stages && (
                    <div className="inline-flex p-1 gap-1 glass rounded-xl border border-ocean-DEFAULT/30">
                      {stages.map((s, index) => (
                        <motion.button
                          key={s.name}
                          onClick={() => setActiveStage(index)}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className={`px-3 sm:px-4 py-1.5 rounded-lg font-heading text-xs sm:text-sm font-semibold tracking-wider transition-all duration-300 ${activeStage === index
                            ? 'bg-gradient-to-r from-[#00F0FF] to-[#0077BE] text-[#0B1C3E] shadow-lg shadow-[#00F0FF]/20'
                            : 'text-slate-400 hover:text-white'
                            }`}
                        >
                          {s.name}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
                <p className="font-body text-metallic-DEFAULT leading-relaxed">
                  {vehicle.description}
                </p>
              </div>

              {/* Specs grid */}
              <div>
                {vehicle.id === 'torpedo' && (
                  <h4 className="font-heading text-lg sm:text-2xl font-bold text-white tracking-wide mb-3 sm:mb-4">
                    Targets
                  </h4>
                )}
                <div key={`specs-${vehicle.id}-${activeStage}`} className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                {activeSpecs.map((spec) => {
                  const Icon = spec.icon
                  return (
                    <div
                      key={spec.label}
                      className="glass rounded-lg p-2 sm:p-4 border border-ocean-DEFAULT/20 text-center"
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-DEFAULT mx-auto mb-1 sm:mb-2" />
                      <div className="font-heading text-sm sm:text-lg font-bold text-white">
                        {spec.value}
                      </div>
                      <div className="font-body text-xs text-metallic-dark uppercase tracking-wider">
                        {spec.label}
                      </div>
                    </div>
                  )
                })}
                </div>
              </div>

              {/* Capabilities */}
              <div>
                <h4 className="font-heading text-sm font-semibold text-cyan-DEFAULT uppercase tracking-widest mb-4">
                  Key Capabilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {activeCapabilities.map((cap, index) => (
                    <motion.div
                      key={`${vehicle.id}-${activeStage}-${index}-${cap}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <ChevronRight className="w-4 h-4 text-cyan-DEFAULT flex-shrink-0" />
                      <span className="font-body text-sm text-metallic-DEFAULT">{cap}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
