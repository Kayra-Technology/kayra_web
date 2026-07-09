'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage, Float, Environment, PerspectiveCamera } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { USVModel, UAVModel, ROVModel, CUSVModel, RocketModel } from './VehicleModels'

// Pause the render loop while the canvas is scrolled out of view — the scene
// animates continuously (autoRotate/Float/Bloom), which otherwise burns GPU
// for something nobody sees.
function useInViewport<T extends HTMLElement>(ref: React.RefObject<T>) {
    const [inView, setInView] = useState(true)
    useEffect(() => {
        if (!ref.current) return
        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { rootMargin: '100px' }
        )
        observer.observe(ref.current)
        return () => observer.disconnect()
    }, [ref])
    return inView
}

interface ModelViewerProps {
    vehicleId: 'usv' | 'uav' | 'rov' | 'cusv' | 'rocket' | 'torpedo';
}

// Loading placeholder component
function LoadingPlaceholder() {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-200/70">
            <div className="text-center">
                <div className="w-12 h-12 border-2 border-cyan-DEFAULT border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-sm text-navy-700 font-mono">Loading 3D Model...</p>
            </div>
        </div>
    )
}

export default function ModelViewer({ vehicleId }: ModelViewerProps) {
    const [isLoaded, setIsLoaded] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const inView = useInViewport(containerRef)

    return (
        <div ref={containerRef} className="w-full h-full min-h-[400px] relative">
            {/* Loading state */}
            {!isLoaded && <LoadingPlaceholder />}

            <Canvas
                shadows
                dpr={[1, 1.5]}
                frameloop={inView ? 'always' : 'never'}
                camera={{ position: [8, 4, 12], fov: 40 }}
                gl={{ alpha: false, antialias: false, powerPreference: 'high-performance' }}
                onCreated={() => setIsLoaded(true)}
            >
                {/* Whitish-gray backdrop — max contrast for model silhouettes, doesn't touch vehicle materials */}
                <color attach="background" args={['#E5E7EB']} />

                <Suspense fallback={null}>
                    {/* HDRI Environment for realistic reflections — the same "city"
                        HDR drei would fetch, self-hosted instead of the githack CDN */}
                    <Environment files="/hdri/city.hdr" />

                    {/* Floating animation for aliveness */}
                    <Float
                        speed={2}
                        rotationIntensity={0.5}
                        floatIntensity={0.5}
                        floatingRange={[-0.1, 0.1]}
                    >
                        {/* Stage handles lighting and centering automatically */}
                        <Stage environment={null} intensity={0.5}>
                            {vehicleId === 'usv' && <USVModel />}
                            {vehicleId === 'uav' && <UAVModel />}
                            {vehicleId === 'rov' && <ROVModel />}
                            {vehicleId === 'cusv' && <CUSVModel />}
                            {vehicleId === 'rocket' && <RocketModel />}
                            {/* Representative visual — actual torpedo model TBD */}
                            {vehicleId === 'torpedo' && <RocketModel />}
                        </Stage>
                    </Float>

                    {/* Additional dramatic lighting */}
                    <pointLight position={[10, 10, 10]} intensity={1.5} color="#00F0FF" distance={20} />
                    <pointLight position={[-10, -5, -10]} intensity={1} color="#EAB308" distance={20} />
                    <ambientLight intensity={0.6} />

                    {/* Post-Processing Effects - Simplified for performance */}
                    <EffectComposer>
                        <Bloom luminanceThreshold={1} mipmapBlur intensity={1.2} radius={0.5} />
                        <Vignette eskil={false} offset={0.1} darkness={0.15} />
                    </EffectComposer>

                    {/* OrbitControls inside Suspense for proper initialization */}
                    <OrbitControls
                        autoRotate
                        autoRotateSpeed={0.5}
                        enableZoom={false}
                        enablePan={false}
                    />
                </Suspense>
            </Canvas>
        </div>
    )
}
