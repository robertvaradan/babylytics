'use client'

import { useAuth } from '@clerk/nextjs'
import { Theme } from '@radix-ui/themes'
import { ConvexReactClient } from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
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
        <Theme appearance={appearance} className="flex safe-margin">
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                {children}
            </ConvexProviderWithClerk>
        </Theme>
    )
}
