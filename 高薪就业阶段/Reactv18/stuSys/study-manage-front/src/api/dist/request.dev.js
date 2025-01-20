"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 封装axios请求
 */
// 创建axios实例
var request = _axios["default"].create({
  baseURL: "http://localhost:3000",
  // api的base_url
  timeout: 5000 // 请求超时时间

}); // request拦截器


request.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  console.log(error); // for debug

  Promise.reject(error);
}); // response拦截器

request.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  console.log(error); // for debug

  return Promise.reject(error);
});
var _default = request;
exports["default"] = _default;