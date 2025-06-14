import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, Github, ExternalLink, ArrowRight } from 'lucide-react';

const Portfolio = () => {
    const [activeCategory, setActiveCategory] = useState(0);

    const categories = [
        {
            name: 'Web Development',
            color: 'from-purple-600 via-indigo-600 to-blue-600',
            projects: [
                {
                    title: 'Project 1',
                    description: 'Description of Project 1',
                    image: '/path/to/project1.jpg',
                    link: 'https://example.com/project1',
                    technologies: ['HTML', 'CSS', 'JavaScript'],
                    github: 'https://github.com/user/project1',
                    demo: 'https://example.com/project1-demo'
                },
                {
                    title: 'Project 2',
                    description: 'Description of Project 2',
                    image: '/path/to/project2.jpg',
                    link: 'https://example.com/project2',
                    technologies: ['React', 'Node.js', 'MongoDB'],
                    github: 'https://github.com/user/project2',
                    demo: 'https://example.com/project2-demo'
                }
            ]
        },
        {
            name: 'Mobile Development',
            color: 'from-indigo-600 to-blue-600',
            projects: [
                {
                    title: 'Project 3',
                    description: 'Description of Project 3',
                    image: '/path/to/project3.jpg',
                    link: 'https://example.com/project3',
                    technologies: ['Flutter', 'Dart'],
                    github: 'https://github.com/user/project3',
                    demo: 'https://example.com/project3-demo'
                },
                {
                    title: 'Project 4',
                    description: 'Description of Project 4',
                    image: '/path/to/project4.jpg',
                    link: 'https://example.com/project4',
                    technologies: ['React Native', 'JavaScript'],
                    github: 'https://github.com/user/project4',
                    demo: 'https://example.com/project4-demo'
                }
            ]
        },
        {
            name: 'UI/UX Design',
            color: 'from-purple-600 via-indigo-600 to-blue-600',
            projects: [
                {
                    title: 'Project 5',
                    description: 'Description of Project 5',
                    image: '/path/to/project5.jpg',
                    link: 'https://example.com/project5',
                    technologies: ['Figma', 'Adobe XD'],
                    github: 'https://github.com/user/project5',
                    demo: 'https://example.com/project5-demo'
                },
                {
                    title: 'Project 6',
                    description: 'Description of Project 6',
                    image: '/path/to/project6.jpg',
                    link: 'https://example.com/project6',
                    technologies: ['Sketch', 'Adobe Illustrator'],
                    github: 'https://github.com/user/project6',
                    demo: 'https://example.com/project6-demo'
                }
            ]
        }
    ];

    return (
        <div className="py-24 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-20">
                <div
                    className="absolute w-96 h-96 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full blur-3xl"
                    style={{ top: "20%", left: "10%", transform: "translate(-50%, -50%)" }}
                ></div>
                <div
                    className="absolute w-80 h-80 bg-gradient-to-br from-indigo-400 to-blue-400 rounded-full blur-3xl"
                    style={{ bottom: "10%", right: "15%", transform: "translate(50%, 50%)" }}
                ></div>
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `
                        linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
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
                        <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                            Portfolio
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Explore our diverse range of successful projects that showcase our expertise and commitment to excellence.
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
                                : "bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white/90 border border-purple-100"
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Portfolio Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories[activeCategory].projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-md border border-purple-100 hover:shadow-xl transition-all duration-300"
                        >
                            {/* Project Image */}
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            {/* Project Info */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                <p className="text-gray-600 mb-4">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies.map((tech, techIndex) => (
                                        <span
                                            key={techIndex}
                                            className="px-3 py-1 text-sm bg-purple-50 text-purple-600 rounded-full"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex justify-between items-center">
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2"
                                    >
                                        View Project
                                        <ArrowUpRight className="w-4 h-4" />
                                    </a>
                                    <div className="flex gap-2">
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 rounded-full bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors"
                                            >
                                                <Github className="w-4 h-4" />
                                            </a>
                                        )}
                                        {project.demo && (
                                            <a
                                                href={project.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 rounded-full bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-16 text-center">
                    <div className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 p-[2px] rounded-xl">
                        <div className="bg-white/80 backdrop-blur-sm px-8 py-6 rounded-[10px]">
                            <h3 className="text-2xl font-bold mb-2">Ready to Start Your Project?</h3>
                            <p className="text-gray-600 mb-4">
                                Let's create something amazing together. Contact us to discuss your project.
                            </p>
                            <a
                                href="#contact"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full hover:shadow-lg transition-shadow"
                            >
                                Get Started
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Portfolio; 