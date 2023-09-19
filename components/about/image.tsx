import Image from 'next/image'
import React from 'react'

const PImage = ({src}:{src:string}) => {
  return (
      <div className="rounded-full">
      <Image
        src={src}
        width={300}
        height={300}
      alt='profile-image'/>
    </div>
  )
}

export default PImage;