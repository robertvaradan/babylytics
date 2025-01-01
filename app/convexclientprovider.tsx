'use client'

import { Theme } from '@radix-ui/themes'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import { ReactNode, useEffect, useState } from 'react'

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export function ConvexClientProvider({ children }: { children: ReactNode }) {
    const [appearance, setAppearance] = useState('light' as 'light' | 'dark')

    useEffect(() => {
        // Add listener to update styles
        window
            .matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', (e) =>
                setAppearance(e.matches ? 'dark' : 'light')
            )

        // Setup dark/light mode for the first time
        setAppearance(
            window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light'
        )

        // Remove listener
        return () => {
            window
                .matchMedia('(prefers-color-scheme: dark)')
                .removeEventListener('change', () => {})
        }
    }, [])

    return (
        <Theme appearance={appearance}>
            <ConvexProvider client={convex}>{children}</ConvexProvider>
        </Theme>
    )
}
