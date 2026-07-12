import Head from 'next/head'
import { absoluteUrl, ogImageUrl } from '@/utils/site'

type PageMetaProps = {
    title: string
    description: string
    path: string
    /** Filename slug under public/og/ (without .png) */
    ogSlug: string
}

export function PageMeta({ title, description, path, ogSlug }: PageMetaProps) {
    const pageTitle = `${title} - Ram Goel`
    const pageUrl = absoluteUrl(path)
    const imageUrl = ogImageUrl(ogSlug)

    return (
        <Head>
            <title>{pageTitle}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:url" content={pageUrl} />
            <meta property="og:type" content="website" />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imageUrl} />
            <meta name="twitter:card" content="summary_large_image" />
        </Head>
    )
}
