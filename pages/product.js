import { signIn, getSession } from "next-auth/react"
import LoadingSkeleton from "./loading"
import React, { useEffect } from "react"
// import { getData } from "./api/hello"


export default function Product() {
    const [loading, setLoading] = React.useState(true)
    const [data, setData] = React.useState([])

    //to check the session in this route
    const securePage = async () => {
        const session = await getSession()
        // console.log(session)
        if (!session) {
            signIn()
        } else {
            setLoading(false)
        }
    }

    //getuser api fetch function
    const getuserData = async () => {
        await fetch(`/api/testingAPI`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setData(data)
            })
            .catch((err) => console.log(err));
    }


    useEffect(() => {
        getuserData()
        securePage()
    }, [])


    let newPrices = data.filter((price) => {
        return price.abv > 6.5
    });
    console.log(newPrices)


    if (loading) {
        return <LoadingSkeleton />
    }
    else {
        return (
            <div>
                <div style={{ marginTop: '50px' }}>
                    <h1>This is Product Page</h1>
                    <div>
                        {data?.map((item) => {
                            return (
                                <div key={item.id}>
                                    <h2>{item.name}</h2>
                                    <p>{item.abv}</p>
                                    <span>{item.boil_volume.unit}</span>
                                    <span>{item.boil_volume.value}</span>
                                    <div>
                                        <h4>ingredients</h4>
                                        {item?.ingredients?.hops?.map((list, index) => {
                                            return (
                                                <>
                                                    <ul key={index}>
                                                        <li>{list.name}</li>
                                                        <li>{list.attribute}</li>
                                                    </ul>
                                                </>
                                            )
                                        })}
                                    </div>
                                    <div><h4>Foods</h4>
                                        <ul>
                                            {item?.food_pairing?.map((food, index) => {
                                                return (
                                                    <li key={index}>{food}</li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                    <hr />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }

}


Product.auth = true

