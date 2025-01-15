'use client'
import { useClerk } from '@clerk/nextjs'
import { useEffect } from 'react'

export default function Logout() {
    const { signOut } = useClerk()
    useEffect(() => {
        signOut({ redirectUrl: '/auth/login' })
    })

    return <></>
}
