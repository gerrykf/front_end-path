/**
 * 用来保存当前正在执行的副作用函数
 */
export let activeSub: Function | undefined;

/**
 * effect 响应式变量更新后会重新执行传入的函数
 * @param fn 需要执行的函数
 */
export function effect(fn: Function) {
  activeSub = fn;
  activeSub();

  activeSub = undefined;
}
