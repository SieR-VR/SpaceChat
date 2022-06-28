import { TwitterApi } from "twitter-api-v2";
import { getToken } from "next-auth/jwt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function(req: NextApiRequest, res: NextApiResponse) {
    const token = await getToken({ 
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const twitter = new TwitterApi(token.accessToken as string);
    const user = await twitter.currentUserV2();
    
    // const space = await twitter.v2.spacesByCreators([user.data.id], {
    //     "space.fields": 'title'
    // });
    // if (!space.meta.result_count) {
    //     return res.status(200).json({
    //         user: user.data,
    //         meta: "No spaces found"
    //     });
    // }

    // const liveSpace = space.data.find(s => s.state === 'live');
    // if (!liveSpace) {
    //     return res.status(404).json({
    //         user: user.data,
    //         meta: "No live space found"
    //     });
    // }

    res.status(200).json({
        user: {
            id: user.data.id,
            name: user.data.name,
        },
        space: {
            id: 'sample-space-id',
            title: 'Sample Space',
        }
    });
}
