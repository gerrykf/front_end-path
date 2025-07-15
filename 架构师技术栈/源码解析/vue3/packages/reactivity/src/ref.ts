import { activeSub } from "./effect";

enum ReactiveFlags {
  /**
   * 标识一个对象是响应式的引用类型
   */
  IS_REF = "__v_isRef",
}

class RefImpl<T> {
  /**
   * 存储实际的值
   */
  _value: T;

  /**
   * 标识该对象是响应式引用类型 ref标记，证明是一个 ref
   */
  [ReactiveFlags.IS_REF]: boolean = true;

  /**
   * 保存和 effect 之间的关联关系
   */
  subs;

  constructor(value: T) {
    this._value = value;
  }

  get value(): T {
    // 收集依赖

    if (activeSub) {
      // 如果 avtiveSub 有值，那就保存起来
      this.subs = activeSub;
    }

    return this._value;
  }

  set value(newValue: T) {
    // 触发依赖更新

    this._value = newValue;

    // 通知 effect 重新执行，获取到最新的值
    this.subs?.();
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
