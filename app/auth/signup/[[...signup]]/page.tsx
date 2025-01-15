'use client'
import { SignUp } from '@clerk/nextjs'
import { Box } from '@radix-ui/themes'

export default function SignUpPage() {
    return (
        <Box m="auto">
            <SignUp fallbackRedirectUrl="/baby"></SignUp>
        </Box>
    )
}
