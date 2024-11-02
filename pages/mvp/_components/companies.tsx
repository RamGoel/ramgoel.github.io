import React from 'react'
import { motion } from 'framer-motion'
import AnimallSVG from '@/public/agency/animall.svg'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import { RiQuestionLine, RiQuestionMark } from 'react-icons/ri'
import { FaPersonCircleQuestion, FaQuestion } from 'react-icons/fa6'

const inter = Inter({ subsets: ['latin'] })

const items = [
    { id: 1, type: 'text', content: 'sur+' },
    { id: 2, type: 'image', content: AnimallSVG, alt: 'company' },
    { id: 3, type: 'text', content: 'checkout' },
    { id: 4, type: 'image', content: '/agency/conch.avif', alt: 'company' },
    {
        id: 5,
        type: 'icon',
        content: (
            <FaQuestion
                className="w-12 h-12 text-emerald-500"
                strokeWidth={0.5}
            />
        ),
    },
]

const CompaniesSlider = () => {
    return (
        <div className="flex flex-col h-[70vh] items-center gap-10 justify-center text-white overflow-hidden">
            <h1 className="text-4xl text-center mb-[-35px] font-bold">
                Companies we&apos;ve worked with
            </h1>{' '}
            <p className="text-neutral-500 w-3/4 md:w-full text-center text-lg">
                You can be the one instead of the question marks :)
            </p>
            <div className="relative w-11/12 md:w-[50vw] mx-auto flex items-center justify-center h-[100px] overflow-hidden">
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
                            ) : (
                                <Image
                                    key={index}
                                    src={item.content}
                                    alt={item.alt || 'company'}
                                    className="w-[150px] h-[60px] hover:saturate-100 transition-all duration-300 cursor-pointer rounded-md object-contain saturate-0"
                                    width={500}
                                    height={500}
                                />
                            )}
                        </div>
                    ))}
                </motion.div>
            </div>
            <div className="relative w-11/12 md:w-[50vw] mx-auto flex items-center justify-center h-[100px] overflow-hidden">
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
                            ) : (
                                <Image
                                    key={index}
                                    src={item.content}
                                    alt={item.alt || 'company'}
                                    className="w-[150px] h-[60px] hover:saturate-100 transition-all duration-300 cursor-pointer rounded-md object-contain saturate-0"
                                    width={500}
                                    height={500}
                                />
                            )}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

export default CompaniesSlider
