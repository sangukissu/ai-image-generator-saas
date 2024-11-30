import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="flex flex-col items-center justify-center flex-1 px-4 sm:px-20 text-center">
        <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          AI Image Generator
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-md">
          Transform your ideas into stunning images with the power of AI
        </p>
        <div className="flex gap-4">
          <Button asChild size="lg">
            <Link href="/login">Get Started</Link>
          </Button>
        </div>
      </main>
      <footer className="w-full border-t border-gray-200 dark:border-gray-800 py-4">
        <div className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} AI Image Generator. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

