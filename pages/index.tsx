'use client'
import CustomLink from '@/components/CustomLink'
import { projects, talks } from '@/utils/data'
import { motion } from 'framer-motion'
import { JetBrains_Mono } from 'next/font/google'
import Image from 'next/image'
import { FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'
import { SiGithub, SiGmail } from 'react-icons/si'

const mono = JetBrains_Mono({
    subsets: ['latin'],
    weight: ['400'],
})

// Reusable font sizes (increased by 1px)
const textBase = 'text-xs' // 12px (was 11px)
const textHeading = 'text-sm' // 14px (was 12px)
const textLabel = 'text-[10px]' // 10px (was 9px)

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: 'easeOut' },
    },
}

export default function Home() {
    return (
        <motion.div
            className={`flex flex-col gap-5 w-full ${mono.className}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Header */}
                        <motion.div
                className="flex items-center gap-3"
                variants={itemVariants}
            >
                                    <Image
                    src="/ramg.png"
                    width={40}
                    height={40}
                                        className="rounded-full"
                    alt="Ram Goel"
                />
                <div>
                    <h1 className={`${textHeading} text-zinc-100`}>Ram Goel</h1>
                    <p className={`${textBase} text-zinc-500`}>
                        I ship 🚢 (a lot) · Bangalore
                    </p>
                                </div>

                                <motion.div
                className={`flex items-center ml-auto mr-8 gap-3 ${textBase}`}
                                        variants={itemVariants}
                                    >
                                         <CustomLink extraClassName='pb-1' href="mailto:rgoel766@gmail.com">
                    <SiGmail />
                </CustomLink>
                <CustomLink extraClassName='pb-1' href="https://github.com/RamGoel">
                    <SiGithub />
                </CustomLink>
                <CustomLink extraClassName='pb-1' href="https://linkedin.com/in/ramgoel">
                    <FaLinkedin />
                                        </CustomLink>
                <CustomLink extraClassName='pb-1' href="https://x.com/theRamGoel">
                    <FaTwitter />
                </CustomLink>
                <CustomLink extraClassName='pb-1' href="https://youtube.com/@ramgoelyt">
                    <FaYoutube />
                                        </CustomLink>
            </motion.div>
                            </motion.div>

            {/* Bio */}
                                <motion.div
                className={`${textBase} text-zinc-400 leading-relaxed space-y-2`}
                variants={itemVariants}
            >
                <p>
                    23 y/o frontend engineer at{' '}
                    <CustomLink href="https://sarvam.ai">SarvamAI</CustomLink>{' '}
                    in Bangalore, building interfaces for voice AI products.
                    Previously full-stack at{' '}
                    <CustomLink href="https://getconch.ai/">Conch</CustomLink>{' '}
                    (acquired).
                </p>

                <p>
                    Writing code since 2019. Outside work (actually outside code) — movies, {' '}
                        speaking at events
                    , and traveling somewhere new every birthday.
                </p>

               
            </motion.div>

            {/* Links Row */}
              {/* GitHub Activity */}
              <motion.div
                className={`${textBase} text-zinc-400 space-y-3`}
                                variants={itemVariants}
                            >
                <p className={`text-zinc-500 ${textBase} uppercase tracking-wider`}>
                    GitHub Activity (Work + Personal)
                </p>

                <Image
                    src="/graph-work.png"
                    alt="Work GitHub contributions"
                    width={500}
                    height={100}
                    className="rounded opacity-90"
                />

                <Image
                    src="/graph-personal.png"
                    alt="Personal GitHub contributions"
                    width={500}
                    height={100}
                    className="rounded opacity-90"
                />
                        </motion.div>

            {/* Work Experience */}
            <motion.div
                className={`${textBase} text-zinc-400`}
                variants={itemVariants}
            >
                <p className={`text-zinc-500 ${textBase} uppercase tracking-wider mb-2`}>
                    Work
                </p>
                <ul className="space-y-3">
                    <li>
                        <span className="text-zinc-300">Sarvam</span>
                        <span className="text-zinc-600"> — </span>
                         AI voice agents in 11 Indian languages, small team, led multiple efforts.
                    </li>
                    <li>
                        <span className="text-zinc-300">Conch AI</span>
                        <span className="text-zinc-600"> — </span>
                        AI writing & study copilot SaaS, single engineer, led entire tech.
                    </li>
                    <li>
                        <span className="text-zinc-300">Animall</span>
                        <span className="text-zinc-600"> — </span>
                        web team handling 100K+ daily users, SEO optimization & survey automation.
                    </li>
                    <li>
                        <span className="text-zinc-300">Surplus</span>
                        <span className="text-zinc-600"> — </span>
                        built the React Native app for bill payments and subscription tracking
                    </li>
                    <li>
                        <span className="text-zinc-300">Simplifii Labs</span>
                        <span className="text-zinc-600"> — </span>
                        optimized performace & built automatic otp verification in RN app.
                    </li>
                    <li>
                        <span className="text-zinc-300">NeyX</span>
                        <span className="text-zinc-600"> — </span>
                        Integrated real-time chat with SocketIO and built the company website in React
                    </li>
                </ul>
            </motion.div>

            {/* Projects */}
            <motion.div className={textBase} variants={itemVariants}>
                <p className={`text-zinc-500 ${textBase} uppercase tracking-wider mb-2`}>
                    Side Projects
                </p>
                <ul className="space-y-3 text-zinc-400">
                    {projects.map((project) => (
                        <li
                            key={project.id + project.title}
                            className="flex items-baseline gap-2"
                        >
                            <span className="text-zinc-300">
                                {project.title}
                            </span>
                            {project.users ? (
                                <>
                                    <span className="text-zinc-600">—</span>
                                    <span className="text-zinc-500">
                                        {project.users}+ users
                                    </span>
                                </>
                            ) : (
                                <span className="text-zinc-600">
                                    (experiment)
                                </span>
                            )}
                            {project.url && (
                                <CustomLink
                                    href={
                                        Array.isArray(project.url)
                                            ? project.url[0]
                                            : project.url
                                    }
                                >
                                    <span>open</span>
                                </CustomLink>
                            )}
                            {project.video && (
                                <CustomLink href={project.video}>
                                    <span>video</span>
                                </CustomLink>
                            )}
                        </li>
                    ))}
                </ul>
            </motion.div>

            {/* Build in Public */}
            <motion.div
                className={`${textBase} text-zinc-400`}
                variants={itemVariants}
            >
                <p className={`text-zinc-500 ${textBase} uppercase tracking-wider mb-2`}>
                    Build in Public
                </p>
                <ul className="space-y-3">
                    <li>
                        Open source contributions to{' '}
                        <CustomLink href="https://github.com/DiceDB/dice/pulls?q=author%3ARamGoel+is%3Amerged+">
                            DiceDB
                        </CustomLink>{' '}
                        and{' '}
                        <CustomLink href="https://github.com/asyncapi/website/pulls?q=author%3ARamGoel+is%3Amerged+">
                            AsyncAPI
                        </CustomLink>
                    </li>
                    {talks.map((talk) => (
                        <li key={talk.id}>
                            <CustomLink href={talk.url}>
                                {talk.title}
                            </CustomLink>
                            {' '}— {talk.content}
                        </li>
                    ))}
                </ul>
            </motion.div>

         
        </motion.div>
    )
}
