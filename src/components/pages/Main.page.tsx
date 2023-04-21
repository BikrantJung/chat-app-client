import { useUserStore } from "@/store/useUserStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useFetchChats } from "@/hooks/queries/useFetchAllChats";
import Navbar from "../section/Navbar";
import ChatSidebar from "../section/ChatSidebar";
import { Skeleton } from "../atoms/skeleton";

function Main() {
  const { setUser, userInfo } = useUserStore((state) => state);

  const navigate = useNavigate();
  const { data, error, isLoading } = useFetchChats(userInfo?.jwt_token);

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
        <div className="h-screen flex flex-col">
          <Navbar />
          {data ? (
            <div className="flex px-8 flex-1">
              <div className="flex-1">
                <ChatSidebar chats={data} isLoading={isLoading} />
              </div>
              <div className="flex-[3_3_0%]">
                <p>Content goes here</p>
              </div>
            </div>
          ) : (
            ""
          )}
          {isLoading ? (
            <div className="flex px-8 flex-1">
              <div className="flex-1 flex flex-col gap-2">
                {Array.from("aaaaa").map((item) => (
                  <Skeleton className="flex items-center gap-2 px-3 mb-1 shadow bg-background  pt-2 pb-4  border rounded-lg text-foreground">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </Skeleton>
                ))}
              </div>
              <div className="flex-[3_3_0%]"></div>
            </div>
          ) : (
            ""
          )}
        </div>
      )}{" "}
    </>
  );
}

export { Main };
