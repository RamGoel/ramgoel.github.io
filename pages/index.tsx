import CustomTooltip from '@/components/custom-tooltip'
import { childVariants, containerVariants } from '@/utils/animations'
import { CONTRIBUTIONS, projects, socials } from '@/utils/data'
import { motion } from 'framer-motion'
import { ArrowUpRight, Mail, MapPin, Pin } from 'lucide-react'
import Head from 'next/head'
import Link from 'next/link'
import { ReactNode, useEffect, useState } from 'react'
import moment from 'moment'
import Image from 'next/image'
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import CustomLink from '@/components/CustomLink'

const OPEN_TO_WORK = false
const AnimatedWrapper = ({
    time,
    children,
}: {
    time: number
    children: ReactNode
}) => {
    return (
        <motion.div
            variants={childVariants(time)}
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-3"
        >
            {children}
        </motion.div>
    )
}
export default function Home({ blogs }: { blogs: any }) {
    return (
        <section className={`bg-zinc-900 text-white min-h-screen`}>
            <Head>
                <title>Hi, I&apos;m Ram Goel</title>
            </Head>
            <CustomTooltip id="hover-tooltip" />
            <main className="py-[5vh] w-11/12 text-sm md:w-10/12 xl:w-[45%] mx-auto flex flex-col gap-6">
                <AnimatedWrapper time={0}>
                    <SocialsSection />
                    <AboutSection />
                </AnimatedWrapper>
                <AnimatedWrapper time={0.2}>
                    <ProjectsSection />
                </AnimatedWrapper>
                <AnimatedWrapper time={0.4}>
                    <BlogsSection blogs={blogs} />
                </AnimatedWrapper>
                <AnimatedWrapper time={0.5}>
                    <ContributionsSection />
                </AnimatedWrapper>
            </main>
        </section>
    )
}

const AboutSection = () => {
    return (
        <div className="flex flex-col gap-2">
            <ul className="flex list-disc ml-4 flex-col gap-2">
                <li className="text-neutral-500">
                    full-stack engineer from{' '}
                    <CustomLink href="https://en.wikipedia.org/wiki/Amroha">
                        Amroha, India.
                    </CustomLink>
                </li>
                <li className="text-neutral-500">
                    Currently exploring GenAI, and Web performance
                </li>
                <li className="text-neutral-500">
                    Worked with few startups,{' '}
                    <CustomLink
                        extraClassName="pb-[2px]"
                        href="https://www.linkedin.com/in/ramgoel/details/experience/"
                    >
                        read experience
                    </CustomLink>
                </li>

                <li className="text-neutral-500">
                    looking for frontend/full-stack roles (JS stack)
                </li>
            </ul>
        </div>
    )
}

const ProjectsSection = ({ hideTitle }: { hideTitle?: boolean }) => {
    const [projectsType, setProjectsType] = useState<
        'side' | 'rn' | 'ext' | 'fun'
    >('side')

    useEffect(() => {
        const query = new URLSearchParams(window.location.search)
        const projectsType = query.get('pt')
        if (projectsType) {
            setProjectsType(projectsType as 'side' | 'rn' | 'ext' | 'fun')
        } else {
            setProjectsType('side')
        }
    }, [])

    const projectsToRender = projects.filter(
        (project) => project.type === projectsType
    )

    return (
        <ol className="flex list-decimal flex-col gap-3">
            <div className="flex items-center gap-2 mb-1">
                <button
                    onClick={() => setProjectsType('side')}
                    className={`bg-neutral-800/40 border-neutral-800 border px-3 py-1 rounded-full w-fit text-xs ${
                        projectsType === 'side' ? '' : 'opacity-50'
                    }`}
                >
                    web apps
                </button>
                <button
                    onClick={() => setProjectsType('ext')}
                    className={`bg-neutral-800/40 border-neutral-800 border px-3 py-1 rounded-full w-fit text-xs ${
                        projectsType === 'ext' ? '' : 'opacity-50'
                    }`}
                >
                    plugins
                </button>
                <button
                    onClick={() => setProjectsType('fun')}
                    className={`bg-neutral-800/40 border-neutral-800 border px-3 py-1 rounded-full w-fit text-xs ${
                        projectsType === 'fun' ? '' : 'opacity-50'
                    }`}
                >
                    fun
                </button>
            </div>
            {projectsToRender.map((project, index) => (
                <li
                    key={project.id}
                    className="flex flex-col w-full md:flex-row items-center gap-2"
                >
                    <div className="hidden md:flex items-center flex-1 gap-2">
                        <CustomLink href={project.url}>
                            {project.title}
                        </CustomLink>
                        <p className="text-neutral-500 text-left">
                            {'- ' + project.content}
                        </p>
                    </div>
                    <div className="flex md:hidden items-center w-full gap-2">
                        <p className="">{index + 1}.</p>
                        <Link
                            href={project.url}
                            className="underline hover:text-yellow-200 transition-all"
                        >
                            {project.title}
                        </Link>{' '}
                        <span>({project.users} users)</span>
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
                </li>
            ))}
        </ol>
    )
}

const SocialsSection = () => {
    return (
        <div className="flex flex-col md:flex-row items-center my-1 justify-start gap-6">
            <div className="flex gap-6 flex-wrap items-center justify-center md:justify-start w-full">
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-semibold">Ram Goel</h1>
                    {OPEN_TO_WORK && (
                        <div className="px-2 py-1 bg-yellow-200/30 text-yellow-200 border-2 border-yellow-200 rounded-full text-xs">
                            Open to Work
                        </div>
                    )}
                </div>

                <div className="flex items-center flex-1 gap-6 justify-end">
                    {socials.map((social, index) => (
                        <Link
                            key={social.name}
                            href={social.url}
                            data-tooltip-id="hover-tooltip"
                            data-tooltip-content={social.name}
                            className="flex items-center gap-2 hover:scale-110 transition-all"
                        >
                            <social.icon size={20} />
                        </Link>
                    ))}{' '}
                    <div key={'email'} className="md:hidden">
                        <Link
                            href={'mailto:rgoel766@gmail.com'}
                            data-tooltip-id="hover-tooltip"
                            data-tooltip-content={'Email'}
                            className="flex items-center gap-2 hover:scale-110 transition-all"
                        >
                            <Mail size={20} />
                        </Link>
                    </div>
                    <Link
                        href="mailto:rgoel766@gmail.com"
                        className="text-neutral-500 hidden md:inline-flex hover:text-white "
                    >
                        rgoel766@gmail.com
                    </Link>
                </div>
            </div>
        </div>
    )
}

const ContributionsSection = () => {
    return (
        <ol className="flex list-decimal flex-col gap-3">
            <h3 className="text-lg font-semibold">Open Source Contributions</h3>

            {CONTRIBUTIONS.map((contribution, index) => (
                <li
                    key={contribution.name}
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
                        <CustomLink href={contribution.links[0].link}>
                            {contribution.name}
                        </CustomLink>
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
                </li>
            ))}
        </ol>
    )
}

const BlogsSection = ({ blogs }: { blogs: any }) => {
    return (
        <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Writings</h3>
            {blogs.map((blog: any) => (
                <div
                    key={blog.slug}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-2"
                >
                    <CustomLink href={`/blog/${blog.slug}`}>
                        {blog.title}
                    </CustomLink>
                    <p className="text-neutral-500">{blog.date}</p>
                </div>
            ))}
        </div>
    )
}
export const getStaticProps = async () => {
    const fileNames = fs.readdirSync(path.join(process.cwd(), 'blogs'))
    const blogs = fileNames
        .map((fileName) => {
            const filePath = path.join(process.cwd(), 'blogs', fileName)
            const blog = fs.readFileSync(filePath, 'utf8')
            const { data } = matter(blog)

            return {
                title: data.title,
                date: moment(data.date).format('DD MMM, YYYY'),
                slug: fileName.replace('.md', ''),
                ignore: data.ignore || false,
            }
        })
        .sort((a, b) => {
            return moment(b.date).diff(moment(a.date))
        })

    return { props: { blogs: blogs.filter((blog) => !blog.ignore) } }
}
