---
title: "多行文本溢出用省略号表示 Text Overflow Ellipsis"
date: 2016-04-26 22:31:08
lastmod: 2016-04-26 22:31:08
draft: false
keywords: ["css", "text-overflow", "ellipsis", "多行文本超出", "省略号"]
description: "多行文本溢出用省略号表示 css text overflow ellipsis"
tags: ["CSS"]
categories: ["CSS"]
author: "ryan"

---

最近在做移动端的项目，遇到了多行文本溢出后用省略号表示的需求，之前一直是每次用到的时候就搜索，这次打算总结一下。

## WebKit浏览器或移动端的页面

因为这次做的项目是要放在微信里的，所以一开始想到的便是WebKit的CSS扩展属性(WebKit是私有属性)

```css
  -webkit-line-clamp
```

> 注：这是一个 不规范的属性（`unsupported WebKit property`），它没有出现在 CSS 规范草案中。

`-webkit-line-clamp`用来限制在一个块元素显示的文本的行数。 为了实现该效果，它需要组合其他的WebKit属性。

常见结合属性：

- `display: -webkit-box;` 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。
- `-webkit-box-orient` 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。
- `text-overflow: ellipsis;`可以用来多行文本的情况下，用省略号“…”隐藏超出范围的文本 。

demo如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0,minimum-scale=1,maximum-scale=1">
  <title>Document</title>
  <style>
    .multi-no-wrap {
      line-height: 32px;
      border: 1px solid #eee;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .word-break{
      word-break: break-all;
    }
    .word-wrap{
      word-wrap: break-word;
    }
  </style>
</head>
<body>
  <p class="multi-no-wrap word-break">
    多行文字, 超长溢出将会在最后一行显示省略号, 啦啦啦啦啦我是为了凑数啦啦啦啦啦我是为了凑数
  </p>
  
  
  <p class="multi-no-wrap word-wrap">This paragraph contains a very long word: thisisaveryveryveryveryveryverylongword. The long word will break and wrap to the next line.</p>
  <p class="multi-no-wrap word-break">This paragraph contains a very long word: thisisaveryveryveryveryveryverylongword. The long word will break and wrap to the next line.</p>
  
</body>
</html>
```

## 跨浏览器兼容的方案

比较靠谱简单的做法就是设置相对定位的容器高度，用包含省略号(…)的元素模拟实现；

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0,minimum-scale=1,maximum-scale=1">
  <title>Document</title>
  <style>
    p {
        position:relative;
        line-height:1.4em;
        /* 3 times the line-height to show 3 lines */
        height:4.2em;
        overflow:hidden;
    }
    p::after {
        content:"...";
        font-weight:bold;
        position:absolute;
        bottom:0;
        right:0;
        padding:0 20px 1px 45px;
    }
  </style>
</head>
<body>
  <p>
    多行文字, 超长溢出将会在最后一行显示省略号, 啦啦啦啦啦我是为了凑数啦啦啦啦啦我是为了凑数
  </p>
</body>
</html>
```

note：
1. IE6-7不显示content内容，所以要兼容IE6-7可以是在内容中加入一个标签，比如用<span class="line-clamp">...</span>去模拟
2. 要支持IE8，需要将::after替换成:after

