import * as React from "react";

import { ScrollArea } from "@/components/atoms/scroll-area";
import { Separator } from "@/components/atoms/separator";
import { IUserInfo } from "@/types/user.types";
import { ChatBubble } from "iconoir-react";
import { Button } from "../atoms/button";
import { useAccessChat } from "@/hooks/mutations/useAccessChat";
import { useUserStore } from "@/store/useUserStore";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/avatar";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

interface NewChatResultsProps {
  userInfo: Omit<IUserInfo, "jwt_token" | "createdAt">[];
}

export function NewChatResults(props: NewChatResultsProps) {
  const { userInfo } = props;
  const { userInfo: stateUser } = useUserStore((state) => state);
  const { mutate, isLoading, isSuccess } = useAccessChat();

  return (
    <ScrollArea className="h-full w-full rounded-md border">
      <div className="p-4">
        {userInfo.map((item) => (
          <React.Fragment>
            <div key={item._id} className="flex items-center gap-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={item.profilePicture} />
                <AvatarFallback>{item.username}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <h4 className="scroll-m-20 font-semibold tracking-tight">
                  {item.username}
                </h4>
                <p className="text-xs">{item.email}</p>
              </div>
              <div className="ml-auto" />
              <Button
                variant="outline"
                size="sm"
                disabled={isLoading}
                onClick={() =>
                  mutate({
                    userId: item._id,
                    token: stateUser?.jwt_token,
                  })
                }
              >
                <ChatBubble className="icon" />
              </Button>
            </div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}
