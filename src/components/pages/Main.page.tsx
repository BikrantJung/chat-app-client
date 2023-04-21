import { useUserStore } from "@/store/useUserStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../section/Navbar";
import { useFetchChats } from "@/hooks/queries/useFetchAllChats";

function Main() {
  const { setUser, userInfo } = useUserStore((state) => state);

  const navigate = useNavigate();
  const { data, isLoading } = useFetchChats(userInfo?.jwt_token);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("FROM MAIN MAGE");
    if (!userInfo) {
      console.log("No user Info");
      navigate("/");
    }
    console.log("User Info");
    setLoading(false);
  }, [userInfo]);

  return (
    <>
      {" "}
      {loading ? (
        ""
      ) : (
        <div>
          <Navbar />
        </div>
      )}{" "}
    </>
  );
}

export { Main };
