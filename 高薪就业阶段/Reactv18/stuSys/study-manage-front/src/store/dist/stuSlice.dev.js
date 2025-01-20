"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.changeStu = exports.deleteStu = exports.addStu = exports.getDetail = exports.initStuList = exports.stuSlice = exports.getStuListAsync = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _stu = require("../api/stu");

var getStuListAsync = (0, _toolkit.createAsyncThunk)("stu/getStuListAsync", function _callee(_, thunkApi) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          (0, _stu.getStuList)().then(function (res) {
            console.log("res", res);
            thunkApi.dispatch(initStuList(res.data));
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.getStuListAsync = getStuListAsync;
var stuSlice = (0, _toolkit.createSlice)({
  name: "stu",
  initialState: {
    stuList: [],
    detail: {}
  },
  reducers: {
    initStuList: function initStuList(state, action) {
      state.stuList = action.payload;
    },
    getDetail: function getDetail(state, _ref) {
      var payload = _ref.payload;
      var id = payload.id;
      state.detail = state.stuList.find(function (item) {
        return item.id === id;
      });
    },
    addStu: function addStu(state, action) {
      state.stuList.push(action.payload);
    },
    deleteStu: function deleteStu(state, action) {
      state.stuList = state.stuList.filter(function (_item, index) {
        return index !== action.payload;
      });
    },
    changeStu: function changeStu(state, action) {
      state.stuList = state.stuList.map(function (item, index) {
        if (index === action.payload) {
          item.status = !item.status;
        }

        return item;
      });
    }
  }
});
exports.stuSlice = stuSlice;
var _stuSlice$actions = stuSlice.actions,
    initStuList = _stuSlice$actions.initStuList,
    getDetail = _stuSlice$actions.getDetail,
    addStu = _stuSlice$actions.addStu,
    deleteStu = _stuSlice$actions.deleteStu,
    changeStu = _stuSlice$actions.changeStu;
exports.changeStu = changeStu;
exports.deleteStu = deleteStu;
exports.addStu = addStu;
exports.getDetail = getDetail;
exports.initStuList = initStuList;
var _default = stuSlice.reducer;
exports["default"] = _default;