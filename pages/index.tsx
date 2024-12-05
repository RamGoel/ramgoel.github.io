import CustomTooltip from '@/components/custom-tooltip'
import { LINKEDIN_PROFILE_URL } from '@/utils/strings'
import { Bricolage_Grotesque } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import {
    FaGithub,
    FaHashnode,
    FaLinkedin,
    FaProductHunt,
    FaTwitter,
} from 'react-icons/fa6'
import { motion } from 'framer-motion'
import Navbar from '@/components/nav'
import { projects } from '@/data/posts'
import Head from 'next/head'

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
        },
    },
}

const childVariants = {
    hidden: {
        opacity: 0,
        filter: 'blur(10px)',
    },
    visible: {
        opacity: 1,
        filter: 'blur(0px)',
        transition: {
            duration: 1,
        },
    },
}

const font = Bricolage_Grotesque({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
})

let socials = [
    {
        name: 'LinkedIn',
        icon: <FaLinkedin size={20} />,
        url: 'https://www.linkedin.com/in/ramgoel/',
    },
    {
        name: 'Github',
        icon: <FaGithub size={20} />,
        url: 'https://github.com/RamGoel',
    },
    {
        name: 'Twitter',
        icon: <FaTwitter size={20} />,
        url: 'https://twitter.com/theramgoel',
    },
]

export const metadata = {
    title: 'Ram Goel - GenAI and Full Stack Developer',
    description:
        'I work on GenAI and full-stack development. Building Noterr to help organize the internet.',
    author: 'Ram Goel',
    url: 'https://ramgoel.com',
    image: 'https://ramgoel.com/api/og?title=Ram Goel',
    type: 'website',
    siteName: 'Ram Goel',
}

export default function Home() {
    return (
        <motion.section
            className={`bg-zinc-900 text-white min-h-screen ${font.className}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <CustomTooltip id="hover-tooltip" />

            <Navbar />
            <motion.main
                variants={containerVariants}
                className="py-[5vh] xl:pb-0 flex flex-col gap-4 w-11/12 md:w-3/4 xl:w-[63%] min-[1800px]:w-[50%] mx-auto"
            >
                <motion.div
                    variants={childVariants}
                    className="flex flex-col items-start gap-6"
                >
                    <Image
                        src={LINKEDIN_PROFILE_URL}
                        width={500}
                        className="rounded-full w-[170px] h-[170px]"
                        height={500}
                        alt="profile-image"
                    />
                    <div className="flex flex-col gap-2">
                        <motion.p variants={childVariants}>
                            I&apos;m Ram Goel. I work on GenAI and full-stack.
                        </motion.p>

                        <motion.p variants={childVariants}>
                            I graduated from a CS degree, building{' '}
                            <Link
                                className="underline text-yellow-500"
                                href="https://noterr.ramgoel.com/"
                            >
                                Noterr
                            </Link>
                            , that helps you organize the internet.
                        </motion.p>
                        <motion.p variants={childVariants}>
                            Reach out if you want to find a way to work
                            together!
                        </motion.p>
                    </div>
                </motion.div>
                <motion.div
                    variants={childVariants}
                    className="flex flex-col md:flex-row items-center my-1 justify-start gap-6"
                >
                    <div className="flex gap-6 justify-start w-full">
                        {socials.map((social) => (
                            <motion.div
                                key={social.name}
                                variants={childVariants}
                            >
                                <Link
                                    href={social.url}
                                    data-tooltip-id="hover-tooltip"
                                    data-tooltip-content={social.name}
                                    className="flex items-center gap-2 hover:scale-110 transition-all"
                                >
                                    {social.icon}
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.ol
                    variants={containerVariants}
                    className="flex list-decimal flex-col gap-4"
                >
                    {projects.map((project, index) => (
                        <motion.li
                            key={project.id}
                            variants={childVariants}
                            className="flex flex-col md:flex-row items-center gap-2"
                        >
                            <div className="flex mr-auto items-center gap-2">
                                <p className="">{index + 1}.</p>
                                <Link href={project.url} className="underline">
                                    {project.title}
                                </Link>
                            </div>
                            <p className="text-neutral-500 w-full text-left">
                                {project.content}
                            </p>
                        </motion.li>
                    ))}
                </motion.ol>
            </motion.main>
        </motion.section>
    )
}
