import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useLoginUser } from "@/hooks/useLogin";
import { toast } from "react-hot-toast";

function LoginTab() {
  const { mutate, isLoading } = useLoginUser();
  const [email, setEmail] = useState("bikrant1@gmail.com");
  const [password, setPassword] = useState("bikrant1@gmail.com");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email) {
      toast.error("Email is required");
      return;
    }
    if (!password) {
      toast.error("Password is required");
      return;
    }
    let loggingInToast;
    try {
      loggingInToast = toast.loading("Logging in...");
      mutate({
        email,
        password,
      });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      toast.dismiss(loggingInToast);
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleLogin}>
      <div>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Login
        </h3>
        <p>Login in to your account.</p>
      </div>
      <div className="flex gap-1 flex-col">
        <label className="text-sm" htmlFor="email">
          Email
        </label>
        <Input
          value={email}
          name="email"
          type="email"
          id="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex gap-1 flex-col">
        <label className="text-sm" htmlFor="email">
          Password
        </label>
        <Input
          value={password}
          name="password"
          type="password"
          id="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button type="submit" loading={isLoading}>
        Login
      </Button>
    </form>
  );
}

export default LoginTab;
