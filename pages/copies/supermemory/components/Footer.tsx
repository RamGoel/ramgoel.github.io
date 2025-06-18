import Image from 'next/image'
import Button from './Button'
import { Github, Twitter } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Footer() {
    return (
        <div className="flex flex-col">
            <motion.div 
                className="h-[45px]"
                style={{
                    background: 'linear-gradient(90deg, #1e3a8a, #1d4ed8, #2563eb, #1e3a8a, #1d4ed8)',
                    backgroundSize: '300% 100%',
                }}
                animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                    duration: 8,
                    ease: "easeInOut",
                    repeat: Infinity,
                }}
            />
            
            <motion.div 
                className="h-[45px]"
                style={{
                    background: 'linear-gradient(270deg, #1e3a8a, #1d4ed8, #2563eb, #1e3a8a, #1d4ed8)',
                    backgroundSize: '300% 100%',
                }}
                animate={{
                    backgroundPosition: ['100% 50%', '0% 50%', '100% 50%']
                }}
                transition={{
                    duration: 8,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: 1
                }}
            />

            <motion.div 
                className="flex flex-col gap-10 pt-[5rem] relative overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 25%, #1d4ed8 50%, #2563eb 75%, #0f172a 100%)',
                    backgroundSize: '400% 400%',
                }}
                animate={{
                    backgroundPosition: [
                        '0% 0%',
                        '50% 50%', 
                        '100% 100%',
                        '50% 50%',
                        '0% 0%'
                    ]
                }}
                transition={{
                    duration: 12,
                    ease: "easeInOut",
                    repeat: Infinity,
                }}
            >
                {/* Flowing overlay effect */}
                <motion.div
                    className="absolute inset-0 opacity-30"
                    style={{
                        background: 'radial-gradient(circle at 50% 50%, #2563eb 0%, transparent 70%)',
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 10,
                        ease: "easeInOut",
                        repeat: Infinity,
                    }}
                />
                
                {/* Additional flowing elements */}
                <motion.div
                    className="absolute inset-0 opacity-20"
                    style={{
                        background: 'linear-gradient(45deg, transparent 30%, #1d4ed8 50%, transparent 70%)',
                        backgroundSize: '200% 200%',
                    }}
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                    }}
                    transition={{
                        duration: 15,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                />

                <div className="flex mx-auto w-fit items-center gap-10">
                    <Image
                        src="https://cdn.prod.website-files.com/6826235ef861ed9464b064c8/6826235ef861ed9464b06541_logo.svg"
                        alt="supermemory"
                        width={200}
                        height={200}
                    />
                    <Image
                        src="https://cdn.prod.website-files.com/6826235ef861ed9464b064c8/6826235ef861ed9464b06595_logo-navbag-long.svg"
                        alt="supermemory"
                        width={1200}
                        className="mt-2"
                        height={200}
                    />
                </div>
                <div className="flex justify-center py-[2rem] gap-4">
                    <Button className="px-[60px]" />
                    <Button
                        text={
                            <p>
                                Start building{' '}
                                <sup className="text-[12px]">DOCS</sup>
                            </p>
                        }
                        className="px-[60px]"
                    />
                </div>

                <div className="flex justify-between items-center px-[3rem] py-[2rem]">
                    <p className="text-[12px] uppercase text-[#DEDEDE]">
                        © 2025 supermemory.ai
                    </p>

                    <div className="flex items-center gap-4">
                        <div className="hidden hover:scale-95 transition-all cursor-pointer sm:flex items-center space-x-1 text-sm text-gray-300">
                            <Github size={16} />
                            <span>9.5K</span>
                        </div>

                        {/* Twitter Stats */}
                        <div className="hidden hover:scale-95 transition-all cursor-pointer sm:flex items-center space-x-1 text-sm text-gray-300">
                            <Twitter size={16} />
                            <span>4.1K</span>
                        </div>
                    </div>

                    <div className="flex justify-center gap-4">
                        <Link href="/privacy" className="text-[12px] uppercase text-[#DEDEDE] hover:underline">Privacy</Link>
                        <Link href="/terms" className="text-[12px] uppercase text-[#DEDEDE] hover:underline">Terms</Link>
                        <Link href="/terms" className="text-[12px] uppercase text-[#DEDEDE] hover:underline">Updates</Link>
                        <Link href="/terms" className="text-[12px] uppercase text-[#DEDEDE] hover:underline">Contact us</Link>
                        <Link href="/terms" className="text-[12px] uppercase text-[#DEDEDE] hover:underline">Docs</Link>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
