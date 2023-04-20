import { useUserStore } from "@/store/useUserStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../section/Navbar";

function Main() {
  const navigate = useNavigate();
  const { setUser, userInfo } = useUserStore((state) => state);
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
