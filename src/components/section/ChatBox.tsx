import { useFetchMessages } from "@/hooks/queries/useFetchMessages";
import { useFetchSingleChat } from "@/hooks/queries/useFetchSingleChat";
import { useUserStore } from "@/store/useUserStore";
import { IUserInfo } from "@/types/user.types";
import { SendDiagonal } from "iconoir-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/avatar";
import { Button } from "../atoms/button";
import { Input } from "../atoms/input";
function ChatBox() {
  const { chatId } = useParams();
  const { userInfo } = useUserStore((state) => state);
  const { data: messagesData } = useFetchMessages(chatId);
  const { data: singleChatData, isLoading } = useFetchSingleChat(chatId);
  const [messageContent, setMessageContent] = useState("");

  const [anotherUserData, setAnotherUserData] = useState<
    Omit<IUserInfo, "jwt_token" | "createdAt">
  >({
    username: "",
    profilePicture: "",
    email: "",
    _id: "",
  });

  //   Get another user's data
  useEffect(() => {
    if (singleChatData) {
      const _anotherUser = singleChatData.users.filter(
        (user) => user._id !== userInfo?._id
      )[0];

      setAnotherUserData(_anotherUser);
    }
  }, [singleChatData, userInfo]);

  console.log(anotherUserData);
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
            <div className="flex h-[22rem] mb-4 flex-col gap-2 overflow-hidden hover:overflow-scroll">
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
              onSubmit={(e) => e.preventDefault()}
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
              <Button type="submit">
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
