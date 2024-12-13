import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessage } from "element-plus";

// 创建 axios 实例
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 基础 URL
  timeout: 10000, // 请求超时时间
});

// 请求拦截器
instance.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error) => {
    // 请求错误处理
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 可以在这里处理通用的返回逻辑
    return response.data; // 只返回 data 部分
  },
  (error) => {
    // 处理响应错误
    console.error("HTTP Error:", error);
    // 处理502等错误
    if (error.response) {
      switch (error.response.status) {
        case 502:
          ElMessage.error(error.response.data.message);
          break;
        default:
          ElMessage.error("未知错误");
          break;
      }
    }
    return Promise.reject(error);
  }
);

interface ResponseData extends AxiosResponse {
  errno: number;
  data: any;
  message: string;
}

export const get = (url: string, config?: AxiosRequestConfig) => {
  return instance.get(url, config) as Promise<ResponseData>;
};

export const post = (url: string, data?: any, config?: AxiosRequestConfig) => {
  return instance.post(url, data, config) as Promise<ResponseData>;
};

export default instance;
