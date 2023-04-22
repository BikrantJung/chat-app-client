import { axios } from "@/lib/axios";
import { useUserSearchStore } from "@/store/useUserSearchStore";
import { IUserInfo } from "@/types/user.types";
import { QueryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

async function fetchUsers(
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
function useFetchUsers(token?: string) {
  const { query } = useUserSearchStore((state) => state);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useQuery(["users", query], () => fetchUsers(query, token), {
    enabled: !!query,
    initialData: () => {
      const cachedUsers = queryClient.getQueryData<
        Omit<IUserInfo, "jwt_token">[]
      >(["users", query]);
      return cachedUsers;
    },
    onError(error: AxiosError) {
      if (error.message === "Network Error") {
        toast.error("Network Error");
        navigate("/");
      }
      if (error.response?.data) {
        Object.values(error.response.data).map((item) => toast.error(item));
      }
    },
  });
}
export { useFetchUsers };
