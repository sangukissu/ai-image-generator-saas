import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth-options'
import SessionProvider from '@/components/SessionProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}

