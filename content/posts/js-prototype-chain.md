---
title: "Javascript 原型链小结"
date: 2017-03-06 18:08:27
lastmod: 2018-04-15 22:08:27
draft: false
keywords: ["js", "javascript", "prototype", "原型链"]
description: "JavaScript 原型链小结"
tags: ["JavaScript"]
categories: ["JavaScript"]
author: "Ryan"

---

# 更新（2018-04-15）

原型链理解：每个函数对象都含有一个原型对象，当访问某个对象的属性时，会先从自身属性查找（函数对象则从自身的原型对象中查找），若没有查到，就会从该对象的构造函数的原型对象中查找，这个查找过程就是原型链的体现。

---

# js原型链总结

之前发文研究了下js的原型链，但总感觉说的不是特别简单明了，每次回头看时，都还要从原理梳理一遍，这次打算详细梳理一遍，归纳出几个简单结论，用来终结原型链问题。经过这次琢磨，我发现要想搞懂js的原型链，只需要搞懂三个属性（后面我会总结成三句话），外加几个特殊公式就OK。

# 先放结论

## 结论一：三个重要属性（三句话）

1. `constructor`属性：指向**构造函数**
2. `prototype`属性：**原型对象**，`object`类型（`Function.prototype`除外，后面会讲），不需要记它指向谁，因为它不指向谁，就是个对象（有点绕），总之记住它就是个对象就好，**一个对象的原型对象的构造函数就是这个对象本身**，下面有代码解释
3. `__proto__`属性：指向**构造函数**的**原型对象**

用代码解释第二句话：
```js
let foo = funtion(){}
foo.prototype.constructor === foo // foo的原型对象的构造函数是foo
```

## 结论二：几个特殊公式

```js
Object.prototype.__proto__ === null

Function.constructor === Function

Function.__proto__ === Function.prototype

Function.prototype.__proto__ === Object.prototype

Function.prototype.__proto__.__proto__ === null
```
图解结论二：

 ![](https://raw.githubusercontent.com/SirM2z/assets/master/js原型链.png)

其实整个js原型链都符合结论一，只有结论二中的前两行公式是不符合的。它们两个应该是为了让整个原型链导向null而设计的，其他所有的链都可以通过结论一推导出来。不过在我们平常使用js的原型链时，是没必要往最顶层推导的（即null），所以前两个特殊公式基本用不到，在我们自己的代码中，只需参考结论一就可以推导所有原型链。

# 推导过程

有一个基准：只有函数对象才有`prototype`属性，函数对象简单说就是由`function`声明的函数

首先看一下几个内置的构造函数(String\Number\Boolean\Array\Date\Symbol\Object\Function)的`prototype`：

 ![](https://raw.githubusercontent.com/SirM2z/assets/master/构造函数的prototype.png)

可能这样还不够直观，那么看一下这张图：

 ![](https://raw.githubusercontent.com/SirM2z/assets/master/typeof(构造函数的prototype).png)

看出来区别了吧，`typeof(Function.prototype)`竟然还是`function`，从这个角度继续探索，也就会得出上述前提公式的第二条`Function.constructor === Function`，第一条公式可以通过自行比较得出。

至于结论一也不能算做结论，属于基础感念范畴的，通过代码可以验证结论一，如下

```js
let Foo = function(){}

// typeof(Foo.prototype) 应该是对象
typeof(Foo.prototype) // "object"

let f = new Foo()

// f.constructor 应该指向它的构造函数 Foo
f.constructor === Foo // true

// f.__proto__ 应该指向构造函数的原型对象，即 Foo.prototype
f.__proto__ === Foo.prototype // true
```

总结：至此，js原型链问题就被终结，只要记住结论一和那两个公式，所有原型链都能通过思考梳理出来，而不需要依靠控制台去试错得出。


