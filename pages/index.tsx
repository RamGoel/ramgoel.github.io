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
import Badge from '@/components/badge'
import { ArrowUpRight } from 'lucide-react'
import WorkCard from '@/components/work-card'
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3, // Delay between each child
        },
    },
}
const childVariants = {
    hidden: {
        opacity: 0,
        y: 50, // Start below
    },
    visible: {
        opacity: 1,
        y: 0, // Slide up to original position
        transition: {
            duration: 1, // Animation duration for each child
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

    {
        name: 'Product Hunt',
        icon: <FaProductHunt size={20} />,
        url: 'https://www.producthunt.com/@ram_goel',
    },
    {
        name: 'Blog',
        icon: <FaHashnode size={20} />,
        url: 'https://ramgoel.hashnode.dev/',
    },
]

export default function Home() {
    return (
        <motion.section
            className={`bg-zinc-900 text-white min-h-screen ${font.className}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <title>Ram Goel</title>
            <CustomTooltip id="hover-tooltip" />
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex items-center p-2 bg-gradient-to-r from-blue-600 to-purple-600 justify-center"
            >
                <p className="text-sm">
                    Want me to build a MVP for your startup?{' '}
                    <Link href="/mvp" className="underline">
                        Click here
                    </Link>
                </p>
            </motion.div>
            <motion.main
                variants={childVariants}
                className="py-[15vh] xl:pb-0 flex flex-col gap-4 w-11/12 md:w-3/4 xl:w-[63%] min-[1800px]:w-[50%] mx-auto"
            >
                <Image
                    src={LINKEDIN_PROFILE_URL}
                    width={500}
                    className="rounded-full w-[160px] h-[160px]"
                    height={500}
                    alt="profile-image"
                />
                <motion.h1
                    variants={childVariants}
                    className="text-3xl font-semibold"
                >
                    Hi, I&apos;m Ram Goel👋
                </motion.h1>
                <motion.p variants={childVariants} className="text-lg">
                    I&apos;m a full stack engineer building with GenAI right
                    now. I have worked at 5+ startups and have built products
                    that have been used by 100+ users.
                </motion.p>

                <div className="flex items-center my-3 justify-start gap-6">
                    <button
                        onClick={() => {
                            window.open(
                                'https://cal.com/ram-goel/15min',
                                '_blank'
                            )
                        }}
                        className="flex bg-yellow-500 text-black px-4 py-2 rounded-lg items-center gap-2 hover:scale-110 transition-all"
                    >
                        Book a call{' '}
                        <ArrowUpRight size={18} className="mt-[3px]" />
                    </button>
                    {socials.map((social) => (
                        <Link
                            href={social.url}
                            data-tooltip-id="hover-tooltip"
                            data-tooltip-content={social.name}
                            key={social.name}
                            className="flex items-center gap-2 hover:scale-110 transition-all"
                        >
                            {social.icon}
                        </Link>
                    ))}
                </div>

                <hr className="my-4 opacity-10" />

                <div className="flex items-center justify-between flex-wrap">
                    <motion.h2
                        variants={childVariants}
                        className="text-2xl font-semibold mb-2"
                    >
                        My Work
                    </motion.h2>
                    <Link
                        href="https://gleaming-scilla-add.notion.site/My-Work-109ab15484d5800facaedefcb065a0ca"
                        className="underline text-yellow-500 flex items-center"
                    >
                        See more work on notion{' '}
                        <ArrowUpRight size={18} className="mt-[3px]" />
                    </Link>
                </div>
                <motion.div
                    variants={containerVariants}
                    className="flex items-top justify-start gap-4 flex-wrap"
                >
                    <WorkCard
                        image={require('@/public/shadmore.png')}
                        title="ShadMoreUI"
                        link="https://prelyst.vercel.app/"
                        description="Collection of 5-6 components I built for fun"
                    />
                    <WorkCard
                        image={require('@/public/dumbel.png')}
                        title="Dumbel"
                        link="https://dumbel.vercel.app/"
                        description="A platform to find tech partners for hackathons/events, post fun things, and match with other developers"
                    />
                    <WorkCard
                        image={require('@/public/lemma.png')}
                        title="LemmaUI"
                        link="https://lemma-ui.vercel.app/"
                        description="Lemma helps developers provide JSON, e.g, API Responses, and convert it to frontend code in seconds"
                    />
                </motion.div>

                <hr className="my-4 opacity-10" />

                <motion.h2
                    variants={childVariants}
                    className="text-2xl text-center font-semibold mb-2"
                >
                    The <span className="text-yellow-500 text-3xl">♡</span> I
                    got
                </motion.h2>
                <div className="my-5 flex flex-col gap-2">
                    <Image
                        src={require('@/public/appreciate.png')}
                        width={1500}
                        className=""
                        height={1500}
                        alt="appreciate"
                    />
                </div>
            </motion.main>
        </motion.section>
    )
}
