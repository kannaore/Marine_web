"use client";

import { Suspense, useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { useWireframeControls, type WireframeControlValues } from "@/hooks/useHeroDebugControls";

// ======================
// Types & Constants
// ======================

interface WireframeTerrainSceneProps {
    className?: string;
    onLoad?: () => void;
    scrollProgress?: number;
}

const DEFAULT_COLORS = {
    background: "#05050A",
    wireframeLow: "#C8C0E8",
    wireframeHigh: "#FFFFFF",
    wireframeGlow: "#F8F4FF",
    fogColor: "#05050A",
};

// ======================
// Device Detection Hook
// ======================

function useDeviceCapabilities(): 'high' | 'low' {
    const [quality, setQuality] = useState<'high' | 'low'>('high');

    useEffect(() => {
        const isMobile = /iPhone|iPad|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        );
        const hasLowMemory = (navigator as { deviceMemory?: number }).deviceMemory !== undefined 
            && (navigator as { deviceMemory?: number }).deviceMemory! < 4;
        const hasSlowCPU = navigator.hardwareConcurrency !== undefined 
            && navigator.hardwareConcurrency < 4;

        if (isMobile || hasLowMemory || hasSlowCPU) {
            setQuality('low');
        }
    }, []);

    return quality;
}

// ======================
// Wireframe Terrain Shader (Dynamic)
// ======================

function createWireframeShader(controls: WireframeControlValues) {
    return {
        vertexShader: `
            uniform float uTime;
            uniform float uScrollProgress;
            uniform float uWaveHeight;
            uniform float uAnimationSpeed;
            uniform float uFogNear;
            uniform float uFogFar;
            uniform float uNoiseScale;
            uniform int uNoiseOctaves;
            
            // Mouse interaction uniforms
            uniform vec3 uMouse;
            uniform float uMouseRadius;
            uniform float uMouseStrength;
            uniform float uMouseEnabled;
            
            varying vec2 vUv;
            varying float vHeight;
            varying float vFogFactor;
            varying float vRawHeight;
            varying float vMouseInfluence;
            
            // Hash function for noise
            vec3 hash3(vec3 p) {
                p = vec3(
                    dot(p, vec3(127.1, 311.7, 74.7)),
                    dot(p, vec3(269.5, 183.3, 246.1)),
                    dot(p, vec3(113.5, 271.9, 124.6))
                );
                return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
            }
            
            // Gradient noise with smoother interpolation (quintic)
            float noise(vec3 p) {
                vec3 i = floor(p);
                vec3 f = fract(p);
                // Quintic interpolation for smoother hills
                vec3 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
                
                return mix(
                    mix(
                        mix(dot(hash3(i + vec3(0,0,0)), f - vec3(0,0,0)),
                            dot(hash3(i + vec3(1,0,0)), f - vec3(1,0,0)), u.x),
                        mix(dot(hash3(i + vec3(0,1,0)), f - vec3(0,1,0)),
                            dot(hash3(i + vec3(1,1,0)), f - vec3(1,1,0)), u.x), u.y),
                    mix(
                        mix(dot(hash3(i + vec3(0,0,1)), f - vec3(0,0,1)),
                            dot(hash3(i + vec3(1,0,1)), f - vec3(1,0,1)), u.x),
                        mix(dot(hash3(i + vec3(0,1,1)), f - vec3(0,1,1)),
                            dot(hash3(i + vec3(1,1,1)), f - vec3(1,1,1)), u.x), u.y),
                    u.z
                );
            }
            
            // FBM (Fractal Brownian Motion) for terrain - dynamic octaves
            float fbm(vec3 p, int octaves) {
                float value = 0.0;
                float amplitude = 0.5;
                float frequency = 1.0;
                float maxValue = 0.0;
                
                for (int i = 0; i < 6; i++) {
                    if (i >= octaves) break;
                    value += amplitude * noise(p * frequency);
                    maxValue += amplitude;
                    amplitude *= 0.45; // Slightly reduce falloff for gentler hills
                    frequency *= 2.0;
                }
                return value / maxValue; // Normalize to [-1, 1] range
            }
            
            void main() {
                vUv = uv;
                
                vec3 pos = position;
                
                // Terrain displacement using FBM with dynamic scale
                float t = uTime * uAnimationSpeed;
                
                // Primary terrain layer - uses dynamic noiseScale for broad hills
                float terrainHeight = fbm(vec3(pos.x * uNoiseScale, pos.y * uNoiseScale, t), uNoiseOctaves);
                
                // Secondary detail layer - half the scale contribution with fewer octaves
                float detailScale = uNoiseScale * 1.5;
                int detailOctaves = max(1, uNoiseOctaves - 1);
                terrainHeight += fbm(vec3(pos.x * detailScale + 50.0, pos.y * detailScale, t * 0.5), detailOctaves) * 0.3;
                
                // Apply height displacement
                pos.z += terrainHeight * uWaveHeight;
                
                // Mouse interaction - add height bump around mouse position
                float mouseInfluence = 0.0;
                if (uMouseEnabled > 0.5) {
                    // Calculate distance from vertex to mouse position in XY plane
                    float dist = distance(pos.xy, uMouse.xy);
                    // Smooth falloff using smoothstep (inverted: 1 at center, 0 at edge)
                    mouseInfluence = smoothstep(uMouseRadius, 0.0, dist);
                    // Apply gaussian-like falloff for smoother bump
                    mouseInfluence = mouseInfluence * mouseInfluence * (3.0 - 2.0 * mouseInfluence);
                    // Add to height
                    pos.z += mouseInfluence * uMouseStrength;
                }
                
                // Pass mouse influence to fragment shader for highlighting
                vMouseInfluence = mouseInfluence;
                
                // Store raw height for fade calculation (normalized 0-1)
                // Include mouse influence so raised areas don't stay dark
                float totalHeight = terrainHeight + mouseInfluence * (uMouseStrength / uWaveHeight);
                vRawHeight = clamp((totalHeight + 1.0) * 0.5, 0.0, 1.0);
                
                // Store height for color gradient (enhanced contrast)
                vHeight = pow(vRawHeight, 0.8);
                
                // Calculate fog based on distance from camera
                vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                float fogDepth = -mvPosition.z;
                float fogNear = uFogNear + uScrollProgress * 10.0;
                float fogFar = uFogFar + uScrollProgress * 20.0;
                vFogFactor = smoothstep(fogNear, fogFar, fogDepth);
                
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            // WebGL 2.0: fwidth() is built-in, no extension needed
            precision highp float;
            
            uniform float uTime;
            uniform vec3 uColorLow;
            uniform vec3 uColorHigh;
            uniform vec3 uFogColor;
            uniform vec3 uPeakGlowColor;
            uniform float uLineWidth;
            uniform float uGlowIntensity;
            uniform float uGlowRadius;
            uniform float uScrollProgress;
            uniform float uGridDensityX;
            uniform float uGridDensityY;
            uniform float uHeightFadeStart;
            uniform float uHeightFadeEnd;
            uniform float uMouseHighlightIntensity;
            // Bathymetry color ramp (5 stops)
            uniform vec3 uBathyColor1;
            uniform vec3 uBathyColor2;
            uniform vec3 uBathyColor3;
            uniform vec3 uBathyColor4;
            uniform vec3 uBathyColor5;
            uniform float uBathyColorPower;
            
            varying vec2 vUv;
            varying float vHeight;
            varying float vFogFactor;
            varying float vRawHeight;
            varying float vMouseInfluence;
            
            // Bathymetry color ramp function - interpolates between 5 colors based on t (0-1)
            // Power curve adjusts distribution: <1 expands cool colors, >1 expands warm colors
            vec3 bathymetryColor(float t) {
                // Clamp t to valid range
                t = clamp(t, 0.0, 1.0);
                
                // Apply power curve to redistribute colors
                // power < 1: t values get pushed higher → more low-t colors (purple/blue/green)
                // power > 1: t values get pushed lower → more high-t colors (yellow/orange)
                t = pow(t, uBathyColorPower);
                
                // 5 color stops at 0.0, 0.25, 0.5, 0.75, 1.0
                if (t < 0.25) {
                    return mix(uBathyColor1, uBathyColor2, t * 4.0);
                } else if (t < 0.5) {
                    return mix(uBathyColor2, uBathyColor3, (t - 0.25) * 4.0);
                } else if (t < 0.75) {
                    return mix(uBathyColor3, uBathyColor4, (t - 0.5) * 4.0);
                } else {
                    return mix(uBathyColor4, uBathyColor5, (t - 0.75) * 4.0);
                }
            }
            
            // Anti-aliased grid line using screen-space derivatives
            float aaLine(float coord, float lineWidth) {
                // Calculate screen-space derivative for AA width
                float fw = fwidth(coord);
                float halfWidth = lineWidth * 0.5;
                
                // Distance to nearest grid line (0.0 or 1.0)
                float d0 = abs(coord);           // Distance to 0
                float d1 = abs(coord - 1.0);     // Distance to 1
                float dist = min(d0, d1);
                
                // Smooth anti-aliased edge
                return 1.0 - smoothstep(halfWidth - fw, halfWidth + fw, dist);
            }
            
            void main() {
                // Height-based fade: low areas become transparent
                float heightFade = smoothstep(uHeightFadeEnd, uHeightFadeStart, vRawHeight);
                
                // Early discard for very low areas (performance)
                if (heightFade < 0.01) discard;
                
                // Grid coordinates
                vec2 gridCoord = vUv * vec2(uGridDensityX, uGridDensityY);
                vec2 grid = fract(gridCoord);
                
                // Screen-space derivatives for anti-aliasing
                vec2 fw = fwidth(gridCoord);
                
                // Anti-aliased wireframe lines using fwidth
                float lineWidthX = uLineWidth;
                float lineWidthY = uLineWidth;
                
                // Adaptive line width based on screen-space size (prevents line breakage at steep angles)
                float adaptiveX = max(lineWidthX, fw.x * 1.5);
                float adaptiveY = max(lineWidthY, fw.y * 1.5);
                
                // Calculate AA lines
                float lineX = aaLine(grid.x, adaptiveX);
                float lineY = aaLine(grid.y, adaptiveY);
                
                // Combine lines (union)
                float wireframe = max(lineX, lineY);
                
                // Optional glow effect (softer, wider lines)
                float glowLineX = aaLine(grid.x, adaptiveX * uGlowRadius);
                float glowLineY = aaLine(grid.y, adaptiveY * uGlowRadius);
                float glow = max(glowLineX, glowLineY) * uGlowIntensity;
                
                // Height-based color gradient
                vec3 color = mix(uColorLow, uColorHigh, vHeight * 1.5);
                
                // Add glow at peaks - enhanced for higher areas
                float peakGlow = pow(vHeight, 1.5) * 0.6;
                color += uPeakGlowColor * peakGlow;
                
                // Bathymetry-style coloring for mouse-raised areas
                // Uses full color ramp based on mouse influence (0 = edge/purple, 1 = center/orange)
                if (vMouseInfluence > 0.01) {
                    vec3 bathyColor = bathymetryColor(vMouseInfluence);
                    // Blend bathymetry color with base color based on influence and intensity
                    float blendFactor = vMouseInfluence * uMouseHighlightIntensity;
                    color = mix(color, bathyColor, blendFactor);
                    // Add subtle glow/brightness boost at higher influence areas
                    color += bathyColor * blendFactor * 0.2;
                }
                
                // Combine wireframe and glow
                float combinedLine = max(wireframe, glow * 0.5);
                
                // Boost brightness based on height (peaks brighter)
                float brightnessMult = 1.2 + vHeight * 0.4;
                color *= brightnessMult;
                
                // Clamp to prevent over-saturation
                color = min(color, vec3(1.5));
                
                // Alpha based on wireframe visibility AND height fade
                float alpha = combinedLine * (1.0 - vFogFactor * 0.6) * heightFade;
                
                // Fade out based on distance (fog)
                color = mix(color, uFogColor, vFogFactor * 0.4);
                
                // Discard fully transparent fragments
                if (alpha < 0.01) discard;
                
                gl_FragColor = vec4(color, alpha);
            }
        `,
    };
}

// ======================
// Wireframe Terrain Mesh
// ======================

function WireframeTerrain({ 
    scrollProgress, 
    quality,
    controls,
}: { 
    scrollProgress: number; 
    quality: 'high' | 'low';
    controls: WireframeControlValues;
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const mousePositionRef = useRef(new THREE.Vector3(0, 0, 0));
    const raycaster = useMemo(() => new THREE.Raycaster(), []);
    const pointer = useMemo(() => new THREE.Vector2(), []);
    
    // Dynamic grid segments based on controls
    const segments = useMemo(() => {
        if (quality === 'low') {
            return [Math.floor(controls.gridDensityX / 2), Math.floor(controls.gridDensityY / 2)];
        }
        return [controls.gridDensityX, controls.gridDensityY];
    }, [quality, controls.gridDensityX, controls.gridDensityY]);
    
    const shader = useMemo(() => createWireframeShader(controls), [controls]);
    
    const shaderMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uScrollProgress: { value: 0 },
                uColorLow: { value: new THREE.Color(controls.colorLow) },
                uColorHigh: { value: new THREE.Color(controls.colorHigh) },
                uFogColor: { value: new THREE.Color(DEFAULT_COLORS.fogColor) },
                uPeakGlowColor: { value: new THREE.Color(controls.peakGlowColor) },
                uLineWidth: { value: controls.lineWidth },
                uGlowIntensity: { value: controls.glowIntensity },
                uGlowRadius: { value: controls.glowRadius },
                uWaveHeight: { value: controls.waveHeight },
                uAnimationSpeed: { value: controls.animationSpeed },
                uFogNear: { value: controls.fogNear },
                uFogFar: { value: controls.fogFar },
                uGridDensityX: { value: controls.gridDensityX },
                uGridDensityY: { value: controls.gridDensityY },
                // New terrain smoothness controls
                uNoiseScale: { value: controls.noiseScale },
                uNoiseOctaves: { value: controls.noiseOctaves },
                // Height fade controls
                uHeightFadeStart: { value: controls.heightFadeStart },
                uHeightFadeEnd: { value: controls.heightFadeEnd },
                // Mouse interaction uniforms
                uMouse: { value: new THREE.Vector3(0, 0, 0) },
                uMouseRadius: { value: controls.mouseRadius },
                uMouseStrength: { value: controls.mouseStrength },
                uMouseEnabled: { value: controls.mouseEnabled ? 1.0 : 0.0 },
                uMouseHighlightIntensity: { value: controls.mouseHighlightIntensity },
                // Bathymetry color ramp
                uBathyColor1: { value: new THREE.Color(controls.bathyColor1) },
                uBathyColor2: { value: new THREE.Color(controls.bathyColor2) },
                uBathyColor3: { value: new THREE.Color(controls.bathyColor3) },
                uBathyColor4: { value: new THREE.Color(controls.bathyColor4) },
                uBathyColor5: { value: new THREE.Color(controls.bathyColor5) },
                uBathyColorPower: { value: controls.bathyColorPower },
            },
            vertexShader: shader.vertexShader,
            fragmentShader: shader.fragmentShader,
            transparent: true,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });
    }, [shader, controls.colorLow, controls.colorHigh, controls.peakGlowColor, controls.lineWidth, controls.glowIntensity, controls.glowRadius, controls.waveHeight, controls.animationSpeed, controls.fogNear, controls.fogFar, controls.gridDensityX, controls.gridDensityY, controls.noiseScale, controls.noiseOctaves, controls.heightFadeStart, controls.heightFadeEnd, controls.mouseRadius, controls.mouseStrength, controls.mouseEnabled, controls.mouseHighlightIntensity, controls.bathyColor1, controls.bathyColor2, controls.bathyColor3, controls.bathyColor4, controls.bathyColor5, controls.bathyColorPower]);

    // Update uniforms every frame
    useFrame((state) => {
        if (shaderMaterial) {
            shaderMaterial.uniforms.uTime.value = state.clock.elapsedTime;
            shaderMaterial.uniforms.uScrollProgress.value = scrollProgress;
            
            // Update dynamic uniforms
            shaderMaterial.uniforms.uColorLow.value.set(controls.colorLow);
            shaderMaterial.uniforms.uColorHigh.value.set(controls.colorHigh);
            shaderMaterial.uniforms.uPeakGlowColor.value.set(controls.peakGlowColor);
            shaderMaterial.uniforms.uLineWidth.value = controls.lineWidth;
            shaderMaterial.uniforms.uGlowIntensity.value = controls.glowIntensity;
            shaderMaterial.uniforms.uGlowRadius.value = controls.glowRadius;
            shaderMaterial.uniforms.uWaveHeight.value = controls.waveHeight;
            shaderMaterial.uniforms.uAnimationSpeed.value = controls.animationSpeed;
            shaderMaterial.uniforms.uFogNear.value = controls.fogNear;
            shaderMaterial.uniforms.uFogFar.value = controls.fogFar;
            shaderMaterial.uniforms.uGridDensityX.value = controls.gridDensityX;
            shaderMaterial.uniforms.uGridDensityY.value = controls.gridDensityY;
            // New terrain smoothness controls
            shaderMaterial.uniforms.uNoiseScale.value = controls.noiseScale;
            shaderMaterial.uniforms.uNoiseOctaves.value = controls.noiseOctaves;
            // Height fade controls
            shaderMaterial.uniforms.uHeightFadeStart.value = controls.heightFadeStart;
            shaderMaterial.uniforms.uHeightFadeEnd.value = controls.heightFadeEnd;
            
            // Mouse interaction - try raycasting first, fallback to direct mapping
            if (controls.mouseEnabled && meshRef.current) {
                let hitPoint: THREE.Vector3 | null = null;
                
                // Try raycasting
                pointer.set(state.pointer.x, state.pointer.y);
                raycaster.setFromCamera(pointer, state.camera);
                const intersects = raycaster.intersectObject(meshRef.current, false);
                
                if (intersects.length > 0) {
                    // Get intersection point in local space of the mesh
                    hitPoint = meshRef.current.worldToLocal(intersects[0].point.clone());
                } else {
                    // Fallback: Direct screen-to-plane mapping
                    // Plane is 100x80, centered at origin in local space
                    // Camera looks down at angle, so we need to account for that
                    // Approximate mapping: screen coords to plane coords
                    const planeHalfWidth = 50;
                    const planeHalfHeight = 40;
                    
                    // Apply perspective correction (rough approximation)
                    // The plane is tilted, so Y maps more to the "depth" axis
                    const screenX = state.pointer.x * planeHalfWidth * 1.5;
                    const screenY = state.pointer.y * planeHalfHeight * 2.0 - 20; // offset for plane position
                    
                    hitPoint = new THREE.Vector3(screenX, screenY, 0);
                }
                
                if (hitPoint) {
                    // Smooth interpolation for less jittery movement
                    mousePositionRef.current.lerp(hitPoint, 0.12);
                }
                
                shaderMaterial.uniforms.uMouse.value.copy(mousePositionRef.current);
            }
            
            // Update mouse control values
            shaderMaterial.uniforms.uMouseRadius.value = controls.mouseRadius;
            shaderMaterial.uniforms.uMouseStrength.value = controls.mouseStrength;
            shaderMaterial.uniforms.uMouseEnabled.value = controls.mouseEnabled ? 1.0 : 0.0;
            shaderMaterial.uniforms.uMouseHighlightIntensity.value = controls.mouseHighlightIntensity;
            // Update bathymetry colors
            shaderMaterial.uniforms.uBathyColor1.value.set(controls.bathyColor1);
            shaderMaterial.uniforms.uBathyColor2.value.set(controls.bathyColor2);
            shaderMaterial.uniforms.uBathyColor3.value.set(controls.bathyColor3);
            shaderMaterial.uniforms.uBathyColor4.value.set(controls.bathyColor4);
            shaderMaterial.uniforms.uBathyColor5.value.set(controls.bathyColor5);
            shaderMaterial.uniforms.uBathyColorPower.value = controls.bathyColorPower;
        }
    });

    return (
        <mesh 
            ref={meshRef} 
            rotation={[-Math.PI / 2.5, 0, 0]} 
            position={[0, -12, -25]}
        >
            <planeGeometry args={[100, 80, segments[0], segments[1]]} />
            <primitive object={shaderMaterial} attach="material" />
        </mesh>
    );
}

// ======================
// Camera Controller
// ======================

function TerrainCamera({ 
    scrollProgress,
    controls,
}: { 
    scrollProgress: number;
    controls: WireframeControlValues;
}) {
    const { camera } = useThree();
    const target = useRef({ x: 0, y: 3, z: 15 });

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        
        // Use controls for camera position
        target.current.x = Math.sin(t * 0.03) * 0.4;
        target.current.y = controls.cameraY + scrollProgress * 1.5 + Math.cos(t * 0.04) * 0.2;
        target.current.z = controls.cameraZ - scrollProgress * 2;
        
        // Smooth interpolation
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, target.current.x, 0.015);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, target.current.y, 0.015);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, target.current.z, 0.015);
        
        // Look at terrain center
        camera.lookAt(0, -8 - scrollProgress * 1.5, -25);
    });

    return null;
}

// ======================
// Scene Content
// ======================

function SceneContent({ 
    scrollProgress, 
    onLoad, 
    quality,
    controls,
}: { 
    scrollProgress: number; 
    onLoad?: () => void; 
    quality: 'high' | 'low';
    controls: WireframeControlValues;
}) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onLoad?.();
        }, 300);
        return () => clearTimeout(timer);
    }, [onLoad]);

    return (
        <>
            {/* Subtle ambient lighting */}
            <ambientLight intensity={0.1} />
            <pointLight position={[0, 10, 5]} intensity={0.2} color={DEFAULT_COLORS.wireframeGlow} />
            
            {/* Wireframe terrain */}
            <WireframeTerrain scrollProgress={scrollProgress} quality={quality} controls={controls} />
            
            {/* Camera controller */}
            <TerrainCamera scrollProgress={scrollProgress} controls={controls} />
            
            {/* Atmospheric fog */}
            <fog attach="fog" args={[DEFAULT_COLORS.fogColor, controls.fogNear, controls.fogFar]} />
            
            {/* Post-processing effects */}
            <EffectComposer>
                <Bloom
                    intensity={controls.bloomIntensity}
                    luminanceThreshold={controls.bloomThreshold}
                    luminanceSmoothing={0.9}
                    mipmapBlur
                />
                <Noise opacity={controls.noiseOpacity} />
                <Vignette offset={controls.vignetteOffset} darkness={controls.vignetteDarkness} />
            </EffectComposer>
        </>
    );
}

// ======================
// Main Export
// ======================

export function WireframeTerrainScene({ 
    className, 
    onLoad, 
    scrollProgress = 0 
}: WireframeTerrainSceneProps) {
    const [hasError, setHasError] = useState(false);
    const quality = useDeviceCapabilities();
    const controls = useWireframeControls();

    if (hasError) {
        // Fallback gradient if WebGL fails
        return (
            <div
                className={className}
                style={{
                    background: `radial-gradient(ellipse at 50% 70%, ${controls.colorLow} 0%, ${DEFAULT_COLORS.background} 60%)`,
                }}
            />
        );
    }

    return (
        <div className={className}>
            <Canvas
                camera={{ position: [0, controls.cameraY, controls.cameraZ], fov: 65 }}
                gl={{
                    antialias: quality === 'high',
                    alpha: true,
                    powerPreference: quality === 'high' ? "high-performance" : "low-power",
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.0,
                }}
                style={{
                    width: "100%",
                    height: "100%",
                    background: DEFAULT_COLORS.background,
                }}
                onError={() => setHasError(true)}
            >
                <Suspense fallback={null}>
                    <SceneContent 
                        scrollProgress={scrollProgress} 
                        onLoad={onLoad} 
                        quality={quality}
                        controls={controls}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}
