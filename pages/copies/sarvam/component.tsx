import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const letters = ['S', 'a', 'r', 'v', 'a', 'm', 'A', 'I']
const indianElements = [
    'अ', // Hindi / Devanagari
    'আ', // Bengali / Assamese
    'அ', // Tamil
    'അ', // Malayalam
    'అ', // Telugu
    'ಅ', // Kannada
    'ଅ', // Odia
    'ੳ', // Punjabi (Gurmukhi)
    'ꯑ', // Meitei (Manipuri - Meetei Mayek)
    '𑀅', // Sanskrit (Brahmi-derived)
    'ॐ', // Sacred symbol (used in Hinduism, Sanskrit)
]

const Sarvam = () => {
    const symbolRefs = useRef<(HTMLDivElement | null)[]>([])
    const logoRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        if (typeof window === 'undefined') return
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger)
        const ctx = gsap.context(() => {
            // Text scroll animation
            gsap.to('#page3 h1', {
                transform: 'translateX(-450%)',
                duration: 5,
                scrollTrigger: {
                    trigger: '#page3',
                    scrub: 3,
                    pin: true,
                },
            })

            // Create main timeline for page4
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '#page4',
                    scrub: 2,
                    pin: true,
                    start: 'top top',
                    end: '+=300%',
                },
            })

            // Add logo animation to timeline
            if (logoRef.current) {
                tl.fromTo(
                    logoRef.current,
                    {
                        scale: 0,
                        opacity: 0,
                    },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 3,
                        ease: 'power2.out',
                    },
                    0
                )
            }

            // Add symbols explosion animation to timeline
            tl.fromTo(
                symbolRefs.current.filter(Boolean),
                {
                    scale: 0,
                    x: 0,
                    y: 0,
                    opacity: 0,
                    rotate: 0,
                },
                {
                    scale: 1.2,
                    opacity: 1,
                    duration: 4,
                    ease: 'power2.out',
                    stagger: {
                        each: 0.5,
                        from: 'center',
                        grid: 'auto',
                    },
                    x: (index) => {
                        const angle =
                            (index / (indianElements.length - 1)) * Math.PI * 2
                        return Math.cos(angle) * 200
                    },
                    y: (index) => {
                        const angle =
                            (index / (indianElements.length - 1)) * Math.PI * 2
                        return Math.sin(angle) * 200
                    },
                },
                1
            )

            // Slide chakra to left
            .to('#chakra-container', {
                x: -200,
                duration: 2,
                ease: 'power2.inOut'
            }, 5)

            // Reveal text
            .to('#page4-text', {
                x: -200,
                display: 'flex',
                opacity: 1,
                duration: 2,
                ease: 'power2.out'
            }, 5.5)
            
            .fromTo(
                '#page4-text li',
                {
                    opacity: 0,
                    x: -100
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'power2.out'
                },
                6
            )

            // Letters animation
            gsap.from('.logo-letter', {
                y: -120,
                opacity: 0,
                duration: 5,
                scrollTrigger: {
                    trigger: '#page5',
                    scrub: true,
                    pin: true,
                },
                stagger: {
                    from: 'center',
                    amount: 1,
                },
            })
        })

        return () => ctx.revert()
    }, [])

    const setSymbolRef = (el: HTMLDivElement | null, index: number) => {
        symbolRefs.current[index] = el
    }

    return (
        <div className="bg-white min-w-screen h-screen">
            <nav
                id="navbar"
                className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-white to-transparent text-black"
            >
                <div className="max-w-6xl mt-5 mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-10">
                            <div className="flex items-center gap-2.5">
                                <Image
                                    src="/demo.svg"
                                    alt="Sarvam Logo"
                                    width={32}
                                    height={32}
                                    className="w-8 h-8"
                                />
                                <span className="font-medium">Sarvam</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="px-4 py-2 text-sm transition-colors duration-200">
                                Sign In
                            </button>
                            <button className="px-4 py-2 text-sm text-white bg-neutral-900 rounded-md hover:bg-neutral-800 transition-colors duration-200">
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div
                id="page3"
                className="h-[100vh] flex items-center w-screen flex justify-center items-center"
            >
                <div className="w-[80vw] mt-10 bg-gradient-to-r from-orange-800 via-orange-600 to-orange-400 h-[75vh]">
                    <h1 className="text-[25vw] leading-[500px] mx-[40px] text-white font-bold whitespace-nowrap">
                        Representing a Billion Voices
                    </h1>
                </div>
            </div>

            <div
                id="page4"
                className="h-[100vh] w-screen flex justify-center items-center relative overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100"
            >
                <div className="w-[80vw] h-[800px] flex items-center justify-center">
                    <div id="chakra-container" className="relative w-[800px] h-[800px] flex items-center justify-center">
                        <Image
                            ref={logoRef}
                            src="/demo.svg"
                            alt="demo"
                            width={1000}
                            height={1000}
                            className="w-[200px] h-[200px] object-cover relative z-10"
                        />
                        {indianElements.map((symbol, index) => (
                            <div
                                key={index}
                                ref={(el) => setSymbolRef(el, index)}
                                className="absolute top-1/2 left-1/2 text-orange-500 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-semibold"
                            >
                                {symbol}
                            </div>
                        ))}
                    </div>
                        <h1 id="page4-text" className="text-4xl hidden font-bold">
                            #MultiLanguageSupport
                        </h1>
                </div>
            </div>

            <div
                id="page5"
                className="h-[100vh] w-screen flex justify-center items-center"
            >
                <div className="flex items-center justify-center w-[80vw] h-[80vh] bg-gradient-to-br from-green-900 via-green-700 to-green-300  mt-10 gap-4 text-black">
                    <div className="flex flex-col text-white gap-4">
                        <div className="flex">
                            {letters.map((letter, index) => (
                                <h1
                                    key={index}
                                    className="text-[10vw] logo-letter leading-[8vw] tracking-wide font-bold whitespace-nowrap"
                                >
                                    {letter}
                                </h1>
                            ))}
                        </div>
                        <p className="text-2xl text-center">
                            Crafted with ❤️ in Bengaluru 🇮🇳
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sarvam
