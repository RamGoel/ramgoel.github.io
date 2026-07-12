import Head from 'next/head'
import { absoluteUrl, ogImageUrl, SITE_URL } from '@/utils/site'

const TWITTER_HANDLE = '@theramgoel'

type PageMetaProps = {
    title: string
    description: string
    path: string
    /** Filename slug under public/og/ (without .png). Defaults to `default`. */
    ogSlug?: string
    /** Open Graph type — articles for blog posts, website otherwise. */
    type?: 'website' | 'article'
    /** If false, use `title` as-is (homepage). Default appends “ - Ram Goel”. */
    appendSiteName?: boolean
}

/**
 * Shared LinkedIn (Open Graph) + Twitter/X meta tags for every page.
 * LinkedIn reads `og:*`; Twitter reads `twitter:*`.
 */
export function PageMeta({
    title,
    description,
    path,
    ogSlug = 'default',
    type = 'website',
    appendSiteName = true,
}: PageMetaProps) {
    const pageTitle = appendSiteName ? `${title} - Ram Goel` : title
    const pageUrl = absoluteUrl(path)
    const imageUrl = ogImageUrl(ogSlug)

    return (
        <Head>
            <title>{pageTitle}</title>
            <meta name="description" content={description} />

            {/* Open Graph — LinkedIn, iMessage, Slack, etc. */}
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:url" content={pageUrl} />
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content="Ram Goel" />
            <meta property="og:locale" content="en_US" />

            {/* Twitter / X */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={TWITTER_HANDLE} />
            <meta name="twitter:creator" content={TWITTER_HANDLE} />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imageUrl} />
            <meta name="twitter:url" content={pageUrl} />

            <link rel="canonical" href={pageUrl} />
            <link rel="author" href={SITE_URL} />
        </Head>
    )
}
