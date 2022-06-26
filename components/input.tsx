import { 
  ChatAutoComplete, 
  FileUploadIcon, 
  SendButton, 
  useMessageInputContext
} from "stream-chat-react";

export default function Input() {
  const {
    closeEmojiPicker,
    emojiPickerIsOpen,
    handleEmojiKeyDown,
    handleSubmit,
    openEmojiPicker,
  } = useMessageInputContext();

  return (
    <div className="chat-input">
      <ChatAutoComplete />
      <SendButton sendMessage={handleSubmit} />
    </div>
  );
}
