---
title: "你不知道的 JS 读书笔记（四）-- 混合对象类"
date: 2017-11-22 22:56:16
lastmod: 2017-11-22 22:56:16
draft: false
keywords: ["javascript", "you-dont-know-js", "你不知道的JS", "notes", "读书笔记", "混合对象类"]
description: "你不知道的 JS 读书笔记（四）-- 混合对象类"
tags: ["JavaScript"]
categories: ["JavaScript"]
author: "Ryan"

---

## 寄生继承

```javascript
//“传统的 JavaScript 类” Vehicle
function Vehicle() {
  this.ehgines = 1;
}
Vehicle.prototype.ignition = function() {
  console.log( "Turning on my engine." );
};
Vehicle.prototype.drive = function() {
  this.ignition();
  console.log( "Steering and moving forward!" );
};

//“寄生类” Car
function Car() {
// 首先， car 是一个 Vehicle
var car = new Vehicle();
  // 接着我们对 car 进行定制
  car.wheels = 4;

  // 保存到 Vehicle::drive() 的特殊引用
  var vehDrive = car.drive;

  // 重写 Vehicle::drive()
  car.drive = function() {
    vehDrive.call( this );
    console.log("Rolling on all " + this.wheels + " wheels!"
  );
  return car;
}
var myCar = new Car(); // var myCay = Car(); 更好，避免创建并丢弃多余的对象
myCar.drive()
// "Turning on my engine."
// "Steering and moving forward!"
// "Rolling on all 4 wheels!"
```

## 小结

> 传统的类被实例化时， 它的行为会被复制到实例中。 类被继承时， 行为也会被复制到子类中。
>
> 多态（在继承链的不同层次名称相同但是功能不同的函数） 看起来似乎是从子类引用父类， 但是本质上引用的其实是复制的结果。
>
> JavaScript 并不会（像类那样） 自动创建对象的副本。
