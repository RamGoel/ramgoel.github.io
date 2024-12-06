import CustomTooltip from '@/components/custom-tooltip'
import Image from 'next/image'
import Link from 'next/link'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa6'
import { motion } from 'framer-motion'
import Navbar from '@/components/nav'
import { projects } from '@/data/posts'
import localFont from 'next/font/local'
import { RiBuilding2Line } from 'react-icons/ri'
import { FaEnvelope } from 'react-icons/fa'

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
    {
        name: 'Email',
        icon: <FaEnvelope size={20} />,
        url: 'mailto:ramgoel@gmail.com',
    },
]

export default function Home() {
    return (
        <motion.section
            className={`bg-zinc-900 text-white min-h-screen`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <CustomTooltip id="hover-tooltip" />

            <Navbar />
            <motion.main
                variants={containerVariants}
                className="py-[5vh] w-11/12 md:w-10/12 xl:pb-0 flex flex-col gap-4 mx-auto"
            >
                <motion.div
                    variants={childVariants}
                    className="flex flex-col md:flex-row items-center gap-6"
                >
                    <Image
                        src="/despo.png"
                        width={1000}
                        className="w-11/12 md:w-[650px]"
                        height={1000}
                        alt="profile-image"
                    />
                    <div className="flex flex-col gap-6">
                        <motion.div
                            variants={childVariants}
                            className="flex flex-col md:flex-row items-center my-1 justify-start gap-6"
                        >
                            <div className="flex gap-6 items-center justify-start w-full">
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
                                <div className="text-yellow-500 bg-yellow-800/30 text-sm rounded-full border-2 border-yellow-700/30 w-fit px-3 py-1 flex items-center gap-2">
                                    <RiBuilding2Line /> Building Noterr
                                </div>
                            </div>
                        </motion.div>
                        <hr className="w-full border-neutral-700/30" />

                        <div className="flex flex-col gap-2">
                            <motion.p variants={childVariants}>
                                I&apos;m Ram Goel. I work on GenAI and
                                full-stack.
                            </motion.p>

                            <motion.p variants={childVariants}>
                                I graduated from a CS degree, building{' '}
                                <Link
                                    className="underline text-yellow-200"
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

                        <hr className="w-full border-neutral-700/30" />

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
                                        <Link
                                            href={project.url}
                                            className="underline hover:text-yellow-200 transition-all"
                                        >
                                            {project.title}
                                        </Link>
                                    </div>
                                    <p className="text-neutral-500 w-full text-left">
                                        {project.content}
                                    </p>
                                </motion.li>
                            ))}
                        </motion.ol>
                    </div>
                </motion.div>
            </motion.main>
        </motion.section>
    )
}
