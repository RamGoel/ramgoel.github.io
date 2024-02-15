import React from 'react'
import Link from 'next/link'
import ProjectCard from './project-card'
import { projects } from './project-config'

const Portfolio = () => {
    return (
        <div className='mt-12 flex items-end justify-center'>
            <div>
                <h1 className='text-center text-2xl text-white'>{`Stuff i've created so far...`}</h1>

                <div className='flex flex-wrap w-11/12 mx-auto items-center mt-10 justify-around'>
                    {
                        projects.map((item, index) => (
                            <ProjectCard key={index + item.name} {...item} />
                        ))
                    }

                </div>

                <div className='w-full flex items-center justify-center py-12'>
                    <Link className='mx-auto text-center' href='https://ramgoel.github.io/SiteDesigns/'> View more  <i className='ml-1 fa fa-external-link'></i></Link>

                </div>
            </div>

        </div>
    )
}

export default Portfolio