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
    video?: string
}
export const projects: Project[] = [
    {
        id: 3,
        title: 'Devro',
        in_progress: true,
        content:
            'Control Slack, Notion, Calendar & Github using voice commands.',
        url: '',
        users: 0,
        video: 'https://x.com/theramgoel/status/1960756249672474801',
        type: 'side',
    },
    {
        id: 1,
        title: 'MeetGraph',
        content: 'Realtime Speech to explainer diagram/flowchart generation',
        url: 'https://ctrl-vibe.vercel.app/',
        users: 0,
        type: 'side',
        video: 'https://x.com/theramgoel/status/1949402253376545146',
    },
    {
        id: 1,
        title: 'Updatly',
        content:
            'Embedded Changelog/Release Notes widget for your website',
        url: 'https://log-date.vercel.app/',
        users: 50,
        type: 'side',
    },
    {
        id: 2,
        title: 'Noterr',
        content:
            'Bookmark anything from internet across devices',
        url: 'https://noterr-app.vercel.app/',
        users: 90,
        type: 'side',
    },
]

export const talks = [
    {
        id: 1,
        title: 'Building Voice Features in Web Apps',
        content: 'at React Play meetups',
        url: 'https://x.com/theramgoel/status/1923931456558202907',
    },
    {
        id: 2,
        title: 'Best Practices in Frontend Dev',
        content: 'at Razorpay office',
        url: 'https://x.com/ReactPlayIO/status/1969429955756114001',
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
