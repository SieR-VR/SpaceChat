import { TwitterApi } from "twitter-api-v2";
import { getToken } from "next-auth/jwt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function(req: NextApiRequest, res: NextApiResponse) {
    const token = await getToken({ 
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    console.log(token);

    const twitter = new TwitterApi({
        appKey: process.env.TWITTER_API_KEY,
        appSecret: process.env.TWITTER_API_SECRET,
        accessToken: token.accessToken as string,
        accessSecret: token.refreshToken as string,
    });
    const client = await twitter.appLogin();
    console.log("Asdf");

    await client.currentUserV2().then(console.log);

    res.status(200).json({
        message: "OK",
    });
}
