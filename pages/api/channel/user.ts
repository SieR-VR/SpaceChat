import { NextApiRequest, NextApiResponse } from "next";
import { Channel, StreamChat } from "stream-chat";

const ApiKey = process.env.STREAM_API_KEY;
const ApiSecret = process.env.STREAM_API_SECRET;

const client = StreamChat.getInstance(ApiKey, ApiSecret);

export default async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { spaceId, id } = JSON.parse(req.body) as { spaceId: string, id: string };

        try {
            const channel = client.getChannelById("messaging", spaceId, {});
            await channel.addMembers([id]);

            res.status(200).json({
                meta: `User joined channel ${spaceId}`,
            });
        } catch (error) {
            res.status(500).json({
                error: error.message,
                meta: "Channel join failed",
            });
        }
    }
}
