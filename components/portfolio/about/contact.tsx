import Link from 'next/link'
import React from 'react'

const ContactLine = () => {
  return (
      <div>
          <Link href='/freelance' className='hover:text-white group transition-all flex items-center justify-start p-4'>
              <p>Freelance Website</p>
              <i className='fa fa-arrow-right ml-2 group-hover:ml-3 transition-all'></i>
          </Link>
    </div>
  )
}

export default ContactLine