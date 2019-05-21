---
title: "React 学习笔记"
date: 2016-06-01 16:58:04
lastmod: 2016-06-01 16:58:04
draft: false
keywords: ["react", "learn", "notes", "学习笔记"]
description: "React 学习笔记"
tags: ["React"]
categories: ["React"]
author: "ryan"

---

## 组件的生命周期

- Mounting：已插入真实 DOM
- Updating：正在被重新渲染
- Unmounting：已移出真实 DOM

React 为每个状态都提供了两种处理函数,**will** 函数在进入状态之前调用,**did** 函数在进入状态之后调用,三种状态共计五种处理函数。

- componentWillMount()
- componentDidMount()
- componentWillUpdate(object nextProps, object nextState)
- componentDidUpdate(object prevProps, object prevState)
- componentWillUnmount()

此外,React 还提供两种特殊状态的处理函数。

- componentWillReceiveProps(object nextProps)：已加载组件收到新的参数时调用
- shouldComponentUpdate(object nextProps, object nextState)：组件判断是否重新渲染时调用

## 组件的生命周期在不同状态下的执行顺序

- 当首次装载组件时，按顺序执行 getDefaultProps、getInitialState、componentWillMount、render 和 componentDidMount
- 当卸载组件时，执行 componentWillUnmount
- 当重新装载组件时，此时按顺序执行 getInitialState、componentWillMount、render 和 componentDidMount，但并不执行 getDefaultProps
- 当再次渲染组件时，组件接受到更新状态，此时按顺序执行 componentWillReceiveProps、shouldComponentUpdate、componentWillUpdate、render 和 componentDidUpdate

![](https://raw.githubusercontent.com/SirM2z/assets/master/component-life.png)

这些方法的[官方介绍](http://facebook.github.io/react/docs/component-specs.html#lifecycle-methods)

## 基本模板

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello React!</title>
    <script src="build/react.js"></script>
    <script src="build/react-dom.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"></script>
  </head>
  <body>
    <div id="example"></div>
    <script type="text/babel">
      ReactDOM.render(
        <h1>Hello, world!</h1>,
        document.getElementById('example')
      );
    </script>
  </body>
</html>
```

## 双向绑定

- onChange事件
```javascript
var NoLink = React.createClass({
  getInitialState: function() {
    return {message: 'Hello!'};
  },
  handleChange: function(event) {
    this.setState({message: event.target.value});
  },
  render: function() {
    var message = this.state.message;
    return <input type="text" value={message} onChange={this.handleChange} />;
  }
});
```

## 笔记

1. JSX 的基本语法规则:遇到 HTML 标签（以 < 开头）,就用 HTML 规则解析；遇到代码块（以 { 开头）,就用 JavaScript 规则解析
2. React.createClass 方法用于生成一个组件类,组件类的第一个字母必须大写
3. getInitialState:初始化方法,定义state
4. this.props:与组件的属性一一对应
5. this.props.children:表示组件的所有子节点
6. class 属性需要写成 className,for 属性需要写成 htmlFor
7. getDefaultProps:设置组件属性的默认值
8. this.refs.[refName]:获取真实的DOM节点
9. this.state.<状态变量名>:访问状态变量
10. this.setState方法:修改状态值
11. propTypes:{}:验证组件属性,配合isRequired,保证属性是必须的
12. mixins:[]:Mixins混合函数对象,抽取公用函数为对象,ES6语法不支持
13. es6语法class声明组件需要.bind(this):组件函数没有自动绑定到this,class的写法,元素上调用组件的函数,需要手动.bind(this)




## propTypes更多验证类型

```jsx
React.createClass({
  propTypes: {
    // You can declare that a prop is a specific JS primitive. By default, these
    // are all optional.
    optionalArray: React.PropTypes.array,
    optionalBool: React.PropTypes.bool,
    optionalFunc: React.PropTypes.func,
    optionalNumber: React.PropTypes.number,
    optionalObject: React.PropTypes.object,
    optionalString: React.PropTypes.string,
    // Anything that can be rendered: numbers, strings, elements or an array
    // (or fragment) containing these types.
    optionalNode: React.PropTypes.node,
    // A React element.
    optionalElement: React.PropTypes.element,
    // You can also declare that a prop is an instance of a class. This uses
    // JS's instanceof operator.
    optionalMessage: React.PropTypes.instanceOf(Message),
    // You can ensure that your prop is limited to specific values by treating
    // it as an enum.
    optionalEnum: React.PropTypes.oneOf(['News', 'Photos']),
    // An object that could be one of many types
    optionalUnion: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.instanceOf(Message)
    ]),
    // An array of a certain type
    optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),
    // An object with property values of a certain type
    optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),
    // An object taking on a particular shape
    optionalObjectWithShape: React.PropTypes.shape({
      color: React.PropTypes.string,
      fontSize: React.PropTypes.number
    }),
    // You can chain any of the above with `isRequired` to make sure a warning
    // is shown if the prop isn't provided.
    requiredFunc: React.PropTypes.func.isRequired,
    // A value of any data type
    requiredAny: React.PropTypes.any.isRequired,
    // You can also specify a custom validator. It should return an Error
    // object if the validation fails. Don't `console.warn` or throw, as this
    // won't work inside `oneOfType`.
    customProp: function(props, propName, componentName) {
      if (!/matchme/.test(props[propName])) {
        return new Error('Validation failed!');
      }
    }
  },
  /* ... */
});
```

## 参考

- [React 入门实例教程](http://www.ruanyifeng.com/blog/2015/03/react.html)
- [React 源码剖析系列 － 生命周期的管理艺术](https://zhuanlan.zhihu.com/p/20312691?refer=purerender)
- [React参考Blog](http://note.isongli.cn/blog/search/admin?keywords=react)
