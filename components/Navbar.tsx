'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Code, ChevronDown, Phone, Mail, XCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface DropdownItem {
    name: string;
    href: string;
}

interface NavItem {
    name: string;
    href: string;
    dropdown?: DropdownItem[];
}

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [randomCode, setRandomCode] = useState<string>('');
    const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Generate random code
    const generateRandomCode = () => {
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        setRandomCode(code);
    };

    // Generate random image URL
    const getRandomImage = () => {
        const images = [
            '/img1.jpg',
            '/img2.jpg',
            '/img3.jpg',
            '/img4.jpg',
        ];
        return images[Math.floor(Math.random() * images.length)];
    };

    useEffect(() => {
        if (isModalOpen) {
            generateRandomCode();
        }
    }, [isModalOpen]);

    useEffect(() => {
        const handleScroll = (): void => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems: NavItem[] = [
        { name: 'Home', href: '#home' },
        {
            name: 'Services',
            href: '#services',
            dropdown: [
                { name: 'Web Development', href: '#web-dev' },
                { name: 'Mobile Apps', href: '#mobile-apps' },
                { name: '3D Websites', href: '#3d-websites' },
                { name: 'Web Applications', href: '#web-apps' },
                { name: 'UI/UX Design', href: '#design' }
            ]
        },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'About', href: '#about' },
        { name: 'Blog', href: '#blog' },
        { name: 'Contact', href: '#contact' }
    ];

    const handleMenuItemClick = (hasDropdown: boolean): void => {
        if (!hasDropdown) {
            setIsMenuOpen(false);
        }
    };

    const handleDropdownEnter = (index: number, hasDropdown: boolean): void => {
        if (dropdownTimeoutRef.current) {
            clearTimeout(dropdownTimeoutRef.current);
        }
        if (hasDropdown) {
            setActiveDropdown(index);
        }
    };

    const handleDropdownLeave = (): void => {
        dropdownTimeoutRef.current = setTimeout(() => {
            setActiveDropdown(null);
        }, 200); // 200ms delay before hiding
    };

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (dropdownTimeoutRef.current) {
                clearTimeout(dropdownTimeoutRef.current);
            }
        };
    }, []);

    return (
        <>
            <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white backdrop-blur-md shadow-lg border-b border-gray-100'
                : 'bg-white backdrop-blur-sm'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 lg:h-20">

                        {/* Logo */}
                        <div className="flex items-center space-x-2">
                            <div className="relative">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                                    <Code className="w-6 h-6 text-white" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full animate-pulse"></div>
                            </div>
                            <Link href="/">
                                <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                    CodeCraft
                                </h1>
                                <p className="text-xs text-gray-500 -mt-1">Studios</p>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-8">
                            {navItems.map((item: NavItem, index: number) => (
                                <div
                                    key={index}
                                    className="relative group"
                                    onMouseEnter={() => handleDropdownEnter(index, !!item.dropdown)}
                                    onMouseLeave={handleDropdownLeave}
                                >
                                    <a
                                        href={item.href}
                                        className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 py-2"
                                    >
                                        <span>{item.name}</span>
                                        {item.dropdown && (
                                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === index ? 'rotate-180' : ''
                                                }`} />
                                        )}
                                    </a>

                                    {/* Dropdown Menu */}
                                    {item.dropdown && activeDropdown === index && (
                                        <div
                                            className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 animate-in slide-in-from-top-2 duration-200"
                                            onMouseEnter={() => handleDropdownEnter(index, true)}
                                            onMouseLeave={handleDropdownLeave}
                                        >
                                            {item.dropdown.map((dropdownItem: DropdownItem, dropIndex: number) => (
                                                <a
                                                    key={dropIndex}
                                                    href={dropdownItem.href}
                                                    className="block px-4 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors duration-150"
                                                >
                                                    {dropdownItem.name}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Contact Info & CTA */}
                        <div className="hidden lg:flex items-center space-x-6">
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <div className="flex items-center space-x-1">
                                    <Phone className="w-4 h-4 text-purple-600" />
                                    <span>+91 8700437332</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Mail className="w-4 h-4 text-blue-600" />
                                    <span>hello@codecraft.dev</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-md"
                            >
                                Get Quote
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors duration-200"
                            aria-label="Toggle mobile menu"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg animate-in slide-in-from-top-2 duration-200">
                        <div className="px-4 py-6 space-y-4">
                            {navItems.map((item: NavItem, index: number) => (
                                <div key={index}>
                                    <a
                                        href={item.href}
                                        className="flex items-center justify-between py-3 text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200"
                                        onClick={() => handleMenuItemClick(!!item.dropdown)}
                                    >
                                        <span>{item.name}</span>
                                        {item.dropdown && (
                                            <ChevronDown className="w-4 h-4" />
                                        )}
                                    </a>

                                    {/* Mobile Dropdown */}
                                    {item.dropdown && (
                                        <div className="ml-4 space-y-2 border-l-2 border-purple-100 pl-4">
                                            {item.dropdown.map((dropdownItem: DropdownItem, dropIndex: number) => (
                                                <a
                                                    key={dropIndex}
                                                    href={dropdownItem.href}
                                                    className="block py-2 text-gray-600 hover:text-purple-600 transition-colors duration-150"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    {dropdownItem.name}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Mobile Contact & CTA */}
                            <div className="pt-6 border-t border-gray-100 space-y-4">
                                <div className="space-y-2 text-sm text-gray-600">
                                    <div className="flex items-center space-x-2">
                                        <Phone className="w-4 h-4 text-purple-600" />
                                        <span>+1 (555) 123-4567</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Mail className="w-4 h-4 text-blue-600" />
                                        <span>hello@codecraft.dev</span>
                                    </div>
                                </div>

                                <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-md">
                                    Get Quote
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl max-w-2xl w-full overflow-hidden relative shadow-2xl border border-white/20">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10 bg-white/80 backdrop-blur-sm rounded-full p-1 hover:bg-white transition-all duration-200"
                        >
                            <XCircle className="w-6 h-6" />
                        </button>

                        <div className="grid md:grid-cols-2">
                            {/* Left Side - Image */}
                            <div className="relative h-64 md:h-full">
                                <Image
                                    src={getRandomImage()}
                                    alt="Random Tech Image"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            </div>

                            {/* Right Side - Content */}
                            <div className="p-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                    Your Unique Quote Code
                                </h2>
                                <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl mb-6 border border-white/20">
                                    <p className="text-sm text-gray-600 mb-2">Use this code when contacting us:</p>
                                    <div className="text-3xl font-mono font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                        {randomCode}
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-6">
                                    This code helps us track your quote request and provide you with the best possible service.
                                </p>
                                <div className="space-y-4">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-md"
                                    >
                                        Close
                                    </button>
                                    <button
                                        onClick={() => {
                                            generateRandomCode();
                                        }}
                                        className="w-full px-6 py-3 border-2 border-purple-200 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all duration-200"
                                    >
                                        Generate New Code
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;