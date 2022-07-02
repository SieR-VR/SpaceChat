import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { StreamChat, Channel as StreamChatChannel } from "stream-chat";
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  Window
} from "stream-chat-react";

import Message from './message';
import ChannelHeader from './channelHeader';
import Input from './input';

export default function Chatroom({ client, spaceId, session }: { client: StreamChat, spaceId: string, session: Session }) {
  const [channel, setChannel] = useState<StreamChatChannel | null>(null);

  useEffect(() => {
    (async () => {
      const userInfo = await fetch(`/api/twitter/user?accessToken=${session.accessToken}`, {
        method: "GET"
      }).then(res => res.json());

      const streamToken = await fetch("/api/user", {
        method: "POST", body: JSON.stringify({
          id: userInfo.user.id,
        })
      }).then(res => res.json());

      await fetch(`/api/channel/user`, {
        method: "POST", body: JSON.stringify({
          spaceId,
          id: userInfo.user.id,
        })
      })

      await client.connectUser({
        id: userInfo.user.id,
        name: userInfo.user.name,
        image: userInfo.user.image,
      }, streamToken.streamToken);

      const channel = client.getChannelById("messaging", spaceId, {});
      await channel.watch();

      setChannel(channel);
    })();

    return () => {
      client.disconnectUser();
    }
  }, []);

  if (!channel) {
    return null;
  }

  return (
    <Chat client={client}>
      <Channel channel={channel} Message={Message} Input={Input}>
        <Window>
          <ChannelHeader />
          <MessageList disableDateSeparator={true} />
          <MessageInput />
        </Window>
      </Channel>
    </Chat>
  );
}
