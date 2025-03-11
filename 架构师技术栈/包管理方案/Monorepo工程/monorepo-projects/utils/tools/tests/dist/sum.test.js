"use strict";
exports.__esModule = true;
var sum_1 = require("../src/sum");
test("计算3 + 3 的结果", function () {
    expect(sum_1.sum(3, 3)).toBe(6);
});
