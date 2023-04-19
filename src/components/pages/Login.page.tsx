import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
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
              <div>
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                  Login
                </h3>
                <p>Login in to your account.</p>
              </div>
              <div className="flex gap-1 flex-col">
                <h4>Username</h4>
                <Input />
              </div>
              <div className="flex gap-1 flex-col">
                <h4>Password</h4>
                <Input />
              </div>
              <Button>Login</Button>
            </TabsContent>
            <TabsContent value="register" className="flex flex-col gap-4">
              <div>
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                  Register
                </h3>
                <p>Create your account here.</p>
              </div>
              <div className="flex gap-1 flex-col">
                <h4>Username</h4>
                <Input />
              </div>
              <div className="flex gap-1 flex-col">
                <h4>Email</h4>
                <Input />
              </div>
              <div className="flex gap-1 flex-col">
                <h4>Password</h4>
                <Input />
              </div>
              <Button>Register</Button>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

export default Login;
