import { axios } from "@/lib/axios";
import { IChat } from "@/types/chat.types";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface CreateGroupInput {
  groupName: string;
  users: string;
}

async function createGroup(createGroupInput: CreateGroupInput) {
  return await axios.post("/chat/create-group-chat", createGroupInput);
}
function useCreateGroup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(
    (createGroupInput: CreateGroupInput) => createGroup(createGroupInput),
    {
      onError(error: AxiosError) {
        if (error.response?.data) {
          Object.values(error.response.data).map((item) =>
            toast.error(JSON.stringify(item))
          );
        }
      },

      onSuccess({ data }) {
        queryClient.setQueryData(["chats"], (oldData: IChat[] | undefined) => {
          // Update cache after creating new chat with user
          navigate("/");
          if (oldData) {
            const exists = oldData.some((item) => item._id === data._id);
            if (exists) return oldData;
            return [data, ...oldData];
          } else {
            return [data];
          }
        });
        navigate("/");
        toast.success("Group created successfully");
      },
    }
  );
}

export { useCreateGroup };
