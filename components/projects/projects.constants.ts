import { ProjectProps } from "./projects.types";

export const projects: Array<ProjectProps> = [
    {
        key:1,
        name: "Peer Coding Platform",
        url: 'https://code-chat-flame.vercel.app/',
        description: "A Web based application which allows users to create code rooms and code together, with support of some cool features.",
        preview: require("@/public/projects/codechat.png"),
        skills: ['nextjs', 'expressjs', 'socketio', 'tailwindcss'],
        extras: "",
        madeat: "Personal",
        year:2023
    },
    {
        key:2,
        name: "Ticket Reselling App",
        url: 'https://ricket-nextjs.vercel.app/',
        description: "A platform to reshare tickets for events you can't attend, just add your tickets and get buyers rollin.",
        preview: require("@/public/projects/ricket.png"),
        skills: ['nextjs', 'expressjs', 'mongodb', 'css'],
        extras: "",
        madeat: "Personal",
        year:2022
    },
    {
        key:3,
        name: "TEDx Website",
        url: 'https://tedxabesec.in',
        description: "Website built for TED event in college",
        preview: require("@/public/projects/ricket.png"),
        skills: ['html', 'bootstrap', 'animation', 'css'],
        extras: "",
        madeat: "TEDxABESEC",
        year:2022
    },
    {
        key:4,
        name: "Genero Website",
        url: 'https://genero.live',
        description: "Website built for TED event in college",
        preview: require("@/public/projects/ricket.png"),
        skills: ['reactjs', 'bootstrap', 'animation', 'css'],
        extras: "",
        madeat: "ABESEC",
        year:2022
    },
    {
        key:4,
        name: "Portfolio Generator",
        url: 'https://github.com/RamGoel/portify',
        description: "Website built for TED event in college",
        preview: require("@/public/projects/ricket.png"),
        skills: ['ejs', 'bootstrap', 'nodejs', 'css'],
        extras: "",
        madeat: "ABESEC",
        year:2022
    },
]