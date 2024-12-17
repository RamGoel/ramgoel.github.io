import {
    FaEnvelope,
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaYoutube,
} from 'react-icons/fa'

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
    {
        name: 'Youtube',
        icon: FaYoutube,
        url: 'https://www.youtube.com/@theramgoel',
    },
]

export const projects: {
    id: string
    title: string
    date: string
    content: string
    url: string
    users: number
    active: boolean
}[] = [
    {
        id: '1',
        title: 'ram/noterr',
        date: '2024',
        content: 'helps organize your internet.',
        url: 'https://noterr.ramgoel.com/',
        users: 20,
        active: true,
    },
    {
        id: '2',
        title: 'ram/updatly',
        date: '2024',
        content: 'interactive changelog for your SaaS.',
        url: 'https://updatly.ramgoel.com/',
        users: 10,
        active: true,
    },
    {
        id: '4',
        title: 'ram/lemma',
        date: '2024',
        content: 'Convert JSON to HTML + Tailwind Code in seconds.',
        url: 'https://lemma-ui.vercel.app/',
        users: 10,
        active: false,
    },
    {
        id: '3',
        title: 'ram/dumbel',
        date: '2024',
        content: 'match with developers, connect with people, etc.',
        url: 'https://dumbel.vercel.app/',
        users: 80,
        active: false,
    },
    {
        id: '4',
        title: 'ram/devtools',
        date: '2024',
        content: 'ai dev tools directory',
        url: 'https://devtools-ai.vercel.app/',
        users: 8,
        active: false,
    },
]
