'use client';

import React, { useState, useEffect } from 'react';
import { Code, Smartphone, Globe, Cuboid, Palette, Zap, ArrowRight, Play, Star } from 'lucide-react';

interface Service {
    icon: React.ComponentType<any>;
    text: string;
    color: string;
    description: string;
}

interface FloatingCardProps {
    children: React.ReactNode;
    delay?: number;
    direction?: 'up' | 'down';
    className?: string;
}

const HeroSection: React.FC = () => {
    const [currentService, setCurrentService] = useState<number>(0);
    const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    const services: Service[] = [
        {
            icon: Globe,
            text: "Websites",
            color: "text-purple-600",
            description: "Stunning, responsive websites that convert visitors into customers"
        },
        {
            icon: Code,
            text: "Web Apps",
            color: "text-blue-600",
            description: "Powerful web applications built with cutting-edge technology"
        },
        {
            icon: Smartphone,
            text: "Mobile Apps",
            color: "text-indigo-600",
            description: "Native iOS & Android apps that users love to engage with"
        },
        {
            icon: Cuboid,
            text: "3D Experiences",
            color: "text-purple-500",
            description: "Immersive 3D websites that leave lasting impressions"
        },
        {
            icon: Palette,
            text: "UI/UX Design",
            color: "text-blue-500",
            description: "Beautiful, intuitive designs that enhance user experience"
        },
        {
            icon: Zap,
            text: "Software Solutions",
            color: "text-indigo-500",
            description: "Custom software tailored to your business needs"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentService((prev) => (prev + 1) % services.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [services.length]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const FloatingCard: React.FC<FloatingCardProps> = ({
        children,
        delay = 0,
        direction = 'up',
        className = ''
    }) => (
        <div
            className={`absolute animate-bounce ${className}`}
            style={{
                animationDelay: `${delay}s`,
                animationDuration: '4s',
                transform: direction === 'up' ? 'translateY(-10px)' : 'translateY(10px)'
            }}
        >
            {children}
        </div>
    );

    const currentServiceData = services[currentService];

    return (
        <div className="min-h-screen bg-white relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute w-96 h-96 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full blur-3xl"
                    style={{
                        top: '10%',
                        left: `${20 + mousePosition.x * 0.02}%`,
                        transform: 'translate(-50%, -50%)'
                    }}
                ></div>
                <div
                    className="absolute w-80 h-80 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full blur-3xl"
                    style={{
                        top: '60%',
                        right: `${15 + mousePosition.y * 0.02}%`,
                        transform: 'translate(50%, -50%)'
                    }}
                ></div>
                <div
                    className="absolute w-64 h-64 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full blur-3xl"
                    style={{
                        bottom: '20%',
                        left: `${30 + mousePosition.x * 0.01}%`,
                        transform: 'translate(-50%, 50%)'
                    }}
                ></div>
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full" style={{
                    backgroundImage: `
            linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
          `,
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">

                    {/* Left Content */}
                    <div className="text-center lg:text-left space-y-8">
                        {/* Badge */}
                        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full">
                            <Star className="w-4 h-4 text-purple-600 mr-2" />
                            <span className="text-purple-700 font-medium text-sm">
                                Trusted by 100+ Clients Worldwide
                            </span>
                        </div>

                        {/* Main Heading */}
                        <div>
                            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
                                Crafting
                                <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    Digital Magic
                                </span>
                                <span className="text-4xl md:text-5xl text-gray-600">That Works</span>
                            </h1>
                        </div>

                        {/* Description */}
                        <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                            Transform your vision into reality with cutting-edge web development,
                            stunning mobile apps, and immersive 3D experiences that captivate
                            your audience and drive business growth.
                        </p>

                        {/* Rotating Services Display */}
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                            <div className="flex items-center mb-4">
                                <span className="text-gray-700 font-medium">Currently featuring:</span>
                                <div className="ml-3 flex space-x-1">
                                    {services.map((_, index) => (
                                        <div
                                            key={index}
                                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentService ? 'bg-purple-600 w-6' : 'bg-gray-300'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="relative h-20">
                                {services.map((service, index) => {
                                    const Icon = service.icon;
                                    return (
                                        <div
                                            key={index}
                                            className={`absolute inset-0 transition-all duration-700 ${index === currentService
                                                ? 'opacity-100 translate-y-0 scale-100'
                                                : 'opacity-0 translate-y-8 scale-95'
                                                }`}
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className={`p-3 rounded-xl bg-gradient-to-br ${service.color.includes('purple')
                                                    ? 'from-purple-100 to-purple-200'
                                                    : service.color.includes('blue')
                                                        ? 'from-blue-100 to-blue-200'
                                                        : 'from-indigo-100 to-indigo-200'
                                                    }`}>
                                                    <Icon className={`w-6 h-6 ${service.color}`} />
                                                </div>
                                                <div>
                                                    <h3 className={`text-xl font-bold ${service.color}`}>
                                                        {service.text}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm mt-1">
                                                        {service.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-2">
                                <span>Start Your Project</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button className="group px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold border-2 border-gray-200 hover:border-purple-300 hover:text-purple-600 transition-all duration-300 flex items-center justify-center space-x-2">
                                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span>Watch Demo</span>
                            </button>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex items-center justify-center lg:justify-start space-x-8 pt-8 border-t border-gray-100">
                            <div className="text-center">
                                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">150+</div>
                                <div className="text-gray-600 text-sm">Projects Delivered</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">98%</div>
                                <div className="text-gray-600 text-sm">Client Satisfaction</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">24/7</div>
                                <div className="text-gray-600 text-sm">Support Available</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Visual Elements */}
                    <div className="relative h-[600px] lg:h-[700px]">
                        {/* Main 3D Card */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative perspective-1000">
                                <div className="w-80 h-96 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl border border-gray-100 p-8 transform rotate-y-12 hover:rotate-y-0 transition-transform duration-700">
                                    {/* Browser Header */}
                                    <div className="flex items-center space-x-2 mb-6">
                                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                        <div className="flex-1 h-6 bg-gray-100 rounded ml-4"></div>
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-4">
                                        <div className="h-8 bg-gradient-to-r from-purple-200 to-blue-200 rounded-lg"></div>
                                        <div className="h-6 bg-gradient-to-r from-blue-200 to-indigo-200 rounded w-3/4"></div>
                                        <div className="h-6 bg-gradient-to-r from-indigo-200 to-purple-200 rounded w-1/2"></div>

                                        <div className="grid grid-cols-2 gap-4 mt-8">
                                            <div className="h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                                                <Globe className="w-8 h-8 text-purple-600" />
                                            </div>
                                            <div className="h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                                                <Code className="w-8 h-8 text-blue-600" />
                                            </div>
                                            <div className="h-24 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl flex items-center justify-center">
                                                <Smartphone className="w-8 h-8 text-indigo-600" />
                                            </div>  
                                            <div className="h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                                                <Cuboid className="w-8 h-8 text-purple-600" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <FloatingCard delay={0} className="top-20 left-10">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl shadow-lg flex items-center justify-center">
                                <Code className="w-8 h-8 text-white" />
                            </div>
                        </FloatingCard>

                        <FloatingCard delay={1} direction="down" className="top-32 right-12">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg shadow-lg flex items-center justify-center">
                                <Smartphone className="w-6 h-6 text-white" />
                            </div>
                        </FloatingCard>

                        <FloatingCard delay={2} className="bottom-32 left-8">
                            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shadow-lg flex items-center justify-center">
                                <Palette className="w-7 h-7 text-white" />
                            </div>
                        </FloatingCard>

                        <FloatingCard delay={0.5} direction="down" className="bottom-40 right-16">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-lg shadow-lg flex items-center justify-center">
                                <Zap className="w-5 h-5 text-white" />
                            </div>
                        </FloatingCard>

                        {/* Orbiting Elements */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-96 h-96">
                                {services.map((service, index) => {
                                    const Icon = service.icon;
                                    const angle = (index * 360) / services.length;
                                    const radius = 180;
                                    const x = Math.cos((angle * Math.PI) / 180) * radius;
                                    const y = Math.sin((angle * Math.PI) / 180) * radius;

                                    return (
                                        <div
                                            key={index}
                                            className={`absolute w-8 h-8 rounded-full flex items-center justify-center transition-all duration-1000 ${index === currentService
                                                ? 'bg-gradient-to-br from-purple-600 to-blue-600 scale-125 shadow-lg'
                                                : 'bg-white border-2 border-gray-200 scale-100'
                                                }`}
                                            style={{
                                                left: '50%',
                                                top: '50%',
                                                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                                                animationDelay: `${index * 0.5}s`
                                            }}
                                        >
                                            <Icon className={`w-4 h-4 ${index === currentService ? 'text-white' : 'text-gray-400'
                                                }`} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-gradient-to-b from-purple-600 to-blue-600 rounded-full mt-2 animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;