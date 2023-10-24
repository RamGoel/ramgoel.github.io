import React from 'react'
const clients = [
    "Expense Management App",
    "Matching App for Flight Passengers",
    "E-commerce for Farm Products",
]
const Portfolio = () => {
    return (
        <div className='section h-auto flex items-end justify-center'>
            <div>
                <h1 className='text-center text-2xl text-white'>{`I've made & contributed to`}</h1>

                <div className='flex flex-col  my-5  mx-auto'>
                    {
                        clients.map((client, index) => (
                            <div key={index} className='my-3'>
                                <p className='text-2xl w-full text-left md:text-center hover:text-white hover:underline-offset-6 hover:underline transition-all cursor-pointer'>{client}</p>
                            </div>
                        ))
                    }

                </div>

            </div>

        </div>
    )
}

export default Portfolio