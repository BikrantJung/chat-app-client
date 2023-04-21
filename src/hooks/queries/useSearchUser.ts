import { axios } from "@/lib/axios";
import { IUserInfo } from "@/types/user.types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

async function fetchPosts(
  query: string,
  token?: string
): Promise<Omit<IUserInfo, "jwt_token">[]> {
  const { data } = await axios.get(`/user/getUser?search=${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
function useFetchUsers(query: string, token?: string) {
  return useQuery(["posts", query], () => fetchPosts(query, token), {
    enabled: !!query,
    onError(error: AxiosError) {
      if (error.response?.data) {
        Object.values(error.response.data).map((item) => toast.error(item));
      }
    },
  });
}
export { useFetchUsers };
