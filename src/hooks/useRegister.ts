import { axios } from "@/lib/axios";
import { useUserStore } from "@/store/useUserStore";
import { IUserInfo, IUserRegister } from "@/types/user.types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
async function createUser(registerInput: IUserRegister) {
  return await axios.post("/user/register/", registerInput, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
function useCreateUser() {
  const { setUser } = useUserStore((state) => state);
  const navigate = useNavigate();
  return useMutation(
    (registerInput: IUserRegister) => createUser(registerInput),
    {
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
          _id,
        }: IUserInfo = data;
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            createdAt,
            email,
            jwt_token,
            profilePicture,
            username,
            _id,
          })
        );
        setUser({ _id, createdAt, email, jwt_token, profilePicture, username });
        toast.success("Registered successfully");
      },
    }
  );
}
export { useCreateUser };
