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
        title: 'On-Device Voice',
        content: 'Offline-first voice agent (mic → model → speech)',
        url: '/experiments/on-device-voice',
        type: 'side',
    },
    {
        id: 5,
        title: 'On-Device Chat',
        content: 'Chat with Chrome’s on-device Prompt API',
        url: '/experiments/on-device-models',
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
]

export const blogs = [
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
