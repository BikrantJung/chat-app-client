import { IMessage } from "@/types/message.types";

// We check if the messages are continuously sent by a user and his profile picture
// will only be displayed at the end of the messages

export const isConcurrentMessage = (
  messages: IMessage[],
  currentMessage: IMessage,
  currentIndex: number,
  loggedInUserId?: string
): boolean => {
  return (
    currentIndex < messages.length - 1 &&
    (messages[currentIndex + 1].sender._id !== currentMessage.sender._id ||
      (messages[currentIndex + 1].sender._id === undefined &&
        messages[currentIndex].sender._id !== loggedInUserId))
  );
};

export const isLastMessage = (
  messages: IMessage[],
  currentIndex: number,
  loggedInUserId?: string
): boolean => {
  return (
    currentIndex === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== loggedInUserId &&
    !!messages[messages.length - 1].sender._id
  );
};
