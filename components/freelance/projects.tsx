import React from 'react'
import Image from 'next/image'
const Projects = () => {
  return (
      <div className='section flex items-end justify-center'>
          <div className='w-10/12 text-center'>
              
          <h1 className='text-center text-2xl'>My Past projects</h1>
          <div className='flex items-center my-8 justify-around w-11/12 mx-auto'>
              <div className='w-1/3' >
                      <Image
                          src={require('@/public/surplus.png')}
                          alt=''
                          className='mx-auto rounded-xl'
                          width={150}
                          height={150} />
                      <p className='mx-auto text-center my-3'>Surplus</p>
              </div>
              <div className='w-1/3' >
                      <Image
                          src={require('@/public/checkout.png')}
                          alt=''
                          className='mx-auto rounded-xl'
                          width={150}
                          height={150} />
                      <p className='mx-auto text-center my-3'>CheckFly</p>
              </div>
              <div className='w-1/3' >
                      <Image
                          src={require('@/public/goldenfarms.png')}
                          alt=''
                          className='mx-auto rounded-xl'
                          width={150}
                          height={150} />
                      <p className='mx-auto text-center my-3'>GoldenFarms</p>
              </div>
             
              </div>
              <button className='bg-white hover:opacity-60 text-black px-4 py-2 rounded-xl mx-auto'>
                  view all projects
              </button>
          </div>
    </div>
  )
}

export default Projects