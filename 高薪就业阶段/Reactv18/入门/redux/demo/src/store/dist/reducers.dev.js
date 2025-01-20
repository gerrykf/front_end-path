"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.todoReducer = todoReducer;

var _actionTypes = require("./actionTypes");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var defaultState = {
  list: [{
    id: 1,
    content: "学习 React"
  }, {
    id: 2,
    content: "学习 Redux"
  }, {
    id: 3,
    content: "学习 React-Redux"
  }]
};

function todoReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  // console.log("reducer", state, action);
  switch (action.type) {
    case _actionTypes.ADD:
      return {
        list: [].concat(_toConsumableArray(state.list), [action.data])
      };

    case _actionTypes.DELETE:
      return {
        list: state.list.filter(function (_item, index) {
          return index !== action.data;
        })
      };

    case _actionTypes.CHANGE:
      return {
        list: state.list.map(function (item, index) {
          if (index === action.data) {
            item.status = !item.status;
          }

          return item;
        })
      };

    default:
      return state;
  }
}