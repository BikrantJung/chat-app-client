import { useCreateUser } from "@/hooks/mutations/useRegister";
import { imageExtensions } from "@/lib/imageExtensions";
import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "../atoms/button";
import { Input } from "../atoms/input";
function RegisterTab() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fileUploadData, setFileUploadData] = useState(new FormData());
  //   const [loading, setLoading] = useState(false);
  const { mutate, isLoading } = useCreateUser();
  async function handleRegister(e: React.FormEvent) {
    let registeringToast2;
    e.preventDefault();

    try {
      const profilePicUrl = await imageUpload();

      console.log("PROFILE PIC URL", profilePicUrl);
      registeringToast2 = toast.loading("Creating User...");
      //   Mutate to create user
      mutate({
        email,
        username,
        password,
        profilePicture: profilePicUrl,
      });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      toast.dismiss(registeringToast2);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      const filetype = file.type.split("/")?.pop();
      if (!imageExtensions.includes(filetype || "")) {
        if (inputRef.current) {
          inputRef.current.value = "";
        }
        toast.error("Invalid file format", {});
        return;
      }
      fileUploadData.append("file", file);
      fileUploadData.append(
        "upload_preset",
        import.meta.env.VITE_UPLOAD_PRESET
      );
      fileUploadData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

      setFileUploadData(fileUploadData);
    }
  }

  async function imageUpload() {
    let uploadingToast;
    if (fileUploadData.has("file")) {
      console.log(fileUploadData, "FOUND");
      try {
        uploadingToast = toast.loading("Uploading image...");
        const response = await fetch(
          `${import.meta.env.VITE_CLOUDINARY_URL}/image/upload`,
          {
            method: "POST",
            body: fileUploadData,
          }
        );
        const fetchData = await response.json();
        return fetchData.secure_url;
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        toast.dismiss(uploadingToast);
      }
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleRegister}>
      <div>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Register
        </h3>
        <p>Create your account here.</p>
      </div>
      <div className="flex gap-1 flex-col">
        <label htmlFor="username" className="text-sm">
          Username
        </label>
        <Input
          id={"username"}
          value={username}
          required
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
      </div>
      <div className="flex gap-1 flex-col">
        <label htmlFor="email" className="text-sm">
          Email
        </label>
        <Input
          id={"email"}
          value={email}
          required
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
      </div>
      <div className="flex gap-1 flex-col">
        <label htmlFor="password" className="text-sm">
          Password
        </label>
        <Input
          id={"password"}
          value={password}
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          name="password"
        />
      </div>
      <div className="flex gap-1 flex-col">
        <label htmlFor="profile_picture" className="text-sm">
          Profile Picture
        </label>
        <Input
          id={"profile_picture"}
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          name="profilePicture"
        />
      </div>
      <Button type="submit" loading={isLoading}>
        Register
      </Button>
    </form>
  );
}

export default RegisterTab;
