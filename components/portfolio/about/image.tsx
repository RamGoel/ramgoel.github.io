import Image from 'next/image'
import React from 'react'

const PImage = ({src}:{src:string}) => {
  return (
      <div className="pl-3">
      <Image
        src={src}
        width={150}
        className='rounded-full  outline-8 outline-double outline-orange-100'
        height={150}
      alt='profile-image'/>
    </div>
  )
}

export default PImage;