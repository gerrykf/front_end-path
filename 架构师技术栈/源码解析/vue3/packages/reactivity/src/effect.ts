/**
 * 用来保存当前正在执行的副作用函数
 */
export let activeSub;

/**
 * effect 响应式变量更新后会重新执行传入的函数
 * @param fn
 */
export function effect(fn: Function) {
  activeSub = fn;
  activeSub();

  activeSub = undefined;
}
