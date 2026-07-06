'use client'

import { useRef, useMemo } from 'react'
import { useLoader } from '@react-three/fiber'
import { Center } from '@react-three/drei'
import * as THREE from 'three'
import { STLLoader } from 'three-stdlib'

// --- High-Fidelity Materials ---

const hullMaterial = new THREE.MeshStandardMaterial({
    color: '#152C55', // Lighter Navy for better visibility
    roughness: 0.3, // Smoother/Shinier surface ("parlak")
    metalness: 0.2, // Slight metallic feel
    side: THREE.DoubleSide,
    envMapIntensity: 2.0, // Catch more light/reflections
})

const deckMaterial = new THREE.MeshStandardMaterial({
    color: '#1F2937', // Dark Grey
    roughness: 0.7,
    metalness: 0.3,
})

const accentMaterial = new THREE.MeshStandardMaterial({
    color: '#00F0FF', // Cyan
    emissive: '#00F0FF',
    emissiveIntensity: 0.8,
    toneMapped: false,
})

const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: '#A5F3FC',
    roughness: 0,
    metalness: 0.1,
    transmission: 0.95,
    thickness: 0.5,
    transparent: true,
    opacity: 0.4,
    envMapIntensity: 2,
})

const metalMaterial = new THREE.MeshStandardMaterial({
    color: '#9CA3AF', // Silver/Chrome
    roughness: 0.1,
    metalness: 1.0,
})

const carbonFiberMaterial = new THREE.MeshStandardMaterial({
    color: '#111111',
    roughness: 0.4,
    metalness: 0.5,
    normalScale: new THREE.Vector2(1, 1),
})

const safetyOrangeMaterial = new THREE.MeshStandardMaterial({
    color: '#F97316',
    roughness: 0.4,
    metalness: 0.2,
})

const yellowSubMaterial = new THREE.MeshStandardMaterial({
    color: '#EAB308', // Yellow
    roughness: 0.3,
    metalness: 0.5,
})

// --- USV Model (Unmanned Surface Vehicle) - STL LOADED ---

export function USVModel(props: any) {
    const geometry = useLoader(STLLoader, '/models/usv.stl')
    const meshRef = useRef<THREE.Mesh>(null)

    // Ensure normals are computed for smooth shading
    useMemo(() => {
        if (geometry) {
            geometry.computeVertexNormals()
        }
    }, [geometry])

    return (
        <group {...props} dispose={null}>
            <Center top>
                <mesh
                    ref={meshRef}
                    geometry={geometry}
                    material={hullMaterial}
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={0.1}
                >
                </mesh>
            </Center>
            <mesh position={[0, 0.5, 0]}>
                <pointLight distance={3} intensity={2} color="#00F0FF" />
            </mesh>
        </group>
    )
}

// --- UAV Model (Unmanned Aerial Vehicle) - STL LOADED ---

export function UAVModel(props: any) {
    const geometry = useLoader(STLLoader, '/models/uav.stl')
    const meshRef = useRef<THREE.Mesh>(null)

    useMemo(() => {
        if (geometry) {
            geometry.computeVertexNormals()
        }
    }, [geometry])

    return (
        <group {...props} dispose={null}>
            <Center top>
                <mesh
                    ref={meshRef}
                    geometry={geometry}
                    material={hullMaterial}
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={0.1}
                >
                </mesh>
            </Center>
            <mesh position={[0, 0.5, 0]}>
                <pointLight distance={3} intensity={2} color="#00F0FF" />
            </mesh>
        </group>
    )
}

// --- Rocket Model - STL LOADED ---

export function RocketModel(props: any) {
    const geometry = useLoader(STLLoader, '/models/rocket.stl')
    const meshRef = useRef<THREE.Mesh>(null)

    useMemo(() => {
        if (geometry) {
            geometry.computeVertexNormals()
        }
    }, [geometry])

    return (
        <group {...props} dispose={null}>
            <Center top>
                <mesh
                    ref={meshRef}
                    geometry={geometry}
                    material={hullMaterial}
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={0.1}
                >
                </mesh>
            </Center>
            <mesh position={[0, 0.5, 0]}>
                <pointLight distance={3} intensity={2} color="#F97316" />
            </mesh>
        </group>
    )
}

// --- ROV Model (Remotely Operated Vehicle) - STL LOADED ---

export function ROVModel(props: any) {
    const geometry = useLoader(STLLoader, '/models/rov.stl')

    useMemo(() => {
        if (geometry) {
            geometry.computeVertexNormals()
        }
    }, [geometry])

    return (
        <group {...props} dispose={null}>
            <Center top>
                <mesh
                    geometry={geometry}
                    material={hullMaterial}
                    rotation={[0, 0, 0]}
                    scale={0.1}
                />
            </Center>
            <mesh position={[0, 0, 0]}>
                <pointLight distance={4} intensity={2} color="#EAB308" />
            </mesh>
        </group>
    )
}

// --- C-USV Model (Catamaran Unmanned Surface Vehicle) - STL LOADED ---

export function CUSVModel(props: any) {
    const geometry = useLoader(STLLoader, '/models/cusv.stl')
    const meshRef = useRef<THREE.Mesh>(null)

    useMemo(() => {
        if (geometry) {
            geometry.computeVertexNormals()
        }
    }, [geometry])

    return (
        <group {...props} dispose={null}>
            <Center top>
                <mesh
                    ref={meshRef}
                    geometry={geometry}
                    material={hullMaterial}
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={0.1}
                >
                </mesh>
            </Center>
            <mesh position={[0, 0.5, 0]}>
                <pointLight distance={3} intensity={2} color="#00F0FF" />
            </mesh>
        </group>
    )
}
