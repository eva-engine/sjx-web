import { storage } from "../storage";
import { CustomData, User } from "./define";
import { loginByEmailCode, loginByPassword, loginWithToken, registerByPassword } from "./http/api";
import { axiosInstance } from "./http/config";

/**
 * Use it when you consider user has not logined.
 */
export const UnloginedGlobalUser = new class {
  id?: number
  uname?: string
  email?: string
  custom?: string
  score?: number

  customData?: CustomData

  logined = false
  logining = false

  assign(user: User) {
    for (const key of Object.keys(user)) {
      //@ts-ignore
      this[key] = user[key];
    }
  }
  async loginWithToken(token: string) {
    (axiosInstance.defaults.headers as unknown as { token: string })['token'] = token;
    this.logining = true;
    const promise = (async () => {
      const { user, token } = await loginWithToken();
      (axiosInstance.defaults.headers as unknown as { token: string })['token'] = token;
      storage.token = token;
      this.assign(user);
      return user;
    })().finally(() => this.logining = false);
    return await promise;
  }

  async loginByEmailCode(email: string, code: string) {
    this.logining = true;
    const promise = (async () => {
      const { user, token } = await loginByEmailCode(email, code);
      (axiosInstance.defaults.headers as unknown as { token: string })['token'] = token;
      storage.token = token;
      this.assign(user);
      return user;
    })().finally(() => this.logining = false);
    return await promise;
  }

  async loginByPassword(uname: string, upass: string) {
    this.logining = true;
    const promise = (async () => {
      const { user, token } = await loginByPassword(uname, upass);
      (axiosInstance.defaults.headers as unknown as { token: string })['token'] = token;
      storage.token = token;
      this.assign(user);
      return user;
    })().finally(() => this.logining = false);
    return await promise;
  }

  async registerByPassword(uname: string, upass: string) {
    this.logining = true;
    const promise = (async () => {
      const { user, token } = await registerByPassword(uname, upass);
      (axiosInstance.defaults.headers as unknown as { token: string })['token'] = token;
      storage.token = token;
      this.assign(user);
      return user;
    })().finally(() => this.logining = false);
    return await promise;
  }

}();
type UnloginedGlobalUser = typeof UnloginedGlobalUser;
type GlobalUser = Required<UnloginedGlobalUser>;
/**
 * Use it when you ensure user has logined.
 */
export const GlobalUser = UnloginedGlobalUser as GlobalUser;