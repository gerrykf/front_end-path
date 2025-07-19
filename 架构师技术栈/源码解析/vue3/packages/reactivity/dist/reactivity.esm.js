// packages/reactivity/src/effect.ts
var activeSub;
function effect(fn) {
  activeSub = fn;
  activeSub();
  activeSub = void 0;
}

// packages/reactivity/src/system.ts
function link(dep, sub) {
  const newLink = {
    sub,
    nextSub: void 0,
    prevSub: void 0
  };
  if (dep.subsTail) {
    dep.subsTail.nextSub = newLink;
    newLink.prevSub = dep.subsTail;
    dep.subsTail = newLink;
  } else {
    dep.subs = newLink;
    dep.subsTail = newLink;
  }
}
function propagate(subs) {
  let link2 = subs;
  let queuedEffect = [];
  while (link2) {
    queuedEffect.push(link2.sub);
    link2 = link2.nextSub;
  }
  queuedEffect.forEach((effect2) => effect2());
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
   * 订阅者链表的头节点,理解为head
   */
  subs;
  /**
   * 订阅者链表的尾节点，理解为tail
   */
  subsTail;
  constructor(value) {
    this._value = value;
  }
  get value() {
    if (activeSub) {
      trackRef(this);
    }
    return this._value;
  }
  set value(newValue) {
    this._value = newValue;
    triggerRef(this);
  }
};
function ref(value) {
  return new RefImpl(value);
}
function isRef(value) {
  return !!(value && value["__v_isRef" /* IS_REF */]);
}
function trackRef(dep) {
  if (activeSub) {
    link(dep, activeSub);
  }
}
function triggerRef(dep) {
  if (dep.subs) {
    propagate(dep.subs);
  }
}
export {
  RefImpl,
  activeSub,
  effect,
  isRef,
  ref,
  trackRef,
  triggerRef
};
//# sourceMappingURL=reactivity.esm.js.map
