import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function RegisterTab() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form>
      <div>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Register
        </h3>
        <p>Create your account here.</p>
      </div>
      <div className="flex gap-1 flex-col">
        <h4>Username</h4>
        <Input
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username..."
        />
      </div>
      <div className="flex gap-1 flex-col">
        <h4>Email</h4>
        <Input
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
      </div>
      <div className="flex gap-1 flex-col">
        <h4>Password</h4>
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          name="password"
        />
      </div>
      <div className="flex gap-1 flex-col">
        <h4>Profile Picture</h4>
        <Input type="file" name="profilePicture" />
      </div>
      <Button type="submit">Register</Button>
    </form>
  );
}

export default RegisterTab;
