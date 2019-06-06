---
title: "一步步实现 Promises/A+ 规范 -- 系列三 "
date: 2019-06-05 20:44:04
lastmod: 2019-06-05 20:44:04
draft: false
keywords: ["Promise"]
description: "一步步实现 Promises/A+ 规范 -- 系列三 "
tags: ["Promise"]
categories: ["Promise"]
author: "Ryan"
---

## 一步步实现 Promises/A+ 规范 -- 系列

- [系列一 -- 实现规范对状态以及部分 then 方法的要求](/post/2019/06/promise-a-achieve-1/)
- [系列二 -- 实现 then 链](/post/2019/06/promise-a-achieve-2/)
- [系列三 -- 实现 catch all resolve reject 方法](/post/2019/06/promise-a-achieve-3/)

## catch 实现

[上一篇文章](/post/2019/06/promise-a-achieve-2/)实现了 Promises/A+ 规范中对 `then` 方法的要求，实现了 `then` 链的调用逻辑。本篇文章将实现 `catch` 方法、`all` 方法、`resolve` 方法、`reject` 方法

### then 链的缺失参数调用

首先验证如下代码
```js
new Promise((resolve, reject) => {
  resolve("success");
}).then(
  res => res + ' (promise res)',
).then(
  null, // 未传成功回调
  err => err + ' (self then err)',
).then(
  res => console.log(res),
  err => console.log(err)
)
// 输出
// success (promise res)
```
由此看出不传参数不影响后续调用，且把之前的结果传递给后续方法。修改 then 方法如下
```js
then(onFulfilled, onRejected) {
  return new Promise((resolve, reject) => {
    // onFulfilled 不是 function 时设置默认方法
    if (typeof onFulfilled !== "function") {
      onFulfilled = res => res;
    }
    this.onFulfilledCallbacks.push(() => {
      try {
        const res = onFulfilled(this.value);
        if (res instanceof Promise) {
          res.then(resolve, reject);
        } else {
          resolve(res);
        }
      } catch (error) {
        reject(error);
      }
    });
    // onRejected 不是 function 时设置默认方法
    if (typeof onRejected !== "function") {
      onRejected = err => {
        throw new Error(err instanceof Error ? err.message : err);
      };
    }
    this.onRejectedCallbacks.push(() => {
      try {
        const res = onRejected(this.reason);
        if (res instanceof Promise) {
          res.then(resolve, reject);
        } else {
          resolve(res);
        }
      } catch (error) {
        reject(error);
      }
    });
  })
}
```

### catch 实现原理

`catch` 的实现其实就是 `then` 方法没有传第一个参数，只传了第二个参数，这也就是为什么需要先实现上边的逻辑。具体实现：

```js
catch(onRejected) {
  return this.then(null, onRejected);
}
```

## Promise.all() 实现

- `Promise.all` 接收一个 `promise` 对象的数组作为参数
- 当这个数组里的所有 `promise` 对象全部变为 `resolve`,则执行 `then` 中的 `onFulfilled`
    - onFulfilled 方法接收一个数组作为参数，这个数组即 `promise` 对象数组的所有结果，顺序保持一致
- 有一个变为 `reject` ，则执行 `then` 中的 `onRejected`

```js
// 验证代码一
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(100);
  }, 1000)
})
const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(200);
  }, 500)
})
Promise.all([promise1, promise2]).then(
  res => console.log(res)
)
// 输出 [ 100, 200 ] 顺序与传入相同
// -----------------
// 验证代码二
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(100);
  }, 1000)
})
const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(200);
  }, 500)
})
Promise.all([promise1, promise2]).then(
  res => console.log(res),
  err => console.log(err)
)
// 输出 200
```
### 返回一个 promise

`all` 方法需要和 `then` 方法一样返回一个 `promise`，但 `all` 方法属于类中的静态方法，其调用方式是直接通过类来调用：`Promise.all()`，代码实现
```js
static all(promiseAry = []) {
  return new Promise((resolve, reject) => {
  })
}
```
返回一个 `prmise` 后，该方法就可以链式调用

### 监控所有 promise 执行状态

每一个 promise 实例的状态可以通过添加 then 方法进行判断，实现如下
```js
static all(promiseAry = []) {
  return new Promise((resolve, reject) => {
    // 记录 promise 完成个数
    let finishNum = 0;
    // 返回结果
    let result = [];
    const len = promiseAry.length;
    for (let i = 0; i < len; i++) {
      // 对每一个 promise 实例增加 then 方法，监控状态
      promiseAry[i].then(val => {
        finishNum++;
        result[i] = val; // 保证结果与传入顺序一致
        if (finishNum === len) {
          resolve(result);
        }
      }, reject)
    }
  })
}
```

## Promise.resolve() 实现

```js
static resolve(arg) {
  return new Promise(function(resolve){
    resolve(arg);
  });
}
```

## Promise.reject() 实现

```js
static reject(arg) {
  return new Promise(function(resolve, reject){
    reject(arg);
  });
}
```

到此，就实现了 Promise/A+ 规范，可查看[源码](https://gist.github.com/SirM2z/130a4e6281e0f602047e934c538490b5)
