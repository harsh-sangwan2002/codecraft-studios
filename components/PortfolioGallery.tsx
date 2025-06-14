"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    ExternalLink,
    Github,
    X,
    Filter,
    Eye,
    Code,
    Smartphone,
    Globe,
    Cuboid,
    Palette,
    Calendar,
    Users,
    Award,
} from "lucide-react"

interface Project {
    id: number
    title: string
    description: string
    longDescription: string
    category: string
    technologies: string[]
    image: string
    liveUrl: string
    githubUrl?: string
    featured: boolean
    completedDate: string
    clientType: string
    awards?: string[]
}

interface FilterOption {
    label: string
    value: string
    icon: React.ComponentType<any>
    color: string
}

const PortfolioGallery: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState("all")
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [hoveredProject, setHoveredProject] = useState<number | null>(null)
    const modalRef = useRef<HTMLDivElement>(null)

    const filterOptions: FilterOption[] = [
        { label: "All Projects", value: "all", icon: Filter, color: "from-purple-600 to-blue-600" },
        { label: "Websites", value: "website", icon: Globe, color: "from-purple-600 to-blue-600" },
        { label: "Web Apps", value: "webapp", icon: Code, color: "from-blue-600 to-indigo-600" },
        { label: "Mobile Apps", value: "mobile", icon: Smartphone, color: "from-indigo-600 to-purple-600" },
        { label: "3D Experiences", value: "3d", icon: Cuboid, color: "from-purple-500 to-blue-500" },
        { label: "UI/UX Design", value: "design", icon: Palette, color: "from-blue-500 to-indigo-500" },
    ]

    const projects: Project[] = [
        {
            id: 1,
            title: "E-Commerce Platform",
            description: "Modern e-commerce solution with advanced features",
            longDescription:
                "A comprehensive e-commerce platform built with Next.js and Stripe integration. Features include real-time inventory management, advanced search and filtering, user authentication, order tracking, and an admin dashboard. The platform handles over 10,000 products and serves thousands of daily users.",
            category: "webapp",
            technologies: ["Next.js", "React", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
            image: "https://programmers.io/wp-content/uploads/2024/10/Best-Ecomm-Plateforms.jpg",
            liveUrl: "https://demo-ecommerce.example.com",
            githubUrl: "https://github.com/example/ecommerce",
            featured: true,
            completedDate: "2024-01-15",
            clientType: "Enterprise",
            awards: ["Best E-commerce Solution 2024"],
        },
        {
            id: 2,
            title: "Healthcare Mobile App",
            description: "Patient management system for healthcare providers",
            longDescription:
                "A comprehensive mobile application for healthcare providers to manage patient records, appointments, and medical history. Built with React Native for cross-platform compatibility, featuring secure data encryption, offline capabilities, and integration with major healthcare systems.",
            category: "mobile",
            technologies: ["React Native", "Node.js", "MongoDB", "Firebase", "TypeScript"],
            image: "https://www.mindinventory.com/blog/wp-content/uploads/2022/10/healthcare-app1200.jpg",
            liveUrl: "https://healthcare-app.example.com",
            featured: true,
            completedDate: "2023-11-20",
            clientType: "Healthcare",
            awards: ["Healthcare Innovation Award"],
        },
        {
            id: 3,
            title: "3D Product Configurator",
            description: "Interactive 3D product customization experience",
            longDescription:
                "An immersive 3D product configurator that allows customers to customize products in real-time. Built with Three.js and WebGL, featuring realistic materials, lighting, and physics. Customers can change colors, materials, and components while seeing real-time price updates.",
            category: "3d",
            technologies: ["Three.js", "WebGL", "React", "Node.js", "Blender"],
            image: "https://www.smartpixels.fr/wp-content/uploads/2022/03/Camille-Fournet-Configurateur-3D-1-1024x576.png",
            liveUrl: "https://3d-configurator.example.com",
            githubUrl: "https://github.com/example/3d-configurator",
            featured: true,
            completedDate: "2024-02-10",
            clientType: "Manufacturing",
        },
        {
            id: 4,
            title: "Corporate Website Redesign",
            description: "Modern corporate website with CMS integration",
            longDescription:
                "Complete redesign of a corporate website focusing on user experience and conversion optimization. Features include a custom CMS, blog system, contact forms, and integration with marketing tools. The site achieved a 40% increase in conversion rates post-launch.",
            category: "website",
            technologies: ["Next.js", "Sanity CMS", "Tailwind CSS", "Framer Motion"],
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWxDL6FFH7j9UPk3xSs_7RIkWbqfV_zS1D2g&s",
            liveUrl: "https://corporate-site.example.com",
            featured: false,
            completedDate: "2023-12-05",
            clientType: "Corporate",
        },
        {
            id: 5,
            title: "SaaS Dashboard Design",
            description: "Complete UI/UX design system for SaaS platform",
            longDescription:
                "Comprehensive design system and dashboard interface for a SaaS analytics platform. Includes user research, wireframing, prototyping, and final UI design. The design system covers 50+ components and screens, with a focus on data visualization and user workflow optimization.",
            category: "design",
            technologies: ["Figma", "Adobe Creative Suite", "Principle", "InVision"],
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH-HL9i-MkPPrGLDlqARjLNpmIlnaRNjKjAg&s",
            liveUrl: "https://saas-dashboard.example.com",
            featured: false,
            completedDate: "2023-10-15",
            clientType: "SaaS Startup",
        },
        {
            id: 6,
            title: "Real Estate Platform",
            description: "Property listing and management system",
            longDescription:
                "A comprehensive real estate platform featuring property listings, virtual tours, mortgage calculators, and agent management. Built with modern web technologies and integrated with MLS systems for real-time property data.",
            category: "webapp",
            technologies: ["React", "Node.js", "PostgreSQL", "AWS", "Stripe"],
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUdHqNIUPUBQ46B39QYL9qQdjkpQAD907N-w&s",
            liveUrl: "https://realestate-platform.example.com",
            githubUrl: "https://github.com/example/realestate",
            featured: false,
            completedDate: "2024-03-01",
            clientType: "Real Estate",
        },
    ]

    const filteredProjects = projects.filter((project) => activeFilter === "all" || project.category === activeFilter)

    const openModal = (project: Project) => {
        setSelectedProject(project)
        setIsModalOpen(true)
        document.body.style.overflow = "hidden"
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedProject(null)
        document.body.style.overflow = "unset"
    }

    const getFilterColor = (value: string) => {
        const filter = filterOptions.find((f) => f.value === value)
        return filter?.color || "from-gray-600 to-gray-700"
    }

    return (
        <div id="portfolio-gallery" className="py-24 bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute w-96 h-96 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full blur-3xl"
                    style={{ top: "15%", right: "10%", transform: "translate(50%, -50%)" }}
                ></div>
                <div
                    className="absolute w-80 h-80 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full blur-3xl"
                    style={{ bottom: "15%", left: "15%", transform: "translate(-50%, 50%)" }}
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
                    <h2 className="text-3xl text-white md:text-4xl font-bold mb-4">
                        Our{" "}
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                            Portfolio
                        </span>
                    </h2>
                    <p className="text-xl text-white max-w-3xl mx-auto">
                        Explore our diverse collection of successful projects, from cutting-edge web applications to stunning mobile
                        experiences.
                    </p>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {filterOptions.map((filter) => {
                        const Icon = filter.icon
                        return (
                            <button
                                key={filter.value}
                                onClick={() => setActiveFilter(filter.value)}
                                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === filter.value
                                    ? `bg-gradient-to-r ${filter.color} text-white shadow-md`
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                <Icon className="w-4 h-4 mr-2" />
                                {filter.label}
                            </button>
                        )
                    })}
                </div>

                {/* Projects Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                                onMouseEnter={() => setHoveredProject(project.id)}
                                onMouseLeave={() => setHoveredProject(null)}
                            >
                                {/* Featured Badge */}
                                {project.featured && (
                                    <div className="absolute top-4 left-4 z-10">
                                        <div className="flex items-center px-2 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-medium rounded-full">
                                            <Award className="w-3 h-3 mr-1" />
                                            Featured
                                        </div>
                                    </div>
                                )}

                                {/* Project Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={project.image || "/placeholder.svg"}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />

                                    {/* Overlay on Hover */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${hoveredProject === project.id ? "opacity-100" : "opacity-0"
                                            }`}
                                    >
                                        <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                                            <button
                                                onClick={() => openModal(project)}
                                                className="flex items-center px-3 py-2 bg-white/90 text-gray-800 rounded-lg text-sm font-medium hover:bg-white transition-colors"
                                            >
                                                <Eye className="w-4 h-4 mr-1" />
                                                View Details
                                            </button>
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-colors"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <ExternalLink className="w-4 h-4 mr-1" />
                                                Live Demo
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Project Info */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2 text-gray-800">{project.title}</h3>
                                    <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.slice(0, 3).map((tech, index) => (
                                            <span
                                                key={index}
                                                className={`px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${getFilterColor(
                                                    project.category,
                                                )} bg-opacity-10 text-white`}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.technologies.length > 3 && (
                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                                                +{project.technologies.length - 3} more
                                            </span>
                                        )}
                                    </div>

                                    {/* Project Meta */}
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <Calendar className="w-4 h-4 mr-1" />
                                            {new Date(project.completedDate).toLocaleDateString('en-GB', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit'
                                            })}
                                        </div>
                                        <div className="flex items-center">
                                            <Users className="w-4 h-4 mr-1" />
                                            {project.clientType}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* CTA Section */}
                <div className="mt-20 text-center">
                    <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 p-[2px] rounded-xl">
                        <div className="bg-white px-8 py-6 rounded-[10px]">
                            <h3 className="text-2xl font-bold mb-2">Ready to start your project?</h3>
                            <p className="text-gray-600 mb-6">
                                Let's discuss how we can bring your vision to life with our proven expertise.
                            </p>
                            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                                Start Your Project
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Project Detail Modal */}
            <AnimatePresence>
                {isModalOpen && selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={closeModal}
                    >
                        <motion.div
                            ref={modalRef}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="relative">
                                <img
                                    src={selectedProject.image || "/placeholder.svg"}
                                    alt={selectedProject.title}
                                    className="w-full h-64 object-cover rounded-t-2xl"
                                />
                                <button
                                    onClick={closeModal}
                                    className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                {selectedProject.featured && (
                                    <div className="absolute top-4 left-4">
                                        <div className="flex items-center px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-full">
                                            <Award className="w-4 h-4 mr-1" />
                                            Featured Project
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Modal Content */}
                            <div className="p-8">
                                <div className="grid lg:grid-cols-2 gap-8">
                                    {/* Left Column */}
                                    <div>
                                        <h2 className="text-3xl font-bold mb-4 text-gray-800">{selectedProject.title}</h2>
                                        <p className="text-gray-600 mb-6 leading-relaxed">{selectedProject.longDescription}</p>

                                        {/* Technologies */}
                                        <div className="mb-6">
                                            <h3 className="text-lg font-semibold mb-3">Technologies Used</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProject.technologies.map((tech, index) => (
                                                    <span
                                                        key={index}
                                                        className={`px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r ${getFilterColor(
                                                            selectedProject.category,
                                                        )} bg-opacity-10 text-white`}
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Awards */}
                                        {selectedProject.awards && selectedProject.awards.length > 0 && (
                                            <div className="mb-6">
                                                <h3 className="text-lg font-semibold mb-3">Awards & Recognition</h3>
                                                <div className="space-y-2">
                                                    {selectedProject.awards.map((award, index) => (
                                                        <div key={index} className="flex items-center">
                                                            <Award className="w-4 h-4 text-yellow-500 mr-2" />
                                                            <span className="text-gray-700">{award}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Right Column */}
                                    <div>
                                        {/* Project Details */}
                                        <div className="bg-gray-50 rounded-xl p-6 mb-6">
                                            <h3 className="text-lg font-semibold mb-4">Project Details</h3>
                                            <div className="space-y-3">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Completed:</span>
                                                    <span className="font-medium">
                                                        {new Date(selectedProject.completedDate).toLocaleDateString('en-GB', {
                                                            year: 'numeric',
                                                            month: '2-digit',
                                                            day: '2-digit'
                                                        })}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Client Type:</span>
                                                    <span className="font-medium">{selectedProject.clientType}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Category:</span>
                                                    <span className="font-medium capitalize">{selectedProject.category}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="space-y-3">
                                            <a
                                                href={selectedProject.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-colors"
                                            >
                                                <ExternalLink className="w-5 h-5 mr-2" />
                                                View Live Demo
                                            </a>
                                            {selectedProject.githubUrl && (
                                                <a
                                                    href={selectedProject.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full flex items-center justify-center px-6 py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-900 transition-colors"
                                                >
                                                    <Github className="w-5 h-5 mr-2" />
                                                    View Source Code
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default PortfolioGallery
