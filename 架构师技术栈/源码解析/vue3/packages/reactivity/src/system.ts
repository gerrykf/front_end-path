import { RefImpl } from "./ref";

export interface Link {
  /**
   * 保存effect
   */
  sub: Function;
  /**
   * 下一个节点
   */
  nextSub: Link | undefined;
  /**
   * 上一个节点
   */
  prevSub: Link | undefined;
}

/**
 * 连接链表关系
 * @param dep 依赖对象，包含订阅者链表
 * @param sub 订阅者函数(就是effect中的activeSub)
 */
export function link<T>(dep: RefImpl<T>, sub: Function) {
  // 如果 activeSub 有值，那就保存起来，等我更新的时候，触发
  const newLink = {
    sub: sub,
    nextSub: undefined,
    prevSub: undefined,
  };

  /**
   * 关联链表关系，分两种情况
   * 1. 尾结点有，那就往尾结点添加
   * 2. 如果尾结点没有，则表示第一次关联，那就往头结点添加，头尾相同
   */
  if (dep.subsTail) {
    // 如果有尾节点，说明链表不为空
    dep.subsTail.nextSub = newLink; // 将新节点添加到尾部
    newLink.prevSub = dep.subsTail; // 新节点的 prevSub 指向当前尾节点
    dep.subsTail = newLink; // 更新尾节点为新节点
  } else {
    // 如果没有尾节点，说明链表为空 头节点也没有
    dep.subs = newLink; // 将新节点作为头节点
    dep.subsTail = newLink; // 头节点也是尾节点
  }
}

/**
 * 传播更新的函数
 * @param subs 订阅者链表的头节点
 */
export function propagate(subs: Link | undefined) {
  // 通知 effect 重新执行，获取到最新的值
  let link = subs;
  let queuedEffect: Function[] = [];

  while (link) {
    queuedEffect.push(link.sub);
    link = link.nextSub;
  }

  // 执行每个 effect 函数
  queuedEffect.forEach((effect) => effect());
}
