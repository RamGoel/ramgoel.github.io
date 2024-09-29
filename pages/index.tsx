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
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // Delay between each child
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
            duration: 0.5, // Animation duration for each child
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
            <motion.main
                variants={childVariants}
                className="py-[15vh] xl:pb-0 flex flex-col gap-4 w-11/12 md:w-3/4 xl:w-1/2 mx-auto"
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
                    I&apos;m a full stack engineer at ConchAI, a AI powered
                    writing and study platform based out of United States .
                    Previously I have worked at{' '}
                    <a
                        href="https://www.linkedin.com/company/animall-in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                    >
                        Animall
                    </a>
                    ,{' '}
                    <a
                        href="https://www.linkedin.com/company/appsurplus/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                    >
                        Surplus
                    </a>{' '}
                    and 2 other startups.
                </motion.p>
                <motion.p variants={childVariants} className="text-lg">
                    I love to build apps in my free time. I&apos;ve built a{' '}
                    <a
                        href="https://dumbel.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                    >
                        platform to connect devs
                    </a>
                    , and a tool to convert{' '}
                    <a
                        href="https://lemma-ui.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                    >
                        API responses to frontend code.
                    </a>
                </motion.p>
                <div className="flex items-center mt-3 justify-start gap-6">
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
