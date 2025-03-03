"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addListAction = addListAction;
exports.deleteListAction = deleteListAction;
exports.changeAction = changeAction;

var _actionTypes = require("./actionTypes");

/**
 * 生产action对象的工厂函数
 */
function addListAction(data) {
  return {
    type: _actionTypes.ADD,
    data: {
      id: Date.now(),
      content: data
    }
  };
}

function deleteListAction(data) {
  return {
    type: _actionTypes.DELETE,
    data: data
  };
}

function changeAction(data) {
  return {
    type: _actionTypes.CHANGE,
    data: data
  };
}