import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { supabase } from '@/lib/supabase'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        })

        if (error || !data.user) return null

        return {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata.full_name,
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const { data, error } = await supabase
          .from('users')
          .upsert({
            id: user.id,
            email: user.email!,
            full_name: user.name,
            google_id: account.providerAccountId,
            credits: 10, // Give new users 10 free credits
          }, {
            onConflict: 'email',
            ignoreDuplicates: false,
          })
          .select()

        if (error) {
          console.error('Error storing user data:', error)
          return false
        }
      }
      return true
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = account.access_token
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        const { data: userData, error } = await supabase
          .from('users')
          .select('credits')
          .eq('id', session.user.id)
          .single()

        if (error) {
          console.error('Error fetching user credits:', error)
        } else {
          session.user.credits = userData.credits
        }
      }
      return session
    },
  },
  pages: {
    signIn: '/signin',
    error: '/auth/error',
  },
}

