import { ProjectProps } from "./projects.types";

export const projects: Array<ProjectProps> = [
    {
        key:1,
        name: "cochat.",
        url: 'https://code-chat-flame.vercel.app/',
        description: "A Web based application which allows users to create code rooms and code together, with support of some cool features.",
        preview: require("@/public/projects/codechat.png"),
        skills: ['nextjs', 'expressjs', 'socketio', 'tailwindcss'],
        extras:""
    },
    {
        key:2,
        name: "Ricket",
        url: 'https://ricket-nextjs.vercel.app/',
        description: "A platform to reshare tickets for events you can't attend, just add your tickets and get buyers rollin.",
        preview: require("@/public/projects/ricket.png"),
        skills: ['nextjs', 'expressjs', 'mongodb', 'css'],
        extras:""
    },
]