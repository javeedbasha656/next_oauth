import {
    signIn, getSession,
    getCsrfToken
} from "next-auth/react"
import LoadingSkeleton from "./loading"
import React, { useEffect } from "react"


// async function myToken() {
//     const csrfToken = await getCsrfToken()
//     console.log(csrfToken)
// }

export default function Dashboard() {
    const [loading, setLoading] = React.useState(true)



    useEffect(() => {
        const securePage = async () => {
            const session = await getSession()
            console.log({
                session
            })
            if (!session) {
                signIn()
            } else {
                setLoading(false)
            }
        }

        securePage()
        // myToken()
    }, [])

    if (loading) {
        return <LoadingSkeleton />
    }
    else {
        return (

            <div>
                <div style={{ marginTop: '50px' }}>
                    <h1>Dashboard Route</h1>
                </div>

            </div>
        )
    }
}

Dashboard.auth = true