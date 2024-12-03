import { sum, sub } from "tools";
export function testSum() {
    return sum(1, 2);
}
export function testSub() {
    return sub(2, 1);
}
console.log("test-sum", testSum());
console.log("test-sub", testSub());
