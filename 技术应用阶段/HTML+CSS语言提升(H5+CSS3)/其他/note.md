# CSS3 其他新增的属性

## box-sizing

解决了开发者不好解决还原设计稿原始尺寸的问题

```css
* {
  margin: 0;
  padding: 0;
  /* 边框+padding+内容 的总宽高为设计稿宽高  自动计算 */
  box-sizing: border-box;
}
```

## 图像内容自适应

css3 中新增了处理图像或多媒体元素(video)尺寸的属性 **object-fit**

```css
img {
  /**
    *常用取值：
    *fill: 图像的宽高拉伸 默认值
    *contain: 保持图像原尺寸 全部显示在图像区域
    *cover: 图像的原尺寸保持不变 只有设置的宽高内容区域显示出来 会有裁剪
    */
  width: 100px;
  height: 100px;
  object-fit: contain;
}
```

## 视口单位

新增了 **vw** 和 **vh**

## 伪元素选择器

新增了 **::before** 和 **::after** 分别在元素之前跟之后添加了两个伪元素选择器

伪元素必须要设置 content 属性

```css
a::before {
  content: "A";
  width: 50px;
  height: 50px;
  background-color: red;
}
a::after {
  content: "B";
  width: 50px;
  height: 50px;
  background-color: red;
}
```

## 平滑滚动

新增了**scroll-behavior**属性

https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior

## 字体图标

新增了指令 **@font-face**
例如 iconfont、iconify 做了很多字体图标

```css
@font-face {
  font-family: 指定字体;
  src: url(用户的设备没有指定的字体时从这个链接下载);
}
```

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Web Font Sample</title>
    <link
      rel="stylesheet"
      href="//at.alicdn.com/t/c/font_2738707_4n4w3ghr7hh.css"
    />
    <style media="screen, print">
      .iconfont {
        font-size: 30px;
        color: red;
      }
    </style>
  </head>
  <body>
    <i class="iconfont icon-pc"></i>
  </body>
</html>
```
