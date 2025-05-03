import dynamic from 'next/dynamic'

const SarvamComponent = dynamic(() => import('./component'), {
    ssr: false,
})

const SarvamPage = () => {
    return (
        <div className="max-w-[95vw] h-screen bg-white flex items-center justify-center">
            <SarvamComponent />
        </div>
    )
}

export default SarvamPage
