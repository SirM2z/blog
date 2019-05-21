---
title: "你不知道的 JS 读书笔记（一）-- 作用域"
date: 2017-11-22 22:53:16
lastmod: 2017-11-22 22:53:16
draft: false
keywords: ["javascript", "you-dont-know-js", "你不知道的JS", "notes", "读书笔记", "作用域"]
description: "你不知道的 JS 读书笔记（一）-- 作用域"
tags: ["JavaScript"]
categories: ["JavaScript"]
author: "ryan"

---

## 作用域中的 LHS,RHS 查询

`var a = 2;`

- 引擎对a的查找是LHS查询，指查询a的内存位置，并非查找其真实的值

`console.log(a)`

- 引擎对a的查找是RHS查询，指查询a的实际值，并传递给`console.log()`方法作为参数

```javascript
function foo (a) {
  console.log(a);
}

foo(2);
```

- 对`foo`进行`RHS`查询，并进行方法调用
- 隐式对a进行赋值：`a=2`，对a进行`LHS`查询
- 对`console.log`进行`RHS`查询
- 对`console.log(a)`中的a进行`RHS`查询

> 如果 RHS 查询找到了一个变量，但是你尝试对这个变量的值进行不合理的操作，比如试图对一个非函数类型的值进行函数调用，或着引用 `null` 或 `undefined` 类型的值中的属性，那么引擎会抛出另外一种类型的异常，叫作 `TypeError。`

> `ReferenceError` 同作用域判别失败相关，而 `TypeError` 则代表作用域判别成功了，但是对结果的操作是非法或不合理的。

> 不成功的 RHS 引用会导致抛出 `ReferenceError` 异常。 
> 不成功的 LHS 引用会导致自动隐式地创建一个全局变量（非严格模式下）， 该变量使用 LHS 引用的目标作为标识符， 或者抛出 `ReferenceError` 异常（严格模式下）。

## 词法作用域

```javascript
function foo (a) {
  var b = a * 2;

  function bar (c) {
    console.log(a, b, c);
  }

  bar(b * 3);
}

foo(2); // 2, 4, 13
```

- 共三层作用域
- 最外层为全局作用域，含有一个标识符：foo
- 第二层为foo函数作用域，含有三个标识符：a, b, bar
- 第三层为bar函数作用域，含有一个标识符：c
- 查找某个标识符的值（RHS查询）时，先在当前作用域查询，查不到依次向外层查找，直到全局作用域停止

## 动态修改词法作用域：eval,with

均不建议使用，eval可以修改已经存在的词法作用域，with创建了一个新的词法作用域

副作用：
- 引擎无法在编译时对作用域查找进行优化，导致代码运行变慢。

## 立即执行函数表达式-IIFE

```javascript
var a = 2;

(function foo() {

  var a = 3;
  console.log( a ); // 3

})();

console.log( a ); // 2
```

第一个（）将函数变成表达式，第二个（）执行这个函数

## 块作用域 let,const

```javascript
if (true) {
  let bar = 2;
}
console.log( bar ); // ReferenceError
```

## 提升

### 变量提升

```javascript
a = 2;
var a;
console.log(a); // 2

// 等同于------

var a;
a = 2;
console.log(a);
```

```javascript
console.log(a); // undefined 并非 ReferenceError 异常
var a = 2;

// 等同于------

var a;
console.log(a);
a = 2;
```

### 函数声明提升 到 变量提升 前边

```javascript
foo(); // 1

var foo;

function foo () {
  console.log(1);
}

foo = function () {
  console.log(2);
}

// 等同于------

function foo () {
  console.log(1);
}

var foo; // 重复声明，被忽略

foo();

foo = function () {
  console.log(2);
}
```
