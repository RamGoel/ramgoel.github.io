import Link from 'next/link'
import React from 'react'

const subject = 'We need to talk!';
const body='Hi Ram, I came from your website and I need some service. Can we have a call so we can discuss this further?'
const ContactLine = () => {
  return (
      <div>
      <Link href={
        `mailto:rgoel766@gmail.com?subject=${subject}&body=${body}`
          } className='hover:text-white group transition-all flex items-center justify-start p-4'>
              <p>Hire me as freelancer</p>
              <i className='fa fa-arrow-right ml-2 group-hover:ml-3 transition-all'></i>
      </Link>
    </div>
  )
}

export default ContactLine