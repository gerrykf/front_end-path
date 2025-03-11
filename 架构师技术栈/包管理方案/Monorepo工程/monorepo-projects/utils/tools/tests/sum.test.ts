import { sum } from "../src/sum";

test("计算3 + 3 的结果", () => {
  expect(sum(3, 3)).toBe(6);
});
