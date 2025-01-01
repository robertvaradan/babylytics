import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import '@radix-ui/themes/styles.css'
import { ConvexClientProvider } from './convexclientprovider'

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
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    media="(prefers-color-scheme: light)"
                    content="#fff"
                />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    media="(prefers-color-scheme: dark)"
                    content="color(display-p3 0.067 0.067 0.074)"
                />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden overscroll-none`}
            >
                <ConvexClientProvider>{children}</ConvexClientProvider>
            </body>
        </html>
    )
}
