export type IUserRegister = {
  email: string;
  username: string;
  password: string;
  profilePicture?: String;
};
export type IUserLogin = {
  email: string;
  password: string;
};
export type IUserInfo = {
  createdAt: string;
  email: string;
  jwt_token: string;
  profilePicture: string;
  username: string;
  _id: string;
};
