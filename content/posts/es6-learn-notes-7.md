---
title: "ES6 学习笔记（七）-- Generator 与 Promise"
date: 2016-06-01 20:02:43
lastmod: 2016-06-01 20:02:43
draft: false
keywords: ["ES6", "Generator", "Promise", "learn", "notes", "学习笔记"]
description: "ES6 学习笔记（七）-- Generator 与 Promise"
tags: ["ES6"]
categories: ["ES6"]
author: "Ryan"

---

# Generator函数

执行Generator函数会返回一个遍历器对象，也就是说，Generator函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历Generator函数内部的每一个状态。

```javascript
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();

hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }
```

# Promise对象

Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果

## 基本用法

```javascript
//promise实例
var promise = new Promise(function(resolve, reject) {//两个参数方法浏览器实现
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});

promise.then(function(value) {//resolve时调用
  // success
}, function(error) {//reject时调用
  // failure
}).catch(function(error) {
  // 处理 promise 和 then回调函数运行时发生的错误
  console.log('发生错误！', error);
});
```

## Promise.all()

```javascript
var p = Promise.all([p1, p2, p3]);
//p1、p2、p3都是Promise对象的实例，如果不是，就会先调用Promise.resolve方法
//将参数转为Promise实例，再进一步处理
```

p的状态由p1、p2、p3决定，分成两种情况
1. 只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数
2. 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数

```javascript
// 生成一个Promise对象的数组
var promises = [2, 3, 5, 7, 11, 13].map(function (id) {
  return getJSON("/post/" + id + ".json");
});

Promise.all(promises).then(function (posts) {
  // ...
}).catch(function(reason){
  // ...
});
```

## Promise.race()

```javascript
var p = Promise.race([p1, p2, p3]);
//p1、p2、p3都是Promise对象的实例，如果不是，就会先调用Promise.resolve方法
//将参数转为Promise实例，再进一步处理
```

只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的Promise实例的返回值，就传递给p的回调函数
