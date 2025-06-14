"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Calculator,
    Globe,
    Code,
    Smartphone,
    Cuboid,
    Palette,
    Clock,
    Users,
    CheckCircle,
    X,
    Plus,
    Minus,
    ArrowRight,
    DollarSign,
    Calendar,
    Zap,
    Shield,
    Database,
    Search,
    ShoppingCart,
    MessageSquare,
    BarChart3,
} from "lucide-react"

interface ProjectType {
    id: string
    name: string
    icon: React.ComponentType<any>
    basePrice: number
    description: string
    features: string[]
    color: string
}

interface Feature {
    id: string
    name: string
    description: string
    price: number
    icon: React.ComponentType<any>
    category: string
}

interface TimelineOption {
    id: string
    name: string
    weeks: number
    multiplier: number
    description: string
}

const PricingCalculator: React.FC = () => {
    const [selectedProjectType, setSelectedProjectType] = useState<string>("website")
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
    const [selectedTimeline, setSelectedTimeline] = useState<string>("standard")
    const [teamSize, setTeamSize] = useState<number>(2)
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [showQuoteForm, setShowQuoteForm] = useState(false)

    const projectTypes: ProjectType[] = [
        {
            id: "website",
            name: "Website",
            icon: Globe,
            basePrice: 2500,
            description: "Professional business website with modern design",
            features: ["Responsive Design", "SEO Optimization", "Contact Forms", "Basic Analytics"],
            color: "from-purple-500 to-blue-500",
        },
        {
            id: "webapp",
            name: "Web Application",
            icon: Code,
            basePrice: 8000,
            description: "Custom web application with advanced functionality",
            features: ["User Authentication", "Database Integration", "API Development", "Admin Dashboard"],
            color: "from-blue-500 to-indigo-500",
        },
        {
            id: "mobile",
            name: "Mobile App",
            icon: Smartphone,
            basePrice: 12000,
            description: "Native iOS & Android mobile application",
            features: ["Cross-platform", "Push Notifications", "Offline Support", "App Store Deployment"],
            color: "from-indigo-500 to-purple-500",
        },
        {
            id: "3d",
            name: "3D Experience",
            icon: Cuboid,
            basePrice: 15000,
            description: "Immersive 3D web experience with WebGL",
            features: ["3D Modeling", "Interactive Controls", "WebGL Optimization", "Cross-device Support"],
            color: "from-purple-600 to-blue-600",
        },
        {
            id: "design",
            name: "UI/UX Design",
            icon: Palette,
            basePrice: 3500,
            description: "Complete design system and user experience",
            features: ["User Research", "Wireframing", "Prototyping", "Design System"],
            color: "from-blue-600 to-indigo-600",
        },
    ]

    const features: Feature[] = [
        {
            id: "ecommerce",
            name: "E-commerce Integration",
            description: "Shopping cart, payment processing, inventory management",
            price: 2500,
            icon: ShoppingCart,
            category: "functionality",
        },
        {
            id: "cms",
            name: "Content Management System",
            description: "Easy-to-use admin panel for content updates",
            price: 1500,
            icon: Database,
            category: "functionality",
        },
        {
            id: "auth",
            name: "User Authentication",
            description: "Login, registration, password recovery, user profiles",
            price: 1200,
            icon: Shield,
            category: "functionality",
        },
        {
            id: "seo",
            name: "Advanced SEO",
            description: "Technical SEO, schema markup, performance optimization",
            price: 800,
            icon: Search,
            category: "marketing",
        },
        {
            id: "analytics",
            name: "Advanced Analytics",
            description: "Custom tracking, conversion funnels, detailed reporting",
            price: 1000,
            icon: BarChart3,
            category: "marketing",
        },
        {
            id: "chat",
            name: "Live Chat Support",
            description: "Real-time customer support integration",
            price: 600,
            icon: MessageSquare,
            category: "support",
        },
        {
            id: "api",
            name: "Third-party Integrations",
            description: "CRM, email marketing, social media integrations",
            price: 1800,
            icon: Zap,
            category: "functionality",
        },
        {
            id: "multilingual",
            name: "Multi-language Support",
            description: "Internationalization and localization",
            price: 2000,
            icon: Globe,
            category: "functionality",
        },
    ]

    const timelineOptions: TimelineOption[] = [
        {
            id: "rush",
            name: "Rush Delivery",
            weeks: 2,
            multiplier: 1.5,
            description: "Expedited timeline with dedicated resources",
        },
        {
            id: "fast",
            name: "Fast Track",
            weeks: 4,
            multiplier: 1.25,
            description: "Accelerated development process",
        },
        {
            id: "standard",
            name: "Standard",
            weeks: 8,
            multiplier: 1.0,
            description: "Regular development timeline",
        },
        {
            id: "extended",
            name: "Extended",
            weeks: 12,
            multiplier: 0.9,
            description: "Flexible timeline with cost savings",
        },
    ]

    // Calculate total price
    useEffect(() => {
        const currentProjectType = projectTypes.find((pt) => pt.id === selectedProjectType)
        const basePrice = currentProjectType?.basePrice || 0

        const featuresPrice = selectedFeatures.reduce((total, featureId) => {
            const feature = features.find((f) => f.id === featureId)
            return total + (feature?.price || 0)
        }, 0)

        const timeline = timelineOptions.find((t) => t.id === selectedTimeline)
        const timelineMultiplier = timeline?.multiplier || 1

        const teamMultiplier = teamSize > 2 ? 1 + (teamSize - 2) * 0.15 : 1

        const calculatedPrice = (basePrice + featuresPrice) * timelineMultiplier * teamMultiplier
        setTotalPrice(Math.round(calculatedPrice))
    }, [selectedProjectType, selectedFeatures, selectedTimeline, teamSize])

    const toggleFeature = (featureId: string) => {
        setSelectedFeatures((prev) =>
            prev.includes(featureId) ? prev.filter((id) => id !== featureId) : [...prev, featureId],
        )
    }

    const currentProjectType = projectTypes.find((pt) => pt.id === selectedProjectType)
    const currentTimeline = timelineOptions.find((t) => t.id === selectedTimeline)

    const QuoteForm = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowQuoteForm(false)}
        >
            <div
                className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold">Get Your Custom Quote</h3>
                        <button
                            onClick={() => setShowQuoteForm(false)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 mb-6">
                        <h4 className="font-semibold mb-2">Project Summary</h4>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Project Type:</span>
                                <span className="font-medium">{currentProjectType?.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Timeline:</span>
                                <span className="font-medium">
                                    {currentTimeline?.name} ({currentTimeline?.weeks} weeks)
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Team Size:</span>
                                <span className="font-medium">{teamSize} developers</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Features:</span>
                                <span className="font-medium">{selectedFeatures.length} add-ons</span>
                            </div>
                            <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg">
                                <span>Estimated Total:</span>
                                <span className="text-purple-600">${totalPrice.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <form className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Full Name *</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Email *</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Company</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="Your Company"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Phone</label>
                                <input
                                    type="tel"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Project Description</label>
                            <textarea
                                rows={4}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Tell us more about your project requirements..."
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Preferred Start Date</label>
                            <input
                                type="date"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-colors"
                        >
                            Send Quote Request
                        </button>
                    </form>
                </div>
            </div>
        </motion.div>
    )

    return (
        <div className="py-24 bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-20">
                <div
                    className="absolute w-96 h-96 bg-gradient-to-br from-white to-purple-200 rounded-full blur-3xl"
                    style={{ top: "10%", right: "10%", transform: "translate(50%, -50%)" }}
                ></div>
                <div
                    className="absolute w-80 h-80 bg-gradient-to-br from-blue-200 to-white rounded-full blur-3xl"
                    style={{ bottom: "10%", left: "15%", transform: "translate(-50%, 50%)" }}
                ></div>
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
                        backgroundSize: "50px 50px",
                    }}
                ></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                        Project{" "}
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                            Pricing Calculator
                        </span>
                    </h2>
                    <p className="text-xl text-purple-100 max-w-3xl mx-auto">
                        Get an instant estimate for your project. Customize features, timeline, and team size to see real-time
                        pricing.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Configuration Panel */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Project Type Selection */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                                <Calculator className="w-5 h-5 mr-2" />
                                Select Project Type
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {projectTypes.map((type) => {
                                    const Icon = type.icon
                                    return (
                                        <button
                                            key={type.id}
                                            onClick={() => setSelectedProjectType(type.id)}
                                            className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${selectedProjectType === type.id
                                                ? "border-yellow-400 bg-white/20"
                                                : "border-white/20 bg-white/5 hover:bg-white/10"
                                                }`}
                                        >
                                            <div className="flex items-center mb-3">
                                                <div
                                                    className={`w-10 h-10 rounded-lg bg-gradient-to-r ${type.color} flex items-center justify-center mr-3`}
                                                >
                                                    <Icon className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-white">{type.name}</h4>
                                                    <p className="text-purple-200 text-sm">From ${type.basePrice.toLocaleString()}</p>
                                                </div>
                                            </div>
                                            <p className="text-purple-100 text-sm">{type.description}</p>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Features Selection */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <h3 className="text-xl font-bold text-white mb-6">Additional Features</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {features.map((feature) => {
                                    const Icon = feature.icon
                                    const isSelected = selectedFeatures.includes(feature.id)
                                    return (
                                        <button
                                            key={feature.id}
                                            onClick={() => toggleFeature(feature.id)}
                                            className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${isSelected ? "border-yellow-400 bg-white/20" : "border-white/20 bg-white/5 hover:bg-white/10"
                                                }`}
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex items-center">
                                                    <Icon className="w-5 h-5 text-yellow-400 mr-2" />
                                                    <h4 className="font-semibold text-white">{feature.name}</h4>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="text-yellow-400 font-semibold mr-2">+${feature.price.toLocaleString()}</span>
                                                    {isSelected ? (
                                                        <CheckCircle className="w-5 h-5 text-green-400" />
                                                    ) : (
                                                        <Plus className="w-5 h-5 text-white/60" />
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-purple-100 text-sm">{feature.description}</p>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Timeline & Team Size */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Timeline */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                                    <Clock className="w-5 h-5 mr-2" />
                                    Timeline
                                </h3>
                                <div className="space-y-3">
                                    {timelineOptions.map((timeline) => (
                                        <button
                                            key={timeline.id}
                                            onClick={() => setSelectedTimeline(timeline.id)}
                                            className={`w-full p-3 rounded-lg border-2 transition-all duration-300 text-left ${selectedTimeline === timeline.id
                                                ? "border-yellow-400 bg-white/20"
                                                : "border-white/20 bg-white/5 hover:bg-white/10"
                                                }`}
                                        >
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="font-semibold text-white">{timeline.name}</span>
                                                <span className="text-yellow-400 text-sm">
                                                    {timeline.multiplier !== 1 &&
                                                        (timeline.multiplier > 1
                                                            ? `+${((timeline.multiplier - 1) * 100).toFixed(0)}%`
                                                            : `-${((1 - timeline.multiplier) * 100).toFixed(0)}%`)}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-purple-100 text-sm">{timeline.description}</span>
                                                <span className="text-purple-200 text-sm">{timeline.weeks} weeks</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Team Size */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                                    <Users className="w-5 h-5 mr-2" />
                                    Team Size
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-white">Developers</span>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => setTeamSize(Math.max(1, teamSize - 1))}
                                                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                                            >
                                                <Minus className="w-4 h-4 text-white" />
                                            </button>
                                            <span className="text-xl font-bold text-yellow-400 w-8 text-center">{teamSize}</span>
                                            <button
                                                onClick={() => setTeamSize(Math.min(6, teamSize + 1))}
                                                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                                            >
                                                <Plus className="w-4 h-4 text-white" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-purple-100 text-sm">
                                        {teamSize > 2 && <p>Additional team members: +{((teamSize - 2) * 15).toFixed(0)}% cost increase</p>}
                                        {teamSize <= 2 && <p>Standard team size for optimal efficiency</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Price Summary */}
                    <div className="space-y-6">
                        {/* Price Breakdown */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 sticky top-6">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                                <DollarSign className="w-5 h-5 mr-2" />
                                Price Breakdown
                            </h3>

                            <div className="space-y-4">
                                {/* Base Price */}
                                <div className="flex justify-between items-center">
                                    <span className="text-purple-100">Base Price ({currentProjectType?.name})</span>
                                    <span className="text-white font-semibold">${currentProjectType?.basePrice.toLocaleString()}</span>
                                </div>

                                {/* Features */}
                                {selectedFeatures.length > 0 && (
                                    <div className="border-t border-white/20 pt-4">
                                        <div className="text-purple-100 mb-2">Additional Features:</div>
                                        {selectedFeatures.map((featureId) => {
                                            const feature = features.find((f) => f.id === featureId)
                                            return (
                                                <div key={featureId} className="flex justify-between items-center text-sm">
                                                    <span className="text-purple-200">• {feature?.name}</span>
                                                    <span className="text-white">+${feature?.price.toLocaleString()}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}

                                {/* Timeline Adjustment */}
                                {currentTimeline?.multiplier !== 1 && (
                                    <div className="flex justify-between items-center">
                                        <span className="text-purple-100">Timeline Adjustment ({currentTimeline?.name})</span>
                                        <span className="text-yellow-400">
                                            {currentTimeline?.multiplier > 1 ? "+" : ""}
                                            {((currentTimeline?.multiplier - 1) * 100).toFixed(0)}%
                                        </span>
                                    </div>
                                )}

                                {/* Team Size Adjustment */}
                                {teamSize > 2 && (
                                    <div className="flex justify-between items-center">
                                        <span className="text-purple-100">Team Size ({teamSize} developers)</span>
                                        <span className="text-yellow-400">+{((teamSize - 2) * 15).toFixed(0)}%</span>
                                    </div>
                                )}

                                {/* Total */}
                                <div className="border-t border-white/20 pt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold text-white">Total Estimate</span>
                                        <span className="text-2xl font-bold text-yellow-400">${totalPrice.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Project Info */}
                            <div className="mt-6 p-4 bg-white/5 rounded-lg">
                                <div className="flex items-center text-purple-100 text-sm mb-2">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Estimated Timeline: {currentTimeline?.weeks} weeks
                                </div>
                                <div className="flex items-center text-purple-100 text-sm">
                                    <Users className="w-4 h-4 mr-2" />
                                    Team Size: {teamSize} developer{teamSize > 1 ? "s" : ""}
                                </div>
                            </div>

                            {/* CTA Button */}
                            <button
                                onClick={() => setShowQuoteForm(true)}
                                className="w-full mt-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-900 rounded-xl font-semibold hover:from-yellow-500 hover:to-orange-500 transition-colors flex items-center justify-center"
                            >
                                Get Custom Quote
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </button>

                            <p className="text-purple-200 text-xs text-center mt-3">
                                * This is an estimate. Final pricing may vary based on specific requirements.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quote Form Modal */}
            <AnimatePresence>{showQuoteForm && <QuoteForm />}</AnimatePresence>
        </div>
    )
}

export default PricingCalculator
