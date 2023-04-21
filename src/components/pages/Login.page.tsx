import { useUserStore } from "@/store/useUserStore";
import LoginTab from "../section/Login.section";
import RegisterTab from "../section/Register.section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../atoms/tabs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const { userInfo } = useUserStore((state) => state);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    if (userInfo) {
      navigate("/chat");
      return;
    }
    setLoading(false);
    return () => setLoading(true);
  }, [userInfo]);

  return (
    <>
      {loading ? (
        ""
      ) : (
        <div className="h-screen flex items-center justify-center">
          <div className="">
            <Tabs defaultValue="login" className="w-[400px]">
              <TabsList className="w-full">
                <TabsTrigger value="login" className="w-full">
                  Login
                </TabsTrigger>
                <TabsTrigger value="register" className="w-full">
                  Register
                </TabsTrigger>
              </TabsList>
              <div className="border bg-background text-foreground px-3 py-1 rounded-md mt-3">
                <TabsContent value="login">
                  <LoginTab />
                </TabsContent>
                <TabsContent value="register">
                  <RegisterTab />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
