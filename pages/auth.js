import { useSession } from 'next-auth/react'
import React from 'react';
import { signIn} from 'next-auth/react'
import useRouter from 'next/router'


function Auth({ children }) {

    const { Router } = useRouter

    const {session, loading} = useSession()
    const isUser = !!session?.user
    React.useEffect(() => {
      if (loading) return // Do nothing while loading
      if (!isUser) signIn() // If not authenticated, force log in
    }, [isUser, loading])
  
    if (isUser) {
        Router.push('http://localhost:3000')
      return children
    }
  
    // Session is being fetched, or no user.
    // If no user, useEffect() will redirect.
    return <div>Loading...</div>
  }

  export default Auth