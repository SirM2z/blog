---
title: "一步步实现 Promises/A+ 规范 -- 系列二 "
date: 2019-06-05 19:30:04
lastmod: 2019-06-05 19:30:04
draft: false
keywords: ["Promise"]
description: "一步步实现 Promises/A+ 规范 -- 系列二 "
tags: ["Promise"]
categories: ["Promise"]
author: "Ryan"
---

## 一步步实现 Promises/A+ 规范 -- 系列

- [系列一 -- 实现规范对状态以及部分 then 方法的要求](/post/2019/06/promise-a-achieve-1/)
- [系列二 -- 实现 then 链](/post/2019/06/promise-a-achieve-2/)
- [系列三 -- 实现 catch all resolve reject 方法](/post/2019/06/promise-a-achieve-3/)

## then 链实现

[上一篇文章](/post/2019/06/promise-a-achieve-1/)实现了 Promises/A+ 规范中对 `state` 的要求，以及部分 `then` 方法的要求，本篇文章将实现 `then` 链的调用逻辑

### then 方法要求 - 第 2 部分

![then 方法要求 - 第2部分](https://raw.githubusercontent.com/SirM2z/assets/master/20190604171323.png)

翻译：

6. `then` 方法可以被同一个 `promise` 对象调用多次
   1. 如果/当 `promise` 执行完成后，所有 `onFulfilled` 回调函数，必须按照其最初调用 `then` 的顺序依次执行
   2. 如果/当 `promise` 执行被拒绝后，所有 `onRejected` 回调函数，必须按照其最初调用 `then` 的顺序依次执行
7. `then` 方法必须返回一个 `promise` 对象（新的 `promise` 对象）
   ```js
   promise2 = promise1.then(onFulfilled, onRejected);
   ```
   1. 如果 `onFulfilled` 或者 `onRejected` 返回一个值 `x` ，运行 Promise Resolution Procedure `[[Resolve]](promise2, x)`
   2. 如果 `onFulfilled` 或者 `onRejected` 抛出一个异常 `e`，则 `promise2` 必须拒绝执行，并以 `e` 作为拒绝的原因
   3. 如果 `onFulfilled` 不是函数，并且 `promise1` 执行完成，`promise2` 必须成功完成并返回相同的值（`value`）
   4. 如果 `onRejected` 不是函数，并且 `promise1` 执行被拒绝，`promise2` 必须以相同的原因（`reason`）被拒绝执行

根据上述要求，验证 Promise 代码如下：
```js
const promise1 = new Promise((resolve, reject) => {
  resolve("success");
}).then(
  res => res + ' (promise res)'
).then(
  res => {throw new Error(res + ' (throw err)')},
  err => err + ' (self then err)',
);

const promise2 = promise1.then(
  res => res + ' (promise1 res)',
  err => err + ' (promise1 err)'
);

promise2.then(
  res => {
    console.log(res + ' (promise2 res)');
    console.log('比较', promise2 === promise1); // 验证是否是同一个 promise
  },
  err => {
    console.log(err + ' (promise2 err)');
  }
);
// 输出
// Error: success (promise res) (throw err) (promise1 err) (promise2 res)
// 比较 false
```
从输出可以看出 promise 的执行链：
```
new Promise
  => then 成功方法
  => then 成功方法（方法里抛出错误）
  => promise1.then 失败方法
  => promise2.then 成功方法
```
从执行链可以看出，每个 `then` 方法的 **执行结果** 以及 **执行过程是否出错** 影响了下一个 `then` 方法选择执行哪个参数，即（`onFulfilled` 或 `onRejected`）

首先修改 `then` 方法返回一个新的 `promise`，修改如下
```js
then(onFulfilled, onRejected) {
  return new Promise((resolve, reject) => {
    if (typeof onFulfilled === "function") {
      this.onFulfilledCallbacks.push(onFulfilled);
    }
    if (typeof onRejected === "function") {
      this.onRejectedCallbacks.push(onRejected);
    }
  })
}
```
简单修改后，就实现了链式调用的写法，目前还无法满足 `then` 链的顺序执行

怎么把它们关联起来呢？重点来了：

我们需要把新返回的 `promise` 中的两个参数（即 `resolve` 和 `reject`）的 **执行时机** 与当前 `then` 中两个方法（即 `onFulfilled` 和 `onRejected`）的 **执行结果** 串联起来。只有 `onFulfilled` 或者 `onRejected` 执行完毕，才可以调用 `resolve` 或 `reject`，通知下一个 `then` 方法可以执行。修改如下
```js
then(onFulfilled, onRejected) {
  return new Promise((resolve, reject) => {
    if (typeof onFulfilled === "function") {
      // 这里改为在当前的 回调数组 中加入一个匿名函数
      this.onFulfilledCallbacks.push(() => {
        // 执行完毕当前 then 的 onFulfilled 或 onRejected
        // 将结果传给 resolve 或 reject 改变状态
        try {
          const res = onFulfilled(this.value);
          resolve(res);
        } catch (error) {
          reject(error);
        }
      });
    }
    if (typeof onRejected === "function") {
      this.onRejectedCallbacks.push(() => {
        try {
          const res = onRejected(this.reason);
          resolve(res);
        } catch (error) {
          reject(error);
        }
      });
    }
  })
}
```
此时，就成功把所有 `then` 链串联了起来。但是这里边有个问题，即：当 `onFulfilled` 或者 `onRejected` 是一个异步函数时，是无法通过同步赋值拿到结果的。所以剩下的规范（即 2.3，可以看[官方规范](https://promisesaplus.com/)，后续不再翻译解释）定义了 `onFulfilled` 与 `onRejected` 不同返回值，应该如何处理。这里我们需要处理当 `onFulfilled` 与 `onRejected` 返回 `promise` 时的情况，修改如下
```js
then(onFulfilled, onRejected) {
  return new Promise((resolve, reject) => {
    if (typeof onFulfilled === "function") {
      this.onFulfilledCallbacks.push(() => {
        try {
          const res = onFulfilled(this.value);
          // 加上 promise 判断
          if (res instanceof Promise) {
            res.then(resolve, reject);
          } else {
            resolve(res);
          }
        } catch (error) {
          reject(error);
        }
      });
    }
    if (typeof onRejected === "function") {
      this.onRejectedCallbacks.push(() => {
        try {
          const res = onRejected(this.reason);
          // 加上 promise 判断
          if (res instanceof Promise) {
            res.then(resolve, reject);
          } else {
            resolve(res);
          }
        } catch (error) {
          reject(error);
        }
      });
    }
  })
}
```
所以在使用 `promise` 的 `then` 链过程中，我们要注意一点：当 `then` 链中的方法是异步方法时，我们需要返回一个 `promise` 供 `then` 链顺序调用剩下的方法

至此，整个 `then` 链调用逻辑实现完毕。[下一篇文章](/post/2019/06/promise-a-achieve-3/)将实现 `catch` `all` `resolve` `reject` 这些方法

