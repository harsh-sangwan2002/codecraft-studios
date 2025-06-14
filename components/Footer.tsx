"use client"

import type React from "react"
import { motion } from "framer-motion"
import {
    Globe,
    Code,
    Smartphone,
    Cuboid,
    Palette,
    Zap,
    Mail,
    Phone,
    MapPin,
    ArrowRight,
    Heart,
    Linkedin,
    Facebook,
    Instagram,
    Twitter,
} from "lucide-react"

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear()

    const services = [
        { name: "Website Development", href: "#services", icon: Globe },
        { name: "Web Applications", href: "#services", icon: Code },
        { name: "Mobile Apps", href: "#services", icon: Smartphone },
        { name: "3D Experiences", href: "#services", icon: Cuboid },
        { name: "UI/UX Design", href: "#services", icon: Palette },
        { name: "Technical Consulting", href: "#services", icon: Zap },
    ]

    const quickLinks = [
        { name: "About Us", href: "#about" },
        { name: "Portfolio", href: "#portfolio" },
        { name: "Pricing", href: "#pricing" },
        { name: "Contact", href: "#contact" },
        { name: "Blog", href: "#blog" },
        { name: "Careers", href: "#careers" },
    ]

    const socialLinks = [
        {
            name: "LinkedIn",
            href: "https://linkedin.com/company/codecraft",
            icon: Linkedin,
            color: "hover:text-blue-400",
        },
        {
            name: "Facebook",
            href: "https://facebook.com/codecraft",
            icon: Facebook,
            color: "hover:text-blue-500",
        },
        {
            name: "Instagram",
            href: "https://instagram.com/codecraft",
            icon: Instagram,
            color: "hover:text-pink-400",
        },
        {
            name: "Twitter",
            href: "https://twitter.com/codecraft",
            icon: Twitter,
            color: "hover:text-blue-400",
        },
    ]

    const contactInfo = [
        {
            icon: Mail,
            text: "hello@codecraft.com",
            href: "mailto:hello@codecraft.com",
        },
        {
            icon: Phone,
            text: "+91 8700437332",
            href: "tel:+918700437332",
        },
        {
            icon: MapPin,
            text: "Gurugram, Haryana, India",
            href: "#location",
        },
    ]

    return (
        <footer className="bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-20">
                <div
                    className="absolute w-96 h-96 bg-gradient-to-br from-white to-purple-200 rounded-full blur-3xl"
                    style={{ top: "20%", right: "10%", transform: "translate(50%, -50%)" }}
                ></div>
                <div
                    className="absolute w-80 h-80 bg-gradient-to-br from-blue-200 to-white rounded-full blur-3xl"
                    style={{ bottom: "20%", left: "15%", transform: "translate(-50%, 50%)" }}
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

            <div className="relative z-10">
                {/* Newsletter Section */}
                <div className="border-b border-white/20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="text-center">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Stay Updated with Our Latest Projects</h3>
                            <p className="text-purple-200 mb-8 max-w-2xl mx-auto">
                                Get insights into cutting-edge web development, design trends, and exclusive project showcases delivered
                                to your inbox.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm"
                                />
                                <button className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-900 rounded-lg font-semibold hover:from-yellow-500 hover:to-orange-500 transition-colors flex items-center justify-center">
                                    Subscribe
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Company Info */}
                        <div className="lg:col-span-1">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-white mb-2">CodeCraft</h2>
                                <p className="text-purple-200 leading-relaxed">
                                    Transforming ideas into exceptional digital experiences. We craft websites, applications, and 3D
                                    experiences that captivate and convert.
                                </p>
                            </div>

                            {/* Social Links */}
                            <div className="mb-6">
                                <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
                                <div className="flex space-x-4">
                                    {socialLinks.map((social) => {
                                        const Icon = social.icon
                                        return (
                                            <motion.a
                                                key={social.name}
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white transition-all duration-300 ${social.color} hover:bg-white/20 hover:scale-110`}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                                aria-label={`Follow us on ${social.name}`}
                                            >
                                                <Icon className="w-5 h-5" />
                                            </motion.a>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-4">Get in Touch</h4>
                                <div className="space-y-3">
                                    {contactInfo.map((contact, index) => {
                                        const Icon = contact.icon
                                        return (
                                            <a
                                                key={index}
                                                href={contact.href}
                                                className="flex items-center text-purple-200 hover:text-white transition-colors group"
                                            >
                                                <Icon className="w-4 h-4 mr-3 group-hover:text-yellow-400 transition-colors" />
                                                <span>{contact.text}</span>
                                            </a>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Services */}
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-6">Our Services</h4>
                            <ul className="space-y-3">
                                {services.map((service) => {
                                    const Icon = service.icon
                                    return (
                                        <li key={service.name}>
                                            <a
                                                href={service.href}
                                                className="flex items-center text-purple-200 hover:text-white transition-colors group"
                                            >
                                                <Icon className="w-4 h-4 mr-3 group-hover:text-yellow-400 transition-colors" />
                                                <span>{service.name}</span>
                                            </a>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
                            <ul className="space-y-3">
                                {quickLinks.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="text-purple-200 hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Recent Projects */}
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-6">Recent Projects</h4>
                            <div className="space-y-4">
                                {[
                                    {
                                        name: "E-commerce Platform",
                                        type: "Web Application",
                                        image: "https://programmers.io/wp-content/uploads/2024/10/Best-Ecomm-Plateforms.jpg",
                                    },
                                    {
                                        name: "Healthcare App",
                                        type: "Mobile Application",
                                        image: "https://www.mindinventory.com/blog/wp-content/uploads/2022/10/healthcare-app1200.jpg",
                                    },
                                    {
                                        name: "3D Product Viewer",
                                        type: "3D Experience",
                                        image: "https://www.smartpixels.fr/wp-content/uploads/2022/03/Camille-Fournet-Configurateur-3D-1-1024x576.png",
                                    },
                                ].map((project, index) => (
                                    <div key={index} className="flex items-center space-x-3 group cursor-pointer">
                                        <img
                                            src={project.image || "/placeholder.svg"}
                                            alt={project.name}
                                            className="w-12 h-12 rounded-lg object-cover bg-white/10"
                                        />
                                        <div>
                                            <h5 className="text-white font-medium group-hover:text-yellow-400 transition-colors">
                                                {project.name}
                                            </h5>
                                            <p className="text-purple-200 text-sm">{project.type}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="flex items-center text-purple-200 mb-4 md:mb-0">
                                <span>© {currentYear} CodeCraft. Made with</span>
                                <Heart className="w-4 h-4 mx-1 text-red-400 fill-current" />
                                <span>in India</span>
                            </div>

                            <div className="flex flex-wrap items-center gap-6 text-sm">
                                <a href="#privacy" className="text-purple-200 hover:text-white transition-colors">
                                    Privacy Policy
                                </a>
                                <a href="#terms" className="text-purple-200 hover:text-white transition-colors">
                                    Terms of Service
                                </a>
                                <a href="#cookies" className="text-purple-200 hover:text-white transition-colors">
                                    Cookie Policy
                                </a>
                                <a href="#sitemap" className="text-purple-200 hover:text-white transition-colors">
                                    Sitemap
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
