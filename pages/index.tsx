import CustomLink from '@/components/CustomLink'
import { projects } from '@/utils/data'
import { motion } from 'framer-motion'
import { ArrowDownRight, Globe2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FaGoogleDrive } from 'react-icons/fa'
import { SiGithub } from 'react-icons/si'

export default function Home() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="flex flex-col gap-2 w-full min-[1800px]:w-[65%]">
            <div className="flex items-center gap-3">
                <Image
                    src="/ram.png"
                    width={100}
                    height={100}
                    className="rounded-full"
                    alt="ram"
                />

                <div className="flex flex-col gap-1">
                    <h1 className="text-xl font-medium">Ram Goel</h1>
                    <p className="text-neutral-400 text-sm mb-1">
                        Bangalore, India
                    </p>
                    <Link
                        target="_blank"
                        href={
                            'https://drive.google.com/file/d/1VwbJvVsIM1LS0DYq5353ZwiZMhd28nOX/view?usp=drive_link'
                        }
                    >
                        <button className="flex gap-2 border hover:border-neutral-500 transition-all hover:scale-105 px-3 py-1 border-neutral-600 rounded-full text-xs items-center">
                            <FaGoogleDrive size={12} />
                            <p>View Resume</p>
                        </button>
                    </Link>
                </div>
            </div>
            <h1 className="mt-5 text-lg">About</h1>

            <div className="flex flex-col text-justify text-sm leading-loose tracking-wide gap-5">
                <p className="text-neutral-400">
                    A Frontend Engineer, deeply passionate about GenAI. I&apos;m
                    building{' '}
                    <CustomLink href="https://noterr.ramgoel.com">
                        Noterr
                    </CustomLink>{' '}
                    - a universal bookmarking tool, on weekends :)
                </p>

                <p className="text-neutral-400">
                    Wrote my first line of code in 2019, spent my college doing
                    internships, freelance projects, and attending/organizing
                    developer events.{' '}
                    <span className="text-neutral-300">
                        Currently making &quot;building AI agents easier for
                        everyone&quot;
                    </span>
                </p>

                <p className="text-neutral-400">
                    you can find me on{' '}
                    <CustomLink href="https://linkedin.com/in/ramgoel/">
                        Linkedin
                    </CustomLink>
                    ,{'  '}
                    <CustomLink href="https://github.com/RamGoel">
                        Github
                    </CustomLink>
                    ,{'  '} or{'  '}
                    <CustomLink href="https://x.com/theRamGoel">
                        X
                    </CustomLink>{' '}
                    {/* or{'  '}
                    <CustomLink href="https://youtube.com/@theRamGoel">
                        Youtube
                    </CustomLink> */}
                </p>
            </div>

            {/* <div className="flex items-center mt-5 gap-3 flex-wrap">
                {SKILLS.map((item) => {
                    return (
                        <div
                            key={item.name}
                            className="flex items-center text-xs opacity-70 hover:opacity-100 rounded-full transition-all cursor-pointer gap-2 px-3 py-1 border border-neutral-600"
                        >
                            {item.icon ? <item.icon size={14} /> : null}
                            <p>{item.name}</p>
                        </div>
                    )
                })}
            </div> */}

            <h1
                className={`border-b mt-5 mb-3 inline-flex text-sm items-center gap-1 border-neutral-800 border-dashed text-neutral-300 hover:text-yellow-200 transition-all cursor-pointer w-fit`}
                onClick={() => setIsOpen(!isOpen)}
            >
                See what I built <ArrowDownRight size={15} />{' '}
            </h1>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                    height: isOpen ? 'auto' : 0,
                    opacity: isOpen ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
            >
                <div className="text-md leading-loose flex flex-col gap-4">
                    <div className="flex flex-col lg:w-3/4 gap-6">
                        {projects.map((item) => {
                            return (
                                <div
                                    key={item.id}
                                    className="flex gap-3 flex-col"
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
                                </div>
                            )
                        })}
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
