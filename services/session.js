import { signIn, getSession } from "next-auth/react"

export const SecurePage = async () => {
    const session = await getSession()
    // console.log(session)
    if (!session) {
        signIn()
    } else {
        setLoading(false)
    }
}