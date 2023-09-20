import React from 'react'

const Socials = () => {
  return (
      <div className='flex flex-row'>
          <a href='https://linkedin.com/in/ramgoel' className='m-2 p-2 '>
              <i className='fab fa-linkedin text-2xl hover:text-slate-200'></i>
          </a>
          <a href='https://twitter.com/theramgoel' className='m-2 p-2 '>
              <i className='fab fa-twitter text-2xl hover:text-slate-200'></i>
          </a>
          <a href='https://github.com/RamGoel' className='m-2 p-2 '>
              <i className='fab fa-github text-2xl hover:text-slate-200'></i>
          </a>
          <a href="https://www.instagram.com/oppptimize/" className='m-2 p-2 '>
              <i className='fab fa-instagram text-2xl hover:text-slate-200'></i>
          </a>
          <a href="mailto:rgoel766@gmail.com" className='m-2 p-2 '>
              <i className='fa fa-envelope text-2xl hover:text-slate-200'></i>
          </a>
    </div>
  )
}

export default Socials