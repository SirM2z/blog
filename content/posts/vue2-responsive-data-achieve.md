---
title: "Vue2.x响应式原理， Vue 与 React 响应式简单对比"
date: 2017-05-04 20:22:37
lastmod: 2017-05-04 20:22:37
draft: false
keywords: ["Vue", "响应式原理实现", "Vue 与 React 响应式简单对比"]
description: "Vue2.x响应式原理， Vue 与 React 响应式简单对比"
tags: ["Vue"]
categories: ["Vue"]
author: "Ryan"

---

## 实现的最终目标

```js
const demo = new Vue({
  data: {
    text: "before",
  },
  // 对应的template 为 <div><span>{{text}}</span></div>
  render(h){
    return h('div', {}, [
      h('span', {}, [this.__toString__(this.text)])
    ])
  }
})
setTimeout(function(){
  demo.text = "after"
}, 3000)
```

对应的虚拟DOM会从
```html
<div><span>before</span></div> 
```
变成
```html
 <div><span>after</span></div>
```

## 第一步,监听data下边的所有属性，转换为响应式

### 思路

- 当data下的某个属性变化时，如何触发相应的函数？

方案：ES5中新添加了一个方法:[Object.defineProperty]()，通过这个方法，可以自定义`getter`和`setter`函数，那么在获取对象属性或者设置对象属性时就能够执行相应的回调函数

![Object.defineProperty MDN](https://raw.githubusercontent.com/SirM2z/assets/master/object_defineProperty_mdn.png)

代码如下：

```js
class Vue {
  constructor(options) {
    this.$options = options
    this._data = options.data
    observer(options.data, this._update.bind(this))
    this._update()
  }
  _update(){
    this.$options.render()
  }
}

function observer(obj, cb) {
  Object.keys(obj).forEach((key) => {
    defineReactive(obj, key, obj[key], cb)
  })
}

function defineReactive(obj, key, val, cb) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: () => {
      console.log('你访问了' + key)
      return val
    },
    set: newVal => {
      if (newVal === val)
        return
      console.log('你设置了' + key)
      console.log('新的' + key + ' = ' + newVal)
      val = newVal
      cb()
    }
  })
}

var demo1 = new Vue({
  el: '#demo',
  data: {
    text: "before"
  },
  render(){
    console.log("我要render了")
  }
})
```

- 引发了第二个问题，如果`data`中的属性是一个对象还能触发我们的回掉函数么？比如说下边的demo

```js
var demo2 = new Vue({
  el: '#demo',
  data: {
    text: "before",
    o: {
      text: "o-before"
    }
  },
  render(){
    console.log("我要render了")
  }
})
```

方案：用递归完善上边的响应式，需要在它开始对属性进行响应式转换的时候，前边加个判断，即如下

```js
function observer(obj) {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object') {
      new observer(obj[key], cb)
    }
    defineReactive(obj, key, obj[key])
  })
}
```

- 实际写的过程中发现调用data的属性时需要这样写`demo._data.text`，肯定是没有`demo.text`这样写来的方便，所以就需要加一层代理进行转换

代码如下：

```js
  _proxy(key) {
    const self = this
    Object.defineProperty(self, key, {
      configurable: true,
      enumerable: true,
      get: function proxyGetter() {
        return self._data[key]
      },
      set: function proxySetter(val) {
        self._data[key] = val
      }
    })
  }
```

然后在构造函数中加上这么一句话

```js
Object.keys(options.data).forEach(key => this._proxy(key))
```

到此，我们的`data`属性已经变为响应式的了，只要`data`的属性发生变化，那么就会触发`render`函数。这也是为什么只有vue组件中的`data`属性才是响应式的，其他地方声明的值均不是响应式的原因。但是这里有个问题，即触发`render`函数的准确度问题！

## 第二步，解决准确度问题，引出虚拟dom

比如下边的demo

```js
new Vue({
  template: `
    <div>
      <span>name:</span> {{name}}
    <div>`,
  data: {
    name: 'js',
    age: 24
  }
})

setTimeout(function(){
  demo.age = 25
}, 3000)
```

`template`中只用到了`data`中的`name`属性，但是当修改`age`属性的时候，会不会触发渲染呢？答案是：会。但实际是不需要触发渲染机制的

解决这个问题，先要简单说下虚拟dom。vue有两种写法：

```js
// template模板写法（最常用的）
new Vue({
  data: {
    text: "before",
  },
  template: `
    <div>
      <span>text:</span> {{text}}
    </div>`
})

// render函数写法，类似react的jsx写法
new Vue({
  data: {
    text: "before",
  },
  render (h) {
    return (
      <div>
        <span>text:</span> {{text}}
      </div>
    )
  }
})
```

由于vue2.x引入了虚拟dom的原因，这两种写法最终都会被解析成虚拟dom，但在这之前，他们会先被解析函数转换成同一种表达方式，即如下：

```js
new Vue({
  data: {
    text: "before",
  },
  render(){
    return this.__h__('div', {}, [
      this.__h__('span', {}, [this.__toString__(this.text)])
    ])
  }
})
```

透过上边的`render`函数中的`this.__h__`方法，可以简单了解下虚拟dom

```js
function VNode(tag, data, children, text) {
  return {
    tag: tag, // html标签名
    data: data, // 包含诸如 class 和 style 这些标签上的属性
    children: children, // 子节点
    text: text // 文本节点
  }
}
```

写一个简单的虚拟dom：

```js
function VNode(tag, data, children, text) {
  return {
    tag: tag,
    data: data,
    children: children,
    text: text
  }
}

class Vue {
  constructor(options) {
    this.$options = options
    const vdom = this._update()
    console.log(vdom)
  }
  _update() {
    return this._render.call(this)
  }
  _render() {
    const vnode = this.$options.render.call(this)
    return vnode
  }
  __h__(tag, attr, children) {
    return VNode(tag, attr, children.map((child)=>{
      if(typeof child === 'string'){
        return VNode(undefined, undefined, undefined, child)
      }else{
        return child
      }
    }))
  }
  __toString__(val) {
    return val == null ? '' : typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val);
  }
}

var demo = new Vue({
  el: '#demo',
  data: {
    text: "before",
  },
  render(){
    return this.__h__('div', {}, [
      this.__h__('span', {}, [this.__toString__(this.text)])
    ])
  }
})
```

to do

回头看问题，也就是说，我需要知道`render`函数中依赖了`data`中的哪些属性，只有这些属性变化，才需要去触发`render`函数

## 第三步，依赖收集，准确渲染

思路：在这之前，我们已经把`data`中的属性改成响应式了，当去获取或者修改这些变量时便能够触发相应函数。那这里就可以利用这个相应的函数做些手脚了。当声明一个vue对象时，在执行`render`函数获取虚拟dom的这个过程中，已经对`render`中依赖的`data`属性进行了一次获取操作，这次获取操作便可以拿到所有依赖。

其实不仅是`render`，任何一个变量的改别，是因为别的变量改变引起(观察者模式)，都可以用上述方法，也就是`computed`和`watch`的原理

首先需要写一个依赖收集的类，每一个`data`中的属性都有可能被依赖，因此每个属性在响应式转化（`defineReactive`）的时候，就初始化它。代码如下：

```js
class Dep {
  constructor() {
    this.subs = []
  }
  add(cb) {
    this.subs.push(cb)
  }
  notify() {
    console.log(this.subs)
    this.subs.forEach((cb) => cb())
  }
}

function defineReactive(obj, key, val, cb) {
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    // 省略
  })
}
```

那么执行过程就是:
- 当执行`render`函数的时候，依赖到的变量的`get`就会被执行，然后就把这个 `render`函数加到`subs`里面去。
- 当`set`的时候,就执行`notify`，将所有的`subs`数组里的函数执行，其中就包含`render`的执行。

> 注：代码中有一个`Dep.target`值，这个值时用来区分是普通的`get`还是收集依赖时的`get`

最后完整代码如下：

```js
function VNode(tag, data, children, text) {
  return {
    tag: tag,
    data: data,
    children: children,
    text: text
  }
}

class Vue {
  constructor(options) {
    this.$options = options
    this._data = options.data
    Object.keys(options.data).forEach(key => this._proxy(key))
    observer(options.data)
    const vdom = watch(this, this._render.bind(this), this._update.bind(this))
    console.log(vdom)
  }
  _proxy(key) {
    const self = this
    Object.defineProperty(self, key, {
      configurable: true,
      enumerable: true,
      get: function proxyGetter() {
        return self._data[key]
      },
      set: function proxySetter(val) {
        self._data[key] = val
      }
    })
  }
  _update() {
    console.log("我需要更新");
    const vdom = this._render.call(this)
    console.log(vdom);
  }
  _render() {
    return this.$options.render.call(this)
  }
  __h__(tag, attr, children) {
    return VNode(tag, attr, children.map((child) => {
      if (typeof child === 'string') {
        return VNode(undefined, undefined, undefined, child)
      } else {
        return child
      }
    }))
  }
  __toString__(val) {
    return val == null ? '' : typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val);
  }
}

function observer(obj) {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object') {
      new observer(obj[key])
    }
    defineReactive(obj, key, obj[key])
  })
}

function defineReactive(obj, key, val) {
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: () => {
      if (Dep.target) {
        dep.add(Dep.target)
        Dep.target = null
      }
      console.log('你访问了' + key)
      return val
    },
    set: newVal => {
      if (newVal === val)
        return
      console.log('你设置了' + key)
      console.log('新的' + key + ' = ' + newVal)
      val = newVal
      dep.notify()
    }
  })
}

function watch(vm, exp, cb) {
  Dep.target = cb
  return exp()
}

class Dep {
  constructor() {
    this.subs = []
  }
  add(cb) {
    this.subs.push(cb)
  }
  notify() {
    this.subs.forEach((cb) => cb())
  }
}
Dep.target = null


var demo = new Vue({
  el: '#demo',
  data: {
    text: "before",
    test: {
      a: '1'
    },
    t: 1
  },
  render() {
    return this.__h__('div', {}, [
      this.__h__('span', {}, [this.__toString__(this.text)]),
      this.__h__('span', {}, [this.__toString__(this.test.a)])
    ])
  }
})
```

## vue react响应式简单对比

综上发现，利用`Object.defineProperty`这个特性可以精确的写出订阅发布模式，从这点来说，`vue`是优于`react`的，在没经过优化之前，`vue`的渲染机制一定是比`react`更加准确的，为了验证这一说法，我用两个框架同时写了两个相同的简单项目进行对比。

没有对比就没有伤害：

- react项目地址：http://sirm2z.github.io/a_project/react-vue-test/react/index.html
  ![react结果](https://raw.githubusercontent.com/SirM2z/assets/master/react.gif)
- vue项目地址：http://sirm2z.github.io/a_project/react-vue-test/vue/index.html
  ![vue结果](https://raw.githubusercontent.com/SirM2z/assets/master/vue.gif)

通过对比发现，`react`在正常使用的过程中产生了多余的渲染，在移动端或者组件嵌套非常深的情况下会产生非常大的性能消耗，因此在使用`react`的过程中，写好`react`生命周期中的`shouldComponentUpdate`是非常重要的！
