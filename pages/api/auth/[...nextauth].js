import NextAuth from 'next-auth'
import AzureADProvider from "next-auth/providers/azure-ad";

console.log('Azure ID:', process.env.AZURE_AD_CLIENT_ID)
console.log('Azure Secret:', process.env.AZURE_AD_CLIENT_SECRET)


export default NextAuth({
    providers: [
        AzureADProvider({
            clientId: process.env.AZURE_AD_CLIENT_ID,
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
            tenantId: process.env.AZURE_AD_TENANT_ID
        }),
    ],

    pages: {
        signIn: "/",
        signOut: "/signout"
    },
    debug: true,
    callbacks: {
        async session({ session, token, user }) {
            session.user.username = session.user.name
                .split(" ")
                .join("")
                .toLocaleLowerCase();
            session.user.uid = token.sub;
            return session;
        }
    }
})





