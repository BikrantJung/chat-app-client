import React from "react";
import { Separator } from "../atoms/separator";
import { IChat } from "@/types/chat.types";
import { ScrollArea } from "../atoms/scroll-area";
import { Avatar, AvatarImage } from "../atoms/avatar";
import { Link } from "react-router-dom";
import { Skeleton } from "../atoms/skeleton";
import { Button } from "../atoms/button";
import { Plus } from "iconoir-react";
import { NewGroupChatModal } from "./NewGroupChatModal";

interface ChatSidebarProps {
  chats: IChat[];
  isLoading: boolean;
}

function ChatSidebar(props: ChatSidebarProps) {
  const { chats } = props;
  let isLoading = true;
  return (
    <div className="h-full gap-3">
      <div className="flex mb-2 justify-between items-center">
        <h4 className="scroll-m-20 text-4xl text-foreground font-semibold tracking-tight">
          Chats
        </h4>
        <NewGroupChatModal />
      </div>
      <ScrollArea className="h-[80vh] w-full rounded-md">
        {chats.map((chat) => (
          <React.Fragment key={chat._id}>
            <Link to={"/chat"}>
              <div className="flex items-center gap-2 px-3 mb-1 shadow bg-background  pt-2 pb-4  border rounded-lg text-foreground">
                <Avatar className="relative h-10 w-10 top-2">
                  <AvatarImage src="https://icon-library.com/images/anonymous-icon/anonymous-icon-0.jpg"></AvatarImage>
                </Avatar>
                <div className="flex flex-col ">
                  <div className="text-xs ml-auto text-muted-foreground">
                    03 Mar
                  </div>
                  <div className="flex gap-2 items-start">
                    <div className="flex flex-col">
                      <h4 className="scroll-m-20 truncate w-44 text-sm font-semibold tracking-tight">
                        {chat.chatName}
                      </h4>
                      <p className="truncate w-52 text-xs font-semibold">
                        {
                          "I'm looking to work with designer that will fulfill my requirements"
                        }
                      </p>
                    </div>
                    <div className="translate-y-2 h-4 w-4 text-xs flex items-center justify-center text-destructive-foreground rounded-full bg-destructive">
                      4
                    </div>
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
