import { axios } from "@/lib/axios";
import { useUserStore } from "@/store/useUserStore";
import { IMessage } from "@/types/message.types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

async function fetchMessages(
  chatId?: string,
  token?: string
): Promise<IMessage[]> {
  const { data } = await axios.get(`/message/get/${chatId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
function useFetchMessages(chatId?: string) {
  const { userInfo } = useUserStore((state) => state);
  return useQuery(
    ["messages", chatId],
    () => fetchMessages(chatId, userInfo?.jwt_token),
    {
      onError(error: AxiosError) {
        if (error.message === "Network Error") {
          toast.error("Network Error");
        }
        if (error.response?.data) {
          Object.values(error.response.data).map((item) =>
            toast.error(JSON.stringify(item))
          );
        }
      },
    }
  );
}
export { useFetchMessages };
