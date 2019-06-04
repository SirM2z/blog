---
title: "Webpack 学习笔记"
date: 2016-06-01 17:02:37
lastmod: 2016-06-01 17:02:37
draft: false
keywords: ["webpack", "learn", "notes", "学习笔记"]
description: "Webpack 学习笔记"
tags: ["Webpack"]
categories: ["Webpack"]
author: "Ryan"

---

## webpack.config.js配置文件

```javascript
var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');

var oldconfig = {
    entry: [//入口文件
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8080',//前两行浏览器自动刷新
      path.resolve(__dirname, 'app/main.js')
    ],
    output: {//出口文件
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
};

var config = {
    entry: ['webpack/hot/dev-server', path.resolve(__dirname, 'app/main.js')],
    resolve: {
        alias: {
            'react': pathToReact    //每当 "react" 在代码中被引入，它会使用压缩后的 React JS 文件，而不是到 node_modules 中找
        }
    },
    output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
    },
    module: {
    loaders: [{
        test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
        loader: 'babel' // 加载模块 "babel" 是 "babel-loader" 的缩写
    }, {
      test: /\.css$/, // Only .css files
      loader: 'style!css' // Run both loaders:css-loader会遍历 CSS 文件，然后找到 url() 表达式然后处理他们，style-loader 会把原来的 CSS 代码插入页面中的一个 style 标签中
    },
    // LESS
    {
      test: /\.less$/,
      loader: 'style!css!less'
    },
    // SASS
    {
      test: /\.scss$/,
      loader: 'style!css!sass'
    }, 
    //png&jpg
    {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=25000'//把需要转换的路径变成 BASE64 字符串, limit 参数是告诉它图片如果不大于 25KB 的话要自动在它从属的 css 文件中转成 BASE64 字符串
    }],
    noParse: [pathToReact]  //每当 Webpack 尝试去解析react压缩后的文件，阻止它
    }
};

// 通过在第一部分路径的依赖和解压
// 就是像你引用 node 模块一样引入到你的代码中
// 然后使用完整路径指向当前文件，然后确认 Webpack 不会尝试去解析它

var deps = [
  'react/dist/react.min.js',
  'react-router/dist/react-router.min.js',
  'moment/min/moment.min.js',
  'underscore/underscore-min.js',
];

deps.forEach(function (dep) {
  var depPath = path.resolve(node_modules_dir, dep);
  config.resolve.alias[dep.split(path.sep)[0]] = depPath;
  config.module.noParse.push(depPath);
});

module.exports = config;
```

## package.json

```json
{
  ...
  "scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server --devtool eval --progress --colors --hot --content-base build",
  },
  ...
  "devDependencies": {
    "babel-core": "^6.9.0",
    "babel-loader": "^6.2.4",
    "css-loader": "^0.23.1",
    "file-loader": "^0.8.5",
    "react-hot-loader": "^1.3.0",
    "style-loader": "^0.13.1",
    "url-loader": "^0.5.7",
    "webpack": "^1.13.1"
  },
  "dependencies": {
    "react": "^15.1.0",
    "webpack-dev-server": "^1.14.1"
  }
}
```

### dev中命令的含义

- webpack-dev-server - 在 localhost:8080 建立一个 Web 服务器
- --devtool eval - 为你的代码创建源地址。当有任何报错的时候可以让你更加精确地定位到文件和行号
- --progress - 显示合并代码进度
- --colors - Yay，命令行中显示颜色！
- --hot
- --content-base build - 指向设置的输出目录

## 热加载配置

### webpack.config.js

```javascript
module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './index'
  ],
  ...
  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ] : [
    new webpack.HotModuleReplacementPlugin()
  ],
}
```

### server.js 架设一个http服务器

```javascript
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }
  console.log('Listening at localhost:3000');
});
```
