import { ExperienceProps } from "./experience.types";

export const experiences:Array<ExperienceProps> = [
    {
        key:1,
        company: "Surplus",
        start: "Jun 2023",
        end: "Present",
        skills: ['React Native', 'ReactJs', 'Tailwind', 'SCSS'],
        url: 'https://surplusapp.in',
        description: "Single-handedly managed entire frontend architecture using ReactNative & TypeScript, actively participated in product ideation and weekly production releases.",
        role:"Intern (Frontend)"
    },
    {
        key:2,
        company: "Simplifii Labs",
        start: "Nov 2022",
        end: "Feb 2023",
        skills: ['React Native', 'ReactJs'],
        url: 'https://simplifii.com',
        description: "Implemented automatic OTP detection & app-tour, reduced APK bundle size by 10% by compressing the images, and optimized , performance by 30% using Flat List for large lists of data.",
        role:"SDE Intern"
    },
    
    {
        key:3,
        company: "NeyX",
        start: "Jun 2022",
        end: "Aug 2022",
        skills: ['ReactJs', 'HTML', 'CSS', 'Figma'],
        url: 'https://neyx.in/',
        description: "Integrated chat feature using SocketIO in an existing chatbot UI, built the Website of the startup in ReactJS, with the help of Figma UI Design.",
        role:"Intern (React)"
    },
]
