---
title: "ES6 学习笔记（八）-- class"
date: 2016-06-01 20:02:44
lastmod: 2016-06-01 20:02:44
draft: false
keywords: ["ES6", "class", "learn", "notes", "学习笔记"]
description: "ES6 学习笔记（八）-- class"
tags: ["ES6"]
categories: ["ES6"]
author: "ryan"

---

# class

## 基本语法

```javascript
//ES5
function Point(x,y){
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

//ES6
class Point {
  //constructor是类的默认方法，通过new命令生成对象实例时，自动调用该方法
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {//定义在类的prototype属性上面
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```

## class的继承

```javascript
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}
```

子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工
