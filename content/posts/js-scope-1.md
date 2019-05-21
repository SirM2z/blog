---
title: "浅析 JavaScript 作用域链"
date: 2016-01-10 20:40:18
lastmod: 2016-01-10 20:40:18
draft: false
keywords: ["js", "javascript", "scope", "作用域"]
description: "浅析 JavaScript 作用域链"
tags: ["JavaScript"]
categories: ["JavaScript"]
author: "ryan"

---

之前看了《javascript高级程序设计》第三版，一直想想总结一下，但是由于拖延症而一推再推，今天终于开工啦，希望自己以后能够更加勤快一点。当然都是我的个人理解，如有不对，欢迎指出。

# 作用域链

首先总结一下作用域链的问题，说到JavaScript的作用域链，就要提一下那句老生常谈的话

> JavaScript是没有块级作用域的

那么，javascript这门语言是如何面对变量命名以及使用的问题呢？

## 函数作用域

是的，JavaScript中是以函数为一个单位，它不像c那样是以‘{}’大括号为边界的。js中一个function即会生成一个作用域，最顶级的作用域也就是我们所说的全局变量所在的作用域，它在浏览器环境中就是window对象，在nodejs环境中是global对象，当我们在这层作用域用var或function声明一个变量或函数，那么这个变量或函数就会成为顶级作用域的一个属性。

```js
var a=0;
console.log(window.a); //=>0(浏览器环境)
```

理解了顶级作用域，然后说一下函数作用域。之前说了js是以函数为单位的，所以当我们在一个函数内声明一个变量后，那么这个变量只有在这个函数内部可以访问，它的上层作用域是访问不到的。

```js
function foo(){
	var tmp=1;
	console.log(tmp);
}
foo(); //=>1
console.log(tmp); //Uncaught ReferenceError: tmp is not defined
```

那么函数作用域内可以访问上层作用域的变量吗？

```js
var tmp=1;
function foo(){
	console.log(tmp);
}
foo(); //=>1	我们发现是可以访问到的
```

那么总结起来就是：js以函数为一个单位，并伴随函数的声明生成一个作用域挂在上层作用域上，作为它的属性，而内部作用域可以访问外部作用域的变量，但是外部作用域不能访问内部的变量。理解了函数作用域后，那么如果出现函数内的变量名与上层作用域内的变量名一样的情况的话，会是什么情况呢？

```js
var global="global";
function foo(){
	var global="local";
	console.log(global)；
}
foo(); //=>local
console.log(global) =>global
```

总结：我们发现，当变量名冲突时，js会以自身所在作用域内的变量为准。可以理解为，当js需要解析一个变量时，首先会在当前作用域内查找该变量，如果找到，则使用该变量，如果没有找到，则向上层作用域内查找，然后按照这个逻辑往上查找，直到查找到顶级作用域的属性上（也就是全局变量），若还未找到，则抛出异常。

说到这里，下篇打算总结一下原型链的问题，同样都是链，但这两个链往上追朔的顶点是不一样的，而且理解了原型链之后，那么JavaScript中那些继承的问题应该也就差不多理解了。

关于原型链的个人理解已发布，如有兴趣，请移步[浅析JavaScript原型链](/post/js-scope-extend)

### 参考

- 《JavaScript权威指南》
- 《JavaScript高级程序设计》第三版
