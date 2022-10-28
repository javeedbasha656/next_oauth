import { getSession } from 'next-auth/react'

export default async (req, res) => {
  const session = await getSession({ req })
  console.log("testSession: ",session)
  if (!session) {
    res.status(401).json({ error: 'Unauthenticated user' })
  } else {
    res.status(200).json({ message: 'Success', session })
  }
}