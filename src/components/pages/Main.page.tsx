import { useUserStore } from "@/store/useUserStore";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useFetchChats } from "@/hooks/queries/useFetchAllChats";
import Navbar from "../section/Navbar";
import ChatSidebar from "../section/ChatSidebar";
import { Skeleton } from "../atoms/skeleton";
import { useChatIdStore } from "@/store/useResponsiveChatStore";

function Main() {
  const { setUser, userInfo } = useUserStore((state) => state);
  const { chatId } = useChatIdStore((state) => state);
  const navigate = useNavigate();
  const { data, error, isLoading } = useFetchChats(userInfo?.jwt_token);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
    setLoading(false);
  }, [userInfo]);
  useEffect(() => {
    if (chatId) navigate(`/chat/${chatId}`);
  }, [chatId]);

  return (
    <>
      {" "}
      {loading ? (
        ""
      ) : (
        <div className="flex flex-col">
          <Navbar />
          {data?.length ? (
            <div className="flex px-8 gap-4 flex-1 justify-center lg:justify-normal ">
              <div
                className={`border-r flex-1  pr-3 max-w-max ${
                  chatId ? "hidden lg:flex" : "flex"
                }`}
              >
                <ChatSidebar chats={data} isLoading={isLoading} />
              </div>

              <Outlet />
            </div>
          ) : (
            <div className="flex items-center flex-col">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                No Chats Found
              </h3>
              <p className="text-sm md:text-base">Please create new chat.</p>
            </div>
          )}
          {isLoading ? (
            <div className="flex px-8 flex-1">
              <div className="flex-1 flex flex-col gap-2">
                {Array.from("abcde").map((item) => (
                  <Skeleton
                    key={item}
                    className="flex items-center gap-2 px-3 mb-1 shadow bg-background  pt-2 pb-4  border rounded-lg text-foreground"
                  >
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
