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
    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }) {
            if (account.accessToken) {
                token.accessToken = account.accessToken;
            }

            if (account.refreshToken) {
                token.refreshToken = account.refreshToken;
            }

            return token;
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.accessToken = token.accessToken
            return session
        }
    },
    pages: {
        signIn: '/'
    }
}

export default NextAuth(authOptions);
