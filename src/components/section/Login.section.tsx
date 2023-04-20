import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function LoginTab() {
  return (
    <form>
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
    </form>
  );
}

export default LoginTab;
