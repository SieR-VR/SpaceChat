import React, { useRef } from "react";
import {
  Attachment,
  messageHasReactions,
  MessageOptions,
  MessageRepliesCountButton,
  MessageStatus,
  MessageText,
  MessageTimestamp,
  ReactionSelector,
  SimpleReactionsList,
  useMessageContext
} from "stream-chat-react";

export default function Message() {
  const {
    isReactionEnabled,
    message,
    reactionSelectorRef,
    showDetailedReactions,
  } = useMessageContext();

  const messageWrapperRef = useRef<HTMLDivElement>(null);
  const hasReactions = messageHasReactions(message);

  return (
    <div className="message-wrapper">
      <div className="message-wrapper-content">
        <div className="message-header">
          <div className="message-header-name">{message.user?.name}</div>
        </div>
        <MessageText />
        <div className="message-header-timestamp">
          <MessageTimestamp />
        </div>
        {message.attachments && <Attachment attachments={message.attachments} />}
        {hasReactions && !showDetailedReactions && isReactionEnabled && <SimpleReactionsList />}
        <MessageRepliesCountButton reply_count={message.reply_count} />
      </div>
    </div>
  )
}
