export const SITE_URL = 'https://ramgoel.github.io'

export function absoluteUrl(path = '/') {
    const normalized = path.startsWith('/') ? path : `/${path}`
    return `${SITE_URL}${normalized === '/' ? '' : normalized}`
}

/** Static OG image baked at build time into public/og/ */
export function ogImageUrl(slug: string = 'default') {
    return absoluteUrl(`/og/${slug}.png`)
}
