'use client'
import CustomLink from '@/components/CustomLink'
import { projects } from '@/utils/data'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe2, MapPin } from 'lucide-react'
import { Instrument_Serif, Space_Grotesk } from 'next/font/google'
import Image from 'next/image'
import { useState } from 'react'
import { FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'
import { RiYoutubeLine } from 'react-icons/ri'
import { SiGithub } from 'react-icons/si'

const font = Space_Grotesk({
    subsets: ['latin'],
    weight: ['400'],
})

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
}

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        },
    },
}

const projectContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
}

const projectItemVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: 'easeInOut',
        },
    },
}

// Animation variants for section transitions
const sectionVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: 'easeInOut',
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.2,
            ease: 'easeInOut',
        },
    },
}

export default function Home() {
    const [activeSection, setActiveSection] = useState('home')
    return (
        <motion.div
            className={`flex flex-col gap-8 w-full min-[1800px]:w-[65%] ${font.className}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="relative min-h-[600px]">
                <AnimatePresence mode="wait">
                    {activeSection === 'home' && (
                        <motion.div
                            className="flex flex-col gap-8 absolute inset-0"
                            variants={sectionVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            key="about-section"
                        >
                            <motion.div className="" variants={itemVariants}>
                                <Image  
                                    src={'/ramg.png'}
                                    width={120}
                                    height={120}
                                    className="rounded-full"
                                    alt="ram"
                                />

                                <div className="flex flex-col mt-5 gap-2">
                                    <div className="flex items-end justify-between">
                                        <h1 className={`text-xl font-medium`}>
                                            Hey, I&apos;m Ram Goel
                                        </h1>
                                        <p
                                            className={`text-neutral-400 text-xs flex items-center gap-1 mb-1`}
                                        >
                                            <MapPin size={14} />{' '}
                                            <span className="font-medium">
                                                Bengaluru / Uttar Pradesh
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            <div className="flex flex-col gap-4">
                                <motion.div
                                    className="flex flex-col text-justify text-sm leading-loose tracking-wide gap-3"
                                    variants={containerVariants}
                                >
                                    <motion.p
                                        className={`text-neutral-400 leading-loose text-sm`}
                                        variants={itemVariants}
                                    >
                                        I&apos;m building frontends at {' '}
                                        <CustomLink href="https://sarvam.ai">
                                            sarvam
                                        </CustomLink>
                                        , previously I did full-stack at{' '}
                                        <CustomLink href="https://getconch.ai/">
                                            conch (acquired)
                                        </CustomLink>
                                        . I wrote first line of code in 2019. I
                                        occasionally speak at tech meetups and
                                        contribute to open source projects.
                                    </motion.p>
                                </motion.div>

                                <motion.ul
                                    variants={containerVariants}
                                    className=" list-disc flex flex-col ml-4 gap-3 text-neutral-400 text-sm"
                                >
                                    <motion.li variants={itemVariants}>
                                        I&apos;m exploring embeddable agentic ai
                                        these days
                                    </motion.li>
                                    <motion.li variants={itemVariants}>
                                        Built bunch of{' '}
                                        <span
                                            onClick={() =>
                                                setActiveSection('projects')
                                            }
                                        >
                                            <CustomLink href="#">
                                                projects
                                            </CustomLink>
                                        </span>
                                        , collectively 500+ signed up users.
                                    </motion.li>
                                    <motion.li variants={itemVariants}>
                                        Contributed to projects like{' '}
                                        <CustomLink href="https://github.com/DiceDB/dice/pulls?q=author%3ARamGoel+is%3Amerged+">
                                            DiceDB
                                        </CustomLink>{' '}
                                        and{' '}
                                        <CustomLink href="https://github.com/asyncapi/website/pulls?q=author%3ARamGoel+is%3Amerged+">
                                            AsyncAPI
                                        </CustomLink>
                                    </motion.li>
                                    <motion.li variants={itemVariants}>
                                        2x speaker at{' '}
                                        <CustomLink href="https://x.com/ReactPlayIO/status/1969429955756114001">
                                            react play
                                        </CustomLink>{' '}
                                        meetups in bangalore
                                    </motion.li>
                                    <motion.li variants={itemVariants}>
                                        I travel to{' '}
                                        <CustomLink href="https://x.com/theramgoel/status/1956945099331624994">
                                            some place
                                        </CustomLink>{' '}
                                        every year close to my birthday. (since
                                        2024)
                                    </motion.li>
                                </motion.ul>

                                <motion.div
                                    variants={itemVariants}
                                    className="flex mt-10 items-center gap-2 justify-between"
                                >
                                    <CustomLink
                                        extraClassName="text-sm"
                                        href="mailto:rgoel766@gmail.com"
                                    >
                                        send me an email
                                    </CustomLink>{' '}
                                    <div
                                        className={`flex gap-2 text-neutral-400 text-xs`}
                                    >
                                        <CustomLink href="https://github.com/RamGoel">
                                            <SiGithub size={14} />
                                        </CustomLink>
                                        /{' '}
                                        <CustomLink href="https://linkedin.com/in/ramgoel">
                                            <FaLinkedin size={14} />
                                        </CustomLink>
                                        /{' '}
                                        <CustomLink href="https://x.com/theRamGoel">
                                            <FaTwitter size={14} /> (most active
                                            here)
                                        </CustomLink>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}

                    {activeSection === 'projects' && (
                        <motion.div
                            className="flex flex-col gap-8 absolute inset-0"
                            variants={sectionVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            key="projects-section"
                        >
                            <motion.div
                                className="flex items-center gap-4 mb-4"
                                variants={itemVariants}
                            >
                                <button
                                    onClick={() => setActiveSection('home')}
                                    className="text-sm text-neutral-400 hover:text-neutral-300 transition-colors duration-200 flex items-center gap-2"
                                >
                                    ← Go back
                                </button>
                            </motion.div>
                            <motion.div
                                className="text-md leading-loose flex flex-col gap-4"
                                variants={projectContainerVariants}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    {projects.map((item) => {
                                        return (
                                            <motion.div
                                                key={item.id}
                                                className="flex gap-3 flex-col cursor-pointer"
                                                variants={projectItemVariants}
                                            >
                                                <h3 className="text-sm">
                                                    {item.title}{' '}
                                                    {item.users
                                                        ? `(${item.users}+ users)`
                                                        : item.stars
                                                          ? `(${item.stars} stars)`
                                                          : ''}
                                                </h3>
                                                <p className="text-sm mt-[-7px] text-neutral-400">
                                                    {item.content}
                                                </p>

                                                <div className="flex gap-4 items-center">
                                                    {item.type === 'oss' ? (
                                                        <CustomLink
                                                            href={item.url}
                                                        >
                                                            <SiGithub
                                                                size={15}
                                                            />{' '}
                                                            <p className="text-sm">
                                                                #
                                                                {item.url
                                                                    .split('/')
                                                                    .at(-1)}
                                                            </p>
                                                        </CustomLink>
                                                    ) : null}
                                                    {item.github ? (
                                                        <CustomLink
                                                            href={item.github}
                                                        >
                                                            <SiGithub
                                                                size={15}
                                                            />{' '}
                                                            <p className="text-sm">
                                                                View Repo
                                                            </p>
                                                        </CustomLink>
                                                    ) : null}

                                                    {item.url &&
                                                    item.type !== 'oss' ? (
                                                        <CustomLink
                                                            href={
                                                                Array.isArray(
                                                                    item.url
                                                                )
                                                                    ? item
                                                                          .url[0]
                                                                    : item.url
                                                            }
                                                        >
                                                            <Globe2 size={15} />{' '}
                                                            <p className="text-sm">
                                                                Website
                                                            </p>
                                                        </CustomLink>
                                                    ) : null}
                                                    {item.video ? (
                                                        <CustomLink
                                                            href={item.video}
                                                        >
                                                            <RiYoutubeLine
                                                                size={15}
                                                            />{' '}
                                                            <p className="text-sm">
                                                                Video
                                                            </p>
                                                        </CustomLink>
                                                    ) : null}
                                                </div>
                                            </motion.div>
                                        )
                                    })}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}
