import { LINKEDIN_PROFILE_URL } from '@/utils/strings'
import { ArrowRight } from 'lucide-react'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { FaGithub, FaProductHunt } from 'react-icons/fa'
import { FaHashnode, FaLinkedinIn } from 'react-icons/fa6'
import { RiTwitterXFill } from 'react-icons/ri'
const Hero = () => {
    return (
        <div className="h-full">
            <div className="w-full h-fit md:h-[75vh]  flex items-center flex-col md:flex-row ">
                <div className="bg-violet-600  md:w-[50%] w-full flex p-[20px] items-center justify-center md:justify-end h-[100%] ">
                    <div className="bg-transparent md:bg-[#FFF6E9] relative  h-[90%] z-[100] md:w-[40%] w-full shadow-none md:shadow-xl ">
                        <div className="flex items-center justify-center h-[60%]">
                            <Image
                                src={LINKEDIN_PROFILE_URL}
                                width={150}
                                className="rounded-full 2xl:h-[250px] 2xl:w-[250px] "
                                height={150}
                                alt="profile-image"
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <h1 className="font-semibold text-xl 2xl:text-4xl text-white md:text-black ">
                                Ram Goel
                            </h1>
                            <div className="w-[100px] my-2 2xl:my-4 h-[5px] bg-white md:bg-violet-600"></div>
                            <p className="text-white text-sm 2xl:text-md md:text-black">
                                developer / engineer
                            </p>
                        </div>

                        <div className="flex items-center h-[40px] 2xl:h-[60px] absolute w-full bg-white bottom-0 justify-center gap-[1.5rem]">
                            <Link href="https://www.linkedin.com/in/ramgoel/">
                                <FaLinkedinIn
                                    size={20}
                                    className="cursor-pointer 2xl:w-[25px] 2xl:h-[25px] hover:translate-y-[-3px] transition-all"
                                />
                            </Link>
                            <Link href="https://github.com/RamGoel">
                                <FaGithub
                                    size={20}
                                    className="cursor-pointer 2xl:w-[25px] 2xl:h-[25px] hover:translate-y-[-3px] transition-all"
                                />
                            </Link>
                            <Link href="https://ramgoel.hashnode.dev/">
                                <FaHashnode
                                    size={20}
                                    className="cursor-pointer 2xl:w-[25px] 2xl:h-[25px] hover:translate-y-[-3px] transition-all"
                                />
                            </Link>
                            <Link href="https://x.com/theramgoel">
                                <RiTwitterXFill
                                    size={20}
                                    className="cursor-pointer 2xl:w-[25px] 2xl:h-[25px] hover:translate-y-[-3px] transition-all"
                                />
                            </Link>
                            <Link href="https://www.producthunt.com/@ram_goel">
                                <FaProductHunt
                                    size={20}
                                    className="cursor-pointer 2xl:w-[25px] 2xl:h-[25px] hover:translate-y-[-3px] transition-all"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className=" w-full md:w-[50%] h-fit md:h-[90%] relative">
                    <div className="mx-[5%]">
                        <h1 className="text-5xl min-[2100px]:text-8xl m-0 md:ml-[-7px] font-bold">
                            Namaste
                        </h1>

                        <div className="w-[200px] my-4 min-[2100px]:my-8 h-[5px] bg-violet-600"></div>

                        <p className="w-10/12 md:w-[400px] text-sm 2xl:text-md mb-4 leading-[35px] lowercase">
                            started to code{' '}
                            <ArrowRight size={13} className="inline" />{' '}
                            {moment(new Date('2019-04-04')).fromNow()}, <br />{' '}
                            first internship{' '}
                            <ArrowRight size={13} className="inline" />{' '}
                            {moment(new Date('2021-04-04')).fromNow()}, <br />
                            first job{' '}
                            <ArrowRight size={13} className="inline" />{' '}
                            {moment(new Date('2024-03-27')).fromNow()}.
                            <br />
                            <br />
                            I&apos;m a full stack + gen-ai engineer based in
                            India. <br /> I am working as a fullstack engineer
                            at{' '}
                            <Link
                                className="font-semibold text-violet-600"
                                href={'https://getconch.ai/'}
                                target="_blank"
                            >
                                Conch-AI
                            </Link>
                            , previously worked at{' '}
                            <Link
                                className="font-semibold text-violet-600"
                                href={'https://animall.in/'}
                                target="_blank"
                            >
                                Animall
                            </Link>{' '}
                            & various early stage startups.
                            <br />
                            <br />I love building softwares and launch to{' '}
                            <span className="font-semibold">real users</span>,
                            My best two projects so far, are{' '}
                            <Link
                                className="font-semibold text-violet-600"
                                href={'https://dumbel.vercel.app'}
                                target="_blank"
                            >
                                Dumbel
                            </Link>{' '}
                            and{' '}
                            <Link
                                className="font-semibold text-violet-600"
                                href={'https://lemma-ui.vercel.app/'}
                                target="_blank"
                            >
                                Lemma
                            </Link>{' '}
                        </p>
                    </div>
                </div>
            </div>
            {/* <div className="p-5">
                <Link
                    href={'publications'}
                    className="flex items-center px-3 py-1 hover:bg-gray-100 w-fit justify-start gap-2"
                >
                    Publications <MdArrowOutward />
                </Link>
            </div> */}
        </div>
    )
}

export default Hero
