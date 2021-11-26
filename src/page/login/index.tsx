import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { wantEmailCode } from "../../net/http/api";
import { UnloginedGlobalUser } from "../../net/user";
import { storage } from "../../storage";
import Toast from "universal-toast";
import "./index.scss";
import { resource } from "@eva/eva.js";
import { resources } from "../../util/resource";

const LoginMode = {
  Email: 0,
  Password: 1,
  RegisterPassword: 2
}
export function LoginPage() {

  const [autoLogin, setAutoLogin] = useState(false);

  const [loginMode, setLoginMode] = useState(LoginMode.Email);

  const [logining, setLogining] = useState(false);

  const input1 = useRef<HTMLInputElement>();
  const input2 = useRef<HTMLInputElement>();

  const history = useHistory()

  useEffect(() => {
    (async () => {
      if (storage.token) {
        try {
          setLogining(true);
          setAutoLogin(true);
          await UnloginedGlobalUser.loginWithToken(storage.token);
          history.push('/hall');
        } catch (e) {
          Toast.show(e as unknown as string);
          setLogining(false);
          setAutoLogin(false);
        }
      }
    })()
    resource.addResource(resources);
    resource.preload();
  }, [])

  async function handleSubmit() {
    setLogining(true);
    try {
      const param1 = input1.current!.value;
      const param2 = input2.current!.value;
      switch (loginMode) {
        case LoginMode.Email: {
          await UnloginedGlobalUser.loginByEmailCode(param1, param2);
          break;
        }
        case LoginMode.Password: {
          await UnloginedGlobalUser.loginByPassword(param1, param2);
          break;
        }
        case LoginMode.RegisterPassword: {
          await UnloginedGlobalUser.registerByPassword(param1, param2);
          break;
        }
      }
      history.push('/hall');
    } catch {
      setLogining(false);
    }
  }
  async function sendCode() {
    await wantEmailCode(input1.current!.value);
    Toast.show('验证码已发送');
  }

  return logining ? <div className="login-page"><div className="logining-tip">{autoLogin ? '自动登录中...' : '登录中...'}</div></div> : (
    <div className="login-page">
      <div className="input"><input ref={input1 as MutableRefObject<HTMLInputElement>} type="text" placeholder={["输入邮箱", "输入用户名", "请输入要注册的用户名"][loginMode]} /></div>
      <div className="input">
        <input type={loginMode > 0 ? "password" : "text"} placeholder={loginMode > 0 ? "请输入密码" : "输入验证码"}
          onKeyDownCapture={e => e.key.toLowerCase() === 'enter' && handleSubmit()}
          ref={input2 as MutableRefObject<HTMLInputElement>}
        />
        {loginMode === 0 && <div className="code-btn" onClick={sendCode}>获取验证码</div>}
      </div>
      <div className="input login-btn" onClick={handleSubmit}>{loginMode === 2 ? "注册并进入" : "进入游戏"}</div>
      <div className="bottom-layer">
        <div className={loginMode === LoginMode.Email ? 'btn disabled' : 'btn'}
          onClick={() => setLoginMode(LoginMode.Email)}>邮箱登录</div>
        <div className={loginMode === LoginMode.Password ? 'btn disabled' : 'btn'}
          onClick={() => setLoginMode(LoginMode.Password)}>密码登录</div>
        <div className={loginMode === LoginMode.RegisterPassword ? 'btn disabled' : 'btn'}
          onClick={() => setLoginMode(LoginMode.RegisterPassword)}>注册账号</div>
      </div>
    </div>
  )
}