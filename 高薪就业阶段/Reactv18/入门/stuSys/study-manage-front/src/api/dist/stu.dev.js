"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStuList = getStuList;
exports.getDetail = getDetail;

var _request = _interopRequireDefault(require("./request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getStuList() {
  return (0, _request["default"])({
    url: "students",
    method: "GET"
  });
}

function getDetail(id) {
  return (0, _request["default"])({
    url: "students/".concat(id),
    method: "GET"
  });
}