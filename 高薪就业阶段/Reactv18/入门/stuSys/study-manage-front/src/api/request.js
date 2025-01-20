/**
 * 封装axios请求
 */

import axios from "axios";

// 创建axios实例
const request = axios.create({
  baseURL: "http://localhost:3000", // api的base_url
  timeout: 5000, // 请求超时时间
});

// request拦截器
request.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config;
  },
  (error) => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response拦截器
request.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  (error) => {
    // Do something with response error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

export default request;
