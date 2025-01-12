import CustomTooltip from '@/components/custom-tooltip'
import { childVariants, containerVariants } from '@/utils/animations'
import { CONTRIBUTIONS, projects, socials } from '@/utils/data'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import moment from 'moment'
import Image from 'next/image'
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'

export default function Home({ blogs }: { blogs: any }) {
    return (
        <motion.section
            className={`bg-zinc-900 font-mono text-white min-h-screen`}
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
                className="py-[5vh] w-11/12 text-sm md:w-10/12 xl:w-[45%] mx-auto flex flex-col gap-6"
            >
                <motion.div
                    variants={childVariants(0)}
                    className="flex flex-col gap-2"
                >
                    <SocialsSection />
                    <AboutSection />
                </motion.div>
                <motion.div variants={childVariants(0)}>
                    <ProjectsSection />
                </motion.div>
                <motion.div variants={childVariants(0)}>
                    <BlogsSection blogs={blogs} />
                </motion.div>
                <motion.div variants={childVariants(0)}>
                    <ContributionsSection />
                </motion.div>
            </motion.main>
        </motion.section>
    )
}

const AboutSection = () => {
    return (
        <div className="flex flex-col gap-2">
            <ul className="flex list-disc ml-4 flex-col gap-2">
                <li className="text-neutral-500">
                    I&apos;m a full-stack engineer from India.
                </li>

                <li className="text-neutral-500">
                    Worked with few startups,{' '}
                    <Link
                        href="https://www.linkedin.com/in/ramgoel/details/experience/"
                        target="_blank"
                        className="underline text-white hover:text-yellow-200 transition-all"
                    >
                        learn more
                    </Link>
                </li>

                <li className="text-neutral-500">
                    make videos about frontend on{' '}
                    <Link
                        href="https://www.youtube.com/@theRamGoel"
                        target="_blank"
                        className="underline text-white hover:text-yellow-200 transition-all"
                    >
                        YouTube
                    </Link>
                </li>

                <li className="text-neutral-500">
                    Let&apos;s talk how we can work together!
                </li>
            </ul>
        </div>
    )
}

const ProjectsSection = ({ hideTitle }: { hideTitle?: boolean }) => {
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
        <ol className="flex list-decimal flex-col gap-3">
            {!hideTitle ? (
                <div className="flex flex-col items-start md:flex-row md:items-center justify-between">
                    <h3 className="text-lg font-semibold">
                        {projectsType === 'lp'
                            ? 'Landing Pages'
                            : projectsType === 'rn'
                              ? 'Mobile Apps'
                              : 'Side Projects'}
                    </h3>
                </div>
            ) : null}
            {projectsToRender.map((project, index) => (
                <li
                    key={project.id}
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
                </li>
            ))}
        </ol>
    )
}

const SocialsSection = () => {
    return (
        <div className="flex flex-col md:flex-row items-center my-1 justify-start gap-6">
            <div className="flex gap-6 flex-wrap items-center justify-center md:justify-start w-full">
                <h1 className="text-xl font-semibold">Hi, I&apos;m Ram Goel</h1>

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
                </li>
            ))}
        </ol>
    )
}

const BlogsSection = ({ blogs }: { blogs: any }) => {
    console.log(blogs)
    return (
        <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Blogs</h3>
            {blogs.map((blog: any) => (
                <div
                    key={blog.slug}
                    className="flex items-center justify-between gap-2"
                >
                    <Link
                        href={`/blog/${blog.slug}`}
                        className="underline hover:text-yellow-200 transition-all"
                    >
                        {blog.title}
                    </Link>
                    <p className="text-neutral-500">{blog.date}</p>
                </div>
            ))}
        </div>
    )
}
export const getStaticProps = async () => {
    const fileNames = fs.readdirSync(path.join(process.cwd(), 'blogs'))
    const blogs = fileNames.map((fileName) => {
        const filePath = path.join(process.cwd(), 'blogs', fileName)
        const blog = fs.readFileSync(filePath, 'utf8')
        const { data } = matter(blog)

        return {
            title: data.title,
            date: moment(data.date).format('DD MMM, YYYY'),
            slug: fileName,
            ignore: data.ignore || false,
        }
    })

    return { props: { blogs: blogs.filter((blog) => !blog.ignore) } }
}
