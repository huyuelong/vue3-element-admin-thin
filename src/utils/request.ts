import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { useUserStoreHook } from "@/store/modules/user";
import { ResultEnum } from "@/enums/ResultEnum";
import { TOKEN_KEY } from "@/enums/CacheEnum";

// 创建 axios 实例
const service = axios.create({
  // baseURL: import.meta.env.VITE_APP_BASE_API,
  baseURL: "https://api.7dgame.com",
  timeout: 50000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

// 请求拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const data = response.data;
    if (response.status === 200) {
      return data;
    } else {
      const msg = data?.msg || "系统出错";
      ElMessage.error(msg);
      return Promise.reject(new Error(msg));
    }
  },
  (error: any) => {
    if (error.response && error.response.data) {
      const msg = error.response.data?.msg || "系统出错";
      if (error.response.status === 401) {
        ElNotification({
          title: "提示",
          message: "您的会话已过期，请重新登录",
          type: "info",
        });
        useUserStoreHook()
          .resetToken()
          .then(() => {
            location.reload();
          });
      } else {
        ElMessage.error(msg);
      }
    } else {
      ElMessage.error("网络错误或服务器无响应");
    }
    return Promise.reject(error.message);
  }
);

// 导出 axios 实例
export default service;
