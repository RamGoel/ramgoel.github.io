import { landingPages } from '@/data/landing-pages'
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

export const socials = [
    {
        name: 'LinkedIn',
        icon: FaLinkedin,
        url: 'https://www.linkedin.com/in/ramgoel/',
    },
    {
        name: 'Github',
        icon: FaGithub,
        url: 'https://github.com/RamGoel',
    },
    {
        name: 'Twitter',
        icon: FaTwitter,
        url: 'https://twitter.com/theramgoel',
    },
    {
        name: 'Email',
        icon: FaEnvelope,
        url: 'mailto:ramgoel@gmail.com',
    },
]

export const projects: {
    id: number
    title: string
    date: string
    content: string
    url: string
    users: number
    active: boolean
    type: 'side' | 'rn' | 'lp'
}[] = [
    {
        id: 1,
        title: 'Updatly',
        date: '2024',
        content: 'interactive changelog for your SaaS.',
        url: 'https://updatly.ramgoel.com/',
        users: 10,
        active: true,
        type: 'side',
    },
    {
        id: 2,
        title: 'Noterr',
        date: '2024',
        content: 'helps organize your internet.',
        url: 'https://noterr.ramgoel.com/',
        users: 20,
        active: true,
        type: 'side',
    },
    {
        id: 3,
        title: 'LemmaUI',
        date: '2024',
        content: 'Convert JSON to HTML + Tailwind Code in seconds.',
        url: 'https://lemma-ui.vercel.app/',
        users: 10,
        active: false,
        type: 'side',
    },
    {
        id: 4,
        title: 'Dumbel',
        date: '2024',
        content: 'match with developers, connect with people, etc.',
        url: 'https://dumbel.vercel.app/',
        users: 80,
        active: false,
        type: 'side',
    },
    {
        id: 5,
        title: 'DevAItools',
        date: '2024',
        content: 'ai dev tools directory',
        url: 'https://devtools-ai.vercel.app/',
        users: 8,
        active: false,
        type: 'side',
    },

    ...landingPages.map((page, index) => ({
        ...page,
        type: (page.type === 'react-native' ? 'rn' : 'lp') as
            | 'side'
            | 'rn'
            | 'lp',
        id: index + 6,
        title: page.title,
        date: '2024',
        content: page.description || '',
        url: page.link,
        users: 0,
        active: false,
    })),
]
