/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = {
    runtime: 'edge',
}

export default async function handler(req: NextRequest) {
    const { searchParams } = req.nextUrl
    const title = searchParams.get('title')?.trim() || 'Ram Goel'
    const subtitle =
        searchParams.get('subtitle')?.trim() ||
        'Frontend platform · Design systems · Voice agents'

    const fontSize =
        title.length > 80 ? 44 : title.length > 50 ? 52 : title.length > 28 ? 64 : 76

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#fafafa',
                    backgroundImage:
                        'radial-gradient(ellipse at 0% 0%, #f5f5f5 0%, transparent 55%), radial-gradient(ellipse at 100% 100%, #f0f0f0 0%, transparent 50%)',
                    padding: '56px 72px 48px',
                }}
            >
                {/* Top accent */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 5,
                        backgroundColor: '#171717',
                        display: 'flex',
                    }}
                />

                {/* Brand row */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        marginBottom: 48,
                    }}
                >
                    <div
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 10,
                            backgroundColor: '#171717',
                            color: '#fafafa',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 15,
                            fontWeight: 700,
                            letterSpacing: '-0.04em',
                        }}
                    >
                        RG
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <span
                            style={{
                                fontSize: 20,
                                fontWeight: 600,
                                color: '#171717',
                                letterSpacing: '-0.02em',
                            }}
                        >
                            Ram Goel
                        </span>
                        <span style={{ fontSize: 15, color: '#737373' }}>
                            Frontend Engineer @ Sarvam AI
                        </span>
                    </div>
                </div>

                {/* Title */}
                <div
                    style={{
                        display: 'flex',
                        flex: 1,
                        alignItems: 'center',
                        maxWidth: 1040,
                    }}
                >
                    <h1
                        style={{
                            fontSize,
                            fontWeight: 600,
                            color: '#171717',
                            letterSpacing: '-0.035em',
                            lineHeight: 1.12,
                            margin: 0,
                        }}
                    >
                        {title}
                    </h1>
                </div>

                {/* Footer */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderTop: '1px solid #e5e5e5',
                        paddingTop: 28,
                        marginTop: 40,
                    }}
                >
                    <span
                        style={{
                            fontSize: 18,
                            color: '#525252',
                            letterSpacing: '0.01em',
                        }}
                    >
                        ramgoel.com
                    </span>
                    <span style={{ fontSize: 16, color: '#a3a3a3' }}>{subtitle}</span>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    )
}
