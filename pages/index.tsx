import CustomLink from '@/components/CustomLink'
import { projects, workHighlights } from '@/utils/data'
import { motion } from 'framer-motion'
import {
    ArrowDownRight,
    Globe2,
    Linkedin,
    LocateIcon,
    MapPin,
    X,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FaGoogleDrive, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'
import { SiGithub } from 'react-icons/si'
import { Fira_Code, Inter, Space_Grotesk } from 'next/font/google'
import { RiUserLocationLine } from 'react-icons/ri'

const RichText = ({ text }: { text: string }) => {
    const parts = text.split(/(\[.*?\]\(.*?\))/)
    return (
        <>
            {parts.map((part, index) => {
                const match = part.match(/\[(.*?)\]\((.*?)\)/)
                if (match) {
                    const [_, label, url] = match
                    return (
                        <CustomLink key={index} href={url}>
                            {label}
                        </CustomLink>
                    )
                }
                return <span key={index}>{part}</span>
            })}
        </>
    )
}


const font = Space_Grotesk({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
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
        y: 30,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        },
    },
}

export default function Home() {
    return (
        <motion.div
            className={`flex flex-col gap-2 w-full min-[1800px]:w-[65%] ${font.className}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div
                className="flex items-center gap-3"
                variants={itemVariants}
            >
                <Image
                    src="https://pbs.twimg.com/profile_images/1942642393053855744/mtx6VZrm_400x400.jpg"
                    width={100}
                    height={100}
                    className="rounded-full"
                    alt="ram"
                />

                <div className="flex flex-col gap-2">
                    <h1 className="text-xl font-medium">Hey, I'm Ram Goel</h1>
                    <p className="text-neutral-400 flex items-center gap-1 text-sm mb-1">
                        <MapPin size={14} /> Bengaluru, India
                    </p>
                    {/* <Link
                        target="_blank"
                        href={
                            'https://drive.google.com/file/d/1VwbJvVsIM1LS0DYq5353ZwiZMhd28nOX/view?usp=drive_link'
                        }
                    >
                        <button className="flex gap-2 border hover:border-neutral-500 transition-all hover:scale-105 px-3 py-1 border-neutral-600 rounded-full text-xs items-center">
                            <FaGoogleDrive size={12} />
                            <p>View Resume</p>
                        </button>
                    </Link> */}
                    <div className="flex gap-2 text-xs">
                        <CustomLink href="https://linkedin.com/in/ramgoel/">
                            <FaLinkedin size={14} /> Linkedin
                        </CustomLink>
                        /{' '}
                        <CustomLink href="https://github.com/RamGoel">
                            <SiGithub size={14} /> Github
                        </CustomLink>
                        /{' '}
                        <CustomLink href="https://x.com/theRamGoel">
                            <FaTwitter size={14} /> Twitter
                        </CustomLink>
                        {/* /{' '}

                        <CustomLink href="https://youtube.com/@theramgoel">
                            <FaYoutube size={14} /> Youtube
                        </CustomLink> */}
                    </div>
                </div>
            </motion.div>

            <motion.div
                className="flex flex-col text-justify my-4 text-sm leading-loose tracking-wide gap-3"
                variants={containerVariants}
            >
                <motion.p className="text-neutral-400" variants={itemVariants}>
                    A Frontend Engineer, deeply passionate about GenAI. Wrote my
                    first line of code in 2019, I occasionally contribute to
                    open source projects,{' '}
                    <CustomLink href="https://algora.io/profile/RamGoel">
                        see my past contributions
                    </CustomLink>
                </motion.p>
            </motion.div>

            <motion.div
                className="flex items-center gap-4 mb-4"
                variants={itemVariants}
            >
                <hr className="opacity-10 w-[2%] ml-auto" />
                <p className="text-sm w-fit text-center">Work Highlights </p>
                <hr className="opacity-10 flex-1" />
            </motion.div>

            <motion.div
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
                variants={projectContainerVariants}
            >
                <div className="text-md leading-loose flex flex-col gap-4">
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
                                            <CustomLink href={item.url}>
                                                <SiGithub size={15} />{' '}
                                                <p className="text-sm">
                                                    #
                                                    {item.url.split('/').at(-1)}
                                                </p>
                                            </CustomLink>
                                        ) : null}
                                        {item.github ? (
                                            <CustomLink href={item.github}>
                                                <SiGithub size={15} />{' '}
                                                <p className="text-sm">
                                                    View Repo
                                                </p>
                                            </CustomLink>
                                        ) : null}
                                        {item.url && item.type !== 'oss' ? (
                                            <CustomLink
                                                href={
                                                    Array.isArray(item.url)
                                                        ? item.url[0]
                                                        : item.url
                                                }
                                            >
                                                <Globe2 size={15} />{' '}
                                                <p className="text-sm">
                                                    Website
                                                </p>
                                            </CustomLink>
                                        ) : null}
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </motion.div>

            {/* <motion.ul
                className="flex flex-col list-disc ml-4 text-justify text-sm leading-loose tracking-wide gap-3"
                variants={containerVariants}
            >
                {workHighlights
                    .sort((a, b) => Number(b.time) - Number(a.time))
                    .map((item) => {
                        return (
                            <motion.li key={item.id} className='text-sm' variants={itemVariants}>
                                <p className='text-neutral-400'><RichText text={item.content} /></p>
                            </motion.li>
                        )
                    })}
            </motion.ul> */}
        </motion.div>
    )
}
