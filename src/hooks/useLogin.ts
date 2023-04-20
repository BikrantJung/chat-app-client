import { axios } from "@/lib/axios";
import { IUserLogin, RegisterResponse } from "@/types/user.types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
async function loginUser(loginInput: IUserLogin) {
  return await axios.post("/user/login", loginInput);
}
function useLoginUser() {
  const navigate = useNavigate();
  return useMutation((loginInput: IUserLogin) => loginUser(loginInput), {
    onError(error: AxiosError) {
      if (error.response?.data) {
        Object.values(error.response.data).map((item) => toast.error(item));
      }
    },

    onSuccess({ data }) {
      const {
        createdAt,
        email,
        jwt_token,
        profilePicture,
        username,
      }: RegisterResponse = data;
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          createdAt,
          email,
          jwt_token,
          profilePicture,
          username,
        })
      );
      toast.success("Logged in successfully");
      navigate("/chat");
    },
  });
}

export { useLoginUser };
