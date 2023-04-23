import { IChat } from "@/types/chat.types";
import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage } from "../atoms/avatar";
import { ScrollArea } from "../atoms/scroll-area";
import { NewGroupChatModal } from "./NewGroupChatModal";
import { useUserStore } from "@/store/useUserStore";

interface ChatSidebarProps {
  chats: IChat[];
  isLoading: boolean;
}

function ChatSidebar(props: ChatSidebarProps) {
  const { chats } = props;
  const { userInfo } = useUserStore((state) => state);

  return (
    <div className="h-full gap-3">
      <div className="flex mb-2 justify-between items-center">
        <h4 className="scroll-m-20 text-4xl text-foreground font-semibold tracking-tight">
          Chats
        </h4>
        <NewGroupChatModal />
      </div>
      <ScrollArea className="h-[75vh] w-full rounded-md">
        {chats.map((chat) => (
          <React.Fragment key={chat._id}>
            <Link to={`/chat/${chat._id}`}>
              <div className="flex items-center gap-2 px-3 mb-1 shadow bg-background  pt-2 pb-4  border rounded-lg text-foreground">
                <Avatar className="relative h-10 w-10 top-2">
                  <AvatarImage
                    src={
                      chat.users.filter((user) => user._id !== userInfo?._id)[0]
                        .profilePicture
                    }
                  ></AvatarImage>
                </Avatar>
                <div className="flex flex-col ">
                  <div className="text-xs ml-auto text-muted-foreground">
                    03 Mar
                  </div>
                  <div className="flex gap-2 items-start">
                    <div className="flex flex-col">
                      <h4
                        className={`scroll-m-20 truncate w-44 text-sm font-semibold tracking-tight ${
                          chat.isGroupChat
                            ? "text-secondary"
                            : "text-foreground"
                        }`}
                      >
                        {chat.isGroupChat
                          ? chat.chatName
                          : chat.users.filter(
                              (user) => user._id !== userInfo?._id
                            )[0].username}
                      </h4>
                      <p className="truncate w-52 text-xs font-semibold">
                        {chat?.latestMessage?.content}
                      </p>
                    </div>
                    {/* <div className="translate-y-2 h-4 w-4 text-xs flex items-center justify-center text-destructive-foreground rounded-full bg-destructive"></div> */}
                  </div>
                </div>
              </div>
            </Link>
          </React.Fragment>
        ))}
      </ScrollArea>
    </div>
  );
}

export default ChatSidebar;
