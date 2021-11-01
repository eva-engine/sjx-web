import { useEffect, useState } from "react";
import { UnloginedGlobalUser } from "../../net/user";
import { storage } from "../../storage";
import "./index.scss";
export function LoginPage() {

  const [autoLogin, setAutoLogin] = useState(false);

  const [logining, setLogining] = useState(false);

  useEffect(() => {
    (async () => {
      if (storage.token) {
        try {
          setLogining(true);
          setAutoLogin(true);
          await UnloginedGlobalUser.loginWithToken(storage.token);
        } catch {
          setLogining(false);
          setAutoLogin(false);
        }
      }
    })()
  }, [])

  return logining ? <div className="login-page"><div>{autoLogin ? '自动登录中' : '登录中'}</div></div> : (
    <div className="login-page">
      <div className="input"><input type="text" placeholder="输入邮箱" /></div>
      <div className="input">
        <input type="text" placeholder="输入验证码" />
        <div className="code-btn">获取验证码</div>
      </div>
      <div className="input login-btn">进入游戏</div>
    </div>
  )
}