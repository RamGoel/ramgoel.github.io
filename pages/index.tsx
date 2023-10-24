import { Inter } from 'next/font/google'
import About from '@/components/portfolio/about/main'
import Scrollable from '@/components/portfolio/scrollable/scrollable.main'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='md:flex items-center justify-around'>
     
      <About />
      <Scrollable />
    </div>
  )
}
