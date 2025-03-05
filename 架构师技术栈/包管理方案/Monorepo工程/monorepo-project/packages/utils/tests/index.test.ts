import { add } from "../src/index";
import { test, expect } from "vitest";

test("测试 sub 方法", () => {
  const result = add(10, 3);
  expect(result).toBe(13);
});
