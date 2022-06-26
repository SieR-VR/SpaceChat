import { useEffect, useState } from 'react';
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

export default function Chatroom({ client }: { client: StreamChat }) {
  const [channel, setChannel] = useState<StreamChatChannel | null>(null);
  useEffect(() => {
    (async () => {
      await client.setGuestUser({
        id: 'guest-1',
        name: 'Guest 1',
      });

      const channel = client.channel('livestream', 'SpaceTalk');
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
          <MessageList disableDateSeparator={true}/>
          <MessageInput />
        </Window>
      </Channel>
    </Chat>
  );
}
