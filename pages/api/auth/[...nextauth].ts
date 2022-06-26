import NextAuth, { NextAuthOptions } from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

export const authOptions: NextAuthOptions = {
    providers: [
        TwitterProvider({
            clientId: process.env.TWITTER_OAUTH_CLIENT_ID,
            clientSecret: process.env.TWITTER_OAUTH_CLIENT_SECRET,
            version: "2.0"
        }),
    ],
    pages: {
        signIn: '/',
    }
}

export default NextAuth(authOptions);
