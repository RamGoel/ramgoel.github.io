import Image from 'next/image'
import React from 'react'
import Socials from '../portfolio/about/socials'


const Hero = () => {
  return (
    <div className='section flex items-end justify-center py-12 '>
      <div className='w-10/12  mx-auto flex flex-col-reverse md:flex-row items-center justify-around'>
        <div className='w-full md:w-3/4 my-2'>

          <h1 className='text-3xl md:text-4xl lg:text-5xl tracking-wide leading-loose text-center md:text-left'>Hi I am Ram</h1>
          <h1 className='text-3xl w-full md:w-3/4 md:text-4xl lg:text-5xl tracking-wide text-center md:text-left'>I <span className='text-violet-50'>convert</span> idea to MVP in <span className='text-violet-50'>4 weeks</span> 🚀</h1>
          <Socials />
        </div>
        <div className='w-full md:w-1/3 text-center'>
          <Image src={require('@/public/ram.jpg')} alt='' className='mx-auto rounded-full grayscale' width={300} height={300} />
        </div>
      </div>
    </div>
  )
}

export default Hero