"use client"

import type React from "react"
import { useState } from "react"
import { Code, Smartphone, Globe, Cuboid, Palette, Zap, ArrowRight, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

interface Service {
    icon: React.ComponentType<any>
    text: string
    color: string
    description: string
    features: string[]
}

const ServiceShowcase: React.FC = () => {
    const [activeService, setActiveService] = useState<number | null>(null)
    const [hoveredService, setHoveredService] = useState<number | null>(null)

    const services: Service[] = [
        {
            icon: Globe,
            text: "Websites",
            color: "text-purple-600",
            description: "Stunning, responsive websites that convert visitors into customers",
            features: [
                "SEO optimized structure",
                "Mobile-first responsive design",
                "Fast loading performance",
                "Conversion-focused layouts",
            ],
        },
        {
            icon: Code,
            text: "Web Apps",
            color: "text-blue-600",
            description: "Powerful web applications built with cutting-edge technology",
            features: [
                "Real-time data processing",
                "Secure user authentication",
                "Scalable architecture",
                "Progressive enhancement",
            ],
        },
        {
            icon: Smartphone,
            text: "Mobile Apps",
            color: "text-indigo-600",
            description: "Native iOS & Android apps that users love to engage with",
            features: ["Native performance", "Offline capabilities", "Push notifications", "App store optimization"],
        },
        {
            icon: Cuboid,
            text: "3D Experiences",
            color: "text-purple-500",
            description: "Immersive 3D websites that leave lasting impressions",
            features: [
                "WebGL optimization",
                "Interactive 3D models",
                "Physics-based animations",
                "Cross-device compatibility",
            ],
        },
        {
            icon: Palette,
            text: "UI/UX Design",
            color: "text-blue-500",
            description: "Beautiful, intuitive designs that enhance user experience",
            features: [
                "User research & testing",
                "Wireframing & prototyping",
                "Visual design systems",
                "Accessibility compliance",
            ],
        },
        {
            icon: Zap,
            text: "Software Solutions",
            color: "text-indigo-500",
            description: "Custom software tailored to your business needs",
            features: [
                "Business process automation",
                "Data analysis & reporting",
                "API integrations",
                "Cloud-based solutions",
            ],
        },
    ]

    const getGradientClass = (colorText: string) => {
        if (colorText.includes("purple")) {
            return "from-purple-100 to-purple-200"
        } else if (colorText.includes("blue")) {
            return "from-blue-100 to-blue-200"
        } else {
            return "from-indigo-100 to-indigo-200"
        }
    }

    const getStrongGradientClass = (colorText: string) => {
        if (colorText.includes("purple")) {
            return "from-purple-600 to-blue-600"
        } else if (colorText.includes("blue")) {
            return "from-blue-600 to-indigo-600"
        } else {
            return "from-indigo-600 to-purple-600"
        }
    }

    return (
        <div className="py-24 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-20">
                <div
                    className="absolute w-96 h-96 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full blur-3xl"
                    style={{ top: "30%", right: "10%", transform: "translate(50%, -50%)" }}
                ></div>
                <div
                    className="absolute w-80 h-80 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full blur-3xl"
                    style={{ bottom: "20%", left: "15%", transform: "translate(-50%, 50%)" }}
                ></div>
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `
                        linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
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
                        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Expertise
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover our comprehensive range of services designed to transform your digital presence and drive your
                        business forward.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const Icon = service.icon
                        const isActive = activeService === index
                        const isHovered = hoveredService === index

                        return (
                            <motion.div
                                key={index}
                                className={`relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 transition-all duration-300 
                                    ${isActive || isHovered ? "shadow-xl scale-105" : "shadow-md hover:shadow-lg"} 
                                    border border-blue-100 overflow-hidden group`}
                                onClick={() => setActiveService(isActive ? null : index)}
                                onMouseEnter={() => setHoveredService(index)}
                                onMouseLeave={() => setHoveredService(null)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                {/* Background Gradient */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${getGradientClass(service.color)} opacity-0 
                                    group-hover:opacity-100 transition-opacity duration-500 -z-10`}
                                ></div>

                                {/* Service Icon */}
                                <div className={`mb-6 relative`}>
                                    <div
                                        className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getStrongGradientClass(service.color)} 
                                        flex items-center justify-center shadow-lg transform transition-transform duration-500
                                        ${isActive || isHovered ? "scale-110" : ""}`}
                                    >
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>

                                    {/* Decorative Elements */}
                                    <div
                                        className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-blue-200 to-indigo-200 
                                        -top-2 -right-2 opacity-50 blur-sm"
                                    ></div>
                                    <div
                                        className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-indigo-200 to-purple-200 
                                        bottom-0 right-4 opacity-50 blur-sm"
                                    ></div>
                                </div>

                                {/* Service Title */}
                                <h3 className={`text-2xl font-bold mb-2 ${service.color}`}>{service.text}</h3>

                                {/* Service Description */}
                                <p className="text-gray-600 mb-6">{service.description}</p>

                                {/* Features List - Shows on active/hover */}
                                <motion.div
                                    className="space-y-2 mb-6"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{
                                        opacity: isActive || isHovered ? 1 : 0,
                                        height: isActive || isHovered ? "auto" : 0,
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {service.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center">
                                            <CheckCircle className={`w-4 h-4 mr-2 ${service.color}`} />
                                            <span className="text-gray-700 text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </motion.div>

                                {/* Learn More Link */}
                                <div className="flex justify-end">
                                    <button className={`group flex items-center text-sm font-medium ${service.color} hover:underline`}>
                                        Learn more
                                        <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                {/* CTA Section */}
                <div className="mt-20 text-center">
                    <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 p-[2px] rounded-xl">
                        <div className="bg-white/80 backdrop-blur-sm px-8 py-6 rounded-[10px]">
                            <h3 className="text-2xl font-bold mb-2">Ready to transform your digital presence?</h3>
                            <p className="text-gray-600 mb-6">
                                Let's discuss how our expertise can help achieve your business goals.
                            </p>
                            <button
                                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl 
                                font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 
                                transition-all duration-300 shadow-lg hover:shadow-xl flex items-center mx-auto"
                            >
                                <span>Schedule a Consultation</span>
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceShowcase
