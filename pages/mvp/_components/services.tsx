import React from 'react'
import { RiRobotLine, RiSailboatLine, RiWindow2Line } from 'react-icons/ri'

let SERVICES = [
    {
        icon: (
            <RiSailboatLine
                size={50}
                className="group-hover:text-emerald-500 transition-all duration-300"
            />
        ),
        title: 'SaaS Platforms',
        description:
            'We build scalable, user-friendly SaaS solutions tailored to your business needs.',
    },
    {
        icon: (
            <RiWindow2Line
                size={50}
                className="group-hover:text-emerald-500 transition-all duration-300"
            />
        ),
        title: 'Mobile & Web Apps',
        description:
            'We build high-performance mobile and web apps designed for user engagement and success.',
    },
    {
        icon: (
            <RiRobotLine
                size={50}
                className="group-hover:text-emerald-500 transition-all duration-300"
            />
        ),
        title: 'AI Solutions',
        description:
            'We develop AI-powered solutions to automate tasks, decision-making, and drive innovation.',
    },
]
const Services = () => {
    return (
        <div className="flex flex-col md:flex-row items-center gap-5 justify-center">
            {SERVICES.map((service, index) => (
                <div
                    key={index}
                    id={`service-${index}`}
                    className="flex text-white group hover:scale-95 cursor-pointer transition-all duration-300 px-4 py-6 rounded-3xl rounded-br-none rounded-tl-none bg-transparent border-2 border-neutral-500/20 max-w-[300px] gap-2 text-center flex-col items-center justify-center hover:rounded-3xl hover:rounded-bl-none hover:rounded-tr-none"
                >
                    {service.icon}
                    <h1>{service.title}</h1>
                    <p className="opacity-60">{service.description}</p>
                </div>
            ))}
        </div>
    )
}

export default Services
