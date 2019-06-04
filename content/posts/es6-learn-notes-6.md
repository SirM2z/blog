---
title: "ES6 学习笔记（六）-- set map 以及 for...of"
date: 2016-06-01 20:02:42
lastmod: 2016-06-01 20:02:42
draft: false
keywords: ["ES6", "set", "map", "for...of", "learn", "notes", "学习笔记"]
description: "ES6 学习笔记（六）-- set map 数据结构 以及 for...of 遍历"
tags: ["ES6"]
categories: ["ES6"]
author: "Ryan"

---

# Set

新的数据解构，成员值是唯一的

```javascript
//不能添加相同的值
var s = new Set();

[2, 3, 5, 4, 5, 2, 2].map(x => s.add(x));

for (let i of s) {
  console.log(i);
}
// 2 3 5 4

//去除相同的值
var set = new Set([1, 2, 3, 4, 4]);
[...set]
// [1, 2, 3, 4]
```

## Set实例的属性和方法

实例的属性

- `Set.prototype.constructor`：构造函数，默认就是`Set`函数
- `Set.prototype.size`：返回`Set`实例的成员总数

实例的方法:

1. 操作方法
    - `add(value)`：添加某个值，返回Set结构本身。
    - `delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。
    - `has(value)`：返回一个布尔值，表示该值是否为Set的成员。
    - `clear()`：清除所有成员，没有返回值
    
2. 遍历方法
    - `keys()`：返回一个键名的遍历器
    - `values()`：返回一个键值的遍历器
    - `entries()`：返回一个键值对的遍历器
    - `forEach()`：使用回调函数遍历每个成员

# Map

JavaScript的对象（Object），本质上是键值对的集合（Hash结构），但是只能用字符串当作键

```JavaScript
var m = new Map();
var o = {p: "Hello World"};

m.set(o, "content")
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false
```

实例的属性

- `size`属性返回Map结构的成员总数

实例的方法

1. 操作方式
    - `set(key, value)`：设置key所对应的键值，然后返回整个Map结构(本身)
    - `get(key)`：读取key对应的键值
    - `has(key)`：返回一个布尔值，表示某个键是否在Map数据结构中
    - `delete(key)`：删除某个键，返回布尔值
    - `clear()`：清除所有成员，没有返回值

2. 遍历方法
    - `keys()`：返回键名的遍历器
    - `values()`：返回键值的遍历器
    - `entries()`：返回所有成员的遍历器
    - `forEach()`：遍历Map的所有成员
    
# for...of遍历

适用范围：数组、Set和Map结构、某些类似数组的对象（比如arguments对象、DOM NodeList对象）、Generator对象，以及字符串

与其他遍历语法比较

- for循环：写法麻烦
- forEach循环：无法中途跳出
- for...in
    1. 数组的键名是数字，但是for...in循环是以字符串作为键名“0”、“1”、“2”
    2. for...in循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键
    3. 某些情况下，for...in循环会以任意顺序遍历键名
