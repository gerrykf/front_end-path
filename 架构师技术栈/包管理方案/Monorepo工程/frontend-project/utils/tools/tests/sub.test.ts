import { sub } from "../src/sub";

test("测试 sub 方法", () => {
  const result = sub(10, 3);
  expect(result).toBe(7);
});
