import React from 'react'
import Link from 'next/link'
import { Github, Twitter } from 'lucide-react'
import Image from 'next/image'
import Button from './Button'

const Header = () => {
    return (
        <header
            style={{
                boxShadow:
                    '0 2px 20px #00000040,inset 0 0 0 4px #06060640,inset 0 4px 2px #54545440',
            }}
            className={`bg-[#21252b] fixed top-6 bg-gray-900 flex items-center left-[2.5%] w-[95%]  right-0 z-50 border-[1px] rounded-[18px] border-[#383838] text-white px-[20px] min-h-[85px] p-[16px]`}
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
                        <Image
                            src="https://cdn.prod.website-files.com/6826235ef861ed9464b064c8/6826235ef861ed9464b06595_logo-navbag-long.svg"
                            alt="supermemory"
                            width={212}
                            className="mt-2"
                            height={24}
                        />
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
        </header>
    )
}

export default Header
