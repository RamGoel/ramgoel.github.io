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
}
export const projects: Project[] = [
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
    {
        id: 3,
        title: 'DocsChatAI',
        content:
            'A open-source & ready-to-use RAG Chatbot which any company can use to talk with their documentation.',
        url: '/docschat',
        users: 0,
        type: 'side',
        github: 'https://github.com/RamGoel/DocsChat',
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
        id: 5,
        icon: 'https://avatars.githubusercontent.com/u/112580013?v=4',
        title: 'DiceDB',
        content: 'Rebuilt the layout which improves the UserExperience',
        url: 'https://github.com/DiceDB/alloy/pull/89',
        stars: '7.7k+',
        type: 'oss',
        github: 'https://github.com/DiceDB',
    },
    {
        id: 6,
        icon: 'https://avatars.githubusercontent.com/u/112580013?v=4',
        title: 'StructuredLabs/preswald',
        content: 'Migrated documentation from Mintlify to MkDocs',
        url: 'https://github.com/StructuredLabs/preswald/pull/122',
        stars: '1k+',
        type: 'oss',
        github: 'https://github.com/StructuredLabs/preswald/',
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
