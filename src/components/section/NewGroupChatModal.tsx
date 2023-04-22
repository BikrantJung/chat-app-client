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

import { useRef, useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { SearchUsers } from "../ui/SearchUsers";
import { useFetchUsers } from "@/hooks/queries/useSearchUser";
import { useUserSearchStore } from "@/store/useUserSearchStore";

export function NewGroupChatModal() {
  const [groupName, setGroupName] = useState("");
  const { setQuery, query } = useUserSearchStore((state) => state);
  const { userInfo } = useUserStore((state) => state);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  console.log(selectedItems);
  const { isFetching, refetch, data } = useFetchUsers(userInfo?.jwt_token);

  console.log("OHIIOOIo");

  console.log(data, "FROM MODEL");
  async function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
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
          <div className="flex flex-col items-center gap-4">
            <SearchUsers
              query={query}
              label="Search Users:"
              id="search-users"
              onChange={handleQueryChange}
            />
            {isFetching && "Fetching"}
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" loading>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
type Item = {
  id: number;
  value: string;
};
const items: Item[] = [
  {
    id: 1,
    value: "apple",
  },
  {
    id: 3,
    value: "banana",
  },
  {
    id: 4,
    value: "blueberry",
  },
  {
    id: 5,
    value: "pineapple",
  },
  {
    id: 6,
    value: "grapes",
  },
];
