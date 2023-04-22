import React from "react";
import { Label } from "../atoms/label";
import { Input } from "../atoms/input";

interface SearchUsersProps {
  label?: string;
  id: string;
  query: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SearchUsers(props: SearchUsersProps) {
  const { query, onChange, label = "Search", id } = props;
  return (
    <div className="flex w-full flex-col gap-2">
      <Label htmlFor={id} className="">
        {label}
      </Label>
      <Input id={id} value={query} onChange={onChange} className="col-span-3" />
    </div>
  );
}
