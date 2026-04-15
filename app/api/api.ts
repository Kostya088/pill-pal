import axios, { AxiosError } from "axios";

export type ApiError = AxiosError<{ error: string }>;

export const api = axios.create({
  baseURL: process.env.BASE_URL,
  withCredentials: true,
});
