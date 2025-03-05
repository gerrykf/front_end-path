"use strict";
exports.__esModule = true;
var index_1 = require("../src/index");
var vitest_1 = require("vitest");
vitest_1.test("测试 sub 方法", function () {
    var result = index_1.add(10, 3);
    vitest_1.expect(result).toBe(13);
});
