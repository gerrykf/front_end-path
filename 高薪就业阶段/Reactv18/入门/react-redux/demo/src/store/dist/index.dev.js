"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _todoSlice = _interopRequireDefault(require("./todoSlice"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = (0, _toolkit.configureStore)({
  reducer: {
    // Define a top-level state field named `todos`, handled by `todoReducer`
    todos: _todoSlice["default"]
  }
});

exports["default"] = _default;