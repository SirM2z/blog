---
title: "你不知道的 JS 读书笔记（二）-- 闭包/模块"
date: 2017-11-22 22:54:16
lastmod: 2017-11-22 22:54:16
draft: false
keywords: ["javascript", "you-dont-know-js", "你不知道的JS", "notes", "读书笔记", "闭包", "模块"]
description: "你不知道的 JS 读书笔记（二）-- 闭包/模块"
tags: ["JavaScript"]
categories: ["JavaScript"]
author: "ryan"

---

## 闭包的效果

```javascript
function foo () {
  var a = 2;

  function bar () {
    console.log(a);
  }

  return bar;
}

var baz = foo()

baz() // 2
```

## 循环与闭包

```javascript
for (var i = 0; i < 5; i++) {
  (function (j) {
    setTimeout(function timer () {
      console.log(j);
    }, j*1000)
  })(i)
}

// 等同于

for (let i = 0; i < 5; i++) {
  setTimeout(function timer () {
    console.log(i);
  }, i*1000)
}
```

## 模块机制

```javascript
// 模块管理器
var MyModules = (function Manager() {
  var modules = {};

  function define(name, deps, impl) {
    // 遍历依赖模块列表
    for (var i=0; i<deps.length; i++) {
      deps[i] = modules[deps[i]];
    }
    // 将依赖模块作为参数 传入模块方法
    modules[name] = impl.apply( impl, deps );
  }

  function get(name) {
    return modules[name];
  }

  return {
    define: define,
    get: get
  };
})();

// 定义模块 "bar"
MyModules.define( "bar", [], function() {
  function hello(who) {
    return "Let me introduce: " + who;
  }

  return {
    hello: hello
  };
});

// 定义模块 "foo" 且依赖模块 "bar"
MyModules.define( "foo", ["bar"], function(bar) {
  var hungry = "hippo";
  function awesome() {
    console.log( bar.hello( hungry ).toUpperCase() );
  }

  return {
    awesome: awesome
  };
});

// 使用
var bar = MyModules.get( "bar" );
var foo = MyModules.get( "foo" );
console.log(
  bar.hello( "hippo" )
); // Let me introduce: hippo
foo.awesome(); // LET ME INTRODUCE: HIPPO
```

## this 与 箭头函数

```js
var obj = {
  id: "awesome",
  cool: function coolFn() {
    console.log( this.id );
  }
};
obj.cool(); // "awesome"
var id = "not awesome"
setTimeout( obj.cool, 100 ); // "not awesome"

// 参数 隐式赋值，丢失上下文
// 原因分析 setTimeout 中传递方法 解析为如下格式，无关乎调用问题
setTimeout(function coolFn(){
  // ...
}, 100)
```
