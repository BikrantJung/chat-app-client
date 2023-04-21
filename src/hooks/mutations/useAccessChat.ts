import { axios } from "@/lib/axios";
import { IChat } from "@/types/chat.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

async function accessChat(
  userId: string,
  token?: string
): Promise<Omit<IChat[], "jwt_token">[]> {
  const { data } = await axios.post(
    `/chat/get-all-chats`,
    { userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
}
function useAccessChat() {
  return useMutation(
    (userId: string, token?: string) => accessChat(userId, token),
    {
      onError(error: AxiosError) {
        if (error.response?.data) {
          Object.values(error.response.data).map((item) =>
            toast.error(JSON.stringify(item))
          );
        }
      },
    }
  );
}
export { useAccessChat };
