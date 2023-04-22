import React from "react";
import { Label } from "../atoms/label";
import { Input } from "../atoms/input";
import LoadingInput from "../elements/LoadingInput";

interface SearchUsersProps {
  label?: string;
  id: string;
  query: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
}

export function SearchUsers(props: SearchUsersProps) {
  const { query, onChange, label = "Search", id, isLoading = false } = props;
  return (
    <div className="flex w-full flex-col gap-2">
      <Label htmlFor={id} className="">
        {label}
      </Label>
      <LoadingInput
        isLoading={isLoading}
        id={id}
        value={query}
        onChange={onChange}
        className="col-span-3"
      />
    </div>
  );
}
