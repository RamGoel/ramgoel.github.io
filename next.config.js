/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    async redirects() {
        return [
            {
                source: '/docschat',
                destination: 'https://crustdata-neon.vercel.app/',
                permanent: true,
            },
        ]
    },
}

module.exports = nextConfig
