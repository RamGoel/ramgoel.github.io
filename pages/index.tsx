import CustomTooltip from '@/components/custom-tooltip'
import { childVariants, containerVariants } from '@/utils/animations'
import { CONTRIBUTIONS, projects, socials } from '@/utils/data'
import { motion } from 'framer-motion'
import { ArrowUpRight, HomeIcon, Mail } from 'lucide-react'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import moment from 'moment'
import Image from 'next/image'
import Loader from '@/components/Loader'

export default function Home() {
    return (
        <motion.section
            className={`bg-zinc-900 text-white min-h-screen`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
        >
            <Head>
                <title>Hi, I&apos;m Ram Goel</title>
            </Head>
            <CustomTooltip id="hover-tooltip" />
            <motion.main
                variants={containerVariants}
                className="py-[5vh] w-11/12 md:w-10/12 xl:w-[45%] mx-auto flex flex-col gap-6"
            >
                <SocialsSection />

                <AboutSection />
                <ProjectsSection />
                <ContributionsSection />
            </motion.main>
        </motion.section>
    )
}

const AboutSection = () => {
    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Hi, I&apos;m Ram Goel</h1>
            <ul className="flex list-disc ml-4 flex-col gap-2">
                <motion.li
                    className="text-neutral-500"
                    variants={childVariants}
                >
                    A full-stack engineer from India.
                </motion.li>

                <motion.li
                    className="text-neutral-500"
                    variants={childVariants}
                >
                    Worked with few startups,{' '}
                    <Link
                        href="https://www.linkedin.com/in/ramgoel/details/experience/"
                        target="_blank"
                        className="underline text-white hover:text-yellow-200 transition-all"
                    >
                        learn more
                    </Link>
                </motion.li>

                <motion.li
                    variants={childVariants}
                    className="text-neutral-500"
                >
                    make videos about frontend on{' '}
                    <Link
                        href="https://www.youtube.com/@theRamGoel"
                        target="_blank"
                        className="underline text-white hover:text-yellow-200 transition-all"
                    >
                        YouTube
                    </Link>
                </motion.li>

                <motion.li
                    className="text-neutral-500"
                    variants={childVariants}
                >
                    Let&apos;s talk how we can work together!
                </motion.li>
            </ul>
        </div>
    )
}

export const ProjectsSection = ({ hideTitle }: { hideTitle?: boolean }) => {
    const [projectsType, setProjectsType] = useState<'side' | 'rn' | 'lp'>(
        'side'
    )

    useEffect(() => {
        const query = new URLSearchParams(window.location.search)
        const projectsType = query.get('pt')
        if (projectsType) {
            setProjectsType(projectsType as 'side' | 'rn' | 'lp')
        } else {
            setProjectsType('side')
        }
    }, [])

    const projectsToRender = projects.filter(
        (project) => project.type === projectsType
    )

    return (
        <motion.ol
            variants={containerVariants}
            className="flex list-decimal flex-col gap-3"
        >
            {!hideTitle ? (
                <div className="flex flex-col items-start md:flex-row md:items-center justify-between">
                    <h3 className="text-xl font-bold">
                        {projectsType === 'lp'
                            ? 'Landing Pages'
                            : projectsType === 'rn'
                              ? 'Mobile Apps'
                              : 'Side Projects'}
                    </h3>
                </div>
            ) : null}
            {projectsToRender.map((project, index) => (
                <motion.li
                    key={project.id}
                    variants={childVariants}
                    className="flex flex-col w-full md:flex-row items-center gap-2"
                >
                    <div className="hidden md:flex items-center flex-1 gap-2">
                        <p className="">{index + 1}.</p>
                        <Link
                            href={project.url}
                            className="underline hover:text-yellow-200 transition-all"
                        >
                            {project.title}
                        </Link>
                        <p className="text-neutral-500 text-left">
                            {project.content}
                        </p>
                    </div>
                    <div className="flex md:hidden items-center w-full gap-2">
                        <p className="">{index + 1}.</p>
                        <Link
                            href={project.url}
                            className="underline hover:text-yellow-200 transition-all"
                        >
                            {project.title}
                        </Link>

                        <p className="text-neutral-500 ml-auto text-right">
                            {project.users} users
                        </p>
                        {project.active && (
                            <div
                                data-tooltip-id="hover-tooltip"
                                data-tooltip-content="Actively working on it"
                                className="bg-green-500 w-2 h-2 animate-pulse rounded-full"
                            ></div>
                        )}
                    </div>
                    <p className="block md:hidden w-full text-neutral-500 text-left">
                        {project.content}
                    </p>
                    <div className="hidden md:flex items-center w-fit gap-2">
                        {project.users ? (
                            <p className="text-neutral-500 ml-auto text-right">
                                {project.users} users
                            </p>
                        ) : null}
                        {project.active && (
                            <div
                                data-tooltip-id="hover-tooltip"
                                data-tooltip-content="Actively working on it"
                                className="bg-green-500 w-2 h-2 animate-pulse rounded-full"
                            ></div>
                        )}
                    </div>
                </motion.li>
            ))}
        </motion.ol>
    )
}

export const SocialsSection = () => {
    const [projectsType, setProjectsType] = useState<'side' | 'rn' | 'lp'>(
        'side'
    )
    const pathname = usePathname()

    useEffect(() => {
        const query = new URLSearchParams(window.location.search)
        const projectsType = query.get('pt')
        if (projectsType) {
            setProjectsType(projectsType as 'side' | 'rn' | 'lp')
        } else {
            setProjectsType('side')
        }
    }, [])
    return (
        <motion.div
            variants={childVariants}
            className="flex flex-col md:flex-row items-center my-1 justify-start gap-6"
        >
            <div className="flex gap-6 flex-wrap items-center justify-center md:justify-start w-full">
                <Link
                    href={`/?pt=${projectsType}`}
                    className={` p-2 text-sm rounded-md flex items-center gap-2 ${pathname === '/' ? 'bg-zinc-800' : ''}`}
                >
                    <HomeIcon size={17} /> Home
                </Link>
                <Link
                    href={`https://medium.com/@rgoel766`}
                    className={`p-2 text-sm group  mr-auto rounded-md flex items-center gap-1 ml-[-10px] ${pathname === '/blog' ? 'bg-zinc-800' : ''}`}
                >
                    <p className="text-sm group-hover:translate-x-[2px] duration-500 group-hover:translate-y-[-2px] transition-all">
                        Blog
                    </p>
                    <ArrowUpRight
                        size={17}
                        className="group-hover:translate-x-[2px] duration-500 group-hover:translate-y-[-2px] transition-all"
                    />
                </Link>
                <div className="flex items-center flex-1 gap-6 justify-end">
                    {socials.map((social) => (
                        <motion.div key={social.name} variants={childVariants}>
                            <Link
                                href={social.url}
                                data-tooltip-id="hover-tooltip"
                                data-tooltip-content={social.name}
                                className="flex items-center gap-2 hover:scale-110 transition-all"
                            >
                                <social.icon size={20} />
                            </Link>
                        </motion.div>
                    ))}{' '}
                    <motion.div
                        key={'email'}
                        className="md:hidden"
                        variants={childVariants}
                    >
                        <Link
                            href={'mailto:rgoel766@gmail.com'}
                            data-tooltip-id="hover-tooltip"
                            data-tooltip-content={'Email'}
                            className="flex items-center gap-2 hover:scale-110 transition-all"
                        >
                            <Mail size={20} />
                        </Link>
                    </motion.div>
                    <Link
                        href="mailto:rgoel766@gmail.com"
                        className="text-neutral-500 hidden md:inline-flex hover:text-white "
                    >
                        rgoel766@gmail.com
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}

const ContributionsSection = () => {
    return (
        <motion.ol
            variants={containerVariants}
            className="flex list-decimal flex-col gap-3"
        >
            <h3 className="text-xl font-bold">Open Source Contributions</h3>

            {CONTRIBUTIONS.map((contribution, index) => (
                <motion.li
                    key={contribution.name}
                    variants={childVariants}
                    className="flex flex-col w-full md:flex-row items-center gap-2"
                >
                    <div className="hidden md:flex items-center flex-1 gap-2">
                        <Image
                            src={contribution.icon}
                            alt={contribution.name}
                            width={20}
                            height={20}
                            className="rounded-full"
                        />
                        <Link
                            href={contribution.links[0].link}
                            className="underline hover:text-yellow-200 transition-all"
                        >
                            {contribution.name}
                        </Link>
                        <p className="text-neutral-500 text-left">
                            {contribution.description} (
                            {moment(contribution.time).format('MMM YYYY')})
                        </p>
                    </div>
                    <div className="flex md:hidden items-center w-full gap-2">
                        <Link
                            href={contribution.links[0].link}
                            className="underline hover:text-yellow-200 transition-all"
                        >
                            {contribution.name} (
                            {moment(contribution.time).format('MMM YYYY')})
                        </Link>
                    </div>
                    <p className="block md:hidden w-full text-neutral-500 text-left">
                        {contribution.description}
                    </p>
                </motion.li>
            ))}
        </motion.ol>
    )
}
