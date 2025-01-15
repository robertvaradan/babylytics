'use client'
import { SignIn } from '@clerk/nextjs'

export default function Login() {
    return <SignIn fallbackRedirectUrl="/baby"></SignIn>
}
