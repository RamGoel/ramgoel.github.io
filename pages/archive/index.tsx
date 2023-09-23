import ChipBox from '@/components/common/chipBox/chipBox.main'
import { projects } from '@/components/projects/projects.constants'
import { ProjectProps } from '@/components/projects/projects.types'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Projects = () => {
  const router = useRouter()
  const [categories, setCategories] = useState<Array<string> | null>(null)
  const [projectsData, setProjectsData] = useState<Array<ProjectProps>>([])
  useEffect(() => {
    const newProjects = projects.filter((item) => {
      return item.filter === 'full-stack'
    })
    setProjectsData(newProjects)
    const catSet: Array<string> = [];
    projects.forEach(item => item.filter !== 'blog' && catSet.push(item.filter))
    setCategories(Array.from(new Set([...catSet])))
    console.log(catSet)
  }, [])



  useEffect(() => {
    console.log("newValue", projectsData)
  }, [projectsData])

  if (!categories) {
    return null;
  }

  async function filterFn(index: number) {
    console.log("oldValue", projectsData)
    const newProjects = projects.filter((item) => {
      return item.filter === categories?.[index]
    })
    setProjectsData(newProjects)

  }


  return (
    <div className='w-11/12 mx-auto mt-20 '>
      <p className='font-semibold text-lg text-teal-300 cursor-pointer hover:text-teal-200' onClick={() => router.push('/')}><i className='fa fa-arrow-left' /> Ram Goel</p>
      <h1 className='text-5xl font-bold text-slate-300'>All Projects</h1>

      <div className='mt-10'>
        <ChipBox onChangeHandler={(val: number) => filterFn(val)} data={categories} key1={110001} />
      </div>

      <table className='mt-12 w-full border-collapse text-left'>
        <thead className="sticky top-0 z-10 border-b border-slate-300/10 bg-slate-900/75 px-6 py-5 backdrop-blur">

          <tr>
            <th className='py-4 pr-8 text-sm font-semibold text-slate-200'>Year</th>
            <th className='py-4 pr-8 text-sm font-semibold text-slate-200'>Project</th>
            <th className='hidden md:table-cell py-4 pr-8 text-sm font-semibold text-slate-200'>Made at</th>
            <th className='hidden lg:table-cell py-4 pr-8 text-sm font-semibold text-slate-200'>Built with</th>
            <th className='hidden lg:table-cell py-4 pr-8 text-sm font-semibold text-slate-200'>Link</th>
          </tr>
        </thead>
        <tbody>
          {
            [...projectsData].filter(item => item.type !== 'blog').sort((a, b) => b.year - a.year).map((item: ProjectProps) => {
              return <tr key={item.key} className='border-b border-slate-300/10 last:border-none'>
                <td className='py-4 pr-4 align-top text-sm'>{item.year}</td>
                <td className='hidden md:block py-4 pr-4 align-top font-semibold leading-snug text-slate-200'>{item.name} {item.extras || null}</td>
                <td className='md:hidden py-4 pr-4 align-top font-semibold leading-snug text-slate-200'>
                  <a href={item.url} className='hover:text-teal-300'>
                    {item.name} <i className='project-arrow fa fa-arrow-right -rotate-45 ml-2'></i>
                  </a>
                </td>
                <td className='hidden md:table-cell py-4 pr-4 align-top text-sm'>{item.madeat}</td>
                <td className='hidden lg:table-cell py-4 pr-4 align-top text-sm'><ChipBox data={item.skills} key={item.key} /></td>
                <td className='hidden lg:table-cell project-link py-4 pr-4 align-top text-sm font-semibold hover:text-teal-300'>
                  <a href={item.url}>
                    {item.url}
                  </a>
                  <i className='project-arrow fa fa-arrow-right -rotate-45 ml-2'></i>
                </td>
              </tr>
            })
          }
        </tbody>

      </table>
    </div>
  )
}

export default Projects