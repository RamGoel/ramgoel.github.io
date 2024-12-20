import CustomTooltip from '@/components/custom-tooltip'
import { childVariants, containerVariants } from '@/utils/animations'
import { projects, socials } from '@/utils/data'
import { motion } from 'framer-motion'
import fs from 'fs'
import matter from 'gray-matter'
import { HomeIcon } from 'lucide-react'
import moment from 'moment'
import Head from 'next/head'
import Link from 'next/link'
import path from 'path'
import { useEffect, useState } from 'react'
import { RiBook3Line, RiYoutubeLine } from 'react-icons/ri'
import { usePathname } from 'next/navigation'

export default function Home({ posts }: { posts: any }) {
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
                <BlogSection posts={posts} />
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
                    Building{' '}
                    <Link
                        href="https://updatly.ramgoel.com"
                        target="_blank"
                        className="underline text-white hover:text-yellow-200 transition-all"
                    >
                        Updatly
                    </Link>{' '}
                    (Ready-to-use Changelog & Feature suggestions)
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
                    Reach out if you want to find a way to work together!
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
            className="flex list-decimal flex-col gap-4"
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
            <div className="flex gap-6 items-center justify-center md:justify-start w-full">
                <Link
                    href={`/?pt=${projectsType}`}
                    className={` p-2 text-sm rounded-md flex items-center gap-2 ${pathname === '/' ? 'bg-zinc-800' : ''}`}
                >
                    <HomeIcon size={17} /> Home
                </Link>
                <Link
                    href={`/blog?pt=${projectsType}`}
                    className={`p-2 text-sm mr-auto rounded-md flex items-center gap-2 ml-[-10px] ${pathname === '/blog' ? 'bg-zinc-800' : ''}`}
                >
                    <RiBook3Line size={20} />
                    <p className="text-sm">Blog</p>
                </Link>

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
                ))}
            </div>
        </motion.div>
    )
}

export const BlogSection = ({ posts }: { posts: any }) => {
    return (
        <motion.div variants={containerVariants}>
            <h3 className="text-xl font-bold">Blog</h3>
            {posts.length ? (
                <div className="flex flex-col gap-2">
                    {posts.map((post: any) => (
                        <Link
                            href={`/blog/${post.slug}`}
                            key={post.slug}
                            className="flex justify-between hover:text-yellow-200 border-zinc-700 hover:border-zinc-500 border-dashed transition-all duration-300 w-full py-3"
                        >
                            <p>{post.title}</p>

                            <div className="flex items-center gap-2">
                                {post.youtube && (
                                    <RiYoutubeLine
                                        size={18}
                                        data-tooltip-id="hover-tooltip"
                                        data-tooltip-content="Related video available"
                                        className="text-neutral-500"
                                    />
                                )}
                                <p className="text-sm text-neutral-500">
                                    {moment(post.date).format('DD MMM YYYY')}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : null}
        </motion.div>
    )
}

export async function getStaticProps({ params }: { params: any }) {
    const postsDirectory = path.join(process.cwd(), 'posts')
    const filenames = fs.readdirSync(postsDirectory)

    const posts = filenames.map((filename) => {
        const filePath = path.join(postsDirectory, filename)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContents)

        return {
            slug: filename.replace('.md', ''),
            title: data.title,
            date: data.date,
            content: content,
            id: filename,
            youtube: data.youtube,
        }
    })

    return {
        props: {
            posts,
        },
    }
}
