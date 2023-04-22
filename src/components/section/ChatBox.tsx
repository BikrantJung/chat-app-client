import { useFetchMessages } from "@/hooks/queries/useFetchMessages";
import { useFetchSingleChat } from "@/hooks/queries/useFetchSingleChat";
import { useUserStore } from "@/store/useUserStore";
import { IUserInfo } from "@/types/user.types";
import { DownloadCircle, SendDiagonal } from "iconoir-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/avatar";
import { Button } from "../atoms/button";
import { Input } from "../atoms/input";
import { useSendMessage } from "@/hooks/mutations/useSendMessage";
function ChatBox() {
  const chatWrapperDiv = useRef<HTMLDivElement>(null);
  const { chatId } = useParams();
  const { userInfo } = useUserStore((state) => state);
  const { data: messagesData } = useFetchMessages(chatId);
  const { data: singleChatData, isLoading } = useFetchSingleChat(chatId);
  const [messageContent, setMessageContent] = useState("");
  const [scrollButtomToggle, setScrollButtomToggle] = useState(false);
  const [anotherUserData, setAnotherUserData] = useState<
    Omit<IUserInfo, "jwt_token" | "createdAt">
  >({
    username: "",
    profilePicture: "",
    email: "",
    _id: "",
  });

  const {
    mutate,
    isSuccess,
    isLoading: isSendingMessage,
  } = useSendMessage(chatId);
  //   Get another user's data
  useEffect(() => {
    if (singleChatData && !isLoading) {
      const _anotherUser = singleChatData.users.filter(
        (user) => user._id !== userInfo?._id
      )[0];

      setAnotherUserData(_anotherUser);
    }
  }, [singleChatData, userInfo, isLoading]);

  useEffect(() => {
    if (isSuccess) {
      if (chatWrapperDiv.current) {
        chatWrapperDiv.current.scrollTop = chatWrapperDiv.current.scrollHeight;
      }
    }
  }, [isSuccess]);
  useEffect(() => {
    if (chatWrapperDiv.current) {
      chatWrapperDiv.current.scrollTop = chatWrapperDiv.current.scrollHeight;
    }
  }, [chatWrapperDiv]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop > 800) {
      setScrollButtomToggle(true);
    }
  };

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (messageContent.trim()) {
      mutate({
        chatId: chatId,
        content: messageContent.trim(),
        token: userInfo?.jwt_token,
      });
      setMessageContent("");
    }
  };

  if (!chatId) return <div>Chat Not Found</div>;
  return (
    <>
      {!isLoading && !!singleChatData ? (
        <div className="flex-[3_3_0%] rounded bg-background p-4 text-foreground hidden lg:flex flex-col">
          <div className="flex border-b pb-4 mb-4 items-center w-full">
            {!singleChatData.isGroupChat ? (
              <div className="flex gap-2 items-center">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={anotherUserData.profilePicture}
                  ></AvatarImage>
                  <AvatarFallback>{anotherUserData.username}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <h4 className="scroll-m-20 text-sm font-semibold tracking-tight">
                    {anotherUserData.username}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {anotherUserData.email}
                  </p>
                </div>
              </div>
            ) : (
              <h4 className="scroll-m-20 font-semibold tracking-tight">
                {singleChatData.chatName}
              </h4>
            )}
          </div>

          {messagesData ? (
            <div
              ref={chatWrapperDiv}
              onScroll={(e) => handleScroll(e)}
              className="relative flex h-[22rem] transition mb-4 flex-col gap-2 overflow-hidden hover:overflow-scroll"
            >
              {scrollButtomToggle && (
                <div className="absolute z-20 bottom-0 right-0">
                  <Button>
                    <DownloadCircle className="icon" />
                  </Button>
                </div>
              )}

              {messagesData.map((message) => (
                <div key={message._id} className="flex items-center gap-2">
                  <div
                    className={`flex relative py-2 px-4 max-w-[50%] ${
                      message.sender._id === userInfo?._id
                        ? "ml-auto rounded-s-3xl rounded-se-3xl bg-primary text-primary-foreground"
                        : "rounded-[50px_50px_50px_10px] bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
          <div className="">
            <form
              onSubmit={handleSendMessage}
              className="flex items-center gap-2"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={userInfo?.profilePicture}></AvatarImage>
                <AvatarFallback>{userInfo?.username}</AvatarFallback>
              </Avatar>
              <Input
                className="bg-muted"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Your Message..."
              />
              <Button
                type="submit"
                loading={isSendingMessage}
                disabled={messageContent.trim() ? false : true}
              >
                <SendDiagonal className="icon" />
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <p>No chat</p>
      )}
    </>
  );
}

export default ChatBox;
