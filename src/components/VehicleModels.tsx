'use client'

import { useRef, useMemo } from 'react'
import { Center, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

/* Models ship as Draco-compressed GLBs converted from the original CAD STLs —
   same geometry (welded, positions only), ~40x smaller than the STLs they
   replace. The Draco decoder is self-hosted under /draco/ so no third-party
   CDN is involved. Extracts the first mesh's geometry in world space, so it
   behaves exactly like the old STLLoader result. */
const IDENTITY_MATRIX = new THREE.Matrix4()

function useModelGeometry(path: string): THREE.BufferGeometry {
    const { scene } = useGLTF(path, '/draco/')
    return useMemo(() => {
        let found: THREE.BufferGeometry | undefined
        scene.updateMatrixWorld(true)
        scene.traverse((child) => {
            const mesh = child as THREE.Mesh
            if (!found && mesh.isMesh) {
                if (mesh.matrixWorld.equals(IDENTITY_MATRIX)) {
                    found = mesh.geometry as THREE.BufferGeometry
                } else {
                    found = (mesh.geometry as THREE.BufferGeometry).clone()
                    found.applyMatrix4(mesh.matrixWorld)
                }
            }
        })
        if (!found) throw new Error(`No mesh found in ${path}`)
        return found
    }, [scene, path])
}

// --- High-Fidelity Materials ---

const hullMaterial = new THREE.MeshStandardMaterial({
    color: '#152C55', // Lighter Navy for better visibility
    roughness: 0.3, // Smoother/Shinier surface ("parlak")
    metalness: 0.2, // Slight metallic feel
    side: THREE.DoubleSide,
    envMapIntensity: 2.0, // Catch more light/reflections
    // GLBs carry no normals; flat shading recreates the exact faceted look the
    // non-indexed STLs had (per-face normals) while keeping files small
    flatShading: true,
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
    const geometry = useModelGeometry('/models/usv.glb')
    const meshRef = useRef<THREE.Mesh>(null)

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
    const geometry = useModelGeometry('/models/uav.glb')
    const meshRef = useRef<THREE.Mesh>(null)

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
    const geometry = useModelGeometry('/models/rocket.glb')
    const meshRef = useRef<THREE.Mesh>(null)

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
    const geometry = useModelGeometry('/models/rov.glb')

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
    const geometry = useModelGeometry('/models/cusv.glb')
    const meshRef = useRef<THREE.Mesh>(null)

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
