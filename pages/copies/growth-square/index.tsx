import { DM_Sans, Instrument_Serif, Inter, Space_Grotesk } from 'next/font/google'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Header from './components/Header'
import heroImage from './media/background.png'
import founders from './media/founders.png'
import Image from 'next/image'
import Button from './components/Button'

const font = Inter({
    weight: ['300', '400', '500'],
    subsets: ['latin'],
})

const serifFont = Instrument_Serif({
    weight: ['400'],
    subsets: ['latin'],
})

// Animation variants for slide-up effect with cascading motion
const slideUpVariants = {
    hidden: {
        y: 100,
        opacity: 0,
    },
    visible: (index: number) => ({
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: index * 0.3, // Stagger the animations
        },
    }),
    // Add a state for when subsequent items appear
    pushed: (index: number) => ({
        y: -20, // Slide up slightly when new items appear below
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: (index + 1) * 0.3, // Trigger after the next item starts appearing
        },
    }),
}

// Animation variants for tooltip pop effect
const tooltipVariants = {
    hidden: {
        scale: 0,
        opacity: 0,
        y: 20,
    },
    visible: {
        scale: 1,
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 25,
            duration: 0.6,
        },
    },
}

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            delayChildren: 1.0, // Delay main text to appear after tooltips
        },
    },
}

// Container variants for tooltips (appears before main text)
const tooltipContainerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.2, // Start before main text
        },
    },
}

export default function GrowthSquare() {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const timer1 = setTimeout(() => setCurrentIndex(1), 1300) // First text appears at 1s + 0.3s
        const timer2 = setTimeout(() => setCurrentIndex(2), 1600) // Second text appears at 1s + 0.6s
        const timer3 = setTimeout(() => setCurrentIndex(3), 1900) // Third text appears at 1s + 0.9s

        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
            clearTimeout(timer3)
        }
    }, [])

    const getAnimationState = (itemIndex: number) => {
        if (currentIndex <= itemIndex) return 'visible'
        return 'pushed'
    }

    return (
        <div
            className={`${font.className} font-normal bg-black text-white h-screen`}
        >
            <Header />
            <div className="relative w-11/12 mx-auto flex items-center justify-center h-screen">
                <div className='relative w-full my-auto '>
                    <Image src={heroImage} alt="hero" width={1000} height={1000} className='w-full' />
                    <div className='absolute top-0 left-0 w-full h-full p-10'>
                        <h1 className={`${serifFont.className} text-white text-[90px] font-bold`}>Let's make you a <span className='text-[var(--primary-color)]'>brand</span></h1>
                        <p className='text-white text-[24px] font-thin'>
                        We help founders and CXOs unlock the power of <br /> their personal brands, one post at a time.
                        </p>
                        <div className='mt-8'>
                            <Button size='md' text='Book a call' className={`!text-[24px] !bg-black border-[0px] ${serifFont.className}`} />
                        </div>
                    </div>
                    <Image src={founders} alt="founders" className="absolute bottom-0 right-0 w-[40%]" width={1000} height={1000} />
                </div>
                <div className='absolute bottom-[100px] left-0 w-full'>
                    <div className='w-11/12 mx-auto flex items-center justify-center gap-10'>
                        <p className={`${serifFont.className} text-white text-[24px] font-thin`}>As seen on</p>
                        <div className='flex items-center gap-10'>
                            <Image className='w-[100px] h-[100px] object-contain' src={'https://framerusercontent.com/images/aG6SPo5xNHsUXl1qARZrJqVUnFA.png'} alt="logo" width={300} height={300} />
                            <Image className='w-[100px] h-[100px] object-contain' src={'https://framerusercontent.com/images/2NnV1v8OKwnAPFakup3ws29J8ac.png'} alt="logo" width={300} height={300} />
                            <Image className='w-[100px] h-[100px] object-contain' src={'https://framerusercontent.com/images/w3QKKLE8zpeuDV5dhrEpALCViA.png?scale-down-to=512'} alt="logo" width={300} height={300} />
                            <Image className='w-[100px] h-[100px] object-contain' src={'https://framerusercontent.com/images/SWbcRHz3hNixK3e0yJELV1LajOM.png'} alt="logo" width={300} height={300} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
