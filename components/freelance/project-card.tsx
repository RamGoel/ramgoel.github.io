import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export type ProjectCardProps={
    name:string,
    desc:string,
    image:any,
    liveURL:string
}
const ProjectCard = ({
    image,
}:ProjectCardProps) => {
    return (
        <div className='w-1/2 md:w-1/4'>
            {/* <div className='mb-2 flex items-center justify-between'>
            <h4>{name}</h4>
            <Link href={liveURL}>
                <i className='fa fa-external-link'></i>
            </Link>
            </div>
            <div> */}
                <Image className=' transition-all object-cover opacity-50 hover:opacity-100' width={450} height={400} src={image} alt={'project image'} />
            {/* </div> */}
        </div>
    )
}

export default ProjectCard