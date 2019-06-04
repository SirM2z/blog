---
title: "你不知道的 JS 读书笔记（三）-- this/原型对象"
date: 2017-11-22 22:55:16
lastmod: 2017-11-22 22:55:16
draft: false
keywords: ["javascript", "you-dont-know-js", "你不知道的JS", "notes", "读书笔记", "this", "原型对象"]
description: "你不知道的 JS 读书笔记（三）-- this/原型对象"
tags: ["JavaScript"]
categories: ["JavaScript"]
author: "Ryan"

---

## this 绑定规则

### 默认绑定

严格模式下绑定到undefined，否则绑定到全局对象

```javascript
function foo () {
  console.log(this.a);
}
var a = 2;
foo(); // 2
```

### 隐式绑定

由上下文对象调用，绑定到该上下文对象

```javascript
function foo () {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo: foo
};

obj.foo() // 2

// 隐式丢失----

var a = "oops, global";

setTimeout(obj.foo, 100) // "oops, global"

// 隐式赋值，丢失上下文
```

### 显式绑定：apply,call.硬绑定：bind

### new 绑定

```javascript
function foo () {
  this.a = a;
}
var bar = new foo(2);
console.log(bar.a); // 2
```

## 优先级

new 绑定 > 显式绑定(apply,call),硬绑定(bind) > 隐式绑定 > 默认绑定

## tip

`Object.create(null)` 类似 `{}`，但是前者不会创建 `Object.prototype` 这个委托，所以它比 `{}`“更空” 

> 意义：`Object.create(null)` 用法更安全，`Object.create` 会创建一个新的空对象，并把新对象内部的 `[[Prototype]]` 关联到你指定的对象，这里就导致新对象的 `Object.prototype` 为 `null`。那么任何对于 `this`  的使用都会被限制在这个空对象中，不会对全局对象（整条原型链）产生任何影响

ES6 中的箭头函数不会使用四条标准的绑定规则，而是根据当前的词法作用域来决定 this，和 `self = this` 机制一样

## 基本类型

`string number boolean null undefined`

## 内置对象

`String Number Boolean Object Function Array Date RegExp Error`

```javascript
var strPrimitive = "I am a string";
typeof strPrimitive; // "string"
strPrimitive instanceof String; // false

var strObject = new String( "I am a string" );
typeof strObject; // "object"
strObject instanceof String; // true
```

## 复制对象

```javascript
// someObj 需要可以被序列化为一个 JSON 字符串并且可以根据这个字符串解析出一个结构和值完全一样的对象
var newObj = JSON.parse( JSON.stringify( someObj ) );

// Object.assign(..) 属于浅复制，遍历键名，并赋值
```

## 属性描述符

```javascript
// 查看属性描述符信息
var myObject = { a:2 };
Object.getOwnPropertyDescriptor( myObject, "a" );
// {
// value: 2,
// writable: true,
// enumerable: true,
// confgurable: true
// }

// 设置属性描述符
var myObject = {};
Object.defineProperty( myObject, "a", {
  value: 2,
  writable: true, // 是否可以修改属性的值
  configurable: true, // 属性是否可配置，改为false是单向操作
  enumerable: true // 是否可枚举，如：for..in,forEach等
});
myObject.a; // 2
```

## get set

```javascript
var myObject = {
  // 给 a 定义一个 getter
  get a() {
    return this._a_;
  },
  // 给 a 定义一个 setter
  set a(val) {
    this._a_ = val * 2;
  }
};
myObject.a = 2;
myObject.a; // 4
```

## 存在性

```javascript
var myObject = { a:2 };
("a" in myObject); // true
("b" in myObject); // false
myObject.hasOwnProperty( "a" ); // true
myObject.hasOwnProperty( "b" ); // false
```

`in` 操作符会检查属性是否在对象及其 `[[Prototype]]` 原型链中。 相比之下，`hasOwnProperty(..)` 只会检查属性是否在 `myObject` 对象中， 不会检查 `[[Prototype]]` 链。

## 遍历

`for..in` 循环可以用来遍历对象的可枚举属性列表（包括 `[[Prototype]]` 链）

ES6 增加了一种用来遍历数组的 `for..of` 循环语法（如果对象本身定义了迭代器的话也可以遍历对象）
