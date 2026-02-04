"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stars, Float, Sphere, MeshDistortMaterial, PerspectiveCamera } from "@react-three/drei"
import * as THREE from "three"
import { motion, AnimatePresence } from "framer-motion"

function HolographicArcs({ count = 15 }) {
    const lines = useMemo(() => {
        const result = []
        for (let i = 0; i < count; i++) {
            const start = new THREE.Vector3().setFromSphericalCoords(
                2.5,
                Math.random() * Math.PI,
                Math.random() * Math.PI * 2
            )
            const end = new THREE.Vector3().setFromSphericalCoords(
                2.5,
                Math.random() * Math.PI,
                Math.random() * Math.PI * 2
            )

            const mid = start.clone().lerp(end, 0.5).normalize().multiplyScalar(3.5)
            const curve = new THREE.QuadraticBezierCurve3(start, mid, end)
            const points = curve.getPoints(50)
            result.push(points)
        }
        return result
    }, [count])

    return (
        <group>
            {lines.map((points, i) => (
                <line key={i}>
                    <bufferGeometry attach="geometry" onUpdate={(self) => self.setFromPoints(points)} />
                    <lineBasicMaterial
                        attach="material"
                        color={i % 2 === 0 ? "#06b6d4" : "#8b5cf6"}
                        transparent
                        opacity={0.3}
                    />
                </line>
            ))}
        </group>
    )
}

function HolographicGrid() {
    const gridRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (gridRef.current) {
            gridRef.current.rotation.y += 0.001
            gridRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1
        }
    })

    const lines = useMemo(() => {
        const result = []
        const segments = 20

        for (let i = 0; i <= segments; i++) {
            const lat = (i / segments) * Math.PI - Math.PI / 2

            for (let j = 0; j <= segments; j++) {
                const lng = (j / segments) * Math.PI * 2

                const point = new THREE.Vector3().setFromSphericalCoords(
                    2.6,
                    lat,
                    lng
                )

                result.push(point)
            }
        }

        return result
    }, [])

    return (
        <group ref={gridRef}>
            <points>
                <bufferGeometry attach="geometry">
                    <bufferAttribute
                        attach="attributes-position"
                        args={[new Float32Array(lines.flatMap(p => [p.x, p.y, p.z])), 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.02}
                    color="#06b6d4"
                    transparent
                    opacity={0.4}
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </group>
    )
}

function ThreatNodes({ count = 8 }) {
    const nodes = useMemo(() => {
        const result = []
        for (let i = 0; i < count; i++) {
            const phi = Math.acos(-1 + (2 * i) / count)
            const theta = Math.sqrt(count * Math.PI) * phi
            const pos = new THREE.Vector3().setFromSphericalCoords(2.6, phi, theta)
            result.push(pos)
        }
        return result
    }, [count])

    return (
        <group>
            {nodes.map((pos, i) => (
                <Float key={i} speed={2} rotationIntensity={2} floatIntensity={1}>
                    <mesh position={pos}>
                        <octahedronGeometry args={[0.08, 0]} />
                        <meshBasicMaterial color={i % 2 === 0 ? "#ff3366" : "#06b6d4"} transparent opacity={0.6} />
                        <pointLight distance={1} intensity={2} color={i % 2 === 0 ? "#ff3366" : "#06b6d4"} />
                    </mesh>
                </Float>
            ))}
        </group>
    )
}

function ShieldAura() {
    const auraRef = useRef<THREE.Mesh>(null)
    useFrame((_state) => {
        if (auraRef.current) {
            auraRef.current.rotation.y += 0.005
            auraRef.current.rotation.z += 0.002
        }
    })

    return (
        <Sphere ref={auraRef} args={[3.2, 64, 64]}>
            <meshStandardMaterial
                name="ShieldAuraMaterial"
                color="#06b6d4"
                transparent
                opacity={0.03}
                side={THREE.BackSide}
                metalness={1}
                roughness={0}
            />
        </Sphere>
    )
}

function HolographicGlobeInner({ isActive = false }) {
    const globeRef = useRef<THREE.Group>(null)
    const ringRef = useRef<THREE.Mesh>(null)
    const coreRef = useRef<THREE.Mesh>(null)

    useFrame((_state) => {
        if (globeRef.current) {
            const speed = isActive ? 0.008 : 0.003
            globeRef.current.rotation.y += speed
        }

        if (ringRef.current) {
            ringRef.current.rotation.x = Math.PI / 2
            ringRef.current.rotation.z += 0.02
        }

        if (coreRef.current) {
            coreRef.current.rotation.x += 0.005
            coreRef.current.rotation.y += 0.006
        }
    })

    return (
        <group ref={globeRef}>
            {/* Inner Core - Technical Heart */}
            <Sphere ref={coreRef} args={[1.8, 32, 32]}>
                <meshBasicMaterial
                    color="#06b6d4"
                    wireframe={true}
                    transparent
                    opacity={0.15}
                    blending={THREE.AdditiveBlending}
                />
            </Sphere>

            {/* Main Globe - Structural Mesh */}
            <Sphere args={[2.5, 64, 64]}>
                <meshStandardMaterial
                    color="#0f172a"
                    emissive="#06b6d4"
                    wireframe={true}
                    transparent
                    opacity={0.2}
                    metalness={1}
                    roughness={0}
                />
            </Sphere>

            {/* Data Visualization Elements */}
            <HolographicGrid />
            <HolographicArcs count={20} />
            <ThreatNodes count={12} />
            <ShieldAura />

            {/* Interactive Scanning Rings */}
            <mesh ref={ringRef}>
                <torusGeometry args={[3.1, 0.015, 16, 120]} />
                <meshBasicMaterial
                    color="#8b5cf6"
                    transparent
                    opacity={0.5}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            <mesh rotation={[Math.PI / 4, 0, 0]}>
                <torusGeometry args={[2.9, 0.01, 16, 120]} />
                <meshBasicMaterial
                    color="#06b6d4"
                    transparent
                    opacity={0.4}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Vertical HUD Ring */}
            <mesh rotation={[0, Math.PI / 2, 0]}>
                <torusGeometry args={[3.3, 0.005, 16, 120]} />
                <meshBasicMaterial color="#06b6d4" transparent opacity={0.2} />
            </mesh>
        </group>
    )
}

interface HolographicGlobeProps {
    isActive?: boolean
}

export function HolographicGlobe({ isActive = false }: HolographicGlobeProps) {
    return (
        <div className="relative size-[600px] md:size-[800px] pointer-events-none select-none">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} />
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#06b6d4" />
                <pointLight position={[-10, -10, -10]} intensity={0.8} color="#8b5cf6" />
                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.8} />

                <Float speed={2} rotationIntensity={0.8} floatIntensity={0.6}>
                    <HolographicGlobeInner isActive={isActive} />
                </Float>

                {/* Holographic Projection Effect */}
                {isActive && (
                    <group>
                        <mesh rotation={[Math.PI / 2, 0, 0]}>
                            <circleGeometry args={[3.2, 64]} />
                            <meshBasicMaterial
                                color="#06b6d4"
                                transparent
                                opacity={0.08}
                                side={THREE.DoubleSide}
                            />
                        </mesh>
                    </group>
                )}
            </Canvas>
        </div>
    )
}
