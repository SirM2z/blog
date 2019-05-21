---
title: "ES6 学习笔记（四）-- 数值与数组"
date: 2016-06-01 20:02:40
lastmod: 2016-06-01 20:02:40
draft: false
keywords: ["ES6", "number", "array", "learn", "notes", "学习笔记"]
description: "ES6 学习笔记（四）-- 数值与数组"
tags: ["ES6"]
categories: ["ES6"]
author: "ryan"

---

# 数值的扩展

## Number.isFinite(), Number.isNaN()

与传统的全局方法isFinite()和isNaN()的区别在于，传统方法先调用Number()将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，非数值一律返回false

## Number.parseInt(), Number.parseFloat()

ES6将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变

# 数组的扩展

## Array.from()

- ```Array.from```方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）
- 实际应用中，常见的类似数组的对象是DOM操作返回的NodeList集合，以及函数内部的arguments对象。Array.from都可以将它们转为真正的数组

## Array.of()

- ```Array.of```方法用于将一组值，转换为数组,主要目的，是弥补数组构造函数Array()的不足

```javascript
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1

Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]
```

## 数组实例的copyWithin()

- 数组实例的copyWithin方法，在**当前数组**内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组

```javascript
Array.prototype.copyWithin(target, start = 0, end = this.length)
```

- target（必需）：从该位置开始替换数据
- start（可选）：从该位置开始读取数据，默认为0。如果为负值，表示倒数
- end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数

```javascript
[1, 2, 3, 4, 5].copyWithin(0, 3)
// [4, 5, 3, 4, 5]

// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
// [4, 2, 3, 4, 5]

// -2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)
// [4, 2, 3, 4, 5]
```

## 数组实例的find()和findIndex()

```javascript
//find方法，用于找出第一个符合条件的数组成员,没有则返回undefined
Array.prototype.find(function(value, index, arr) {//当前值，当前位置，原数组
  return value > 9;
})

//findIndex方法,返回第一个符合条件的数组成员的位置,没有则返回-1
Array.prototype.findIndex(function(value, index, arr) {//当前值，当前位置，原数组
  return value > 9;
})
```

## 数组实例的fill()

- 用于填充数组

```javascript
['a', 'b', 'c'].fill(7)
// [7, 7, 7]

['a', 'b', 'c'].fill(7, 1, 2)//填充值，开始位置，结束位置
// ['a', 7, 'c']
```

## 数组实例的entries()，keys()和values()，都是遍历方法

```javascript
for (let index of ['a', 'b'].keys()) {//遍历键名
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {//遍历键值
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {//遍历键值对
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```

## 数组的空位

- 空位指：数组的某一个位置没有任何值，空位不是undefined

```javascript
0 in [undefined, undefined, undefined] // true 0位置有值
0 in [, , ,] // false 0位置没值
```

### ES5对空位的处理

- forEach(), filter(), every() 和some()都会跳过空位
- map()会跳过空位，但会保留这个值
- join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串


# ES5中的常用数组方法

- ```concat()```连接两个或更多的数组，并返回结果
- ```join()```把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔
- ```pop()```删除并返回数组的最后一个元素
- ```push()```向数组的末尾添加一个或更多元素，并返回新的长度
- ```reverse()```颠倒数组中元素的顺序
- ```shift()```删除并返回数组的第一个元素
- ```slice(start,end)```从某个已有的数组返回选定的元素
  - start:必需,规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置
  - end:可选,规定从何处结束选取。该参数是数组片断结束处的数组下标。如果没有指定该参数，那么切分的数组包含从 start 到数组结束的所有元素。如果这个参数是负数，那么它规定的是从数组尾部开始算起的元素
- ```sort(sortby)```对数组的元素进行排序,sortby可选，但必须是函数
- ```splice(index,howmany,item1,.....,itemX)```删除元素，并向数组添加新元素
  - index:必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置
  - howmany:必需。要删除的项目数量。如果设置为 0，则不会删除项目
  - item1,.....,itemX:可选。向数组添加的新项目
- ```unshift()```向数组的开头添加一个或更多元素，并返回新的长度
