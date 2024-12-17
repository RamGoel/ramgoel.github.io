import Faq from '@/components/Faq'
import Image from 'next/image'
import React from 'react'
import { ProjectsSection } from '..'
import {
    RiLinkedinBoxFill,
    RiLinkedinLine,
    RiMailFill,
    RiWhatsappLine,
} from 'react-icons/ri'

const Hire = () => {
    return (
        <div className="bg-neutral-900 flex items-stretch pt-[100px] text-white min-h-screen">
            <title>Hire Ram Goel</title>
            <div className="w-1/3 mx-auto pt-[50px] flex flex-col gap-4">
                <h1 className="text-4xl font-bold">Hi, I&apos;m Ram</h1>
                <p className="text-lg">
                    Are you short on developers or want someone for a short-term
                    project? I&apos;m your guy. I can help you build your next
                    project or enhance your existing solution with AI
                    capabilities.
                    <br />
                    <br />
                    Here are few projects I&apos;ve worked on.
                </p>
                <ProjectsSection hideTitle />

                <div className="mt-3 flex items-center gap-3">
                    <div
                        onClick={() =>
                            window.open('https://wa.me/+916396331046', '_blank')
                        }
                        className="flex items-center bg-green-800 hover:bg-green-700 cursor-pointer p-2 rounded-md w-fit px-4 gap-2"
                    >
                        <RiWhatsappLine size={20} />
                        <span>Send me a whatsapp message</span>
                    </div>

                    <div className="">
                        <span>or contact via rgoel766@gmail.com</span>
                    </div>
                </div>
            </div>
            <div className="w-1/3 mx-auto pt-[50px] flex flex-col gap-2">
                <div className="">
                    <Faq />
                </div>
            </div>
        </div>
    )
}

export default Hire
