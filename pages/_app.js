import { SessionProvider } from "next-auth/react"
import '../styles/globals.css'
import 'antd/dist/antd.css';
import { useSession } from "next-auth/react"
import React from "react"
import Navbar from "../component/navbar"
import 'antd/dist/antd.css';
import LoadingSkeleton from "./loading"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    // console.log(session), // -> undefined in server- and client-console
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <Navbar />
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  )
}

function Auth({ children }) {
  const { data: session, status, loading } = useSession({ required: true })
  const isUser = !!session?.user
  // console.log(session)// -> undefined in server- but correct in client-console
  React.useEffect(() => {
    if (status === 'loading') return   // Do nothing while loading
    if (!isUser) signIn()
  }, [isUser, status])

  if (isUser) {
    return children
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div><LoadingSkeleton /></div>
}