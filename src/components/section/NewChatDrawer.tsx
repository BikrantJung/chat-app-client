import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/atoms/sheet";
import { useFetchUsers } from "@/hooks/queries/useSearchUser";
import { useUserStore } from "@/store/useUserStore";
import { ChatBubble, Plus } from "iconoir-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/avatar";
import { Skeleton } from "../atoms/skeleton";

export function NewChatDrawer() {
  const navigate = useNavigate();
  const { userInfo } = useUserStore((state) => state);
  const [query, setQuery] = useState("");

  const { isFetching, refetch, data } = useFetchUsers(
    query,
    userInfo?.jwt_token
  );
  console.log("DATA", data);
  const handleQueryChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    try {
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm">
          <Plus className="icon" />
          <span>New Chat</span>
        </Button>
      </SheetTrigger>
      <SheetContent position="right">
        <SheetHeader>
          <SheetTitle>Search People</SheetTitle>
          <SheetDescription>
            Search for user to create a new chat. You can search with name or
            email
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="">
              Search
            </Label>
            <Input
              id="name"
              value={query}
              onChange={handleQueryChange}
              className="col-span-3"
            />
          </div>
        </div>
        {isFetching ? (
          <div className="grid gap-8 py-4">
            {Array.from("john").map((item) => (
              <div className="flex items-center space-x-4" key={item}>
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
        {data ? (
          <div className="grid gap-8 py-4">
            {data.map((item) => {
              return (
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
                    onClick={() => navigate("/chat")}
                  >
                    <ChatBubble className="icon" />
                  </Button>
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </SheetContent>
    </Sheet>
  );
}
