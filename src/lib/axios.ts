import { useUserStore } from "@/store/useUserStore";
import Axios from "axios";

const token = useUserStore.getState().userInfo?.jwt_token;
export const axios = Axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
// axios.interceptors.response.use(
//   (response) => response, // Return the response for all non-error cases
//   (error) => {
//     if (
//       error.response.status === 401 &&
//       error.response.data.message === "Unauthenticated"
//     ) {
//       // Handle the 401 error with Unauthenticated message
//     }

//     // For all other error cases, just pass the response as it is
//     return Promise.reject(error);
//   }
// );
