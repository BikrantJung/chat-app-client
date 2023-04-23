import { useSendMessage } from "@/hooks/mutations/useSendMessage";
import { useFetchMessages } from "@/hooks/queries/useFetchMessages";
import { useFetchSingleChat } from "@/hooks/queries/useFetchSingleChat";
import { socket } from "@/lib/socket";
import { useChatIdStore } from "@/store/useResponsiveChatStore";
import { useUserStore } from "@/store/useUserStore";
import { IChat } from "@/types/chat.types";
import { IMessage } from "@/types/message.types";
import { IUserInfo } from "@/types/user.types";
import { useQueryClient } from "@tanstack/react-query";
import { MoveLeft, SendDiagonal } from "iconoir-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/avatar";
import { Button } from "../atoms/button";
import { Input } from "../atoms/input";

let selectedChat: IChat | undefined;
function ChatBox() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { chatId: storeChatId, setChatId } = useChatIdStore((state) => state);
  const chatWrapperDiv = useRef<HTMLDivElement>(null);
  const { chatId } = useParams();
  const { userInfo } = useUserStore((state) => state);
  const { data: messagesData, isLoading: fetchingMessages } =
    useFetchMessages(chatId);
  const { data: singleChatData, isLoading } = useFetchSingleChat(chatId);
  const [messageContent, setMessageContent] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [scrollButtomToggle, setScrollButtomToggle] = useState(false);
  const [typing, setTyping] = useState("");
  const [roomData, setRoomData] = useState({ userRoomId: "", chatId: "" });
  const [anotherUserData, setAnotherUserData] = useState<
    Omit<IUserInfo, "jwt_token" | "createdAt">
  >({
    username: "",
    profilePicture: "",
    email: "",
    _id: "",
  });

  useEffect(() => {
    setChatId(chatId ? chatId : "");
  }, [chatId, setChatId]);

  const {
    mutate,
    isSuccess,
    isLoading: isSendingMessage,
  } = useSendMessage(chatId);
  //   Get another user's data
  useEffect(() => {
    socket.emit("setup", userInfo);
    socket.on("connected", () => setSocketConnected(true));
  }, [userInfo]);

  useEffect(() => {
    if (singleChatData && !isLoading) {
      const _anotherUser = singleChatData.users.filter(
        (user) => user._id !== userInfo?._id
      )[0];

      setAnotherUserData(_anotherUser);
    }
  }, [singleChatData, userInfo, isLoading]);

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
        profilePicture: userInfo?.profilePicture,
      });
      setMessageContent("");
    }
  };
  useEffect(() => {
    if (chatWrapperDiv.current) {
      chatWrapperDiv.current.scrollTop = chatWrapperDiv.current.scrollHeight;
    }
  }, [messagesData]);

  useEffect(() => {
    socket.on("typing", (user) => {
      setTyping(`${user} is typing`);
    });
    socket.on("stop-typing", () => setTyping(""));
    socket.on("joined-chat", (chatId) => {
      setRoomData((prevData) => ({ ...prevData, chatId }));
    });
    selectedChat = singleChatData;
    socket.on("message-received", (newMessage) => {
      if (!selectedChat || selectedChat._id !== newMessage.chat._id) {
        console.log("I will receive notification");
      } else {
        // Add to list of messages
        queryClient.setQueryData(
          ["messages", chatId],
          (oldData: IMessage[] | undefined) => {
            if (oldData) {
              const exists = oldData.some((item) => {
                if (item._id === newMessage._id) {
                  return true;
                }
              });
              if (exists) {
                return oldData;
              }
              return [...oldData, newMessage];
            } else {
              return [newMessage];
            }
          }

          // Message sent Data
        );
      }
    });
  });

  const handleMessageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageContent(e.target.value);
    if (!socketConnected) return;
    if (!typing) {
      socket.emit("typing", selectedChat?._id, userInfo?.username);
    }

    const lastTypingTime = new Date().getTime();
    const timerLength = 3000;
    setTimeout(() => {
      console.log("TIMEOUT COMPLEtE, hide ui");
      const timeNow = new Date().getTime();
      const timeDifference = timeNow - lastTypingTime;
      if (timeDifference >= timerLength) {
        setTyping("");
        socket.emit("stop-typing", selectedChat?._id);
      }
    }, timerLength);
  };

  if (!chatId) return <div>Chat Not Found</div>;
  return (
    <>
      {!isLoading && !!singleChatData ? (
        <div
          className={
            "flex-[3_3_0%] rounded bg-background p-4 text-foreground flex flex-col"
          }
        >
          <div className="flex border-b pb-4 mb-4 items-center gap-4">
            <Button
              variant={"outline"}
              className="lg:hidden"
              onClick={() => {
                navigate("/chat");
                setChatId("");
              }}
            >
              {" "}
              <MoveLeft className="icon" />{" "}
            </Button>
            <div className="flex items-center w-full">
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
            </div>{" "}
          </div>

          {messagesData ? (
            <div
              ref={chatWrapperDiv}
              onScroll={(e) => handleScroll(e)}
              className={`relative flex h-[22rem] transition mb-4 flex-col gap-2 overflow-hidden hover:overflow-auto ${
                fetchingMessages ? "items-center justify-center" : ""
              }`}
            >
              {!fetchingMessages ? (
                messagesData.map((message) => (
                  <div
                    key={message._id}
                    className={`flex items-end flex-row gap-2 ${
                      message.sender._id === userInfo?._id
                        ? ""
                        : "flex-row-reverse"
                    }`}
                  >
                    <div
                      className={`flex relative py-2 px-4 max-w-[50%] ${
                        message.sender._id === userInfo?._id
                          ? "ml-auto rounded-s-3xl rounded-se-3xl bg-primary text-primary-foreground"
                          : "rounded-[50px_50px_50px_10px] bg-muted mr-auto"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={message.sender.profilePicture}
                      ></AvatarImage>
                      <AvatarFallback>{message.sender.username}</AvatarFallback>
                    </Avatar>
                  </div>
                ))
              ) : (
                <svg
                  width="28"
                  height="28"
                  className="animate-spin "
                  viewBox="0 0 14 14"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask id="path-1-inside-1_56_7" fill="white">
                    <path d="M14 7C14 8.38447 13.5895 9.73785 12.8203 10.889C12.0511 12.0401 10.9579 12.9373 9.67878 13.4672C8.3997 13.997 6.99223 14.1356 5.63437 13.8655C4.2765 13.5954 3.02922 12.9287 2.05025 11.9497C1.07128 10.9708 0.4046 9.7235 0.134503 8.36563C-0.135594 7.00777 0.00302985 5.6003 0.532843 4.32122C1.06266 3.04213 1.95986 1.94888 3.11101 1.17971C4.26215 0.410543 5.61553 -1.65096e-08 7 0L7 1.67532C5.94688 1.67532 4.9174 1.9876 4.04176 2.57269C3.16612 3.15777 2.48365 3.98937 2.08063 4.96233C1.67762 5.93529 1.57218 7.00591 1.77763 8.03879C1.98308 9.07168 2.49021 10.0204 3.23488 10.7651C3.97955 11.5098 4.92832 12.0169 5.96121 12.2224C6.99409 12.4278 8.06471 12.3224 9.03767 11.9194C10.0106 11.5164 10.8422 10.8339 11.4273 9.95824C12.0124 9.0826 12.3247 8.05312 12.3247 7L14 7Z" />
                  </mask>
                  <path
                    d="M14 7C14 8.38447 13.5895 9.73785 12.8203 10.889C12.0511 12.0401 10.9579 12.9373 9.67878 13.4672C8.3997 13.997 6.99223 14.1356 5.63437 13.8655C4.2765 13.5954 3.02922 12.9287 2.05025 11.9497C1.07128 10.9708 0.4046 9.7235 0.134503 8.36563C-0.135594 7.00777 0.00302985 5.6003 0.532843 4.32122C1.06266 3.04213 1.95986 1.94888 3.11101 1.17971C4.26215 0.410543 5.61553 -1.65096e-08 7 0L7 1.67532C5.94688 1.67532 4.9174 1.9876 4.04176 2.57269C3.16612 3.15777 2.48365 3.98937 2.08063 4.96233C1.67762 5.93529 1.57218 7.00591 1.77763 8.03879C1.98308 9.07168 2.49021 10.0204 3.23488 10.7651C3.97955 11.5098 4.92832 12.0169 5.96121 12.2224C6.99409 12.4278 8.06471 12.3224 9.03767 11.9194C10.0106 11.5164 10.8422 10.8339 11.4273 9.95824C12.0124 9.0826 12.3247 8.05312 12.3247 7L14 7Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    mask="url(#path-1-inside-1_56_7)"
                  />
                </svg>
              )}
            </div>
          ) : (
            ""
          )}
          <div className="mt-auto flex flex-col gap-2 ">
            <div
              className={`flex items-center gap-2 bg-muted p-1 mr-auto px-3 rounded-lg transition ${
                typing ? "translate-y-0" : "translate-y-[120%]"
              }`}
            >
              <span className="text-xs text-muted-foreground">
                {typing ? typing : "Stopped Typing"}
              </span>
            </div>

            <form
              onSubmit={handleSendMessage}
              className="flex bg-blue-300 relative z-40 items-center gap-2"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={userInfo?.profilePicture}></AvatarImage>
                <AvatarFallback>{userInfo?.username}</AvatarFallback>
              </Avatar>
              <Input
                className="bg-muted"
                value={messageContent}
                onChange={(e) => handleMessageInputChange(e)}
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
