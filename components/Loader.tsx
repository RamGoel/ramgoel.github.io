import React, { useEffect, useState } from 'react'
import Head from 'next/head'

const Loader = ({ hideLoader }: { hideLoader: () => void }) => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(timer)
                    hideLoader()
                    return 100
                }
                return prevProgress < 20 ? prevProgress + 2 : prevProgress + 10
            })
        }, 100)

        return () => clearInterval(timer)
    }, [])

    return (
        <div className="bg-zinc-900 w-full text-white min-h-screen flex items-center justify-center">
            <Head>
                <title>Hi, I&apos;m Ram Goel</title>
            </Head>
            <div
                style={{ width: `${progress}%` }}
                className="z-[10] absolute top-0 left-0 flex h-screen w-full items-center justify-center"
            >
                <div className="h-[90vh] w-full bg-white"></div>
            </div>
            <div className="h-screen w-full z-[20] absolute top-0 left-0 flex items-center justify-center">
                <div className="flex flex-col  text-neutral-500 gap-2">
                    <p className="font-mono text-sm">Progress</p>
                    <p className="font-mono ml-auto text-md">{progress}%</p>
                </div>
            </div>
        </div>
    )
}

export default Loader
