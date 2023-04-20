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
export type RegisterResponse = {
  createdAt: string;
  email: string;
  jwt_token: string;
  profilePicture: string;
  username: string;
};
