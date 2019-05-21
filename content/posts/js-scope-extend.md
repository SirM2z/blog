---
title: "浅析 JavaScript 原型链与原型链式继承"
date: 2016-01-10 20:44:15
lastmod: 2016-01-10 20:44:15
draft: false
keywords: ["js", "javascript", "原型链"]
description: "浅析 JavaScript 原型链与原型链式继承"
tags: ["JavaScript"]
categories: ["JavaScript"]
author: "ryan"

---

# 原型链与原型链式继承

上篇总结了下JavaScript的作用域链的问题，欢迎拍砖！[浅析JavaScript作用域链]()

继上篇总结中提出的情况

> 同样都是链，但这两个链往上追朔的顶点是不一样的；并且为了增强我们对js继承的理解。

总结一下JavaScript原型链的问题。

## prototype属性

首先我们要知道一个prototype属性，这个属性就是理解原型链的关键。提到这个属性，我们要区别一下，只有函数对象才有prototype属性，而普通对象是没有的。

函数对象：

```js
function foo(){}
var foo=function(){}
var foo=new Function()
```

普通对象：

```js
var o={};
var o=new foo();
var o=new Object();
```

## 原型对象

JS在创建对象（不论是普通对象还是函数对象）的时候，都有一个叫做`__proto__`的内置属性，用于指向创建它的函数对象的原型对象prototype。

```js
//普通对象
var o={};
o.__proto__    //=> Object {}
o.prototype    //=> undefined

//函数对象
function foo(){}
foo.__proto__    //=> function() {}
foo.__proto__.__proto__    //=> Object {}

foo.prototype    //=> foo {} 
foo.prototype.prototype    //=> undefined
```
这个时候，我们就可以发现：

- `__proto__`指向**创建它的函数对象的原型对象**
- `prototype`指向**原型对象**

这样就可以更好的理解原型对象的概念了！

## constructor属性

原型对象prototype中都有个预定义的constructor属性，用来引用它的函数对象，简单来讲就是指向它的构造函数，当然这样讲是不严谨的，但是有助于我们理解它。

```js
//函数对象
function foo(){}
foo.prototype    //=> foo {}
foo.constructor    //=> function Function() { [native code] }

//用函数对象foo生成一个实例(即普通对象)
var f = new foo()
f.__proto__    //=> foo {} 证实了(指向创建它的函数对象的原型对象)
//观察可以得知，f的__proto__属性与它的构造函数foo()的prototype属性指向一样的原型

f.prototype    //=> undefined 证实了(普通对象无prototype属性)
f.constructor    //=> function foo(){} 证实了(指向它的构造函数)

//那么我们可以预测：f.constructor.constructor 应该指向 foo.constructor
f.constructor.constructor    //=> function Function() { [native code] }

//Bingo
//同样可以预测：函数对象foo的prototype属性的constructor属性指向自身
foo.prototype.constructor===foo    //=>true
```

总结：

- 函数对象的prototype属性指向它的构造函数的原型对象prototype（只有函数对象拥有prototype属性）
- constructor属性指向它的构造函数

### 原型链

总结：

1. 实例对象 f（通过`new XX()` 所得到的实例），跟原型链相关的只有 `__proto__` 属性，指向其对应的原型对象 `*.prototype` 。
2. 构造函数对象`foo`分原生和自定义两类。跟原型链相关的有 `__proto__` 属性，除此之外还有 `prototype` 属性。它们的 `__proto__` 属性都是指向 `Function.prototype` 这个原型对象的。`prototype` 也是指向对应的原型对象。
3. 原型对象 `foo.prototype`除了一样拥有 `__proto__` 外，也拥有独有的属性 constructor 。它的`__proto__` 指向的都是 `Object.prototype` ，除了 `Object.prototype` 本身，它自己是指向 `null` 。而 `constructor` 属性指向它们对应的构造函数对象。
4. 原型链是基于 `__proto__` 的。实例只能通过其对应原型对象的 `constructor` 才能访问到对应的构造函数对象。构造函数只能通过其对应的 `prototype` 来访问相应的原型对象。
5. 当向上查找时，会查找到最顶层的构造函数的原型对象为止，而不像作用域链一样指向顶级作用域（也就是顶级对象`window`）为止。

### 原型链式继承

根据上边得出的结论，我们来稍微理解一下原型链式继承。

原型链式继承

```js
function SuperType(){
	this.a=true;
}
SuperType.prototype.getSuperValue=function(){
	return this.a;
}

function SubType(){
	this.b=false;
}
SubType.prototype = new SuperType();//继承
SubType.prototype.getSubValue=function(){//额外添加方法
	return this.b;
}
var s = new SubType();
console.log(s.getSubValue());//false
console.log(s.getSuperValue());//true
```

可以看到，函数原型SubType用（修改自身prototype属性引用的原型对象）方式实现了继承，那么它的原型对象即是函数对象SuperType的实例，这样就可以理解：实例s（普通对象）可以调用它的父对象SuperType的getSuperValue方法。

这个继承方式也暴漏出了一些问题：如果原型中包含引用类型的值，则实例间对该值的修改会相互影响。因为js中只有两种类型的值，引用类型（通常指对象，包括数组和函数），基本类型（包括undefined、null、布尔值、数字和字符串）。

### 参考

- 《JavaScript权威指南》
- 《JavaScript高级程序设计》第三版



