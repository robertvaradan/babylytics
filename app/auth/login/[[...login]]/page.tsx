'use client'
import { SignIn } from '@clerk/nextjs'
import { Box } from '@radix-ui/themes'

export default function Login() {
    return (
        <Box m="auto">
            <SignIn fallbackRedirectUrl="/baby"></SignIn>
        </Box>
    )
}
