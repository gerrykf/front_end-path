# web api

## 使用 css 选择器选中元素

```js
document.querySelector(元素);
document.querySelectorAll(元素);
```

## 控制类样式

```js
// 获取类样式的伪数组
元素.classList;
```

## 本地函数

```js
localStorage.setItem(param1, param2);
localStorage.getItem(param1);
localStorage.removeItem(param1);
localStorage.removeAll();
```

## 渲染帧

浏览器会不断的对网页进行渲染，通常情况下的速度为每秒 60 次，每一次为一 帧。
但是这不是一定的，它会受到各种因素影响。因此，帧率往往会有浮动
问题：
浮动的帧率就导致我们在使用 setInterval 等计时器实现某些动画效果时，如何才能保证每一帧只执行一次动画效果呢？

理想状态下是：每一帧只执行一次动画效果的设置，
使用 setInterval 时会出现 **夹帧** 与 **跳帧**

```js
/**
 * 它传一个回调函数，告诉浏览器，你在下一帧渲染之前 运行一次这个回调函数
 */
requestAnimationFrame(function () {
  console.log("requestAnimationFrame");
});
```
