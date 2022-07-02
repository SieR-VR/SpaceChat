import { NextApiRequest, NextApiResponse } from "next";
import { StreamChat } from "stream-chat";

const ApiKey = process.env.STREAM_API_KEY;
const ApiSecret = process.env.STREAM_API_SECRET;

const client = StreamChat.getInstance(ApiKey, ApiSecret);

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { id } = JSON.parse(req.body);

    console.log("Pre-token log");
    const token = client.createToken(id);
    console.log(token);

    res.status(200).json({
        streamToken: token,
    });
}
