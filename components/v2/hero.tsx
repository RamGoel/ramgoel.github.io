import { LINKEDIN_PROFILE_URL } from '@/utils/strings'
import Image from 'next/image'
import Link from 'next/link'
import { FaInstagram } from 'react-icons/fa'
import { FaLinkedinIn } from 'react-icons/fa6'
import { RiTwitterXFill } from 'react-icons/ri'

const Hero = () => {
    return (
        <div className="h-full">
            <div className="w-full h-fit md:h-[80%] flex items-center flex-col md:flex-row ">
                <div className="bg-violet-600 md:w-[50%] w-full flex p-[20px] items-center justify-center md:justify-end h-[100%] ">
                    <div className="bg-[#FFF6E9] relative  h-[550px] z-[100] md:w-[40%] w-full shadow-xl ">
                        <div className="flex items-center justify-center h-[60%]">
                            <Image
                                src={LINKEDIN_PROFILE_URL}
                                width={220}
                                className="rounded-full "
                                height={220}
                                alt="profile-image"
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <h1 className="font-semibold text-3xl ">
                                Ram Goel
                            </h1>
                            <div className="w-[100px] my-5 h-[5px] bg-violet-600"></div>
                            <p>founder / engineer</p>
                        </div>

                        <div className="flex items-center h-[60px] absolute w-full bg-white bottom-0 justify-center gap-[1rem]">
                            <Link href="">
                                <FaInstagram
                                    size={25}
                                    className="cursor-pointer"
                                />
                            </Link>
                            <Link href="">
                                <RiTwitterXFill
                                    size={25}
                                    className="cursor-pointer"
                                />
                            </Link>
                            <Link href="">
                                <FaLinkedinIn
                                    size={25}
                                    className="cursor-pointer"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className=" w-full md:w-[50%] h-fit md:h-[90%] relative">
                    <div className="ml-[5%] mt-[10%] ">
                        <h1 className="text-8xl ml-[-7px] font-bold">
                            Namaste
                        </h1>
                        <p className="text-lg">
                            I build whatever comes to my mind!
                        </p>
                        <div className="w-[200px] my-8 h-[5px] bg-violet-600"></div>

                        <p className="w-[500px] lowercase">
                            I&apos;m currently working remotely at ConchAI{' '}
                            <Image
                                height={100}
                                width={100}
                                alt="flag"
                                className="w-[20px] h-[15px] inline"
                                src={require('@/public/flag.png')}
                            />{' '}
                            as a{' '}
                            <span className="font-semibold text-violet-600">
                                full stack + gen-ai engineer
                            </span>
                            . I have previously worked at{' '}
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
                                href={
                                    'https://addons.mozilla.org/en-US/firefox/addon/linkify/'
                                }
                                target="_blank"
                            >
                                Linkify
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
