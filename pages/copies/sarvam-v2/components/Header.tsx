import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import Button from './Button'

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
            animate={{
                opacity: 1,
                width: isScrolled ? '70%' : '95%',
                left: isScrolled ? '15%' : '2.5%',
                top: isScrolled ? '0px' : '60px',
            }}
            transition={{
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
                top: { duration: 0.1, ease: 'easeInOut' },
                delay: 1,
                width: { duration: 0.5, ease: 'easeInOut' },
                left: { duration: 0.5, ease: 'easeInOut' },
            }}
            className={`bg-transparent fixed top-20 flex items-center right-0 z-50 rounded-[18px] border-[#383838] text-black px-[20px] min-h-[85px] p-[16px]`}
        >
            <div className="w-full mx-auto flex items-center justify-between">
                {/* Logo and Brand */}
                <div className="flex items-center gap-[32px]">
                    <div className="flex items-center gap-4">
                        <Image
                            src={'https://cdn.prod.website-files.com/66a90e7788df6d0dc5ef83dd/66aa072e3ce41ce867af32ad_sarvam-logo-grey.svg'}
                            alt="supermemory"
                            width={100}
                            height={100}
                        />
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
                            Products
                        </Link>
                        <Link
                            href="/blog"
                            className="text-[12px] uppercase tracking-wide hover:underline transition-colors"
                        >
                            Company
                        </Link>
                        <Link
                            href="/pricing"
                            className="text-[12px] uppercase tracking-wide hover:underline transition-colors"
                        >
                            Blog
                        </Link>
                        <Link
                            href="/pricing"
                            className="text-[12px] uppercase tracking-wide hover:underline transition-colors"
                        >
                            Careers
                        </Link>
                    </nav>

                    {/* CTA Button */}
                    <Button size="sm" text="Request a demo" className='uppercase' />
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
