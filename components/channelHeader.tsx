import { ChannelHeaderProps, TypingIndicator, useChannelStateContext } from "stream-chat-react";

export default function ChannelHeader(props: ChannelHeaderProps) {
  const { title } = props;

  const { channel } = useChannelStateContext();
  const { name } = channel.data || {};

  return (
    <div className="str-chat__header-livestream chat-header">
      <div className="header-item">
        {title || name}
      </div>
      <img className="header-edit-icon" src="/edit.svg" alt="edit" />
      <TypingIndicator />
    </div>
  )
};
