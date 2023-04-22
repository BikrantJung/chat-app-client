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
import { useAccessChat } from "@/hooks/mutations/useAccessChat";
import { NewChatResults } from "../ui/NewChatResult";
import { useUserSearchStore } from "@/store/useUserSearchStore";

export function NewChatDrawer() {
  const navigate = useNavigate();
  const { setQuery, query } = useUserSearchStore((state) => state);
  const { userInfo } = useUserStore((state) => state);

  const { isFetching, data } = useFetchUsers(userInfo?.jwt_token);
  console.log("Query", query);

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
          <span className="hidden sm:block">New Chat</span>
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
        {data?.length ? (
          <div className="w-full h-full">
            <NewChatResults userInfo={data} />
          </div>
        ) : (
          ""
        )}
      </SheetContent>
    </Sheet>
  );
}
