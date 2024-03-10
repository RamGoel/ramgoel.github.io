import React from 'react'
import { projects } from './projects.constants'
import { ProjectProps } from './projects.types'
import ProjectCard from './project.card'
import { useRouter } from 'next/navigation'

const Projects = ({type}:{type:string}) => {
  const router = useRouter()
  
  return (
    <div id='projects' className='py-10'>
      <h1 className={`text-slate-200 text-2xl font-semibold ${type == ''}`}>{
        type === 'tech' ? `Side Projects` : 'Blogs'}</h1>
      <div>
        <p className='text-xs mt-2 mb-4 leading-relaxed'>I am always building someting, hit me up if you wanna collaborate on something!</p>
        {
          projects.filter(item => item.type === type).map((item: ProjectProps, index: number) => {
            return index < (type == 'tech' ? 2 : 5) && <ProjectCard type={type} key={item.key} data={item} />
          })
        }
      </div>

      {type !== 'blog' && <div className='my-3'>
        <p onClick={() => router.push('/archive')} className='hover:text-teal-300 font-semibold text-sm cursor-pointer'>View all projects <i className='fa fa-arrow-right ml-0.5'></i></p>
      </div>}
    </div>
  )
}

export default Projects