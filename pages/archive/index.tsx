'use client'
import ChipBox from '@/components/portfolio/common/chipBox/chipBox.main'
import { projects } from '@/components/portfolio/projects/projects.constants'
import { ProjectProps } from '@/components/portfolio/projects/projects.types'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ArchiveCard from './archive-card'

const Projects = () => {
    const router = useRouter()
    const [categories, setCategories] = useState<Array<string> | null>(null)
    const [projectsData, setProjectsData] =
        useState<Array<ProjectProps> | null>([])
    const [selectedCategory, setSelectedCategory] = useState('best')

    useEffect(() => {
        const catSet: Array<string> = []
        projects.forEach(
            (item) => item?.filter !== 'blog' && catSet.push(item.filter)
        )
        setCategories(Array.from(new Set([...catSet])))
    }, [])

    useEffect(() => {
        setProjectsData(null)
        const newProjects = projects.filter((item) => {
            if (selectedCategory === 'best') return item?.isGrid
            return item?.filter === selectedCategory
        })
        setProjectsData(newProjects)
    }, [selectedCategory])

    if (!categories) {
        return <></>
    }

    return (
        <div className="min-h-screen px-[5rem] py-[10rem]  bg-gradient-to-tr from-black to-slate-900 leading-relaxed text-slate-400 antialiased selection:bg-teal-300 selection:text-teal-900 ${inter.className}  ">
            <p
                className="font-semibold text-md text-teal-300 cursor-pointer hover:text-teal-200"
                onClick={() => router?.push('/')}
            >
                <i className="fa fa-arrow-left" /> Ram Goel
            </p>
            <h1 className="text-4xl font-bold text-slate-300">All Projects</h1>

            <div className="mt-10 flex items-center justify-between">
                <ChipBox
                    onChangeHandler={(val: string) => setSelectedCategory(val)}
                    selected={selectedCategory}
                    data={['best', ...categories]}
                    key1={110001}
                />
            </div>

            {selectedCategory !== 'best' ? (
                <table className="mt-12 mb-[30px] w-full border-collapse text-left">
                    <thead className="sticky top-0 z-10 border-b border-slate-300/10  px-6 py-5 backdrop-blur">
                        <tr>
                            <th className="py-4 pr-8 text-sm font-semibold text-slate-200">
                                Year
                            </th>
                            <th className="py-4 pr-8 text-sm font-semibold text-slate-200">
                                Project
                            </th>
                            <th className="hidden md:table-cell py-4 pr-8 text-sm font-semibold text-slate-200">
                                Made at
                            </th>
                            <th className="hidden lg:table-cell py-4 pr-8 text-sm font-semibold text-slate-200">
                                Built with
                            </th>
                            <th className="hidden lg:table-cell py-4 pr-8 text-sm font-semibold text-slate-200">
                                Link
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {projectsData
                            ?.sort((a, b) => b.year - a.year)
                            .map((item: ProjectProps) => {
                                return (
                                    <tr
                                        key={item.key}
                                        className="border-b border-slate-300/10 last:border-none"
                                    >
                                        <td className="py-4 pr-4 align-top text-xs">
                                            {item.year}
                                        </td>
                                        <td className="hidden md:block py-4 pr-4 text-xs align-top font-semibold leading-snug text-slate-200">
                                            {item.name}
                                        </td>
                                        <td className="md:hidden py-4 pr-4 align-top font-semibold leading-snug text-slate-200">
                                            <a
                                                href={item.url}
                                                className="hover:text-teal-300"
                                            >
                                                {item.name}{' '}
                                                <i className="project-arrow fa fa-arrow-right -rotate-45 ml-2"></i>
                                            </a>
                                        </td>
                                        <td className="hidden md:table-cell py-4 pr-4 align-top text-xs">
                                            {item.madeat}
                                        </td>
                                        <td className="hidden lg:table-cell py-4 pr-4 align-top text-xs">
                                            <ChipBox
                                                data={item.skills}
                                                key={item.key}
                                            />
                                        </td>
                                        <td className="hidden lg:table-cell project-link py-4 pr-4 align-top text-xs font-semibold hover:text-teal-300">
                                            <a href={item.url} target="_blank">
                                                {item.url.includes('com.') ||
                                                item.url.includes('in.')
                                                    ? `App Store`
                                                    : item.url}
                                            </a>
                                            <i className="project-arrow fa fa-arrow-right -rotate-45 ml-2"></i>
                                        </td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            ) : (
                <div className="p-4 pb-[50px] mx-auto flex-wrap flex items-center justify-start">
                    {projectsData?.map((item) => {
                        if (!item.isGrid) {
                            return
                        }
                        return <ArchiveCard data={item} key={item?.key} />
                    })}
                </div>
            )}
        </div>
    )
}

export default Projects
