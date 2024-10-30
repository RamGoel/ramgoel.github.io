import React from 'react'
import { motion } from 'framer-motion'
import AnimallSVG from '@/public/agency/animall.svg'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import { FaFigma, FaQuestion, FaStripe } from 'react-icons/fa6'
import {
    RiDatabase2Line,
    RiFirebaseLine,
    RiJavascriptLine,
    RiNextjsLine,
    RiNodejsLine,
    RiOpenaiLine,
    RiReactjsLine,
    RiSupabaseLine,
    RiTailwindCssLine,
    RiTriangleLine,
} from 'react-icons/ri'
import { FaChrome } from 'react-icons/fa'

const inter = Inter({ subsets: ['latin'] })

const items = [
    {
        id: 1,
        type: 'icon',
        content: (
            <RiReactjsLine className="w-12 h-12 text-neutral-500 hover:text-emerald-500 transition-all duration-300 cursor-pointer" />
        ),
    },
    {
        id: 2,
        type: 'icon',
        content: (
            <RiNextjsLine className="w-12 h-12 text-neutral-500 hover:text-emerald-500 transition-all duration-300 cursor-pointer" />
        ),
    },
    {
        id: 3,
        type: 'icon',
        content: (
            <RiTailwindCssLine className="w-12 h-12 text-neutral-500 hover:text-emerald-500 transition-all duration-300 cursor-pointer" />
        ),
    },
    {
        id: 5,
        type: 'icon',
        content: (
            <RiNodejsLine className="w-12 h-12 text-neutral-500 hover:text-emerald-500 transition-all duration-300 cursor-pointer" />
        ),
    },

    {
        id: 9,
        type: 'icon',
        content: (
            <RiSupabaseLine className="w-12 h-12 text-neutral-500 hover:text-emerald-500 transition-all duration-300 cursor-pointer" />
        ),
    },
    {
        id: 11,
        type: 'icon',
        content: (
            <RiTriangleLine className="w-12 h-12 text-neutral-500 hover:text-emerald-500 transition-all duration-300 cursor-pointer" />
        ),
    },
]

const StackSlider = () => {
    return (
        <div className="flex flex-col h-[70vh] items-center gap-10 justify-center text-white overflow-hidden">
            <h1 className="text-4xl mb-[-35px] font-bold">Tech Stack we use</h1>{' '}
            <p className="text-neutral-500 text-center text-lg">
                We use the latest and greatest tools to build your product
            </p>
            <div className="relative w-[50vw] mx-auto flex items-center justify-center h-[100px] overflow-hidden">
                <div className="absolute left-0 top-0 h-full w-[200px] bg-gradient-to-r from-neutral-900 to-transparent z-10"></div>
                <div className="absolute right-0 top-0 h-full w-[200px] bg-gradient-to-l from-neutral-900 to-transparent z-10"></div>

                <motion.div
                    className="flex gap-10 slide-track"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{
                        repeat: Infinity,
                        duration: 12,
                        ease: 'linear',
                    }}
                >
                    {items.concat(items).map((item, index) => (
                        <div key={index} className="flex-none">
                            {item.type === 'text' ? (
                                <p
                                    key={index}
                                    className={`text-neutral-500 hover:text-emerald-600 cursor-pointer transition-all duration-300 text-3xl font-semibold ${inter.className}`}
                                >
                                    {item.content}
                                </p>
                            ) : item.type === 'icon' ? (
                                item.content
                            ) : typeof item.content === 'string' ? (
                                <Image
                                    key={index}
                                    src={item.content}
                                    alt={'company'}
                                    className="w-[150px] h-[60px] hover:saturate-100 transition-all duration-300 cursor-pointer rounded-md object-contain saturate-0"
                                    width={500}
                                    height={500}
                                />
                            ) : null}
                        </div>
                    ))}
                </motion.div>
            </div>
            <div className="relative w-[50vw] mx-auto flex items-center justify-center h-[100px] overflow-hidden">
                <div className="absolute left-0 top-0 h-full w-[200px] bg-gradient-to-r from-neutral-900 to-transparent z-10"></div>
                <div className="absolute right-0 top-0 h-full w-[200px] bg-gradient-to-l from-neutral-900 to-transparent z-10"></div>

                <motion.div
                    className="flex gap-10 slide-track"
                    animate={{ x: ['-50%', '0%'] }}
                    transition={{
                        repeat: Infinity,
                        duration: 12,
                        ease: 'linear',
                    }}
                >
                    {items.concat(items).map((item, index) => (
                        <div key={index} className="flex-none">
                            {item.type === 'text' ? (
                                <p
                                    key={index}
                                    className={`text-neutral-500 hover:text-emerald-600 cursor-pointer transition-all duration-300 text-3xl font-semibold ${inter.className}`}
                                >
                                    {item.content}
                                </p>
                            ) : item.type === 'icon' ? (
                                item.content
                            ) : typeof item.content === 'string' ? (
                                <Image
                                    key={index}
                                    src={item.content}
                                    alt={'company'}
                                    className="w-[150px] h-[60px] hover:saturate-100 transition-all duration-300 cursor-pointer rounded-md object-contain saturate-0"
                                    width={500}
                                    height={500}
                                />
                            ) : null}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

export default StackSlider
