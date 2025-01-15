'use client'
import { ClerkProvider, SignIn } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { Box, useThemeContext } from '@radix-ui/themes'

export default function Login() {
    const themeContext = useThemeContext()

    return (
        <ClerkProvider>
            <Box m="auto">
                <SignIn
                    appearance={
                        themeContext.appearance === 'dark'
                            ? {
                                  baseTheme: dark,
                              }
                            : undefined
                    }
                    fallbackRedirectUrl="/baby"
                ></SignIn>
            </Box>
        </ClerkProvider>
    )
}
