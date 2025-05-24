'use client'
import { motion } from 'framer-motion'
import { PhoneCall, Star, TrendingUp, Shield, Users, Award, Play, ArrowRight, CheckCircle } from 'lucide-react'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import { useState } from 'react'
import { MdAccountBalance, MdSecurity, MdTrendingUp } from 'react-icons/md'

const font = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
})

// Animation variants
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

const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: 'easeOut',
        },
    },
}

const shimmerVariants = {
    initial: { backgroundPosition: '-200% 0' },
    animate: {
        backgroundPosition: '200% 0',
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
}

// Shimmer Button Component
interface ShimmerButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const ShimmerButton = ({ children, className = '', onClick, size = 'lg' }: ShimmerButtonProps) => {
    const sizeClasses: Record<string, string> = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
        xl: 'px-10 py-5 text-xl',
    }

    return (
        <motion.button
            onClick={onClick}
            className={`
                relative overflow-hidden font-bold rounded-2xl border-2 border-transparent
                bg-gradient-to-r from-[#1ABC9C] via-[#16A085] to-[#1ABC9C]
                text-white shadow-2xl transform transition-all duration-300
                hover:scale-105 hover:shadow-teal-500/25 active:scale-95
                ${sizeClasses[size]} ${className}
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
                backgroundSize: '200% 100%',
            }}
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
        >
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                style={{
                    backgroundSize: '200% 100%',
                }}
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
            />
            <span className="relative z-10 flex items-center gap-2">
                {children}
            </span>
        </motion.button>
    )
}

export default function SanjayPortfolio() {
    const [isVideoOpen, setIsVideoOpen] = useState(false)

    return (
        <div
            className={`min-h-screen bg-white ${font.className}`}
        >
            {/* Enhanced Navigation */}
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-[#BDC3C7]/20"
            >
                <div className="container mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <motion.div 
                            className="flex items-center gap-3"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="relative">
                                <Image
                                    src="/logo.png"
                                    alt="Sanjay Kathuria"
                                    width={50}
                                    height={50}
                                    className="rounded-full ring-2 ring-[#1ABC9C]/50"
                                />
                                <div className="absolute -inset-1 bg-gradient-to-r from-[#1ABC9C] to-[#16A085] rounded-full blur opacity-30"></div>
                            </div>
                            <div>
                                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2C3E50] to-[#1ABC9C]">
                                    ProfitsFirst
                                </span>
                                <div className="text-xs text-[#2C3E50]/70 font-medium">Wealth Management</div>
                            </div>
                        </motion.div>
                        
                        <div className="hidden md:flex space-x-8 items-center">
                            {['About', 'Services', 'Results', 'Contact'].map(
                                (item, index) => (
                                    <motion.a
                                        key={item}
                                        href={`#${item.toLowerCase()}`}
                                        whileHover={{
                                            scale: 1.1,
                                            y: -2,
                                        }}
                                        className="text-[#2C3E50]/80 hover:text-[#1ABC9C] transition-all duration-300 font-medium relative group"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        {item}
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#1ABC9C] to-[#16A085] group-hover:w-full transition-all duration-300"></span>
                                    </motion.a>
                                )
                            )}

                            <ShimmerButton size="sm">
                                <PhoneCall size={16} />
                                Book Free Consultation
                            </ShimmerButton>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Enhanced Hero Section */}
            <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
                {/* Background Elements */}
                {/* <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#1ABC9C]/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#2C3E50]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-[#BDC3C7]/5 to-[#1ABC9C]/5 rounded-full blur-3xl"></div>
                </div> */}

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col lg:flex-row items-center justify-between gap-12"
                    >
                        {/* Hero Content */}
                        <div className="flex-1 text-left space-y-8">
                            {/* Trust Badge */}
                            <motion.div
                                variants={fadeInUp}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1ABC9C]/10 to-[#16A085]/10 backdrop-blur-sm border border-[#1ABC9C]/30 rounded-full px-4 py-2"
                            >
                                <Star className="text-[#1ABC9C]" size={16} />
                                <span className="text-[#2C3E50] text-sm font-medium">
                                    India's Top 1% Financial Advisor
                                </span>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="text-[#1ABC9C] fill-[#1ABC9C]" size={12} />
                                    ))}
                                </div>
                            </motion.div>

                            <motion.h1
                                variants={fadeInUp}
                                className="text-5xl lg:text-7xl font-black text-[#2C3E50] leading-tight"
                            >
                                Transform Your
                                <br />
                                <motion.span
                                    className="text-transparent bg-clip-text bg-gradient-to-r from-[#1ABC9C] via-[#16A085] to-[#1ABC9C]"
                                    animate={{
                                        backgroundPosition: ['0%', '100%', '0%'],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                    style={{ backgroundSize: '200% 100%' }}
                                >
                                    Financial Destiny
                                </motion.span>
                            </motion.h1>

                            <motion.p
                                variants={fadeInUp}
                                className="text-xl lg:text-2xl text-[#2C3E50]/70 font-light leading-relaxed max-w-2xl"
                            >
                                Join 5000+ successful investors who've multiplied their wealth with 
                                <span className="font-semibold text-[#1ABC9C]"> Sanjay Kathuria's </span>
                                proven strategies. From ₹1L to ₹1Cr+ journeys start here.
                            </motion.p>

                            {/* Enhanced Stats */}
                            <motion.div
                                variants={fadeInUp}
                                className="grid grid-cols-3 gap-6 max-w-2xl"
                            >
                                {[
                                    { number: '15+', label: 'Years Experience', icon: Award },
                                    { number: '5000+', label: 'Success Stories', icon: Users },
                                    { number: '₹500Cr+', label: 'Wealth Created', icon: TrendingUp },
                                ].map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        className="bg-white/80 backdrop-blur-sm border border-[#BDC3C7]/30 rounded-xl p-4 text-center hover:bg-white/90 hover:shadow-lg transition-all duration-300"
                                        whileHover={{ scale: 1.05, y: -5 }}
                                    >
                                        <stat.icon className="text-[#1ABC9C] mx-auto mb-2" size={24} />
                                        <div className="text-2xl lg:text-3xl font-bold text-[#2C3E50] mb-1">
                                            {stat.number}
                                        </div>
                                        <div className="text-[#2C3E50]/60 text-sm">
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Enhanced CTAs */}
                            <motion.div
                                variants={fadeInUp}
                                className="flex flex-col sm:flex-row gap-4 pt-4"
                            >
                                <ShimmerButton size="xl" className="flex-1 sm:flex-none">
                                    <TrendingUp size={20} />
                                    Start My Wealth Journey
                                    <ArrowRight size={20} />
                                </ShimmerButton>
                                
                                <motion.button
                                    className="flex items-center justify-center gap-3 px-8 py-4 text-lg font-semibold text-[#2C3E50] bg-white/80 backdrop-blur-sm border border-[#BDC3C7]/40 rounded-2xl hover:bg-white/90 hover:shadow-lg transition-all duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsVideoOpen(true)}
                                >
                                    <div className="bg-[#1ABC9C]/20 rounded-full p-2">
                                        <Play className="text-[#1ABC9C] fill-[#1ABC9C]" size={16} />
                                    </div>
                                    Watch Success Stories
                                </motion.button>
                            </motion.div>

                            {/* Social Proof */}
                            <motion.div
                                variants={fadeInUp}
                                className="flex items-center gap-4 pt-4"
                            >
                                <div className="flex -space-x-2">
                                    {[...Array(4)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-10 h-10 rounded-full bg-gradient-to-r from-[#1ABC9C] to-[#16A085] border-2 border-white flex items-center justify-center text-white text-sm font-bold"
                                        >
                                            {String.fromCharCode(65 + i)}
                                        </div>
                                    ))}
                                </div>
                                <div className="text-[#2C3E50]/70">
                                    <div className="font-semibold">2000+ joined this month</div>
                                    <div className="text-sm">Average return: 15-25% annually</div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Enhanced Hero Image */}
                        <motion.div
                            variants={fadeInUp}
                            className="flex-1 max-w-lg relative"
                        >
                            <div className="relative">                                
                                {/* Main image container */}
                                <div className="relative">
                                    <Image
                                        src="/hero.png"
                                        alt="Sanjay Kathuria - Financial Expert"
                                        width={1000}
                                        height={1000}
                                        className="w-full rounded-2xl"
                                    />
                                    
                                    {/* Floating achievement badges */}
                                    <motion.div
                                        className="absolute -top-4 -right-4 bg-gradient-to-r from-[#1ABC9C] to-[#16A085] rounded-full p-3 shadow-lg"
                                        animate={{ rotate: [0, 10, -10, 0] }}
                                        transition={{ duration: 4, repeat: Infinity }}
                                    >
                                        <CheckCircle className="text-white" size={24} />
                                    </motion.div>
                                    
                                    <motion.div
                                        className="absolute -bottom-4 -left-4 bg-gradient-to-r from-[#2C3E50] to-[#1ABC9C] rounded-xl p-3 shadow-lg"
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                                    >
                                        <TrendingUp className="text-white" size={20} />
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Enhanced Floating Elements */}
                <motion.div
                    className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-[#1ABC9C]/20 to-[#16A085]/20 rounded-full backdrop-blur-sm"
                    animate={{
                        y: [0, -20, 0],
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-[#2C3E50]/20 to-[#1ABC9C]/20 rounded-full backdrop-blur-sm"
                    animate={{
                        y: [0, 20, 0],
                        scale: [1, 0.8, 1],
                        rotate: [360, 180, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            </section>

            {/* Urgency Banner */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="bg-gradient-to-r from-[#2C3E50]/95 to-[#1ABC9C]/95 backdrop-blur-sm border-y border-[#BDC3C7]/30 py-4"
            >
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-center gap-4 text-center">
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="bg-white/20 rounded-full p-2"
                        >
                            <Star className="text-[#1ABC9C]" size={20} />
                        </motion.div>
                        <span className="text-white font-semibold">
                            🔥 Limited Time: Free Portfolio Review for First 100 Clients This Month
                        </span>
                        <ShimmerButton size="sm">
                            Claim Your Spot
                        </ShimmerButton>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
