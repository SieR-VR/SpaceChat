import { NextApiRequest, NextApiResponse } from "next";
import { StreamChat } from "stream-chat";

const ApiKey = process.env.STREAM_API_KEY;
const ApiSecret = process.env.STREAM_API_SECRET;

const client = StreamChat.getInstance(ApiKey, ApiSecret);
const idTokenMap = new Map<string, string>();

export default async function(req: NextApiRequest, res: NextApiResponse) {
    const { id } = JSON.parse(req.body);

    if (!idTokenMap.has(id)) {
        const token = client.createToken(id);
        idTokenMap.set(id, token);

        res.status(200).json({
            streamToken: token,
        });
    }
    else {
        res.status(200).json({
            streamToken: idTokenMap.get(id),
        });
    }
}
