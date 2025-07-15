var VueReactivity = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // packages/reactivity/src/index.ts
  var index_exports = {};
  __export(index_exports, {
    activeSub: () => activeSub,
    effect: () => effect,
    isRef: () => isRef,
    ref: () => ref
  });

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
  return __toCommonJS(index_exports);
})();
//# sourceMappingURL=reactivity.iife.js.map
