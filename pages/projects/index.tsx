'use client'
import StartupCard from '@/components/startup-card'
import { projects } from '@/data/data'
import MainLayout from '@/layouts/main'
import { ArrowRight } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

const Projects = () => {
    const searchParams = useSearchParams()
    let isWebsites = searchParams.get('websites')

    let dataToRender = projects
    if (isWebsites !== null) {
        dataToRender = projects.filter((item) => {
            return item.type === 'Static Websites'
        })
    } else {
        dataToRender = projects.filter((item) => {
            return item.type !== 'Static Websites'
        })
    }
    return (
        <MainLayout>
            <div>
                <div className="flex items-center justify-center gap-3">
                    <div className="bg-[#604CC3] hidden md:visible w-[20px] rotate-[20deg] h-[20px]"></div>
                    <h1 className="text-3xl font-semibold">
                        {isWebsites !== null ? 'Websites' : 'Projects'}{' '}
                    </h1>
                </div>
                <p className="text-center text-sm 2xl:text-md mt-2">
                    {isWebsites !== null
                        ? 'some of the websites I have built for people!'
                        : 'some of the best projects I have worked on :)'}
                </p>
                <div className="grid w-full md:w-1/2 mx-auto grid-cols-1 gap-[3rem] py-[50px]">
                    {dataToRender.map((item: any, index: number) => {
                        return <StartupCard startup={item} key={index} />
                    })}
                </div>

                <div
                    className="flex items-center justify-center text-violet-600 gap-2 cursor-pointer"
                    onClick={() => {
                        if (isWebsites !== null) {
                            window.location.href = '/projects'
                            return
                        }
                        window.location.href = '/projects?websites'
                    }}
                >
                    <p className="">
                        View{' '}
                        {isWebsites !== null ? 'Full-Stack Apps' : 'Websites'}{' '}
                        I&apos;ve built
                    </p>
                    <ArrowRight size={18} />
                </div>
            </div>
        </MainLayout>
    )
}

export default Projects
