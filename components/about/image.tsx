import Image from 'next/image'
import React from 'react'

const PImage = ({src}:{src:string}) => {
  return (
      <div className=" p-2 m-3">
      <Image
        src={src}
        width={200}
        className='rounded-full'
        height={200}
      alt='profile-image'/>
    </div>
  )
}

export default PImage;