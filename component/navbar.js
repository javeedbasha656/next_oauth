import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { useSession } from "next-auth/react"


function Navbar() {
    const { data: session } = useSession()
    // console.log(session)

    const handleSignout = (e) => {
        e.preventDefault()
        signOut()
    }
    return (
        <>
            <nav>
                <div className="navbar">
                    <Link href='/dashboard'>
                        <a>Dashboard</a>
                    </Link>
                    <Link href='/product'>
                        <a>Product</a>
                    </Link>
                    <div className="dropdown" style={{ float: "right" }}>
                        <button className="dropbtn">
                            <img src={session.user.image}
                                className={'imgCover'} />
                            {session.user.name}
                            <i className="fa fa-caret-down"></i>
                        </button>
                        <div className="dropdown-content">
                            <Link href='#'>
                                <a onClick={handleSignout}>Sign Out</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar