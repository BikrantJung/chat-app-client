import { axios } from "@/lib/axios";
import { IChat } from "@/types/chat.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type AccessChatInput = {
  userId: string;
  token?: string;
};

async function accessChat(chatInput: AccessChatInput): Promise<IChat[]> {
  const { data } = await axios.post(
    `/chat/access-chat`,
    { userId: chatInput.userId },
    {
      headers: {
        Authorization: `Bearer ${chatInput.token}`,
      },
    }
  );
  return data;
}
function useAccessChat() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation((chatInput: AccessChatInput) => accessChat(chatInput), {
    onError(error: AxiosError) {
      if (error.response?.data) {
        Object.values(error.response.data).map((item) =>
          toast.error(JSON.stringify(item))
        );
      }
    },
    onSuccess(data: any) {
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
    },
  });
}
export { useAccessChat };
