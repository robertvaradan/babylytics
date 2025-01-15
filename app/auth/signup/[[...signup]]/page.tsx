'use client'
import { ClerkProvider, SignUp } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { Box, useThemeContext } from '@radix-ui/themes'

export default function SignUpPage() {
    const themeContext = useThemeContext()

    return (
        <ClerkProvider>
            <Box m="auto">
                <SignUp
                    appearance={
                        themeContext.appearance === 'dark'
                            ? {
                                  baseTheme: dark,
                              }
                            : undefined
                    }
                    fallbackRedirectUrl="/baby"
                ></SignUp>
            </Box>
        </ClerkProvider>
    )
}
