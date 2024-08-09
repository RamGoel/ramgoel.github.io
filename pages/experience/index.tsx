import ExperienceCard from '@/components/experience-card'
import { experiences } from '@/data/data'
import MainLayout from '@/layouts/main'
import { ArrowUpRight } from 'lucide-react'
import moment from 'moment'
import Link from 'next/link'

const Experience = () => {
    return (
        <MainLayout>
            <div className="flex py-[20px] items-stretch flex-col md:flex-row justify-around">
                <div className="w-11/12 mx-auto md:w-1/3">
                    <div className="flex items-center flex-wrap justify-start gap-3">
                        <div className="bg-[#604CC3] hidden md:visible w-[20px] rotate-[20deg] h-[20px]"></div>
                        <h1 className="text-3xl mr-auto font-semibold">
                            Experience
                        </h1>
                        <Link
                            href="/resume.pdf"
                            className="text-sm 2xl:text-md hover:translate-y-[-2px] transition-all text-[#604CC3] cursor-pointer flex items-center gap-2"
                        >
                            Download Resume <ArrowUpRight size={15} />
                        </Link>
                    </div>

                    <p className="mt-4 text-sm 2xl:text-md leading-[30px] 2xl:leading-[40px]">
                        I graduated{' '}
                        {moment().format('YYYY') === '2024'
                            ? 'this year'
                            : 'in ' + moment().format('YYYY')}{' '}
                        and I have worked with more than 4 companies till date,
                        all while being in college. I learned a lot, did work
                        trips (they have a special place in my heart.)
                        <br />
                        <br />I started as a react dev, then simplifii
                        introduced me to{' '}
                        <span className="font-semibold text-violet-700">
                            react native
                        </span>
                        , again animall introduced me to{' '}
                        <span className="font-semibold text-violet-700">
                            nextjs
                        </span>
                        , and then conch introduced me to{' '}
                        <span className="font-semibold text-violet-700">
                            genai
                        </span>
                        <br />
                        <br />
                        Want to hire me as employee/freelancer? drop me a mail
                        at{' '}
                        <span className="font-semibold text-violet-700">
                            rgoel766@gmail.com
                        </span>
                    </p>
                </div>
                <div className="grid grid-cols-1 w-full md:w-1/2 mt-[30px] md:mt-0 gap-[1rem] md:gap-[.5rem] 2xl:gap-[2rem] ">
                    {experiences
                        .filter((item) => item.type === 'profession')
                        .slice(0, 3)
                        .map((item, index) => {
                            return (
                                <ExperienceCard experience={item} key={index} />
                            )
                        })}
                </div>
            </div>
        </MainLayout>
    )
}

export default Experience
