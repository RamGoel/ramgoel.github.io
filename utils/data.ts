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
const FULL_STACK_APPS = [
    {
        id: 2,
        title: 'Noterr',
        date: '2024',
        content: 'save & organize your bookmarks like a pro',
        url: 'https://noterr.ramgoel.com/',
        users: 50,
        active: true,
        type: 'side',
    },
    {
        id: 1,
        title: 'Updatly',
        date: '2024',
        content: 'ready to use changelog for your SaaS',
        url: 'https://updatly.ramgoel.com/',
        users: 35,
        active: true,
        type: 'side',
    },
    {
        id: 3,
        title: 'DocsChat(AI)',
        date: '2025',
        content: 'A RAG Chatbot for your documentation',
        url: '/docschat',
        users: 0,
        active: false,
        type: 'side',
    },
    {
        id: 4,
        title: 'Lemma(AI)',
        date: '2024',
        content: 'Generate Code using Prompt/JSON using AI',
        url: 'https://lemma-ui.vercel.app/',
        users: 20,
        active: false,
        type: 'side',
    },
    // {
    //     id: 5,
    //     title: 'SustainGlobe',
    //     date: '2024',
    //     content: 'Do Tasks & Post about sustainable living (WebApp + PWA)',
    //     url: 'https://github.com/RamGoel/sustaintheglobe-web',
    //     users: 0,
    //     active: false,
    //     type: 'side',
    // },
]

export const projects: {
    id: number
    title: string
    date: string
    content: string
    url: string
    users: number
    active: boolean
}[] = [...FULL_STACK_APPS]

export const CONTRIBUTIONS = [
    {
        name: 'DiceDB',
        icon: 'https://avatars.githubusercontent.com/u/112580013?v=4',
        links: [
            {
                id: 1,
                name: 'dice-db',
                link: 'https://github.com/DiceDB/dice/pull/1386',
                description:
                    'Improved the Navbar UX, and fixed some broken links.',
            },
            {
                id: 2,
                name: 'dicedb/playground',
                link: 'https://github.com/DiceDB/alloy/pull/89',
                description: 'Improved the layout, moving commands to sidebar',
            },
        ],
    },
    {
        name: 'StructuredLabs/preswald',
        icon: 'https://avatars.githubusercontent.com/u/125618760?s=48&v=4',
        links: [
            {
                id: 1,
                name: 'dice-db',
                link: 'https://github.com/StructuredLabs/preswald/pull/122',
                description: 'Migrated docs from Mintlify to MkDocs',
            },
        ],
    },
    {
        name: 'AsyncAPI/website',
        time: '2024-02-01',
        icon: 'https://avatars.githubusercontent.com/u/16401334?s=280&v=4',
        links: [
            {
                id: 1,
                description: 'Conference archive page, and some design fixes.',
                name: 'conference-website',
                link: 'https://github.com/asyncapi/conference-website/pull/265',
            },
        ],
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
