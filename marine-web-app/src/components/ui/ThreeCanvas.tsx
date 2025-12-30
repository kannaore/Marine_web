"use client";

import { useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
    OrbitControls,
    PerspectiveCamera,
    Environment,
    Float,
    MeshDistortMaterial,
    Sphere,
    Torus,
    Box,
} from "@react-three/drei";

// Ocean-themed 3D Scene
function OceanScene() {
    return (
        <>
            {/* Main floating sphere - represents ocean/water */}
            <Float
                speed={2}
                rotationIntensity={0.5}
                floatIntensity={1}
                floatingRange={[-0.2, 0.2]}
            >
                <Sphere args={[1, 64, 64]} position={[0, 0, 0]}>
                    <MeshDistortMaterial
                        color="#0066cc"
                        attach="material"
                        distort={0.4}
                        speed={2}
                        roughness={0.2}
                        metalness={0.8}
                    />
                </Sphere>
            </Float>

            {/* Decorative torus - represents waves */}
            <Float
                speed={1.5}
                rotationIntensity={1}
                floatIntensity={0.5}
            >
                <Torus args={[1.8, 0.1, 16, 100]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshStandardMaterial
                        color="#00a8e8"
                        transparent
                        opacity={0.6}
                        metalness={0.5}
                        roughness={0.3}
                    />
                </Torus>
            </Float>

            {/* Secondary torus */}
            <Float
                speed={1}
                rotationIntensity={0.8}
                floatIntensity={0.3}
            >
                <Torus args={[2.2, 0.05, 16, 100]} position={[0, 0, 0]} rotation={[Math.PI / 2.5, 0.2, 0]}>
                    <meshStandardMaterial
                        color="#003d5b"
                        transparent
                        opacity={0.4}
                        metalness={0.3}
                        roughness={0.5}
                    />
                </Torus>
            </Float>
        </>
    );
}

// Geometric abstract scene for modern feel
function GeometricScene() {
    return (
        <>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
                <Box args={[1, 1, 1]} position={[-1.5, 0, 0]} rotation={[0.5, 0.5, 0]}>
                    <meshStandardMaterial
                        color="#0066cc"
                        metalness={0.9}
                        roughness={0.1}
                    />
                </Box>
            </Float>

            <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1}>
                <Sphere args={[0.7, 32, 32]} position={[1.5, 0.5, 0]}>
                    <MeshDistortMaterial
                        color="#00a8e8"
                        distort={0.3}
                        speed={3}
                        metalness={0.8}
                        roughness={0.2}
                    />
                </Sphere>
            </Float>

            <Float speed={1} rotationIntensity={0.7} floatIntensity={0.5}>
                <Torus args={[0.8, 0.3, 16, 50]} position={[0, -0.5, 1]} rotation={[Math.PI / 3, 0, 0]}>
                    <meshStandardMaterial
                        color="#003d5b"
                        metalness={0.7}
                        roughness={0.3}
                    />
                </Torus>
            </Float>
        </>
    );
}

// Loading fallback
function Loader() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-transparent">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
    );
}

interface ThreeCanvasProps {
    scene?: "ocean" | "geometric";
    className?: string;
    enableControls?: boolean;
}

export function ThreeCanvas({
    scene = "ocean",
    className = "",
    enableControls = false,
}: ThreeCanvasProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={containerRef}
            className={`w-full h-full min-h-[300px] ${className}`}
        >
            <Suspense fallback={<Loader />}>
                <Canvas
                    dpr={[1, 2]}
                    gl={{ antialias: true, alpha: true }}
                    style={{ background: "transparent" }}
                >
                    <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />

                    {/* Lighting */}
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <pointLight position={[-10, -10, -5]} intensity={0.5} color="#00a8e8" />

                    {/* Environment for reflections */}
                    <Environment preset="city" />

                    {/* Scene selection */}
                    {scene === "ocean" ? <OceanScene /> : <GeometricScene />}

                    {/* Optional controls for debugging */}
                    {enableControls && (
                        <OrbitControls
                            enableZoom={false}
                            enablePan={false}
                            autoRotate
                            autoRotateSpeed={0.5}
                        />
                    )}
                </Canvas>
            </Suspense>
        </div>
    );
}
