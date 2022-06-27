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
            if (account) {
                token.accessToken = account.access_token;
            }

            if (account) {
                token.refreshToken = account.refresh_token;
            }

            return token;
        },
        async session({ session, token, user }) {
            session.accessToken = token.accessToken
            return session
        }
    },
    pages: {
        signIn: '/'
    }
}

export default NextAuth(authOptions);
