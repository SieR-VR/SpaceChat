import { TwitterApi } from "twitter-api-v2";
import { NextApiRequest, NextApiResponse } from "next";

export default async function(req: NextApiRequest, res: NextApiResponse) {
    const accessToken = JSON.parse(req.body).accessToken;

    const twitter = new TwitterApi(accessToken as string);
    const user = await twitter.currentUserV2();
    
    const space = await twitter.v2.spacesByCreators([user.data.id], {
        "space.fields": 'title'
    });

    if (!space.meta.result_count) {
        return res.status(200).json({
            user: user.data,
            space: {},
            meta: "No spaces found"
        });
    }

    const liveSpace = space.data.find(s => s.state === 'live');
    if (!liveSpace) {
        return res.status(404).json({
            user: user.data,
            space: {},
            meta: "No live space found"
        });
    }

    res.status(200).json({
        user: {
            id: user.data.id,
            name: user.data.name,
            username: user.data.username,
        },
        space: {
            id: liveSpace.id,
            title: liveSpace.title,
        }
    });
}
