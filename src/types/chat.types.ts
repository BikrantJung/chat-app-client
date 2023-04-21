import { IMessage } from "./message.types";
import { IUserInfo } from "./user.types";

export type IChat = {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: IUserInfo[];
  createdAt: string;
  groupAdmin: IUserInfo | null;
  latestMessages?: IMessage[];
};
