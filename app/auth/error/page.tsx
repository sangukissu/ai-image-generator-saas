'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

export default function AuthError() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to signin page after 5 seconds
    const timer = setTimeout(() => {
      router.push('/signin')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md space-y-4">
        <Alert variant="destructive">
          <AlertTitle>Authentication Error</AlertTitle>
          <AlertDescription>
            There was a problem authenticating your account. This could be due to an invalid or expired token, or a problem with the authentication service.
          </AlertDescription>
        </Alert>
        <Button onClick={() => router.push('/signin')} className="w-full">
          Return to Sign In
        </Button>
      </div>
    </div>
  )
}

