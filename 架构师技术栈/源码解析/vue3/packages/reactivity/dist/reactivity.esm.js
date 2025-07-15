// packages/reactivity/src/effect.ts
var activeSub;
function effect(fn) {
  activeSub = fn;
  activeSub();
  activeSub = void 0;
}

// packages/reactivity/src/ref.ts
var RefImpl = class {
  /**
   * 存储实际的值
   */
  _value;
  /**
   * 标识该对象是响应式引用类型 ref标记，证明是一个 ref
   */
  ["__v_isRef" /* IS_REF */] = true;
  /**
   * 保存和 effect 之间的关联关系
   */
  subs;
  constructor(value) {
    this._value = value;
  }
  get value() {
    if (activeSub) {
      this.subs = activeSub;
    }
    return this._value;
  }
  set value(newValue) {
    this._value = newValue;
    this.subs?.();
  }
};
function ref(value) {
  return new RefImpl(value);
}
function isRef(value) {
  return !!(value && value["__v_isRef" /* IS_REF */]);
}
export {
  activeSub,
  effect,
  isRef,
  ref
};
//# sourceMappingURL=reactivity.esm.js.map
