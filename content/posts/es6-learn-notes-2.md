---
title: "ES6 学习笔记（二）-- 解构赋值"
date: 2016-06-01 20:02:38
lastmod: 2016-06-01 20:02:38
draft: false
keywords: ["ES6", "解构赋值", "learn", "notes", "学习笔记"]
description: "ES6 学习笔记（二）-- 解构赋值"
tags: ["ES6"]
categories: ["ES6"]
author: "ryan"

---

# 解构赋值

## 数组的解构赋值

```javascript
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [ , , third] = ["foo", "bar", "baz"];
third // "baz"

let [x, , y] = [1, 2, 3];
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined 解构不成功，变量的值就等于undefined
z // []
```

- 解构赋值不仅适用于var命令，也适用于let和const命令。


##允许指定默认值

```javascript
var [x = 1] = [undefined];
x // 1

var [x = 1] = [null];
x // null
```

- ES6内部使用严格相等运算符（===），判断一个位置是否有值。所以，如果一个数组成员不严格等于undefined，默认值是不会生效的

##对象的解构赋值

- 对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

```javascript
var { bar, foo } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"

var { baz } = { foo: "aaa", bar: "bbb" };
baz // undefined
```

## 字符串的解构赋值

```javascript
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```

## 数值和布尔值的解构赋值

```javascript
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true
```

## 函数参数的解构赋值

```javascript
function add([x, y]){
  return x + y;
}

add([1, 2]); // 3
```

## 用途

1. 交换变量的值
```javascript
[x, y] = [y, x];
```
2. 从函数返回多个值
```javascript
function example() {
  return [1, 2, 3];
}
var [a, b, c] = example();
```
3. 函数参数的定义
```javascript
function f([x, y, z]) { ... }
f([1, 2, 3]);
```
4. 提取JSON数据
```javascript
var jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};
let { id, status, data: number } = jsonData;
```
5. 函数参数的默认值
```javascript
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
}) {
  // ... do stuff
};
```
