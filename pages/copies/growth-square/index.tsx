import {
    DM_Sans,
    Instrument_Serif,
    Inter,
    Space_Grotesk,
} from 'next/font/google'
import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
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

export default function GrowthSquare() {
    const containerRef = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const heroImageRef = useRef<HTMLImageElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const brandWordRef = useRef<HTMLSpanElement>(null)
    const subtitleRef = useRef<HTMLParagraphElement>(null)
    const buttonRef = useRef<HTMLDivElement>(null)
    const foundersRef = useRef<HTMLImageElement>(null)
    const asSeenOnRef = useRef<HTMLParagraphElement>(null)
    const logosContainerRef = useRef<HTMLDivElement>(null)
    const logo1Ref = useRef<HTMLImageElement>(null)
    const logo2Ref = useRef<HTMLImageElement>(null)
    const logo3Ref = useRef<HTMLImageElement>(null)
    const logo4Ref = useRef<HTMLImageElement>(null)

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

        // Set initial states - everything hidden/positioned off-screen
        gsap.set(
            [
                headerRef.current,
                heroImageRef.current,
                titleRef.current,
                brandWordRef.current,
                subtitleRef.current,
                buttonRef.current,
                asSeenOnRef.current,
                logo1Ref.current,
                logo2Ref.current,
                logo3Ref.current,
                logo4Ref.current,
            ],
            {
                opacity: 0,
                y: 50,
            }
        )


        // Additional specific initial states
        gsap.set(brandWordRef.current, { scale: 0.5, color: '#ffffff' })
        gsap.set(foundersRef.current, { scale: 0.8, opacity: 0 })
        gsap.set(
            [
                logo1Ref.current,
                logo2Ref.current,
                logo3Ref.current,
                logo4Ref.current,
            ],
            {
                y: 30,
                rotation: -10,
                scale: 0.8,
            }
        )

        // Timeline Animation Story (5-6 seconds total)
        tl
            // Scene 1: Header appears (0-0.5s)
            .to(headerRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.5,
            })

            // Scene 2: Hero background fades in (0.3-0.8s)
            .to(
                heroImageRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: 'power2.out',
                },
                0.3
            )

            // Scene 3: Main title slides in (0.8-1.5s)
            .to(
                titleRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: 'back.out(1.2)',
                },
                0.8
            )

            // Scene 4: "brand" word transforms with color change (1.2-2s)
            .to(
                brandWordRef.current,
                {
                    scale: 1,
                    color: 'var(--primary-color)',
                    duration: 0.8,
                    ease: 'elastic.out(1, 0.5)',
                    opacity: 1,
                },
                1.2
            )

            // Scene 5: Subtitle appears (1.8-2.3s)
            .to(
                subtitleRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                },
                1.8
            )

            // Scene 6: Button bounces in (2.2-2.8s)
            .to(
                buttonRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'bounce.out',
                },
                2.2
            )

            // Scene 7: Founders image slides in from right (2.5-3.2s)
            .to(
                foundersRef.current,
                {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: 0.7,
                    ease: 'power2.out',
                },
                2.5
            )

            // Scene 8: "As seen on" text appears (3.5-4s)
            .to(
                asSeenOnRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                },
                3.5
            )

            // Scene 9: Logos cascade in with rotation and scale (4-5.5s)
            .to(
                logo1Ref.current,
                {
                    opacity: 1,
                    y: 0,
                    rotation: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: 'back.out(1.5)',
                },
                4
            )
            .to(
                logo2Ref.current,
                {
                    opacity: 1,
                    y: 0,
                    rotation: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: 'back.out(1.5)',
                },
                4.2
            )
            .to(
                logo3Ref.current,
                {
                    opacity: 1,
                    y: 0,
                    rotation: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: 'back.out(1.5)',
                },
                4.4
            )
            .to(
                logo4Ref.current,
                {
                    opacity: 1,
                    y: 0,
                    rotation: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: 'back.out(1.5)',
                },
                4.6
            )

            // Scene 10: Final flourish - subtle pulse on brand word (5.2-5.8s)
            .to(
                brandWordRef.current,
                {
                    scale: 1.05,
                    duration: 0.3,
                    yoyo: true,
                    repeat: 1,
                    ease: 'sine.inOut',
                },
                5.2
            )

        return () => {
            tl.kill()
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className={`${font.className} font-normal bg-black text-white h-screen`}
        >
            <div ref={headerRef}>
                <Header />
            </div>
            <div className="w-11/12 mx-auto flex items-center justify-center h-screen">
                <div className='w-full mt-[-100px]'>
                    <div className="relative w-full my-auto">
                        <Image
                            ref={heroImageRef}
                            src={heroImage}
                            alt="hero"
                            width={1000}
                            height={1000}
                            className="w-full"
                        />
                        <div className="absolute top-0 left-0 w-full h-full p-10">
                            <h1
                                ref={titleRef}
                                className={`${serifFont.className} text-white text-[90px] font-bold`}
                            >
                                Let's make you a{' '}
                                <span
                                    ref={brandWordRef}
                                    className="text-[var(--primary-color)]"
                                >
                                    brand
                                </span>
                            </h1>
                            <p
                                ref={subtitleRef}
                                className="text-white text-[24px] font-thin"
                            >
                                We help founders and CXOs unlock the power of{' '}
                                <br /> their personal brands, one post at a
                                time.
                            </p>
                            <div ref={buttonRef} className="mt-8">
                                <Button
                                    size="md"
                                    text="Book a call"
                                    className={`!text-[24px] !bg-black border-[0px] ${serifFont.className}`}
                                />
                            </div>
                        </div>
                        <Image
                            ref={foundersRef}
                            src={founders}
                            alt="founders"
                            className="absolute bottom-0 right-[5%] w-[40%]"
                            width={1000}
                            height={1000}
                        />
                    </div>
                    <div className="absolute bottom-[150px] left-0 w-full">
                        <div className="w-11/12 mx-auto flex items-center justify-center gap-10">
                            <p
                                ref={asSeenOnRef}
                                className={`${serifFont.className} text-white text-[24px] font-thin`}
                            >
                                As seen on
                            </p>
                            <div
                                ref={logosContainerRef}
                                className="flex items-center gap-10"
                            >
                                <Image
                                    ref={logo1Ref}
                                    className="w-[100px] h-[100px] object-contain"
                                    src={
                                        'https://framerusercontent.com/images/aG6SPo5xNHsUXl1qARZrJqVUnFA.png'
                                    }
                                    alt="logo"
                                    width={300}
                                    height={300}
                                />
                                <Image
                                    ref={logo2Ref}
                                    className="w-[100px] h-[100px] object-contain"
                                    src={
                                        'https://framerusercontent.com/images/2NnV1v8OKwnAPFakup3ws29J8ac.png'
                                    }
                                    alt="logo"
                                    width={300}
                                    height={300}
                                />
                                <Image
                                    ref={logo3Ref}
                                    className="w-[100px] h-[100px] object-contain"
                                    src={
                                        'https://framerusercontent.com/images/w3QKKLE8zpeuDV5dhrEpALCViA.png?scale-down-to=512'
                                    }
                                    alt="logo"
                                    width={300}
                                    height={300}
                                />
                                <Image
                                    ref={logo4Ref}
                                    className="w-[100px] h-[100px] object-contain"
                                    src={
                                        'https://framerusercontent.com/images/SWbcRHz3hNixK3e0yJELV1LajOM.png'
                                    }
                                    alt="logo"
                                    width={300}
                                    height={300}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
