import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

const EXTENSIONS = [
    {
        slug: 'voicegpt',
        title: 'VoiceGPT',
        description: 'Type in ChatGPT using voice',
        type: 'extension',
        users: 25,
        link: 'https://chromewebstore.google.com/detail/voicegpt/hdcddhkmdciaoighoehldcndonbkfkep?authuser=0&hl=en-GB',
    },
    {
        slug: 'cdnExtension',
        title: 'cdnExtension',
        description: 'find popular CDNs quickly',
        type: 'extension',
        users: 0,
        link: 'https://addons.mozilla.org/en-US/firefox/addon/cdnextension/',
    },
    {
        slug: 'linkify',
        title: 'Linkify',
        description: 'save & organize links in your browser',
        type: 'extension',
        users: 0,
        link: 'https://addons.mozilla.org/en-US/firefox/addon/linkify/',
    },
]

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
]

const FUN_PROJECTS = [
    {
        id: 0,
        title: 'uber grid question',
        date: '2024',
        description: 'question asked in uber interview',
        link: 'https://codepen.io/ramgoel/pen/mybZMjw',
        active: false,
        type: 'fun',
    },
    {
        id: 1,
        title: 'whatsapp',
        date: '2024',
        description: 'Built 100% using plain CSS',
        link: 'https://ramgoel.com/copies/whatsapp/',
        users: 0,
        active: false,
        type: 'fun',
    },
    {
        id: 2,
        title: 'ticketo',
        date: '2024',
        description: 'Telegram ticket reselling bot',
        link: 'https://x.com/theramgoel/status/1709262222072180879',
        users: 0,
        active: false,
        type: 'fun',
    },
]

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
]

export const projects: any[] = [
    ...FULL_STACK_APPS,
    ...[...EXTENSIONS, ...FUN_PROJECTS].map((page, index) => ({
        ...page,
        type:
            page.type === 'react-native'
                ? 'rn'
                : page.type === 'extension'
                  ? 'ext'
                  : 'fun',
        id: FULL_STACK_APPS.length + index + 1,
        title: page.title || '',
        date: '2024',
        content: page.description || '',
        url: page.link || '',
        users: page?.users || 0,
        active: false,
    })),
]

export const CONTRIBUTIONS = [
    {
        name: 'DiceDB/website',
        time: '2024-12-01',
        icon: 'https://avatars.githubusercontent.com/u/112580013?v=4',
        description: 'Improved the Navbar UX, and fixed some broken links.',
        links: [
            {
                name: 'dice-db',
                link: 'https://github.com/DiceDB/dice/pull/1386',
            },
        ],
    },
    {
        name: 'AsyncAPI/website',
        time: '2024-02-01',
        icon: 'https://avatars.githubusercontent.com/u/16401334?s=280&v=4',
        description: 'Conference archive page, and some design fixes.',
        links: [
            {
                name: 'conference-website',
                link: 'https://github.com/asyncapi/conference-website/pulls?q=is%3Apr+author%3ARamGoel+',
            },
        ],
    },
    {
        name: 'MojaGlobal/flint-ui',
        time: '2024-02-01',
        icon: 'https://avatars.githubusercontent.com/u/19564969?s=280&v=4',
        description: 'Some UI fixes when I was getting started',
        links: [
            {
                name: 'flint-ui',
                link: 'https://github.com/moja-global/FLINT-UI/pulls?q=is%3Apr+author%3ARamGoel+is%3Aclosed',
            },
        ],
    },
]
