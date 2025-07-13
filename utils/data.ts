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
        id: 1,
        title: 'Updatly',
        content:
            'A B2B SaaS application that allows SaaS Founders to setup changelogs (+ in-app updates) quickly for their apps.',
        url: 'https://updatly.ramgoel.com/',
        users: 50,
        type: 'side',
    },
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
        users: 90,
        type: 'side',
    },
]

export const talks = [
    {
        id: 1,
        title: 'Building Voice Features in Web Apps',
        content:
            'I talk about how I used in-built voice features in web apps to build a voice agent.',
        url: 'https://x.com/theramgoel/status/1923931456558202907',
    },
]

export const workHighlights = [
    {
        id: 3,
        time: '2023',
        content:
            'Built a package to validate PDF password in react-native during my internship at [Surplus](https://surplus.com)',
    },
    {
        id: 2,
        time: '2022',
        content:
            'Built websites for several college events, including [TEDx](https://github.com/tedx-abesec/tedx-2022), [HackHaven](https://hackhaven.gdgabesec.in/) that served 1000s of visitors.',
    },
    {
        id: 1,
        time: '2022',
        content:
            'Built a embedded widget UI for a AI shopping assistant during my internship at [Neyx](https://neyx.ai)',
    },
]
