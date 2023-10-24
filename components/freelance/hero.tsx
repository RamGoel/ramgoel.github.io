import Image from 'next/image'
import React from 'react'


const Hero = () => {
  return (
    <div className='section flex items-end justify-center '>
      <div className='w-10/12  mx-auto flex flex-col-reverse md:flex-row items-center justify-around'>
        <div className='w-full md:w-3/4 my-2'>

          <h1 className='text-3xl md:text-4xl lg:text-5xl tracking-wide leading-loose '>Hi I am Ram</h1>
          <h1 className='text-3xl w-3/4 md:text-4xl lg:text-5xl tracking-wide '>I <span className='text-violet-50'>convert</span> idea to MVP in <span className='text-violet-50'>4 weeks</span> 🚀</h1>

        </div>
        <div className='w-full md:w-1/3 text-center'>
          <Image src={require('@/public/ram.jpg')} alt='' className='mx-auto rounded-full grayscale' width={250} height={250} />
        </div>
      </div>
    </div>
  )
}

export default Hero