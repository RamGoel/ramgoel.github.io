import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Github, Twitter } from 'lucide-react'
import Image from 'next/image'
import Button from './Button'
import { motion, AnimatePresence } from 'framer-motion'

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
            initial={{ y: -100, opacity: 0 }}
            animate={{ 
                y: 0, 
                opacity: 1,
                width: isScrolled ? '70%' : '95%',
                left: isScrolled ? '15%' : '2.5%'
            }}
            transition={{ 
                duration: 0.8, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 1,
                width: { duration: 0.5, ease: 'easeInOut' },
                left: { duration: 0.5, ease: 'easeInOut' }
            }}
            style={{
                boxShadow:
                    '0 2px 20px #00000040,inset 0 0 0 4px #06060640,inset 0 4px 2px #54545440',
            }}
            className={`bg-[#21252a] fixed top-6 flex items-center right-0 z-50 border-[1px] rounded-[18px] border-[#383838] text-white px-[20px] min-h-[85px] p-[16px]`}
        >
            <div className="w-full mx-auto flex items-center justify-between">
                {/* Logo and Brand */}
                <div className="flex items-center gap-[32px]">
                    <div className="flex items-center gap-4">
                        <Image
                            src="https://cdn.prod.website-files.com/6826235ef861ed9464b064c8/6826235ef861ed9464b06541_logo.svg"
                            alt="supermemory"
                            width={39}
                            height={32}
                        />
                        <AnimatePresence>
                            {!isScrolled && (
                                <motion.div
                                    initial={{ opacity: 1, width: 212 }}
                                    animate={{ opacity: 1, width: 212 }}
                                    exit={{ 
                                        opacity: 0, 
                                        width: 0,
                                        transition: { duration: 0.3, ease: 'easeInOut' }
                                    }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                >
                                    <Image
                                        src="https://cdn.prod.website-files.com/6826235ef861ed9464b064c8/6826235ef861ed9464b06595_logo-navbag-long.svg"
                                        alt="supermemory"
                                        width={212}
                                        className="mt-2"
                                        height={24}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Navigation Links */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/blog"
                            className="text-[16px] hover:underline transition-colors"
                        >
                            Blog
                        </Link>
                        <Link
                            href="/docs"
                            className="text-[16px] hover:underline transition-colors"
                        >
                            Docs
                        </Link>
                        <Link
                            href="/pricing"
                            className="text-[16px] hover:underline transition-colors"
                        >
                            Pricing
                        </Link>
                    </nav>
                </div>

                {/* Right Side - Social Stats and CTA */}
                <div className="flex items-center space-x-6">
                    {/* GitHub Stats */}
                    <div className="hidden sm:flex items-center space-x-1 text-sm text-gray-300">
                        <Github size={16} />
                        <span>9.5K</span>
                    </div>

                    {/* Twitter Stats */}
                    <div className="hidden sm:flex items-center space-x-1 text-sm text-gray-300">
                        <Twitter size={16} />
                        <span>4.1K</span>
                    </div>

                    {/* CTA Button */}
                   <Button size='sm' />
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
