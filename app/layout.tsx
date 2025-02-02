import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import '@radix-ui/themes/styles.css'
import { ConvexClientProvider } from './convexclientprovider'
import { ClerkProvider } from '@clerk/nextjs'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Babylytics',
    description: 'Baby tracking software',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <head>
                    <meta name="mobile-web-app-capable" content="yes" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0, viewport-fit=cover"
                    />
                    <meta
                        name="apple-mobile-web-app-status-bar-style"
                        media="(prefers-color-scheme: light)"
                        content="default"
                    />
                    <meta
                        name="apple-mobile-web-app-status-bar-style"
                        media="(prefers-color-scheme: dark)"
                        content="black-translucent"
                    />
                </head>
                <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased overscroll-none min-h-dvh`}
                >
                    <ConvexClientProvider>{children}</ConvexClientProvider>
                </body>
            </html>
        </ClerkProvider>
    )
}
