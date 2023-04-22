import { Button } from "@/components/atoms/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/atoms/dialog";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { Plus } from "iconoir-react";

import { useFetchUsers } from "@/hooks/queries/useSearchUser";
import { useUserSearchStore } from "@/store/useUserSearchStore";
import { useUserStore } from "@/store/useUserStore";
import { useState } from "react";
import { GroupResult } from "../ui/GroupResult";
import { SearchUsers } from "../ui/SearchUsers";
import { IUserInfo } from "@/types/user.types";
import { useCreateGroup } from "@/hooks/mutations/useCreateGroup";
import { toast } from "react-hot-toast";

type IUser = Omit<IUserInfo, "jwt_token" | "createdAt">;

export function NewGroupChatModal() {
  const [groupName, setGroupName] = useState("");
  const { setQuery, query } = useUserSearchStore((state) => state);
  const { userInfo } = useUserStore((state) => state);
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);

  const { isFetching, data } = useFetchUsers(userInfo?.jwt_token);
  async function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }
  const { mutate, isLoading } = useCreateGroup();

  function handleCreateGroup() {
    const userArray = selectedUsers.map((item) => item._id);

    if (userArray.length < 1) {
      toast.error("Select at least one user");
      return;
    }
    mutate({
      groupName: groupName,
      users: JSON.stringify(userArray),
    });
    return;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="icon" />
          <span className="hidden sm:block">Group Chat</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>Create a Group</DialogTitle>
          <DialogDescription>
            Create a group with multiple people. At least 2 people must be
            selected.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-2">
          <div className="flex flex-col items-center gap-4">
            <Label htmlFor="groupName" className="w-full">
              Group Name
            </Label>
            <Input
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
          <div className="flex flex-col relative items-center gap-4">
            <SearchUsers
              query={query}
              label="Search Users:"
              isLoading={isFetching}
              id="search-users"
              onChange={handleQueryChange}
            />
            {data?.length ? (
              <GroupResult
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers}
                userInfo={data}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => handleCreateGroup()}
            type="submit"
            loading={isLoading}
            disabled={!groupName && !!selectedUsers}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
