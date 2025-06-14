"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Pause, Play, ChevronLeft, ChevronRight } from "lucide-react"
import {
    SiReact, SiNextdotjs, SiVuedotjs, SiAngular, SiSvelte, SiTypescript, SiTailwindcss, SiFramer,
    SiNodedotjs, SiExpress, SiPython, SiDjango, SiRubyonrails, SiPhp, SiGraphql,
    SiFlutter, SiSwift, SiKotlin, SiIonic, SiExpo, SiAndroid, SiApple,
    SiMongodb, SiPostgresql, SiMysql, SiFirebase, SiSupabase, SiRedis, SiPrisma, SiAmazondynamodb,
    SiDocker, SiKubernetes, SiAmazon, SiVercel, SiGithubactions, SiTerraform, SiNetlify, SiCircleci
} from "react-icons/si"
import { FaJava } from "react-icons/fa"

interface TechCategory {
    name: string
    color: string
    technologies: Technology[]
}

interface Technology {
    name: string
    icon: React.ComponentType<{ className?: string }>
}

const TechStack: React.FC = () => {
    const [isPaused, setIsPaused] = useState(false)
    const [activeCategory, setActiveCategory] = useState(0)
    const carouselRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)

    const categories: TechCategory[] = [
        {
            name: "Frontend",
            color: "from-purple-600 to-blue-600",
            technologies: [
                { name: "React", icon: SiReact },
                { name: "Next.js", icon: SiNextdotjs },
                { name: "Vue", icon: SiVuedotjs },
                { name: "Angular", icon: SiAngular },
                { name: "Svelte", icon: SiSvelte },
                { name: "TypeScript", icon: SiTypescript },
                { name: "Tailwind CSS", icon: SiTailwindcss },
                { name: "Framer Motion", icon: SiFramer },
            ],
        },
        {
            name: "Backend",
            color: "from-blue-600 to-indigo-600",
            technologies: [
                { name: "Node.js", icon: SiNodedotjs },
                { name: "Express", icon: SiExpress },
                { name: "Python", icon: SiPython },
                { name: "Django", icon: SiDjango },
                { name: "Ruby on Rails", icon: SiRubyonrails },
                { name: "PHP", icon: SiPhp },
                { name: "Java", icon: FaJava },
                { name: "GraphQL", icon: SiGraphql },
            ],
        },
        {
            name: "Mobile",
            color: "from-indigo-600 to-purple-600",
            technologies: [
                { name: "React Native", icon: SiReact },
                { name: "Flutter", icon: SiFlutter },
                { name: "Swift", icon: SiSwift },
                { name: "Kotlin", icon: SiKotlin },
                { name: "Ionic", icon: SiIonic },
                { name: "Expo", icon: SiExpo },
                { name: "Android", icon: SiAndroid },
                { name: "iOS", icon: SiApple },
            ],
        },
        {
            name: "Database",
            color: "from-purple-500 to-blue-500",
            technologies: [
                { name: "MongoDB", icon: SiMongodb },
                { name: "PostgreSQL", icon: SiPostgresql },
                { name: "MySQL", icon: SiMysql },
                { name: "Firebase", icon: SiFirebase },
                { name: "Supabase", icon: SiSupabase },
                { name: "Redis", icon: SiRedis },
                { name: "Prisma", icon: SiPrisma },
                { name: "DynamoDB", icon: SiAmazondynamodb },
            ],
        },
        {
            name: "DevOps",
            color: "from-blue-500 to-indigo-500",
            technologies: [
                { name: "Docker", icon: SiDocker },
                { name: "Kubernetes", icon: SiKubernetes },
                { name: "AWS", icon: SiAmazon },
                { name: "Vercel", icon: SiVercel },
                { name: "GitHub Actions", icon: SiGithubactions },
                { name: "Terraform", icon: SiTerraform },
                { name: "Netlify", icon: SiNetlify },
                { name: "CircleCI", icon: SiCircleci },
            ],
        },
    ]

    // Auto-scroll effect
    useEffect(() => {
        let animationId: number
        const carousel = carouselRef.current

        const scroll = () => {
            if (carousel && !isPaused && !isDragging) {
                carousel.scrollLeft += 1

                // Reset to beginning when reaching the end
                if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
                    carousel.scrollLeft = 0
                }

                animationId = requestAnimationFrame(scroll)
            }
        }

        animationId = requestAnimationFrame(scroll)

        return () => {
            cancelAnimationFrame(animationId)
        }
    }, [isPaused, isDragging])

    // Mouse events for dragging
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true)
        setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0))
        setScrollLeft(carouselRef.current?.scrollLeft || 0)
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return
        e.preventDefault()
        const x = e.pageX - (carouselRef.current?.offsetLeft || 0)
        const walk = (x - startX) * 2 // Scroll speed multiplier
        if (carouselRef.current) {
            carouselRef.current.scrollLeft = scrollLeft - walk
        }
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    const handleMouseLeave = () => {
        setIsDragging(false)
    }

    // Navigation functions
    const scrollLeft100 = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollLeft -= 300
        }
    }

    const scrollRight100 = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollLeft += 300
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
                    style={{ bottom: "10%", right: "15%", transform: "translate(50%, 50%)" }}
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
                        Our{" "}
                        <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Tech Stack
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        We leverage cutting-edge technologies to build robust, scalable, and high-performance digital solutions.
                    </p>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveCategory(index)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === index
                                ? `bg-gradient-to-r ${category.color} text-white shadow-md`
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Tech Logo Carousel Container */}
                <div className="relative mb-12">
                    {/* Carousel Controls */}
                    <div className="flex justify-between items-center mb-6">
                        <h3
                            className={`text-2xl font-bold bg-gradient-to-r ${categories[activeCategory].color} bg-clip-text text-transparent`}
                        >
                            {categories[activeCategory].name} Technologies
                        </h3>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsPaused(!isPaused)}
                                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                                aria-label={isPaused ? "Play carousel" : "Pause carousel"}
                            >
                                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                            </button>

                            <div className="flex gap-2">
                                <button
                                    onClick={scrollLeft100}
                                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                                    aria-label="Scroll left"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={scrollRight100}
                                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                                    aria-label="Scroll right"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Gradient Overlays for Scroll Indication */}
                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                    {/* Carousel */}
                    <div
                        ref={carouselRef}
                        className="flex overflow-x-scroll scrollbar-hide py-8 px-4"
                        style={{ scrollBehavior: "smooth" }}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseLeave}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseOut={() => setIsPaused(false)}
                    >
                        <div className="flex gap-8 min-w-max">
                            {categories[activeCategory].technologies.map((tech, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="flex flex-col items-center justify-center w-32 h-32 bg-white rounded-xl shadow-md border border-gray-100 p-4 hover:shadow-lg transition-shadow"
                                >
                                    <div
                                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${categories[activeCategory].color} flex items-center justify-center mb-3`}
                                    >
                                        <tech.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 text-center">{tech.name}</span>
                                </motion.div>
                            ))}

                            {/* Duplicate items for infinite scroll effect */}
                            {categories[activeCategory].technologies.map((tech, index) => (
                                <motion.div
                                    key={`duplicate-${index}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: (index + categories[activeCategory].technologies.length) * 0.1 }}
                                    className="flex flex-col items-center justify-center w-32 h-32 bg-white rounded-xl shadow-md border border-gray-100 p-4 hover:shadow-lg transition-shadow"
                                >
                                    <div
                                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${categories[activeCategory].color} flex items-center justify-center mb-3`}
                                    >
                                        <tech.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 text-center">{tech.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tech Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
                    {[
                        { number: "50+", label: "Technologies" },
                        { number: "8+", label: "Years Experience" },
                        { number: "100%", label: "Project Success" },
                        { number: "24/7", label: "Technical Support" },
                    ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                                {stat.number}
                            </div>
                            <div className="text-gray-600">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Tech Expertise Statement */}
                <div className="mt-16 text-center">
                    <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 p-[2px] rounded-xl">
                        <div className="bg-white px-8 py-6 rounded-[10px]">
                            <h3 className="text-2xl font-bold mb-2">Always on the cutting edge</h3>
                            <p className="text-gray-600">
                                Our team continuously updates their skills to leverage the latest technologies and best practices,
                                ensuring your project is built with the most efficient and future-proof solutions available.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TechStack
