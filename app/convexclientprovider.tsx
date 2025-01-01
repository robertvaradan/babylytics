'use client'

import { Theme } from '@radix-ui/themes'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import { ReactNode, useEffect, useState } from 'react'

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export function ConvexClientProvider({ children }: { children: ReactNode }) {
    const [updatedTheme, setUpdatedTheme] = useState(
        undefined as undefined | 'light' | 'dark'
    )

    let defaultTheme: 'light' | 'dark' = 'light'

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        defaultTheme = 'dark'
    }

    useEffect(() => {
        window
            .matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', (e) => {
                if (e.matches) {
                    setUpdatedTheme('dark')
                } else {
                    setUpdatedTheme('light')
                }
            })
    })

    return (
        <Theme appearance={updatedTheme ?? defaultTheme}>
            <ConvexProvider client={convex}>{children}</ConvexProvider>
        </Theme>
    )
}
