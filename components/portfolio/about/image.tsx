import Image from 'next/image'
import React from 'react'

const PImage = ({src}:{src:string}) => {
  return (
      <div className="pl-3">
      <Image
        src={src}
        width={180}
        className='rounded-full'
        height={180}
      alt='profile-image'/>
    </div>
  )
}

export default PImage;