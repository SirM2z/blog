---
title: "Redux 学习笔记"
date: 2016-06-01 17:01:08
lastmod: 2016-06-01 17:01:08
draft: false
keywords: ["react", "redux", "learn", "notes", "学习笔记"]
description: "Redux 学习笔记"
tags: ["Redux"]
categories: ["Redux"]
author: "Ryan"

---

## redux流程

1. view直接触发dispatch
2. 将action发送到reducer中后，根节点上会更新props，改变全局view

## redux概念理解

### store相关

- redux中的store是通过createStore方法创建的，该方法接收两个参数**reducer函数**和**初始化的数据(currentState)**，从而形成一颗状态树
- createStore方法调用时传入的reducer方法会在store的dispatch被调用的时候，被调用，接收store中的state和action，根据业务逻辑（即reducer方法）返回新的state
- store含有四个方法，```subscribe```、```dispatch```、```getState```和```replaceReducer```
    1. ```subscribe```:接收一个回调(listener)，当dispatch触发时，执行reducer函数去修改当前数据(currentState)，并执行subscribe传入的回调函数(listener)
    2. ```dispatch```:分发 action。这是触发 state 变化的惟一途径
    3. ```getState```:返回应用当前的 state 树
    4. ```replaceReducer```:替换 store 当前用来计算 state 的 reducer,不常用

> 可参考[官方文档（翻译版）](http://cn.redux.js.org/docs/api/index.html)

## react-redux概念理解

1. 提供Provider组件，可以将从createStore返回的store放入context中，使子集可以获取到store并进行操作
```javascript
<Provider store={store}>
    <App />
</Provider>
```
2. 提供connect方法
    - 将原始根节点包装在Connect下，在Connect中的state存储不可变对象，并将state对象中的props和store中的dispatch函数传递给原始根节点。
    - Connect在componentDidMount中，给store添加listener方法(handleChange)，每当store中的dispatch被调用时执行handleChange；handleChange会去修改state中的porps，使原始根节点重新render
    - 方法调用```connect(mapStateToProps, mapDispatchToProps, mergeToProps)(App);```
        1. mapStateToProps:定义该参数，组件将会监听 Redux store 的变化,接收store中state和props，使页面可以根据当前的store中state和props返回新的**stateProps**
        2. mapDispatchToProps:接收store中的dispatch和props，使页面可以复写dispatch方法，返回新的**dispatchProps**
        3. mergeToProps:将前两个方法参数的执行结果和组件自身的 props 传入到这个回调函数中。该回调函数返回的对象将作为 props 传递到被包装的组件中
        
    > 可参考[官方文档（翻译版）](http://cn.redux.js.org/docs/react-redux/api.html)
    
3. Middleware理解
    - 文档中的例子
        ```javascript
        const createStoreWithMiddleware = applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )(createStore);
        store = createStoreWithMiddleware(rootReducer, initialState);
        ```
    - 可以看作```middleware1(middleware2(middleware3(store.dispatch)))(action)```，因此每个middleware中的next是一个接收action的函数(middleware定义时有体现)，在最后一个middleware中，next函数就是store.dispatch，这样action就在middleware中传递下去


## 问题

1. 更新机制，测试应用中，store状态更新后，整个组件全部更新,难道每个组件都需要自己写shouldComponentUpdate方法吗？
2. 与react-router结合的用法

## 参考

> [这段时间研究了下Redux，写写自己对它的感觉](http://react-china.org/t/redux/2687)

> [redux middleware 详解](https://zhuanlan.zhihu.com/p/20597452?refer=purerender)
