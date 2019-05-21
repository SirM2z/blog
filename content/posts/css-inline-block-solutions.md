---
title: "inline-block 的兼容性与空白间距解决方案"
date: 2016-06-01 20:02:37
lastmod: 2016-06-01 20:02:37
draft: false
keywords: ["css", "inline-block", "兼容性", "空白间距", "notes", "解决方案"]
description: "inline-block 的兼容性 与 空白间距解决方案"
tags: ["CSS"]
categories: ["CSS"]
author: "ryan"

---

# inline-block

## inline-block 兼容性

兼容 IE > 7，兼容（IE < 8）写法:

```css
.father{
  display:inline-block; /* 现代浏览器 +IE6、7 inline 元素 */
  zoom:1; *display:inline; /* IE6、7 block 元素 */
}
```

或：
```css
/* IE 的一个经典 bug ，如果先定义了 display:inline-block，然后再将 display 设回 inline 或 block，layout 不会消失 */
.father{
  display:inline-block; /* 现代浏览器 +IE6、7 inline 元素 */
}
.father{
  *display:inline; /* IE6、7 block 元素 */
}
```

> 解释：在IE下，display: inline-block只是触发了元素的layout。比如将display: inline-block设置到div上，只能保证这个div拥有块元素的特征（可以设置宽度，高度等），但还是会产生换行。接下来要设置display: inline，使其不产生换行。将display:inline-block;*display:inline;写在同一个样式上，inline-block属性是不会触发元素的layout的，因此我们还要额外加上 zoom:1来触发layout

## inline-block 元素间间距 产生原因

inline-block 水平呈现的元素间，换行显示或空格分隔的情况下会有间距

> 详细解释：我们写代码，为了使代码看上去“层级分明”，通常会在标签结束符后顺手打个回车，而回车会产生回车符，回车符相当于空白符，通常情况下，多个连续的空白符会合并成一个空白符，而产生“空白间隙”的真正原因就是这个让我们并不怎么注意的空白符。

如下：

```html
<ul>
  <li style="display:inline-block;">1</li><!-- 这里有换行符 -->
  <li style="display:inline-block;">2</li><!-- 这里有换行符 -->
  <li style="display:inline-block;">3</li>
</ul>
```

### 解决方案一

```html
<ul>
  <li style="display:inline-block;">1
  </li><li style="display:inline-block;">2
  </li><li style="display:inline-block;">3</li>
</ul>
```

### 解决方案二

```css
ul {
  letter-spacing: -4px;/*根据不同字体字号或许需要做一定的调整*/
  word-spacing: -4px;
  font-size: 0;
}
li {
  font-size: 16px;
  letter-spacing: normal;
  word-spacing: normal;
  display:inline-block;
  zoom: 1; *display: inline; /* IE < 8: 伪造 inline-block */
}
```

### 解决方案三

```css
li {
  display:inline-block;
  zoom: 1; *display: inline; /* IE < 8: 伪造 inline-block */
  word-spacing:0;
}
ul {
  display:table;  /* 调教webkit*/
  word-spacing:-1em;
}
```

### 解决方案四

```css
ul {
  letter-spacing: -0.31em; /* webkit */
  *letter-spacing: normal; /* IE < 8 重置 */
  word-spacing: -0.43em; /* IE < 8 && gecko */
}

li {
  display: inline-block;
  zoom: 1; *display: inline; /* IE < 8: 伪造 inline-block */
  letter-spacing: normal;
  word-spacing: normal;
  vertical-align: top; /* display:inline-block元素本身定义 vertical-align 属性可去掉元素垂直方向的多余空白*/  
}
```

> 参考
>
> - [inline-block 前世今生](https://github.com/paddingme/DailyReading/issues/5)
> - [如何解决inline-block元素的空白间距(W3C PLUS)](https://www.w3cplus.com/css/fighting-the-space-between-inline-block-elements)
> - [去除inline-block元素间间距的N种方法(张鑫旭)](http://www.zhangxinxu.com/wordpress/2012/04/inline-block-space-remove-%E5%8E%BB%E9%99%A4%E9%97%B4%E8%B7%9D/)
