---
title: "ES6 学习笔记（一）-- let const"
date: 2016-06-01 20:02:37
lastmod: 2016-06-01 20:02:37
draft: false
keywords: ["ES6", "let", "const", "learn", "notes", "学习笔记"]
description: "ES6 学习笔记（一）-- let const"
tags: ["ES6"]
categories: ["ES6"]
author: "Ryan"

---

# let和const命令

## let和const声明的变量只在代码块内有效

```javascript
{
  let a = 10;
  var b = 1;
}

a // ReferenceError: a is not defined.
b // 1
```

## 不存在变量提升

- 变量一定要在声明后使用，否则报错

```javascript
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
```

## 不允许重复声明

```javascript
// 报错
function () {
  let a = 10;
  var a = 1;
}
```

## 块级作用域

```javascript
function f() { console.log('I am outside!'); }
(function () {
  if(false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }

  f();
}());

//I am inside!   ES5    函数提升
//I am outside!  ES6    块级作用域
```

## const命令

- 声明一个只读的常量,一旦声明，常量的值就不能改变
- 一旦声明变量，就必须立即初始化，不能留到以后赋值

##let命令、const命令、class命令声明的全局变量，不属于全局对象的属性

```javascript
var a = 1;
// 如果在Node的REPL环境，可以写成global.a
// 或者采用通用方法，写成this.a
window.a // 1

let b = 1;
window.b // undefined
```
