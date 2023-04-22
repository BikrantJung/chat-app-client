import { axios } from "@/lib/axios";
import { useUserStore } from "@/store/useUserStore";
import { IChat } from "@/types/chat.types";
import { IMessage } from "@/types/message.types";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { QueryCache } from "@tanstack/react-query";

interface SendMessageInput {
  chatId?: string;
  content: string;
  profilePicture?: string;
  token?: string;
}

async function sendMessage({ chatId, content, token }: SendMessageInput) {
  return await axios.post(
    "/message/send-message",
    {
      chatId,
      content,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
function useSendMessage(chatId?: string) {
  const queryClient = useQueryClient();
  const { userInfo } = useUserStore((state) => state);
  const navigate = useNavigate();
  return useMutation(
    (createGroupInput: SendMessageInput) => sendMessage(createGroupInput),
    {
      onError(error: AxiosError) {
        if (error.response?.data) {
          Object.values(error.response.data).map((item) =>
            toast.error(JSON.stringify(item))
          );
        }
      },

      onSuccess({ data }: { data: IMessage }) {
        queryClient.setQueryData(
          ["messages", chatId],
          (oldData: IMessage[] | undefined) => {
            if (oldData) {
              const newData = oldData.slice(0, -1);
              newData.push(data);
              return [...newData];
            } else {
              return [data];
            }
          }

          // Message sent Data
        );

        queryClient.setQueryData(
          ["chats"],
          (oldChatsData: IChat[] | undefined) => {
            if (oldChatsData) {
              const index = oldChatsData.findIndex(
                (item) => item._id === chatId
              );
              console.log("Index of current chat", index);
              if (index !== 1) {
                const existingChat = oldChatsData[index];
                const updatedChat: IChat = {
                  ...existingChat,
                  latestMessage: data,
                };
                const updatedChats = [...oldChatsData];
                updatedChats[index] = updatedChat;
                return updatedChats;
              }
            }
            return [];
          }
        );
      },
      onMutate(variables) {
        const fakeMessage = {
          _id: new Date(),
          sender: {
            _id: userInfo?._id,
            profilePicture: variables?.profilePicture,
          },
          content: variables.content,
        };
        queryClient.setQueryData(["messages", chatId], (oldData: any) => {
          if (oldData) {
            return [...oldData, fakeMessage];
          } else {
            return [fakeMessage];
          }
        });
      },
    }
  );
}

export { useSendMessage };
