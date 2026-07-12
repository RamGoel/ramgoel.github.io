import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Github, Twitter } from 'lucide-react'
import Image from 'next/image'
import logo from '../media/logo.png'
// import Button from './Button'
import { motion, AnimatePresence } from 'framer-motion'
import Button from './Button'
import { Instrument_Serif } from 'next/font/google'

const serifFont = Instrument_Serif({
    weight: ['400'],
    subsets: ['latin'],
})

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY
            setIsScrolled(scrollPosition > 100)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <motion.header
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                width: isScrolled ? '70%' : '95%',
                left: isScrolled ? '15%' : '2.5%',
            }}
            transition={{
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 1,
                width: { duration: 0.5, ease: 'easeInOut' },
                left: { duration: 0.5, ease: 'easeInOut' },
            }}
            className={`bg-transparent fixed top-6 flex items-center right-0 z-50 rounded-[18px] border-[#383838] text-white px-[20px] min-h-[85px] p-[16px]`}
        >
            <div className="w-full mx-auto flex items-center justify-between">
                {/* Logo and Brand */}
                <div className="flex items-center gap-[32px]">
                    <div className="flex items-center gap-4">
                        <Image
                            src={logo}
                            alt="supermemory"
                            width={39}
                            height={32}
                        />
                        <AnimatePresence>
                            {/* {!isScrolled && ( */}
                                <motion.div
                                    initial={{ opacity: 1, width: 212 }}
                                    animate={{ opacity: 1, width: 212 }}
                                    exit={{
                                        opacity: 0,
                                        width: 0,
                                        transition: {
                                            duration: 0.3,
                                            ease: 'easeInOut',
                                        },
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        ease: 'easeInOut',
                                    }}
                                >
                                    <span className={`${serifFont.className} text-[24px]`}>
                                        The
                                        <span className="text-[24px] mx-[2px] font-semibold text-[var(--primary-color)]">
                                            Growth
                                        </span>
                                        Square
                                    </span>
                                </motion.div>
                            {/* )} */}
                        </AnimatePresence>
                    </div>

                    {/* Navigation Links */}
                </div>

                {/* Right Side - Social Stats and CTA */}
                <div className="flex items-center space-x-6">
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/docs"
                            className="text-[12px] uppercase tracking-wide hover:underline transition-colors"
                        >
                            Testimonials
                        </Link>
                        <Link
                            href="/blog"
                            className="text-[12px] uppercase tracking-wide hover:underline transition-colors"
                        >
                            Services
                        </Link>
                        <Link
                            href="/pricing"
                            className="text-[12px] uppercase tracking-wide hover:underline transition-colors"
                        >
                            Case Studies
                        </Link>
                    </nav>

                    {/* CTA Button */}
                    <Button size="sm" text="Work with us" className='uppercase' />
                </div>
            </div>

            {/* Mobile Navigation */}
            <nav className="md:hidden mt-4 flex space-x-6">
                <Link
                    href="/blog"
                    className="text-gray-300 hover:text-white transition-colors"
                >
                    Blog
                </Link>
                <Link
                    href="/docs"
                    className="text-gray-300 hover:text-white transition-colors"
                >
                    Docs
                </Link>
                <Link
                    href="/pricing"
                    className="text-gray-300 hover:text-white transition-colors"
                >
                    Pricing
                </Link>
            </nav>
        </motion.header>
    )
}

export default Header
