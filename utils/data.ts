type Project = {
    id: number
    title: string
    content: string
    url: string
    users?: number
    type: string
    github?: string
    in_progress?: boolean
    video?: string
}

export const projects: Project[] = [
    {
        id: 6,
        title: 'In-App Deployment for Voice Agents',
        content: 'Built the in-app SDK and embeds for embedding Sarvam voice agents into mobile apps and websites',
        url: '/experiments/on-device-voice',
        type: 'side',
    },
    {
        id: 5,
        title: 'Genie — Agent Builder',
        content: 'A no-code agent builder to create, configure, and deploy voice agents — brought creation time down from days to under 10 minutes',
        url: '/experiments/on-device-models',
        type: 'side',
    },
    {
        id: 3,
        title: 'Sarvam Code — VS Code Extension',
        content: 'Built a VS Code extension that brought a Cursor-like AI coding experience to Sarvam Code, making it easy to switch from Cursor',
        url: 'https://x.com/theramgoel/status/1960756249672474801',
        type: 'side',
    },
    {
        id: 4,
        title: 'Tatva — Design System',
        content: 'Design system used across 5+ products at Sarvam, with an MCP server so agents like Claude and Cursor adhere to it',
        url: '',
        type: 'side',
    },
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
