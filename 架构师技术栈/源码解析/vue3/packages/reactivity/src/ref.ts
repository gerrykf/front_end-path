import { activeSub } from "./effect";
import { Link, link, propagate } from "./system";

enum ReactiveFlags {
  /**
   * 标识一个对象是响应式的引用类型
   */
  IS_REF = "__v_isRef",
}

export class RefImpl<T> {
  /**
   * 存储实际的值
   */
  private _value: T;

  /**
   * 标识该对象是响应式引用类型 ref标记，证明是一个 ref
   */
  protected [ReactiveFlags.IS_REF]: boolean = true;

  /**
   * 订阅者链表的头节点,理解为head
   */
  subs: Link;

  /**
   * 订阅者链表的尾节点，理解为tail
   */
  subsTail: Link;

  constructor(value: T) {
    this._value = value;
  }

  get value(): T {
    // 收集依赖 来自于 effect.ts 中的 activeSub(是一个函数)
    if (activeSub) {
      trackRef(this);
    }

    return this._value;
  }

  set value(newValue: T) {
    // 触发依赖更新

    this._value = newValue;
    triggerRef(this);
  }
}

/**
 * 创建一个响应式引用对象
 * @param value 将要包装成响应式的值
 * @returns
 */
export function ref<T>(value: T) {
  return new RefImpl<T>(value);
}

/**
 * 判断一个值是否是响应式引用类型(ref)
 * @param value 将要判断的值
 * @returns
 */
export function isRef(value) {
  return !!(value && value[ReactiveFlags.IS_REF]);
}

/**
 * 收集依赖，建立 ref与effect的链表关系
 * @param dep ref 对象
 */
export function trackRef<T>(dep: RefImpl<T>) {
  if (activeSub) {
    link(dep, activeSub);
  }
}

/**
 * 触发 ref 关联的 effect 重新执行
 * @param dep ref 对象
 */
export function triggerRef<T>(dep: RefImpl<T>) {
  if (dep.subs) {
    // 触发依赖更新
    propagate(dep.subs);
  }
}
