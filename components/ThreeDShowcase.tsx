"use client"

import React from "react"
import { Suspense, useState, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import {
    OrbitControls,
    Environment,
    PerspectiveCamera,
    Box,
    Sphere,
    Plane,
    MeshDistortMaterial,
    Float,
    Html,
    useProgress,
} from "@react-three/drei"
import { motion } from "framer-motion"
import type * as THREE from "three"
import { Play, Pause, Maximize2, Minimize2, Palette, Settings, Eye, Code, Cuboid, Sparkles } from "lucide-react"

interface Demo3D {
    id: string
    title: string
    description: string
    category: string
    component: React.ComponentType<any>
    controls: string[]
    technologies: string[]
    complexity: "Beginner" | "Intermediate" | "Advanced"
}

// Loading component
function Loader() {
    const { progress } = useProgress()
    return (
        <Html center>
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
                <div className="text-gray-600 font-medium">{Math.round(progress)}% loaded</div>
            </div>
        </Html>
    )
}

// Animated Cube Demo
function AnimatedCube({ isPlaying, color }: { isPlaying: boolean; color: string }) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current && isPlaying) {
            meshRef.current.rotation.x += 0.01
            meshRef.current.rotation.y += 0.01
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5
        }
    })

    return (
        <Box ref={meshRef} args={[2, 2, 2]}>
            <meshStandardMaterial color={color} />
        </Box>
    )
}

// Product Configurator Demo
function ProductConfigurator({ color, material }: { color: string; material: string }) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005
        }
    })

    const getMaterial = () => {
        switch (material) {
            case "metal":
                return <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
            case "glass":
                return <meshPhysicalMaterial color={color} transmission={0.9} opacity={0.1} transparent />
            case "plastic":
                return <meshStandardMaterial color={color} metalness={0.1} roughness={0.8} />
            default:
                return <meshStandardMaterial color={color} />
        }
    }

    return (
        <group>
            <Sphere ref={meshRef} args={[1.5, 32, 32]}>
                {getMaterial()}
            </Sphere>
            <Plane args={[10, 10]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
                <meshStandardMaterial color="#f0f0f0" />
            </Plane>
        </group>
    )
}

// Particle System Demo
function ParticleSystem({ count }: { count: number }) {
    const points = useRef<THREE.Points>(null)
    const particlesPosition = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
        particlesPosition[i * 3] = (Math.random() - 0.5) * 10
        particlesPosition[i * 3 + 1] = (Math.random() - 0.5) * 10
        particlesPosition[i * 3 + 2] = (Math.random() - 0.5) * 10
    }

    useFrame((state) => {
        if (points.current) {
            points.current.rotation.x = state.clock.elapsedTime * 0.1
            points.current.rotation.y = state.clock.elapsedTime * 0.15
        }
    })

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[particlesPosition, 3]}
                    count={count}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial color="#8b5cf6" size={0.05} sizeAttenuation />
        </points>
    )
}

// Morphing Geometry Demo
function MorphingGeometry({ isActive }: { isActive: boolean }) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current && isActive) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
        }
    })

    return (
        <Sphere ref={meshRef} args={[1.5, 32, 32]}>
            <MeshDistortMaterial color="#3b82f6" attach="material" distort={0.5} speed={2} roughness={0.2} />
        </Sphere>
    )
}

// Interactive Environment Demo
function InteractiveEnvironment({ lightIntensity }: { lightIntensity: number }) {
    return (
        <group>
            <Float speed={1} rotationIntensity={1} floatIntensity={2}>
                <Box args={[1, 1, 1]} position={[-2, 0, 0]}>
                    <meshStandardMaterial color="#8b5cf6" />
                </Box>
            </Float>
            <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
                <Sphere args={[0.8]} position={[2, 0, 0]}>
                    <meshStandardMaterial color="#3b82f6" />
                </Sphere>
            </Float>
            <Float speed={0.8} rotationIntensity={0.5} floatIntensity={3}>
                <Box args={[0.6, 2, 0.6]} position={[0, 0, -2]}>
                    <meshStandardMaterial color="#6366f1" />
                </Box>
            </Float>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={lightIntensity} />
        </group>
    )
}

const ThreeDShowcase: React.FC = () => {
    const [activeDemo, setActiveDemo] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)
    const [isFullscreen, setIsFullscreen] = useState(false)

    // Demo-specific controls
    const [cubeColor, setCubeColor] = useState("#8b5cf6")
    const [productColor, setProductColor] = useState("#3b82f6")
    const [productMaterial, setProductMaterial] = useState("metal")
    const [particleCount, setParticleCount] = useState(1000)
    const [lightIntensity, setLightIntensity] = useState(1)

    const demos: Demo3D[] = [
        {
            id: "animated-cube",
            title: "Animated Geometry",
            description: "Interactive 3D cube with smooth animations and color customization",
            category: "Animation",
            component: AnimatedCube,
            controls: ["Play/Pause", "Color Picker", "Reset"],
            technologies: ["Three.js", "React Three Fiber", "WebGL"],
            complexity: "Beginner",
        },
        {
            id: "product-configurator",
            title: "Product Configurator",
            description: "Real-time material and color customization for 3D products",
            category: "E-commerce",
            component: ProductConfigurator,
            controls: ["Material Selector", "Color Picker", "Rotation"],
            technologies: ["Three.js", "PBR Materials", "Real-time Rendering"],
            complexity: "Intermediate",
        },
        {
            id: "particle-system",
            title: "Particle System",
            description: "Dynamic particle effects with customizable parameters",
            category: "Effects",
            component: ParticleSystem,
            controls: ["Particle Count", "Animation Speed", "Color"],
            technologies: ["Three.js", "Buffer Geometry", "Shaders"],
            complexity: "Advanced",
        },
        {
            id: "morphing-geometry",
            title: "Morphing Geometry",
            description: "Distorted materials with real-time morphing effects",
            category: "Experimental",
            component: MorphingGeometry,
            controls: ["Distortion Amount", "Speed", "Play/Pause"],
            technologies: ["Three.js", "Custom Shaders", "Noise Functions"],
            complexity: "Advanced",
        },
        {
            id: "interactive-environment",
            title: "Interactive Environment",
            description: "Floating objects with dynamic lighting and physics",
            category: "Environment",
            component: InteractiveEnvironment,
            controls: ["Light Intensity", "Object Speed", "Environment"],
            technologies: ["Three.js", "Physics", "Dynamic Lighting"],
            complexity: "Intermediate",
        },
    ]

    const currentDemo = demos[activeDemo]

    const renderDemo = () => {
        switch (currentDemo.id) {
            case "animated-cube":
                return <AnimatedCube isPlaying={isPlaying} color={cubeColor} />
            case "product-configurator":
                return <ProductConfigurator color={productColor} material={productMaterial} />
            case "particle-system":
                return <ParticleSystem count={particleCount} />
            case "morphing-geometry":
                return <MorphingGeometry isActive={isPlaying} />
            case "interactive-environment":
                return <InteractiveEnvironment lightIntensity={lightIntensity} />
            default:
                return <AnimatedCube isPlaying={isPlaying} color={cubeColor} />
        }
    }

    const renderControls = () => {
        switch (currentDemo.id) {
            case "animated-cube":
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Cube Color</label>
                            <input
                                type="color"
                                value={cubeColor}
                                onChange={(e) => setCubeColor(e.target.value)}
                                className="w-full h-10 rounded border border-gray-300"
                            />
                        </div>
                    </div>
                )
            case "product-configurator":
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Product Color</label>
                            <input
                                type="color"
                                value={productColor}
                                onChange={(e) => setProductColor(e.target.value)}
                                className="w-full h-10 rounded border border-gray-300"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Material</label>
                            <select
                                value={productMaterial}
                                onChange={(e) => setProductMaterial(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="metal">Metal</option>
                                <option value="glass">Glass</option>
                                <option value="plastic">Plastic</option>
                            </select>
                        </div>
                    </div>
                )
            case "particle-system":
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Particle Count: {particleCount}</label>
                            <input
                                type="range"
                                min="100"
                                max="5000"
                                value={particleCount}
                                onChange={(e) => setParticleCount(Number(e.target.value))}
                                className="w-full"
                            />
                        </div>
                    </div>
                )
            case "interactive-environment":
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Light Intensity: {lightIntensity.toFixed(1)}</label>
                            <input
                                type="range"
                                min="0"
                                max="3"
                                step="0.1"
                                value={lightIntensity}
                                onChange={(e) => setLightIntensity(Number(e.target.value))}
                                className="w-full"
                            />
                        </div>
                    </div>
                )
            default:
                return null
        }
    }

    const getComplexityColor = (complexity: string) => {
        switch (complexity) {
            case "Beginner":
                return "text-green-600 bg-green-100"
            case "Intermediate":
                return "text-yellow-600 bg-yellow-100"
            case "Advanced":
                return "text-red-600 bg-red-100"
            default:
                return "text-gray-600 bg-gray-100"
        }
    }

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case "Animation":
                return Sparkles
            case "E-commerce":
                return Eye
            case "Effects":
                return Cuboid
            case "Experimental":
                return Code
            case "Environment":
                return Settings
            default:
                return Cuboid
        }
    }

    return (
        <div className="py-24 bg-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute w-96 h-96 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full blur-3xl"
                    style={{ top: "20%", left: "10%", transform: "translate(-50%, -50%)" }}
                ></div>
                <div
                    className="absolute w-80 h-80 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full blur-3xl"
                    style={{ bottom: "20%", right: "15%", transform: "translate(50%, 50%)" }}
                ></div>
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
            `,
                        backgroundSize: "50px 50px",
                    }}
                ></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Interactive{" "}
                        <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            3D Experiences
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Explore our cutting-edge 3D capabilities through interactive demos. Each showcase demonstrates different
                        aspects of modern web-based 3D development.
                    </p>
                </div>

                {/* Demo Navigation */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {demos.map((demo, index) => {
                        const Icon = getCategoryIcon(demo.category)
                        return (
                            <button
                                key={demo.id}
                                onClick={() => setActiveDemo(index)}
                                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeDemo === index
                                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                <Icon className="w-4 h-4 mr-2" />
                                {demo.title}
                            </button>
                        )
                    })}
                </div>

                {/* Main Demo Area */}
                <div className="grid lg:grid-cols-3 gap-8 mb-16">
                    {/* 3D Canvas */}
                    <div className="lg:col-span-2">
                        <div className="relative bg-gray-50 rounded-2xl overflow-hidden border border-gray-200">
                            {/* Canvas Controls */}
                            <div className="absolute top-4 left-4 z-10 flex gap-2">
                                <button
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className="p-2 bg-white/90 rounded-lg shadow-md hover:bg-white transition-colors"
                                    title={isPlaying ? "Pause" : "Play"}
                                >
                                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                </button>
                                <button
                                    onClick={() => setIsFullscreen(!isFullscreen)}
                                    className="p-2 bg-white/90 rounded-lg shadow-md hover:bg-white transition-colors"
                                    title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                                >
                                    {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                                </button>
                            </div>

                            {/* 3D Canvas */}
                            <div className={`${isFullscreen ? "fixed inset-0 z-50 bg-gray-50" : "h-96 lg:h-[500px]"}`}>
                                <Canvas>
                                    <Suspense fallback={<Loader />}>
                                        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                                        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                                        <Environment preset="studio" />
                                        <ambientLight intensity={0.5} />
                                        <directionalLight position={[10, 10, 5]} intensity={1} />
                                        {renderDemo()}
                                    </Suspense>
                                </Canvas>
                            </div>
                        </div>
                    </div>

                    {/* Demo Info & Controls */}
                    <div className="space-y-6">
                        {/* Demo Information */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-gray-800">{currentDemo.title}</h3>
                                <span
                                    className={`px-2 py-1 text-xs font-medium rounded-full ${getComplexityColor(currentDemo.complexity)}`}
                                >
                                    {currentDemo.complexity}
                                </span>
                            </div>

                            <p className="text-gray-600 mb-4">{currentDemo.description}</p>

                            <div className="mb-4">
                                <h4 className="font-semibold text-gray-800 mb-2">Category</h4>
                                <div className="flex items-center">
                                    {React.createElement(getCategoryIcon(currentDemo.category), {
                                        className: "w-4 h-4 mr-2 text-purple-600",
                                    })}
                                    <span className="text-gray-700">{currentDemo.category}</span>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h4 className="font-semibold text-gray-800 mb-2">Technologies</h4>
                                <div className="flex flex-wrap gap-2">
                                    {currentDemo.technologies.map((tech, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-full"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold text-gray-800 mb-2">Available Controls</h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    {currentDemo.controls.map((control, index) => (
                                        <li key={index} className="flex items-center">
                                            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2"></div>
                                            {control}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Interactive Controls */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                            <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                                <Settings className="w-4 h-4 mr-2" />
                                Interactive Controls
                            </h4>
                            {renderControls()}
                        </div>
                    </div>
                </div>

                {/* 3D Capabilities Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {[
                        {
                            icon: Cuboid,
                            title: "3D Modeling",
                            description: "Custom 3D models and animations",
                        },
                        {
                            icon: Palette,
                            title: "Material Systems",
                            description: "PBR materials and realistic rendering",
                        },
                        {
                            icon: Eye,
                            title: "Interactive Controls",
                            description: "User-friendly 3D interactions",
                        },
                        {
                            icon: Code,
                            title: "WebGL Optimization",
                            description: "High-performance 3D on the web",
                        },
                    ].map((capability, index) => {
                        const Icon = capability.icon
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="font-semibold text-gray-800 mb-2">{capability.title}</h3>
                                <p className="text-gray-600 text-sm">{capability.description}</p>
                            </motion.div>
                        )
                    })}
                </div>

                {/* CTA Section */}
                <div className="text-center">
                    <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 p-[2px] rounded-xl">
                        <div className="bg-white px-8 py-6 rounded-[10px]">
                            <h3 className="text-2xl font-bold mb-2">Ready to bring your ideas to life in 3D?</h3>
                            <p className="text-gray-600 mb-6">
                                Let's create immersive 3D experiences that captivate your audience and set you apart from the
                                competition.
                            </p>
                            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                                Start Your 3D Project
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ThreeDShowcase
