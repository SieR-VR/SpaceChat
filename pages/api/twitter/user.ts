import { TwitterApi } from "twitter-api-v2";
import { NextApiRequest, NextApiResponse } from "next";

export default async function(req: NextApiRequest, res: NextApiResponse) {
    const accessToken = JSON.parse(req.body).accessToken;

    const twitter = new TwitterApi(accessToken as string);
    const user = await twitter.currentUserV2();

    res.status(200).json({
        user: user.data
    });
}
