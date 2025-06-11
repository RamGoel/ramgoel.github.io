import { FaReact } from 'react-icons/fa'
import { RiNextjsLine, RiOpenaiLine, RiReactjsLine } from 'react-icons/ri'
import {
    SiExpress,
    SiFramer,
    SiJavascript,
    SiMongodb,
    SiPostgresql,
    SiPrisma,
    SiPython,
    SiTailwindcss,
    SiTypescript,
} from 'react-icons/si'

type Project = {
    id: number
    title: string
    icon?: string
    content: string
    url: string
    users?: number
    stars?: string
    type: string
    github?: string
    in_progress?: boolean
}
export const projects: Project[] = [
    {
        id: 3,
        title: 'SlidesAI',
        in_progress: true,
        content:
            'Just a fun experiment to generate PPT slides using AI. Uses Sarvam-M as underlying LLM.',
        url: 'https://slides-ai-two.vercel.app/',
        users: 0,
        type: 'side',
    },
    {
        id: 5,
        title: 'VoiceNextPI',
        in_progress: true,
        content:
            'POC for a embedded AI support agent. Can be embedded in any website with 1 line script. Uses Gemini Flash.',
        url: 'https://voice-next-pi.vercel.app/',
        users: 0,
        type: 'side',
    },
    {
        id: 4,
        title: 'LemmaAI',
        content:
            'A tool to generate Tailwind + HTML + FontAwesome Components using AI, built using Gemini-flash model',
        url: 'https://lemma-ui.vercel.app/',
        users: 20,
        type: 'side',
        github: 'https://github.com/RamGoel/lemmaUI',
    },
    {
        id: 2,
        title: 'Noterr',
        content:
            'A browser extension & PWA that allows to save & acess anything from internet using simple shortcuts.',
        url: 'https://noterr.ramgoel.com/',
        users: 50,
        type: 'side',
    },
    {
        id: 1,
        title: 'Updatly',
        content:
            'A B2B SaaS application that allows SaaS Founders to setup changelogs (+ in-app updates) quickly for their apps.',
        url: 'https://updatly.ramgoel.com/',
        users: 35,
        type: 'side',
    },
]

export const SKILLS = [
    {
        name: 'Javascript',
        icon: SiJavascript,
    },
    {
        name: 'Typescript',
        icon: SiTypescript,
    },
    {
        name: 'Python',
        icon: SiPython,
    },
    {
        name: 'React.js',
        icon: FaReact,
    },
    {
        name: 'Next.js',
        icon: RiNextjsLine,
    },
    {
        name: 'React Native',
        icon: RiReactjsLine,
    },
    {
        name: 'Express.js',
        icon: SiExpress,
    },
    {
        name: 'MongoDB',
        icon: SiMongodb,
    },
    {
        name: 'Postgres',
        icon: SiPostgresql,
    },
    {
        name: 'Prisma',
        icon: SiPrisma,
    },
    {
        name: 'Tailwind',
        icon: SiTailwindcss,
    },
    {
        name: 'Framer Motion',
        icon: SiFramer,
    },
    {
        name: 'OpenAI, Gemini, Claude, Prompt Engineering',
        icon: RiOpenaiLine,
    },
]
