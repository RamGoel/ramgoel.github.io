import { LINKEDIN_PROFILE_URL } from '@/utils/strings'
import Image from 'next/image'
import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'
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
                                className="rounded-full min-[2100px]:h-[200px] min-[2100px]:w-[200px] "
                                height={150}
                                alt="profile-image"
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <h1 className="font-semibold text-xl text-white md:text-black ">
                                Ram Goel
                            </h1>
                            <div className="w-[100px] my-2 h-[5px] bg-white md:bg-violet-600"></div>
                            <p className="text-white text-sm md:text-black">
                                developer / engineer
                            </p>
                        </div>

                        <div className="flex items-center h-[40px] absolute w-full bg-white bottom-0 justify-center gap-[1rem]">
                            <Link href="https://www.linkedin.com/in/ramgoel/">
                                <FaLinkedinIn
                                    size={20}
                                    className="cursor-pointer"
                                />
                            </Link>
                            <Link href="https://github.com/RamGoel">
                                <FaGithub
                                    size={20}
                                    className="cursor-pointer"
                                />
                            </Link>
                            <Link href="https://ramgoel.hashnode.dev/">
                                <FaHashnode
                                    size={20}
                                    className="cursor-pointer"
                                />
                            </Link>
                            <Link href="https://x.com/theramgoel">
                                <RiTwitterXFill
                                    size={20}
                                    className="cursor-pointer"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className=" w-full md:w-[50%] h-fit md:h-[90%] relative">
                    <div className="m-[5%]">
                        <h1 className="text-5xl min-[2100px]:text-8xl m-0 md:ml-[-7px] font-bold">
                            Namaste
                        </h1>

                        <div className="w-[200px] my-4 min-[2100px]:my-8 h-[5px] bg-violet-600"></div>

                        <p className="w-10/12 md:w-[400px] text-sm mb-4 leading-[35px] lowercase">
                            I&apos;m a full stack + gen-ai engineer based in
                            Uttar Pradesh, India📍. I have previously worked at{' '}
                            <Link
                                className="font-semibold text-violet-600"
                                href={'https://animall.in/'}
                                target="_blank"
                            >
                                Animall
                            </Link>{' '}
                            & various early stage startups.
                            <br />
                            <br />I love building softwares to solve real-life
                            problems, no matter how small or big. My best two
                            projects so far, are{' '}
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
                            </Link>
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
