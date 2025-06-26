"use client"

import type React from "react"
import { motion, Variants } from "framer-motion"
import { useState } from "react"
import { Linkedin, Twitter, Github, Mail } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import HeroSection from "@/components/HeroSection"
import Link from "next/link"

interface TeamMember {
    id: number
    name: string
    position: string
    description: string
    image: string
    social: {
        linkedin?: string
        twitter?: string
        github?: string
        email?: string
    }
}

const TeamPage: React.FC = () => {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null)

    const teamMembers: TeamMember[] = [
        {
            id: 1,
            name: "Arvind Sangwan",
            position: "Founder & CEO",
            description:
                "Visionary leader with 5+ years in tech. Passionate about creating digital experiences that transform businesses and delight users.",
            image: "/arvind.jpeg",
            social: {
                linkedin: "https://www.linkedin.com/in/arvind-sangwan8998/",
                github: "https://github.com/Arvind8998",
                email: "mailto:asangwan8998@gmail.com,",
            },
        },
        {
            id: 2,
            name: "Harsh Sangwan",
            position: "Co-Founder and CTO",
            description:
                "Professional Software Developer with 2+ YOE specialising in JavaScript, ReactJS, NodeJS, Redux, Spring, Spring Boot, Java, and SQL, with expertise in Data Structures and Algorithms.",
            image: "/harsh.jpg",
            social: {
                linkedin: "https://linkedin.com/in/harsh-sangwan2002",
                github: "https://github.com/harsh-sangwan2002",
                email: "mailto:hsangwan2002@gmail.com",
            },
        },
        {
            id: 3,
            name: "Vandana Jaglan",
            position: "SAP Consultatnt & Full Stack Developer",
            description:
                "Code architect with expertise in modern web technologies. Turns complex problems into elegant solutions with clean, scalable code.",
            image: "/vandana.png",
            social: {
                linkedin: "https://www.linkedin.com/in/vandana-j-567505270/",
                github: "https://github.com/vandana",
                email: "mailto:vandana@codecraft.com",
            },
        },
        {
            id: 4,
            name: "Emily Watson",
            position: "Mobile App Developer",
            description:
                "Mobile-first developer who crafts seamless experiences across iOS and Android. Expert in React Native and native development.",
            image: "/emma.jpeg",
            social: {
                linkedin: "https://www.linkedin.com/in/emma-watson-a31a97176/",
                github: "https://github.com/emma-watson",
                twitter: "https://twitter.com/emilywatson",
            },
        },
        {
            id: 5,
            name: "David Kim",
            position: "3D Developer & Creative Technologist",
            description:
                "Creative technologist pushing the boundaries of web-based 3D experiences. Specializes in WebGL, Three.js, and immersive storytelling.",
            image: "/david.jpeg",
            social: {
                linkedin: "https://www.linkedin.com/in/david-kim-250/",
                github: "https://github.com/daviddkkim",
                email: "mailto:david@codecraft.com?subject=Hello from CodeCraft Studios&body=Hi David,%0D%0A%0D%0AI'm interested in your services.%0D%0A%0D%0ABest regards,",
            },
        },
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    }

    const cardVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.9,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    }

    const getSocialIcon = (platform: string) => {
        switch (platform) {
            case "linkedin":
                return Linkedin
            case "twitter":
                return Twitter
            case "github":
                return Github
            case "email":
                return Mail
            default:
                return Mail
        }
    }

    return (
        <main id="team">
            <Navbar />
            {/* Team Section */}
            <div id="team" className="py-24 bg-gradient-to-br from-gray-50 to-white scroll-mt-20">
                {/* Header Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Our{" "}
                            <span className="bg-gradient-to-r from-purple-600 via-yellow-500 to-purple-600 bg-clip-text text-transparent">
                                Amazing Team
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            We're a passionate group of creators, developers, and designers who believe in the power of exceptional
                            digital experiences. Get to know the people behind the magic.
                        </p>
                    </motion.div>
                </div>

                {/* Team Cards */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center gap-8">
                        {teamMembers.length > 0 ? teamMembers.map((member, idx) => (
                            <motion.div
                                key={member.id}
                                className={`${"bg-gradient-to-r from-purple-600 to-yellow-500"} rounded-2xl shadow-lg overflow-hidden mb-8 hover:shadow-xl transition-shadow duration-300 w-[calc(50%-1rem)] min-w-[400px]`}
                                onMouseEnter={() => setHoveredCard(member.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <div className="p-6">
                                    <div className="flex items-center gap-6">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-32 h-32 object-cover"
                                            style={{ borderRadius: "50%" }}
                                        />
                                        <div>
                                            <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
                                            <p className="text-purple-600 font-medium mb-2">{member.position}</p>
                                            <div className="flex space-x-4">
                                                {Object.entries(member.social).map(([platform, url]) => {
                                                    const Icon = getSocialIcon(platform)
                                                    return (
                                                        url && (
                                                            <a
                                                                key={platform}
                                                                href={url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className={`text-white hover:text-purple-600 transition-colors duration-300 ${hoveredCard === member.id ? "scale-110" : ""}`}
                                                            >
                                                                <Icon size={24} />
                                                            </a>
                                                        )
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-white mt-4">{member.description}</p>
                                </div >
                            </motion.div >
                        )) : (
                            <p className="text-center text-gray-500">No team members found.</p>
                        )}
                    </div >
                </div >

                {/* Call to Action Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 text-center"
                >
                    <div className="bg-gradient-to-r from-purple-600 to-yellow-500 rounded-2xl p-8 text-white">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Want to Join Our Team?</h2>
                        <p className="text-purple-100 mb-6 text-lg">
                            We're always looking for talented individuals who share our passion for creating exceptional digital
                            experiences.
                        </p>
                        <button className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300 hover:scale-105 transform">
                            View Open Positions
                        </button>
                    </div>
                </ motion.div>
            </div >

            {/* Footer */}
            < Footer />
        </main >
    )
}

export default TeamPage
