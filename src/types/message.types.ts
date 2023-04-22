import { IChat } from "./chat.types";
import { IUserInfo } from "./user.types";

export type IMessage = {
  content: string;
  chat: IChat;
  sender: IUserInfo;
  _id: string;
};
