"use client"

import type React from "react"
import { motion } from "framer-motion"
import { ArrowRight, Users, Heart, Star } from "lucide-react"
import Link from "next/link"

const TeamCTASection: React.FC = () => {
    return (
        <div id="meet-our-team" className="py-24 bg-white relative overflow-hidden">
            {/* Background Elements */}
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
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-yellow-100 rounded-full">
                            <Star className="w-4 h-4 text-purple-600 mr-2" />
                            <span className="text-purple-700 font-medium text-sm">Meet the Dream Team</span>
                        </div>

                        {/* Heading */}
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                                The Creative Minds
                                <span className="block bg-gradient-to-r from-purple-600 via-yellow-500 to-purple-600 bg-clip-text text-transparent">
                                    Behind Your Success
                                </span>
                            </h2>
                            <p className="text-xl text-gray-600 leading-relaxed">
                                Get to know the passionate individuals who bring your digital visions to life. Our diverse team of
                                experts combines creativity, technical excellence, and years of experience to deliver exceptional
                                results.
                            </p>
                        </div>

                        {/* Features */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                {
                                    icon: Users,
                                    title: "Expert Team",
                                    description: "5+ seasoned professionals with diverse skills",
                                },
                                {
                                    icon: Heart,
                                    title: "Passionate Creators",
                                    description: "Dedicated to crafting exceptional experiences",
                                },
                                {
                                    icon: Star,
                                    title: "Proven Track Record",
                                    description: "150+ successful projects delivered",
                                },
                                {
                                    icon: ArrowRight,
                                    title: "Client-Focused",
                                    description: "Your success is our primary mission",
                                },
                            ].map((feature, index) => {
                                const Icon = feature.icon
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                                        className="flex items-start space-x-3"
                                    >
                                        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
                                            <p className="text-gray-600 text-sm">{feature.description}</p>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            <Link
                                href="/team"
                                className="group cursor-pointer inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-yellow-500 text-white rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                <span>Meet Our Team</span>
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1 }}
                            className="flex items-center space-x-8 pt-8 border-t border-gray-100"
                        >
                            <div className="text-center">
                                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-yellow-500 bg-clip-text text-transparent">
                                    5+
                                </div>
                                <div className="text-gray-600 text-sm">Team Members</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-yellow-500 bg-clip-text text-transparent">
                                    25+
                                </div>
                                <div className="text-gray-600 text-sm">Years Experience</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-yellow-500 bg-clip-text text-transparent">
                                    98%
                                </div>
                                <div className="text-gray-600 text-sm">Client Satisfaction</div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Main Image Container */}
                        <div className="relative">
                            {/* Background Decorative Elements */}
                            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-purple-200 to-yellow-200 rounded-full blur-xl opacity-60"></div>
                            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-yellow-200 to-purple-200 rounded-full blur-xl opacity-60"></div>

                            {/* Image */}
                            <div className="relative bg-gradient-to-br from-purple-100 to-yellow-100 rounded-2xl p-8 shadow-2xl">
                                <img
                                    src="/placeholder.svg?height=500&width=600"
                                    alt="Our amazing team working together"
                                    className="w-full h-auto rounded-xl shadow-lg"
                                />

                                {/* Floating Cards */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, delay: 1.2 }}
                                    className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100"
                                >
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-yellow-500 rounded-full flex items-center justify-center">
                                            <Users className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-gray-800">5 Experts</div>
                                            <div className="text-xs text-gray-600">Ready to help</div>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, delay: 1.4 }}
                                    className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100"
                                >
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-purple-600 rounded-full flex items-center justify-center">
                                            <Star className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-gray-800">150+ Projects</div>
                                            <div className="text-xs text-gray-600">Successfully delivered</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default TeamCTASection
