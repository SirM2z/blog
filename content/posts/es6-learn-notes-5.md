---
title: "ES6 学习笔记（五）-- 函数与对象"
date: 2016-06-01 20:02:41
lastmod: 2016-06-01 20:02:41
draft: false
keywords: ["ES6", "function", "object", "learn", "notes", "学习笔记"]
description: "ES6 学习笔记（五）-- 函数与对象"
tags: ["ES6"]
categories: ["ES6"]
author: "ryan"

---

# 函数

## 参数的默认值

### 基本用法

```javascript
function log(x, y = 'World') {
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello
```

### 与解构赋值默认值结合使用

```javascript
function foo({x, y = 5}) {
  console.log(x, y);
}

foo({}) // undefined, 5
foo({x: 1}) // 1, 5
foo({x: 1, y: 2}) // 1, 2
foo() // TypeError: Cannot read property 'x' of undefined
```

## rest参数(...变量名)

rest参数搭配的变量是一个数组，该变量将多余的参数放入数组中

```javascript
function push(array, ...items) {
  items.forEach(function(item) {
    array.push(item);
    console.log(item);
  });
}

var a = [];
push(a, 1, 2, 3)
```

## 扩展运算符(...)

将一个数组转为用逗号分隔的参数序列

```javascript
function f(v, w, x, y, z) { }
var args = [0, 1];
f(-1, ...args, 2, ...[3]);
```

### 应用

- 合并数组

```javascript
var arr1 = ['a', 'b'];
var arr2 = ['c'];
var arr3 = ['d', 'e'];

// ES5的合并数组
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]

// ES6的合并数组
[...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]
```

- 与解构赋值结合

```javascript
const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]
```

- 符串转为真正的数组

```javascript
[...'hello']
// [ "h", "e", "l", "l", "o" ]
```

## 箭头函数(=>)

```javascript
var f = v => v;

//等价于

var f = function(v) {
  return v;
};
```

注意

1. 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象
2. 不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误
3. 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用Rest参数代替
4. 不可以使用yield命令，因此箭头函数不能用作Generator函数

# 对象

## Object.assign()

用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）

```javascript
//同名属性，后面覆盖前面
var target = { a: 1, b: 1 };

var source1 = { b: 2, c: 2 };
var source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```

**该方法实行的是浅拷贝，即如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用**


