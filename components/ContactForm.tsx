"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    ArrowRight,
    ArrowLeft,
    Check,
    Globe,
    Code,
    Smartphone,
    Cuboid,
    Palette,
    Zap,
    User,
    Mail,
    Phone,
    Building,
    DollarSign,
    FileText,
    Upload,
    X,
    CheckCircle,
    AlertCircle,
    MessageSquare,
    Clock,
    Users,
    Target,
} from "lucide-react"

interface Service {
    id: string
    name: string
    icon: React.ComponentType<any>
    description: string
    color: string
}

interface FormData {
    // Step 1: Service Selection
    selectedServices: string[]
    primaryService: string

    // Step 2: Project Details
    budget: string
    timeline: string
    projectType: string
    urgency: string

    // Step 3: Contact Information
    firstName: string
    lastName: string
    email: string
    phone: string
    company: string
    position: string

    // Step 4: Additional Information
    projectDescription: string
    goals: string
    targetAudience: string
    inspiration: string
    additionalRequirements: string
    files: File[]
}

const ContactForm: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState<FormData>({
        selectedServices: [],
        primaryService: "",
        budget: "",
        timeline: "",
        projectType: "",
        urgency: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        position: "",
        projectDescription: "",
        goals: "",
        targetAudience: "",
        inspiration: "",
        additionalRequirements: "",
        files: [],
    })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const totalSteps = 5

    const services: Service[] = [
        {
            id: "website",
            name: "Website Development",
            icon: Globe,
            description: "Professional business websites with modern design",
            color: "text-purple-600",
        },
        {
            id: "webapp",
            name: "Web Application",
            icon: Code,
            description: "Custom web applications with advanced functionality",
            color: "text-orange-500",
        },
        {
            id: "mobile",
            name: "Mobile App Development",
            icon: Smartphone,
            description: "Native iOS & Android mobile applications",
            color: "text-yellow-400",
        },
        {
            id: "3d",
            name: "3D Experiences",
            icon: Cuboid,
            description: "Immersive 3D web experiences with WebGL",
            color: "text-purple-500",
        },
        {
            id: "design",
            name: "UI/UX Design",
            icon: Palette,
            description: "Complete design systems and user experience",
            color: "text-orange-400",
        },
        {
            id: "consulting",
            name: "Technical Consulting",
            icon: Zap,
            description: "Strategic guidance and technical expertise",
            color: "text-yellow-500",
        },
    ]

    const budgetRanges = [
        { value: "5k-10k", label: "$5,000 - $10,000" },
        { value: "10k-25k", label: "$10,000 - $25,000" },
        { value: "25k-50k", label: "$25,000 - $50,000" },
        { value: "50k-100k", label: "$50,000 - $100,000" },
        { value: "100k+", label: "$100,000+" },
        { value: "discuss", label: "Let's discuss" },
    ]

    const timelineOptions = [
        { value: "asap", label: "ASAP (Rush)" },
        { value: "1-2months", label: "1-2 months" },
        { value: "3-6months", label: "3-6 months" },
        { value: "6months+", label: "6+ months" },
        { value: "flexible", label: "Flexible" },
    ]

    const updateFormData = (field: keyof FormData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }))
        }
    }

    const validateStep = (step: number): boolean => {
        const newErrors: Record<string, string> = {}

        switch (step) {
            case 1:
                if (formData.selectedServices.length === 0) {
                    newErrors.selectedServices = "Please select at least one service"
                }
                if (!formData.primaryService) {
                    newErrors.primaryService = "Please select your primary service"
                }
                break
            case 2:
                if (!formData.budget) newErrors.budget = "Please select your budget range"
                if (!formData.timeline) newErrors.timeline = "Please select your preferred timeline"
                break
            case 3:
                if (!formData.firstName) newErrors.firstName = "First name is required"
                if (!formData.lastName) newErrors.lastName = "Last name is required"
                if (!formData.email) newErrors.email = "Email is required"
                if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
                    newErrors.email = "Please enter a valid email"
                }
                break
            case 4:
                if (!formData.projectDescription) {
                    newErrors.projectDescription = "Please describe your project"
                }
                break
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
        }
    }

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1))
    }

    const handleServiceToggle = (serviceId: string) => {
        const updatedServices = formData.selectedServices.includes(serviceId)
            ? formData.selectedServices.filter((id) => id !== serviceId)
            : [...formData.selectedServices, serviceId]

        updateFormData("selectedServices", updatedServices)

        // If primary service is deselected, clear it
        if (!updatedServices.includes(formData.primaryService)) {
            updateFormData("primaryService", "")
        }
    }

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || [])
        updateFormData("files", [...formData.files, ...files])
    }

    const removeFile = (index: number) => {
        const updatedFiles = formData.files.filter((_, i) => i !== index)
        updateFormData("files", updatedFiles)
    }

    const handleSubmit = async () => {
        if (!validateStep(4)) return

        setIsSubmitting(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000))

        setIsSubmitting(false)
        setIsSubmitted(true)
    }

    const getStepTitle = (step: number) => {
        switch (step) {
            case 1:
                return "Select Services"
            case 2:
                return "Project Details"
            case 3:
                return "Contact Information"
            case 4:
                return "Additional Information"
            case 5:
                return "Review & Submit"
            default:
                return ""
        }
    }

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold text-purple-600 mb-2">What services do you need?</h3>
                            <p className="text-gray-600">Select all services that apply to your project</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            {services.map((service) => {
                                const Icon = service.icon
                                const isSelected = formData.selectedServices.includes(service.id)
                                return (
                                    <button
                                        key={service.id}
                                        onClick={() => handleServiceToggle(service.id)}
                                        className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${isSelected
                                            ? "border-orange-400 bg-orange-50"
                                            : "border-gray-200 hover:border-yellow-400 hover:bg-yellow-50"
                                            }`}
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center">
                                                <Icon className={`w-6 h-6 mr-3 ${service.color}`} />
                                                <h4 className="font-semibold text-purple-600">{service.name}</h4>
                                            </div>
                                            {isSelected && <CheckCircle className="w-5 h-5 text-orange-500" />}
                                        </div>
                                        <p className="text-gray-600 text-sm">{service.description}</p>
                                    </button>
                                )
                            })}
                        </div>

                        {formData.selectedServices.length > 0 && (
                            <div>
                                <h4 className="text-lg font-semibold text-purple-600 mb-4">Which is your primary service?</h4>
                                <div className="grid md:grid-cols-3 gap-3">
                                    {formData.selectedServices.map((serviceId) => {
                                        const service = services.find((s) => s.id === serviceId)
                                        if (!service) return null
                                        const Icon = service.icon
                                        return (
                                            <button
                                                key={serviceId}
                                                onClick={() => updateFormData("primaryService", serviceId)}
                                                className={`p-4 rounded-lg border-2 transition-all duration-300 ${formData.primaryService === serviceId
                                                    ? "border-yellow-400 bg-yellow-50"
                                                    : "border-gray-200 hover:border-orange-400"
                                                    }`}
                                            >
                                                <Icon className={`w-5 h-5 mx-auto mb-2 ${service.color}`} />
                                                <span className="text-sm font-medium text-purple-600">{service.name}</span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {errors.selectedServices && (
                            <p className="text-red-500 text-sm flex items-center">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                {errors.selectedServices}
                            </p>
                        )}
                        {errors.primaryService && (
                            <p className="text-red-500 text-sm flex items-center">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                {errors.primaryService}
                            </p>
                        )}
                    </div>
                )

            case 2:
                return (
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold text-purple-600 mb-2">Project Details</h3>
                            <p className="text-gray-600">Help us understand your project requirements</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-lg font-semibold text-orange-500 mb-4">
                                    <DollarSign className="w-5 h-5 inline mr-2" />
                                    What's your budget range?
                                </label>
                                <div className="space-y-3">
                                    {budgetRanges.map((range) => (
                                        <button
                                            key={range.value}
                                            onClick={() => updateFormData("budget", range.value)}
                                            className={`w-full p-3 rounded-lg border-2 text-left transition-all duration-300 ${formData.budget === range.value
                                                ? "border-yellow-400 bg-yellow-50 text-purple-600"
                                                : "border-gray-200 hover:border-orange-400 text-gray-700"
                                                }`}
                                        >
                                            {range.label}
                                        </button>
                                    ))}
                                </div>
                                {errors.budget && (
                                    <p className="text-red-500 text-sm mt-2 flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {errors.budget}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-lg font-semibold text-orange-500 mb-4">
                                    <Clock className="w-5 h-5 inline mr-2" />
                                    When do you need this completed?
                                </label>
                                <div className="space-y-3">
                                    {timelineOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => updateFormData("timeline", option.value)}
                                            className={`w-full p-3 rounded-lg border-2 text-left transition-all duration-300 ${formData.timeline === option.value
                                                ? "border-yellow-400 bg-yellow-50 text-purple-600"
                                                : "border-gray-200 hover:border-orange-400 text-gray-700"
                                                }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                                {errors.timeline && (
                                    <p className="text-red-500 text-sm mt-2 flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {errors.timeline}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )

            case 3:
                return (
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold text-purple-600 mb-2">Contact Information</h3>
                            <p className="text-gray-600">Let's get to know you better</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-orange-500 mb-2">
                                    <User className="w-4 h-4 inline mr-1" />
                                    First Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.firstName}
                                    onChange={(e) => updateFormData("firstName", e.target.value)}
                                    className={`w-full p-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.firstName ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-yellow-400"
                                        }`}
                                    placeholder="John"
                                />
                                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-orange-500 mb-2">
                                    <User className="w-4 h-4 inline mr-1" />
                                    Last Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.lastName}
                                    onChange={(e) => updateFormData("lastName", e.target.value)}
                                    className={`w-full p-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.lastName ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-yellow-400"
                                        }`}
                                    placeholder="Doe"
                                />
                                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-orange-500 mb-2">
                                    <Mail className="w-4 h-4 inline mr-1" />
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => updateFormData("email", e.target.value)}
                                    className={`w-full p-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.email ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-yellow-400"
                                        }`}
                                    placeholder="john@example.com"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-orange-500 mb-2">
                                    <Phone className="w-4 h-4 inline mr-1" />
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => updateFormData("phone", e.target.value)}
                                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-yellow-400 transition-colors"
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-orange-500 mb-2">
                                    <Building className="w-4 h-4 inline mr-1" />
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.company}
                                    onChange={(e) => updateFormData("company", e.target.value)}
                                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-yellow-400 transition-colors"
                                    placeholder="Your Company"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-orange-500 mb-2">
                                    <Users className="w-4 h-4 inline mr-1" />
                                    Your Position
                                </label>
                                <input
                                    type="text"
                                    value={formData.position}
                                    onChange={(e) => updateFormData("position", e.target.value)}
                                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-yellow-400 transition-colors"
                                    placeholder="CEO, Marketing Manager, etc."
                                />
                            </div>
                        </div>
                    </div>
                )

            case 4:
                return (
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold text-purple-600 mb-2">Tell Us More</h3>
                            <p className="text-gray-600">Additional details to help us understand your vision</p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-orange-500 mb-2">
                                    <MessageSquare className="w-4 h-4 inline mr-1" />
                                    Project Description *
                                </label>
                                <textarea
                                    value={formData.projectDescription}
                                    onChange={(e) => updateFormData("projectDescription", e.target.value)}
                                    rows={4}
                                    className={`w-full p-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.projectDescription
                                        ? "border-red-500 focus:border-red-500"
                                        : "border-gray-200 focus:border-yellow-400"
                                        }`}
                                    placeholder="Describe your project in detail..."
                                />
                                {errors.projectDescription && <p className="text-red-500 text-sm mt-1">{errors.projectDescription}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-orange-500 mb-2">
                                    <Target className="w-4 h-4 inline mr-1" />
                                    Project Goals
                                </label>
                                <textarea
                                    value={formData.goals}
                                    onChange={(e) => updateFormData("goals", e.target.value)}
                                    rows={3}
                                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-yellow-400 transition-colors"
                                    placeholder="What do you hope to achieve with this project?"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-orange-500 mb-2">
                                    <Users className="w-4 h-4 inline mr-1" />
                                    Target Audience
                                </label>
                                <input
                                    type="text"
                                    value={formData.targetAudience}
                                    onChange={(e) => updateFormData("targetAudience", e.target.value)}
                                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-yellow-400 transition-colors"
                                    placeholder="Who is your target audience?"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-orange-500 mb-2">
                                    <FileText className="w-4 h-4 inline mr-1" />
                                    Inspiration & References
                                </label>
                                <textarea
                                    value={formData.inspiration}
                                    onChange={(e) => updateFormData("inspiration", e.target.value)}
                                    rows={3}
                                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-yellow-400 transition-colors"
                                    placeholder="Share any websites, designs, or ideas that inspire you..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-orange-500 mb-2">
                                    <Upload className="w-4 h-4 inline mr-1" />
                                    Upload Files (Optional)
                                </label>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-yellow-400 transition-colors cursor-pointer text-center"
                                >
                                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-gray-600">Click to upload files or drag and drop</p>
                                    <p className="text-sm text-gray-500">Images, documents, mockups, etc.</p>
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    accept="image/*,.pdf,.doc,.docx,.txt"
                                />

                                {formData.files.length > 0 && (
                                    <div className="mt-4 space-y-2">
                                        {formData.files.map((file, index) => (
                                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                                <span className="text-sm text-gray-700">{file.name}</span>
                                                <button onClick={() => removeFile(index)} className="text-red-500 hover:text-red-700">
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )

            case 5:
                return (
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold text-purple-600 mb-2">Review Your Information</h3>
                            <p className="text-gray-600">Please review your details before submitting</p>
                        </div>

                        <div className="space-y-6">
                            {/* Services */}
                            <div className="bg-purple-50 rounded-lg p-6">
                                <h4 className="font-semibold text-purple-600 mb-3">Selected Services</h4>
                                <div className="space-y-2">
                                    {formData.selectedServices.map((serviceId) => {
                                        const service = services.find((s) => s.id === serviceId)
                                        const isPrimary = serviceId === formData.primaryService
                                        return (
                                            <div key={serviceId} className="flex items-center">
                                                <CheckCircle className="w-4 h-4 text-orange-500 mr-2" />
                                                <span className={isPrimary ? "font-semibold text-yellow-600" : "text-gray-700"}>
                                                    {service?.name} {isPrimary && "(Primary)"}
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Project Details */}
                            <div className="bg-orange-50 rounded-lg p-6">
                                <h4 className="font-semibold text-orange-500 mb-3">Project Details</h4>
                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-600">Budget:</span>
                                        <span className="ml-2 font-medium">
                                            {budgetRanges.find((b) => b.value === formData.budget)?.label}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Timeline:</span>
                                        <span className="ml-2 font-medium">
                                            {timelineOptions.find((t) => t.value === formData.timeline)?.label}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="bg-yellow-50 rounded-lg p-6">
                                <h4 className="font-semibold text-yellow-600 mb-3">Contact Information</h4>
                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-600">Name:</span>
                                        <span className="ml-2 font-medium">
                                            {formData.firstName} {formData.lastName}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Email:</span>
                                        <span className="ml-2 font-medium">{formData.email}</span>
                                    </div>
                                    {formData.phone && (
                                        <div>
                                            <span className="text-gray-600">Phone:</span>
                                            <span className="ml-2 font-medium">{formData.phone}</span>
                                        </div>
                                    )}
                                    {formData.company && (
                                        <div>
                                            <span className="text-gray-600">Company:</span>
                                            <span className="ml-2 font-medium">{formData.company}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Project Description */}
                            {formData.projectDescription && (
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h4 className="font-semibold text-purple-600 mb-3">Project Description</h4>
                                    <p className="text-gray-700 text-sm">{formData.projectDescription}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )

            default:
                return null
        }
    }

    if (isSubmitted) {
        return (
            <div className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                        <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-purple-600 mb-4">Thank You!</h2>
                        <p className="text-xl text-gray-600 mb-6">Your project inquiry has been submitted successfully.</p>
                        <p className="text-gray-600 mb-8">
                            We'll review your information and get back to you within 24 hours with a detailed proposal.
                        </p>
                        <button
                            onClick={() => {
                                setIsSubmitted(false)
                                setCurrentStep(1)
                                setFormData({
                                    selectedServices: [],
                                    primaryService: "",
                                    budget: "",
                                    timeline: "",
                                    projectType: "",
                                    urgency: "",
                                    firstName: "",
                                    lastName: "",
                                    email: "",
                                    phone: "",
                                    company: "",
                                    position: "",
                                    projectDescription: "",
                                    goals: "",
                                    targetAudience: "",
                                    inspiration: "",
                                    additionalRequirements: "",
                                    files: [],
                                })
                            }}
                            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-orange-600 transition-colors"
                        >
                            Submit Another Project
                        </button>
                    </motion.div>
                </div>
            </div>
        )
    }

    return (
        <div className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Let's{" "}
                        <span className="bg-gradient-to-r from-purple-600 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
                            Start Your Project
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600">Tell us about your vision and we'll bring it to life</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-12">
                    {/* Progress Steps */}
                    <div className="flex items-center justify-between mb-8">
                        {[1, 2, 3, 4].map((step) => (
                            <div key={step} className="flex flex-col items-center">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${currentStep >= step
                                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-400'
                                        }`}
                                >
                                    {step}
                                </div>
                                {step < 4 && (
                                    <div
                                        className={`h-1 w-full mt-2 ${currentStep > step
                                            ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                                            : 'bg-gray-100'
                                            }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="text-center">
                        <span className="text-sm font-medium text-gray-600">
                            Step {currentStep} of {totalSteps}: {getStepTitle(currentStep)}
                        </span>
                    </div>
                </div>

                {/* Form Content */}
                <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {renderStep()}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center ${currentStep === 1
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Previous
                    </button>

                    {currentStep < totalSteps ? (
                        <button
                            onClick={nextStep}
                            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-orange-600 transition-colors flex items-center"
                        >
                            Next
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-orange-600 transition-colors flex items-center disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    Submit Project
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ContactForm
