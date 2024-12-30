import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

export const LANDING_PAGES = [
    {
        slug: 'noterr',
        title: 'Noterr',
        description: 'Save & Organize you bookmarks like a pro',
        type: 'landing-page',
        link: 'https://noterr.ramgoel.com',
    },
    {
        slug: 'just-toys',
        title: 'Just Toys',
        type: 'landing-page',
        description: 'Freelance Project for Kids Toys Store',
        link: 'https://just-toys.vercel.app/',
    },
    {
        slug: 'loan-company',
        title: 'Loan Company',
        type: 'landing-page',
        description: 'Freelance Project for Loan Agency',
        link: 'https://loanuncle.com/',
    },
    {
        slug: 'corona-landing',
        title: 'Vaccine Website',
        type: 'landing-page',
        description: 'Freelance Project for Vaccine Company Website',
        link: 'https://ramgoel.github.io/pinkBlueFreelance/',
    },
    {
        slug: 'surplus-landing',
        title: 'Surplus Landing Page',
        type: 'landing-page',
        link: 'https://surplusapp.in/',
        description: 'Built duing my internship at Surplus App',
    },
]

const MOBILE_APPS = [
    {
        slug: 'checkout-app',
        title: 'Checkout App',
        type: 'react-native',
        description: 'A Flight Buddy Matching App (Freelance Project)',
        link: 'https://drive.google.com/file/d/1_j_a_BFeHPhgCYSCdjJAZ3MTxgtxmuWe/view?usp=sharing',
    },
    {
        slug: 'surplus-app',
        title: 'Surplus App',
        type: 'react-native',
        description: 'Built Subscription Management & Billing in this App',
        link: 'https://play.google.com/store/apps/details?id=in.surplusapp',
    },
    {
        slug: 'farmer-app',
        title: 'Goldenfarms App',
        type: 'react-native',
        description: 'Built News Feed, Weather & Shopping Feed in this App',
        link: 'https://play.google.com/store/apps/details?id=com.goldenfarms&hl=en_IN',
    },
    {
        slug: 'ecom-app',
        title: 'E-commerce App',
        type: 'react-native',
        description: 'A E-commerce listing feed in React Native',
        link: 'https://github.com/RamGoel/ecommerce',
    },

    {
        slug: 'todo-app',
        title: 'Todo App',
        type: 'react-native',
        description: 'A Todo App with Progress Bar built with React Native',
        link: 'https://github.com/RamGoel/dimension-todo',
    },

    {
        slug: 'rn-ui-components',
        title: 'React Native UI Components',
        type: 'react-native',
        description: 'Some UI components for React Native',
        link: 'https://github.com/RamGoel/rn-library',
    },
]

const FULL_STACK_APPS = [
    {
        id: 1,
        title: 'Updatly',
        date: '2024',
        content: 'ready to use changelog for your SaaS.',
        url: 'https://updatly.ramgoel.com/',
        users: 10,
        active: true,
        type: 'side',
    },
    {
        id: 2,
        title: 'Noterr',
        date: '2024',
        content: 'save & organize your bookmarks like a pro.',
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
    ...[...MOBILE_APPS, ...LANDING_PAGES].map((page, index) => ({
        ...page,
        type: page.type === 'react-native' ? 'rn' : 'lp',
        id: FULL_STACK_APPS.length + index + 1,
        title: page.title || '',
        date: '2024',
        content: page.description || '',
        url: page.link || '',
        users: 0,
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
