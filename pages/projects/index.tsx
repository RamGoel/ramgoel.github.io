'use client'
import { projects } from '@/components/v2/data'
import StartupCard from '@/components/v2/startup-card'
import Transition from '@/layouts/transition'
import V2Layout from '@/layouts/v2'
import { useState } from 'react'

const Projects = () => {
    const [filter, setFilter] = useState('all')
    return (
        <V2Layout>
            <Transition>
                <div>
                    <div className="flex items-center justify-center gap-3">
                        <div className="bg-[#604CC3] hidden md:visible w-[20px] rotate-[20deg] h-[20px]"></div>
                        <h1 className="text-3xl font-semibold">Projects </h1>
                    </div>
                    <p className="text-center text-sm 2xl:text-md mt-4">
                        some of the best projects I have worked on :)
                    </p>
                    <div className="grid w-full md:w-1/2 mx-auto grid-cols-1 gap-[3rem] py-[50px]">
                        {projects.map((item: any, index: number) => {
                            if (
                                index === 0 ||
                                item.type !== projects[index - 1].type
                            ) {
                                return (
                                    <div key={index}>
                                        <h1 className="text-lg text-center md:text-left font-semibold mb-4">
                                            {item.type}
                                        </h1>
                                        <StartupCard
                                            startup={item}
                                            key={index}
                                        />
                                    </div>
                                )
                            } else {
                                return (
                                    <StartupCard startup={item} key={index} />
                                )
                            }
                        })}
                    </div>
                </div>
            </Transition>
        </V2Layout>
    )
}

export default Projects
