import { NextApiRequest, NextApiResponse } from "next";
import { Channel, StreamChat } from "stream-chat";

const ApiKey = process.env.STREAM_API_KEY;
const ApiSecret = process.env.STREAM_API_SECRET;

const client = StreamChat.getInstance(ApiKey, ApiSecret);

export default async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { id, spaceTitle, spaceId } = JSON.parse(req.body);

        try {
            const channel = client.channel('messaging', spaceId, {
                name: spaceTitle,
                created_by: {
                    id,
                },
            })
            await channel.create();
            await channel.addMembers([id]);

            res.status(200).json({
                redirect: `/space/${spaceId}`,
                meta: "Channel created",
            });
        } catch (error) {
            res.status(500).json({
                error: error.message,
                meta: "Channel creation failed",
            });
        }
    }
}
