---
title: "ES6 学习笔记（三）-- 字符串扩展"
date: 2016-06-01 20:02:39
lastmod: 2016-06-01 20:02:39
draft: false
keywords: ["ES6", "字符串扩展", "learn", "notes", "学习笔记"]
description: "ES6 学习笔记（三）-- 字符串扩展"
tags: ["ES6"]
categories: ["ES6"]
author: "ryan"

---

# 字符串扩展

## for...of循环遍历字符串

```javascript
let text = 'abc'
for (let i of text) {
  console.log(i);
}
//a
//b
//c
```

## 新增确定一个字符串是否包含在另一个字符串中，es5中只有`indexOf`

- includes()：返回布尔值，表示是否找到了参数字符串
- startsWith()：返回布尔值，表示参数字符串是否在源字符串的头部
- endsWith()：返回布尔值，表示参数字符串是否在源字符串的尾部

```javascript
var s = 'Hello world!';

s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true

//三个方法都支持第二个参数，表示开始搜索的位置
s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true  向前搜索
s.includes('Hello', 6) // false
```

## repeat() 返回一个新字符串，表示将原字符串重复n次

```javascript
'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""
```

## padStart()，padEnd() 补全长度

第一个参数用来指定字符串的最小长度，第二个参数是用来补全的字符串

```javascript
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'

//原字符串的长度，等于或大于指定的最小长度，则返回原字符串
'xxx'.padStart(2, 'ab') // 'xxx'
'xxx'.padEnd(2, 'ab') // 'xxx'

//补全的字符串与原字符串，两者的长度之和超过了指定的最小长度，则会截去超出位数的补全字符串
'abc'.padStart(10, '0123456789')// '0123456abc'

//省略第二个参数，则会用空格补全长度
'x'.padStart(4) // '   x'
'x'.padEnd(4) // 'x   '
```

## 模板字符串

传统的JavaScript语言，输出摸板通常是这样的
```javascript
$("#result").append(
  "There are <b>" + basket.count + "</b> " +
  "items in your basket, " +
  "<em>" + basket.onSale +
  "</em> are on sale!"
);
```
ES6引入了模板字符串
```javascript
$("#result").append(`
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`);
```
常用写法
```javascript
// 普通字符串
`In JavaScript '\n' is a line-feed.`

// 多行字符串
`In JavaScript this is
 not legal.`

console.log(`string text line 1
string text line 2`);

// 字符串中嵌入变量
var name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`
```
模板字符串中嵌入变量，需要将变量名写在${}之中,${}可以看作javascript的运行环境，因此还可以写方法调用等js代码

# ES5中的常用字符串方法

- `toUpperCase()`把一个字符串全部变为大写
- `toLowerCase()`把一个字符串全部变为小写
- `indexOf()`会搜索指定字符串出现的位置
- `substring()`返回指定索引区间的子串

```javascript
var s = 'hello, world'
s.substring(0, 5); // 从索引0开始到5（不包括5），返回'hello'
s.substring(7); // 从索引7开始到结束，返回'world'
```
- `split()`把字符串分割为字符串数组
- `replace()`替换与正则表达式匹配的子串
- `search()`检索与正则表达式相匹配的值
