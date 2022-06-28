import { NextApiRequest, NextApiResponse } from "next";
import { Channel, StreamChat } from "stream-chat";

const ApiKey = process.env.STREAM_API_KEY;
const ApiSecret = process.env.STREAM_API_SECRET;

const client = StreamChat.getInstance(ApiKey, ApiSecret);
const spaceIdChannelMap = new Map<string, Channel>();

export default async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { id, spaceTitle, spaceId } = JSON.parse(req.body);

        if (!spaceIdChannelMap.has(spaceId)) {
            const channel = client.channel('messaging', spaceId, {
                name: spaceTitle,
                created_by: {
                    id,
                },
            })
            await channel.create();
            await channel.addMembers([id]);

            spaceIdChannelMap.set(spaceId, channel);

            res.status(200).json({
                redirect: `/space/${spaceId}`,
                meta: "Channel created",
            });
        }
        else {
            res.status(200).json({
                redirect: `/space/${spaceId}`,
                meta: "Channel already exists",
            });
        }
    }

    if (req.method === "GET") {
        const { id, spaceId } = req.query as { id: string, spaceId: string };

        if (!spaceIdChannelMap.has(spaceId)) {
            res.status(404).json({
                meta: "Channel not found",
            });
        }
        else {
            const channel = spaceIdChannelMap.get(spaceId);
            channel.addMembers([id]);

            res.status(200).json({
                redirect: `/space/${spaceId}`,
                meta: "Channel found",
            });
        }
    }
}
