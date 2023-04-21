import { axios } from "@/lib/axios";
import { useUserStore } from "@/store/useUserStore";
import { IUserInfo, IUserLogin } from "@/types/user.types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
async function loginUser(loginInput: IUserLogin) {
  return await axios.post("/user/login", loginInput);
}
function useLoginUser() {
  const { setUser } = useUserStore((state) => state);
  const navigate = useNavigate();
  return useMutation((loginInput: IUserLogin) => loginUser(loginInput), {
    onError(error: AxiosError) {
      if (error.response?.data) {
        Object.values(error.response.data).map((item) =>
          toast.error(JSON.stringify(item))
        );
      }
    },

    onSuccess({ data }) {
      const {
        createdAt,
        email,
        jwt_token,
        profilePicture,
        username,
        _id,
      }: IUserInfo = data;
      // Set user updates the states and automatically navigates according to useEffect
      setUser({ _id, createdAt, email, jwt_token, profilePicture, username });
      toast.success("Logged in successfully");
    },
  });
}

export { useLoginUser };
