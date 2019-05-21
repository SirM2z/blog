---
title: "css3 学习笔记（一）"
date: 2015-05-22 20:23:51
lastmod: 2015-05-22 20:23:51
draft: false
keywords: ["css3", "learn", "notes", "学习笔记"]
description: "css3 学习笔记（一）"
tags: ["CSS3"]
categories: ["CSS3"]
author: "ryan"

---

# 兼容性

在编写CSS3样式时，不同的浏览器可能需要不同的前缀。它表示该CSS属性或规则尚未成为W3C标准的一部分，是浏览器的私有属性，虽然目前较新版本的浏览器都是不需要前缀的，但为了更好的向前兼容前缀还是少不了的。


| 前缀           | 浏览器           |
| ------------- | --------------- |
| -webkit       | chrome & safari |
| -moz          | firefox         |
| -ms           | IE              |
| -o            | opera           |

# 边框

## 圆角效果 border-raidus

```css
border-radius:10px; /* 所有角都使用半径为10px的圆角 */ 
border-raidus:2px 3px 4px 5px; /*四个半径值分别是左上，右上，右下，坐下，顺时针*/

/* 实心圆方法 */
border-raidus:10px;/*元素宽高均为10px*/
```

## 阴影 box-shadow

```css
box-shadow:4px 2px 6px #333333;
```

`4px`：x轴偏移量 必须有，水平方向，允许负值

`2px`：y轴偏移量 必须有，垂直方向，允许负值

`6px`：[阴影模糊半径] 可选，模糊距离，值越大越模糊，>=0

未写：[阴影扩展半径] 可选，阴影的尺寸,值可正负

`#333333`：[阴影颜色] 可选，缺省为黑

未写：[投影方式] 可选，inset为内阴影，缺省为外阴影

多个阴影用逗号隔开。

# 颜色

## rgba

```css
color:rgba(r,g,b,a)/*a为透明度，取值0~1*/
```

## 颜色渐变

```css
background:linear-gradient(to bottom, #fff, #999);
```

`linear-gradient`:渐变类型

`to bottom`:渐变方向，还可以为：to top,toleft,toright,to top left,to top right

`#fff`:起始颜色

`#999`:终止颜色

颜色值可以放多个，在起始和终止之间

# 文字、文本

## 实现文本溢出时用（......）表示

```css
text-overflow:ellipsis;/*溢出时的表示方式，此处为用省略号表示，还可以为clip（剪切）*/
overflow:hidden;/*溢出内容隐藏*/
white-space:nowrap;/*强制文本在一行内显示*/
```

## 文本阴影

```css
text-shadow:X-offest Y-offset blur color;
```

`X-offest` : 水平方向，正右负左

`Y-offset` : 垂直方向，正下负上

`blur` : 模糊值，>=0,

`color` : 阴影颜色，可使用rgba


## 引入本地字体：@font-face

```css

@font-face {
  font-family : 字体名称;
  src : url(字体文件在服务器上的相对或绝对路径);
}
```



