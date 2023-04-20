import LoginTab from "../section/Login.section";
import RegisterTab from "../section/Register.section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
function Login() {
  return (
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
          <div className="border px-3 py-1 rounded-md mt-3">
            <TabsContent value="login" className="flex flex-col gap-4">
              <LoginTab />
            </TabsContent>
            <TabsContent value="register" className="flex flex-col gap-4">
              <RegisterTab />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

export default Login;
