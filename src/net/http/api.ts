import { User } from "../define";
import { axiosInstance } from "./config";

export async function wantEmailCode(email: string) {
  return await axiosInstance.post('/code/email', { email });
}

export async function loginWithToken() {
  return await axiosInstance.post('/user/login/token') as { user: User, token: string };
}

export async function loginByEmailCode(email: string, code: string) {
  return await axiosInstance.post('/user/login/email', { email, code }) as { user: User, token: string };
}

export async function loginByPassword(uname: string, upass: string) {
  return await axiosInstance.post('/user/login/password', { uname, upass }) as { user: User, token: string };
}

export async function registerByPassword(uname: string, upass: string) {
  return await axiosInstance.post('/user/register', { uname, upass }) as { user: User, token: string };
}