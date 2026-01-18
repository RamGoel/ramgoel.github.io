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
        content: 'Realtime Speech to diagram/flowchart generation',
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

export const miniProjects: Project[] = [
    {
        id: 1,
        title: 'Taskore',
        content: 'Paginated data grid with sorting & global search',
        url: 'https://taskore.vercel.app',
        github: 'https://github.com/RamGoel/taskore',
        type: 'mini',
    },
    {
        id: 2,
        title: 'VoiceGPT',
        content: 'Chrome extension to add voice input to ChatGPT',
        url: 'https://chromewebstore.google.com/detail/voicegpt/hdcddhkmdciaoighoehldcndonbkfkep',
        type: 'mini',
    },
    {
        id: 3,
        title: 'FoldGPT',
        content: 'Navigate ChatGPT history like a folder structure',
        url: 'https://github.com/RamGoel/foldgpt',
        type: 'mini',
    },
    {
        id: 4,
        title: 'ChatGPT Search',
        content: 'Search through your old ChatGPT conversations',
        url: 'https://github.com/RamGoel/chatgptsearch',
        type: 'mini',
    },
    {
        id: 5,
        title: 'CodeChat',
        content: 'Chat rooms with built-in code editor & compiler',
        url: 'https://code-chat-flame.vercel.app',
        github: 'https://github.com/RamGoel/CodeChat',
        type: 'mini',
    },
    {
        id: 6,
        title: 'Work Update',
        content: 'List all your PRs and send to Slack in one click',
        url: 'https://github.com/RamGoel/work-update',
        type: 'mini',
    },
    {
        id: 7,
        title: 'cdnExtension',
        content: 'Firefox extension to quickly find CDN links',
        url: 'https://addons.mozilla.org/en-US/firefox/addon/cdnextension/',
        type: 'mini',
    },
    {
        id: 8,
        title: 'GPT Tools',
        content: 'Collection of web tools built entirely with ChatGPT',
        url: 'https://ramgoel.github.io/gpt-tools/',
        github: 'https://github.com/RamGoel/gpt-tools',
        type: 'mini',
    },
    {
        id: 9,
        title: 'ReduTrap',
        content: 'Remove unused Bootstrap CSS to speed up your site',
        url: 'https://ramgoel.github.io/lessTrap-bootstrap-reducer/',
        github: 'https://github.com/RamGoel/reduTrap',
        type: 'mini',
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

export const socialLinks = [
    { id: 'email', href: 'mailto:rgoel766@gmail.com', icon: 'SiGmail' },
    { id: 'github', href: 'https://github.com/RamGoel', icon: 'SiGithub' },
    { id: 'linkedin', href: 'https://linkedin.com/in/ramgoel', icon: 'FaLinkedin' },
    { id: 'twitter', href: 'https://x.com/theRamGoel', icon: 'FaTwitter' },
]

export const workExperience = [
    {
        id: 1,
        company: 'Sarvam',
        imageSize:80,
        logo: '/logos/sarvam.png',
        description: 'I\'m working on AI voice agents in 11+ languages, small team, led multiple efforts.',
    },
    {
        id: 2,
        company: 'Conch AI',
        imageSize:60,
        logo: '/logos/conch.png',
        description: 'AI writing & study copilot SaaS, single engineer, led entire tech.',
    },
    {
        id: 3,
        company: 'Animall',
        imageSize:80,
        logo: '/logos/animall.png',
        invert: true,
        description: 'web team handling 100K+ daily users, SEO optimization & survey automation.',
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
