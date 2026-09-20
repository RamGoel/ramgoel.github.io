type Project = {
    id: number
    title: string
    content: string
    url: string
    users?: number
    type: string
    group: 'sarvam' | 'conch' | 'personal'
    github?: string
    in_progress?: boolean
    video?: string
    preview?: string
}

export const projects: Project[] = [
    {
        id: 6,
        title: 'In-App SDK & embeds for Sarvam voice agents',
        content: '',
        url: '/experiments/on-device-voice',
        type: 'side',
        group: 'sarvam',
        preview: '/project-1.gif',
    },
    {
        id: 5,
        title: 'Genie — NL → voice agent configs with live testing',
        content: '',
        url: '/experiments/on-device-models',
        type: 'side',
        group: 'sarvam',
        preview: '/project-2.gif',
    },
    {
        id: 3,
        title: 'Sarvam Code — Cursor-like AI coding in VS Code',
        content: '',
        url: 'https://x.com/theramgoel/status/1960756249672474801',
        type: 'side',
        group: 'sarvam',
        preview: '/project-3.gif',
    },
    {
        id: 4,
        title: 'Tatva — design system + MCP across 5+ products',
        content: '',
        url: '',
        type: 'side',
        group: 'sarvam',
        preview: '/project-4.gif',
    },
    {
        id: 17,
        title: 'AI Copilot for learning workflows',
        content: '',
        url: '',
        type: 'side',
        group: 'conch',
    },
    {
        id: 19,
        title: 'Document → Mindmap generation',
        content: '',
        url: '',
        type: 'side',
        group: 'conch',
    },
    {
        id: 20,
        title: 'Citation Library for research',
        content: '',
        url: '',
        type: 'side',
        group: 'conch',
    },
    {
        id: 18,
        title: 'Credit billing system — +10% paid conversions',
        content: '',
        url: '',
        type: 'side',
        group: 'conch',
    },
    {
        id: 21,
        title: 'E2E tests, Sentry & domain LLM fine-tuning',
        content: '',
        url: '',
        type: 'side',
        group: 'conch',
    },
    {
        id: 22,
        title: 'Web perf — WebP, SSG & render optimizations',
        content: '',
        url: '',
        type: 'side',
        group: 'conch',
    },
    {
        id: 1,
        title: 'MeetGraph — realtime speech to diagrams',
        content: '',
        url: 'https://x.com/theramgoel/status/1949402253376545146',
        type: 'side',
        group: 'personal',
        video: 'https://x.com/theramgoel/status/1949402253376545146',
    },
    {
        id: 11,
        title: 'Devro — voice control for Slack, Notion & more',
        in_progress: true,
        content: '',
        url: 'https://x.com/theramgoel/status/1960756249672474801',
        video: 'https://x.com/theramgoel/status/1960756249672474801',
        type: 'side',
        group: 'personal',
    },
    {
        id: 2,
        title: 'Noterr — cross-device bookmarks with sync',
        content: '',
        url: 'https://noterr-app.vercel.app/',
        users: 90,
        type: 'side',
        group: 'personal',
    },
    {
        id: 9,
        title: 'Updatly — embeddable changelog widget',
        content: '',
        url: 'https://log-date.vercel.app/',
        users: 50,
        type: 'side',
        group: 'personal',
    },
    {
        id: 10,
        title: 'Design Vault — save web design inspiration',
        content: '',
        url: 'https://github.com/RamGoel/design-saver',
        type: 'side',
        group: 'personal',
    },
]

export const projectGroups: { id: Project['group']; label: string }[] = [
    { id: 'sarvam', label: 'Sarvam' },
    { id: 'conch', label: 'Conch' },
    { id: 'personal', label: 'Personal' },
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
    {
        id: 3,
        title: 'Sarvam BuildIn Hours',
        content: '12-hour hackathon with 100 builders',
        url: 'https://x.com/theramgoel/status/2085723231273783470',
    },
    {
        id: 4,
        title: 'Sarvam Epoch Buildathon',
        content: 'mentored builders at the hackathon',
        url: 'https://x.com/theramgoel/status/2085723231273783470',
    },
]

export const blogs = [
    {
        id: 5,
        title: '16 months at Sarvam',
        content: 'from a cold email to shipping on indus',
        slug: 'a-year-at-sarvam',
    },
    {
        id: 1,
        title: 'Turn PRs into a work update',
        content: 'gh search → work update',
        slug: 'turn-prs-into-work-update',
    },
    {
        id: 2,
        title: 'The Journey of Building Noterr',
        content: 'lessons from shipping a bookmarking app',
        slug: 'journey-of-noterr',
    },
    {
        id: 3,
        title: 'Light and Dark Mode in React Native',
        content: 'theme setup with Zustand',
        slug: 'react-native-theme',
    },
    {
        id: 4,
        title: 'Script to accept all invites on Linkedin',
        content: 'a quick browser console trick',
        slug: 'automate-linkedin',
    },
]
