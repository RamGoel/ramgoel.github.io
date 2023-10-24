import React from 'react'
const clients = [
    "surplus",
    "CheckoutFly",
    "AaruWeb",
    "TechBunch",
    "neyX.ai",
    "LoanUncle",
    "WebKids"
]
const Clients = () => {
  return (
      <div  className=' section h-auto flex items-end justify-center'>
          <div>
          <h1 className='text-center text-2xl text-white'>I've Work'd with</h1>

              <div className='flex flex-col md:flex-row justify-around items-center flex-wrap my-5 w-3/4 mx-auto'>
                  {
                      clients.map((client, index) => (
                            <div key={index} className='w-1/2 md:w-1/4 my-2'>
                                <p className='text-xl md:text-3xl w-full text-left md:text-center hover:text-white hover:underline-offset-6 hover:underline transition-all cursor-pointer'>{client}</p>
                            </div>
                        ))
                  }
             
          </div>
        
          </div>

    </div>
  )
}

export default Clients