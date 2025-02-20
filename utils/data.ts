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
