"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.change = exports.deleteList = exports.addList = exports.todoSlice = void 0;

var _toolkit = require("@reduxjs/toolkit");

var todoSlice = (0, _toolkit.createSlice)({
  name: "todos",
  initialState: {
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
  },
  reducers: {
    addList: function addList(state, action) {
      state.list.push(action.payload);
    },
    deleteList: function deleteList(state, action) {
      state.list = state.list.filter(function (_item, index) {
        return index !== action.payload;
      });
    },
    change: function change(state, action) {
      state.list = state.list.map(function (item, index) {
        if (index === action.payload) {
          item.status = !item.status;
        }

        return item;
      });
    }
  }
});
exports.todoSlice = todoSlice;
var _todoSlice$actions = todoSlice.actions,
    addList = _todoSlice$actions.addList,
    deleteList = _todoSlice$actions.deleteList,
    change = _todoSlice$actions.change;
exports.change = change;
exports.deleteList = deleteList;
exports.addList = addList;
var _default = todoSlice.reducer;
exports["default"] = _default;