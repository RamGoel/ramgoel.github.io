import dynamic from 'next/dynamic'

const SarvamComponent = dynamic(() => import('./component'), {
    ssr: false,
    loading: () => (
        <div className="h-screen w-screen bg-white flex items-center justify-center">
            Loading...
        </div>
    ),
})

const SarvamPage = () => {
    return (
        <div className="w-screen h-screen bg-white flex items-center justify-center">
            <SarvamComponent />
        </div>
    )
}

export default SarvamPage
