---
title: "你不知道的 JS 读书笔记（五）-- 原型[propotype]"
date: 2017-11-22 22:57:16
lastmod: 2017-11-22 22:57:16
draft: false
keywords: ["javascript", "you-dont-know-js", "你不知道的JS", "notes", "读书笔记", "原型", "propotype"]
description: "你不知道的 JS 读书笔记（五）-- 原型[propotype]"
tags: ["JavaScript"]
categories: ["JavaScript"]
author: "ryan"

---

## [[Prototype]] 链

```javascript
function Foo () {
  this.tmp = 'b'
}
var a = new Foo()
Object.getPrototypeOf(a) === Foo.prototype // true
a.tmp // 'b'
```

> 调用 `new Foo()` 时会创建 `a`， 其中的一步就是给 `a` 一个内部的 `[[Prototype]]` 链接， 关联到 `Foo.prototype` 指向的那个对象。

## constructor 属性

```javascript
// 接上代码
Foo.prototype.constructor === Foo // true
a.constructor === Foo // true
```

`constructor` 属性常被误解为指向构造函数，即这里的 `Foo`，实际上 `a` 本身并没有 `constructor` 属性，而是从 `[[Prototype]]` 链中找到该属性并返回的，验证如下

```javascript
function Foo () {
  // ...
}
Foo.prototype = {}
var a1 = new Foo()
a1.constructor === Foo // false
a1.constructor === Object // true
```

> `a1` 并没有 `constructor` 属性， 所以它会委托 `[[Prototype]]` 链上的 `Foo.prototype`。 但是这个对象也没有 `constructor` 属性（不过默认的 `Foo.prototype` 对象有这个属性！ ）， 所以它会继续委托， 这次会委托给委托链顶端的 `Object.prototype`。 这个对象有 `constructor` 属性， 指向内置的 `Object(..)` 函数。

## 小结

原型链的顶端是 `Object.prototype`， 如果在原型链中找不到指定的属性就会停止。 `toString()`、 `valueOf()` 和其他一些通用的功能都存在于 `Object.prototype` 对象上， 因此语言中所有的对象（除去通过 `Object.create(null)` 声明的对象）都可以使用它们。
