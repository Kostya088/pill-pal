import { User } from "@/types/user";
import { nextServer } from "./api";

export type RegisterRequest = {
  email: string;
  password: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

export type CheckSessionResponse = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.post<CheckSessionResponse>("/auth/refresh");
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/auth/me");
  return data;
};

export type LogInRequest = {
  email: string;
  password: string;
};

export const logIn = async (data: LogInRequest) => {
  const res = await nextServer.post("/auth/login", data);
  return res.data;
};

export const logOut = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};
