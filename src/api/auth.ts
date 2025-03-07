import request from "@/utils/request";

class AuthAPI {
  /** 登录 接口*/
  static login(data: LoginData) {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);
    // formData.append("captchaKey", data.captchaKey);
    // formData.append("captchaCode", data.captchaCode);
    return request<any, LoginResult>({
      // url: "/api/v1/auth/login",
      url: "/sites/login",
      method: "post",
      data: formData,
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
    });
  }

  /** 注销 接口*/
  static logout() {
    return request({
      url: "/api/v1/auth/logout",
      method: "delete",
    });
  }

  /** 获取验证码 接口*/
  static getCaptcha() {
    return request<any, CaptchaResult>({
      url: "/api/v1/auth/captcha",
      method: "get",
    });
  }
}

export default AuthAPI;

/** 登录请求参数 */
export interface LoginData {
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
  /** 验证码缓存key */
  // captchaKey: string;
  /** 验证码 */
  // captchaCode: string;
}

/** 登录响应 */
export interface LoginResult {
  // /** 访问token */
  // accessToken?: string;
  // /** 过期时间(单位：毫秒) */
  // expires?: number;
  // /** 刷新token */
  // refreshToken?: string;
  // /** token 类型 */
  // tokenType?: string;
  access_token: string;
  // username: string;
  user: {
    value(value: any, roles: string[]): unknown;
    username: string;
    data: {
      id: number;
      nickname: string | null;
      info: string | null;
      avatar_id: string | null;
      email: string | null;
      emailBind: boolean;
    };
    roles: string[];
  };
}

/** 验证码响应 */
export interface CaptchaResult {
  /** 验证码缓存key */
  captchaKey: string;
  /** 验证码图片Base64字符串 */
  captchaBase64: string;
}
