import { User } from "../define";
import { axiosInstance } from "./config";

export async function loginWithToken() {
  return await axiosInstance.post('/user/login/token') as User & { token: string };
}

export async function loginByEmailCode(email: string, code: string) {
  return await axiosInstance.post('/user/login/email', { email, code }) as User & { token: string };
}