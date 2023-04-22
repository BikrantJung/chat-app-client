import * as React from "react";

import { ScrollArea } from "@/components/atoms/scroll-area";
import { Separator } from "@/components/atoms/separator";
import { IUserInfo } from "@/types/user.types";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Minus, Plus } from "iconoir-react";
import { Badge } from "../atoms/badge";
import { Button } from "../atoms/button";

type IUser = Omit<IUserInfo, "jwt_token" | "createdAt">;
interface GroupResultProps {
  userInfo: IUser[];
  selectedUsers: IUser[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
}

export function GroupResult(props: GroupResultProps) {
  const { selectedUsers, setSelectedUsers, userInfo } = props;
  const handleRemoveSelectedUser = (user: IUser) => {
    setSelectedUsers(
      selectedUsers.filter((selectedUser) => selectedUser._id !== user._id)
    );
  };
  const handleAddSelectedUser = (user: IUser) => {
    setSelectedUsers((prevUsers) => [...prevUsers, user]);
  };

  return (
    <>
      <ScrollArea className="h-64 w-full rounded-md border">
        {selectedUsers.length ? (
          <>
            <div className="flex flex-wrap p-2 gap-2">
              {selectedUsers.map((item) => (
                <Badge key={JSON.stringify(item)}>{item.username}</Badge>
              ))}
            </div>
            <Separator />
          </>
        ) : (
          ""
        )}
        <div className="p-4">
          {userInfo.map((item) => (
            <React.Fragment key={item._id}>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
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
                {selectedUsers.some(
                  (selectedUser) => selectedUser._id === item._id
                ) ? (
                  <Button
                    variant="outline"
                    onClick={() => handleRemoveSelectedUser(item)}
                    size="xs"
                    className="border-destructive"
                    // disabled={isLoading}
                  >
                    <Minus className="icon text-destructive" />
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => handleAddSelectedUser(item)}
                    size="xs"
                    className="border-secondary"
                    // disabled={isLoading}
                  >
                    <Plus className="icon text-secondary" />
                  </Button>
                )}
              </div>
              <Separator className="my-2" />
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>
    </>
  );
}
