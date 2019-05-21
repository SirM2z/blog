---
title: "css3 学习笔记（五） 媒体查询与响应式"
date: 2015-05-25 20:18:53
lastmod: 2015-05-25 20:18:53
draft: false
keywords: ["css3", "媒体查询", "响应式", "learn", "notes", "学习笔记"]
description: "css3 学习笔记（五） 媒体查询与响应式"
tags: ["CSS3"]
categories: ["CSS3"]
author: "ryan"

---

# 媒体类型

其中 `Screen`、 `All` 和 `Print` 为最常见的三种媒体类型。

| 值           | 设备类型                                 |
| :-----------:| :-------------------------------------: |
| All          | 所有设备                                 |
| Braille      | 盲人用点字法触觉回馈设备                    |
| Embossed     | 盲文打印机                               |
| Handheld     | 便携设备                                 |
| Print        | 打印用纸或打印预览视图                     |
| Projection   | 各种投影设备                             |
| Screen       | 电脑显示器                               |
| Speech       | 语音或音频合成器                          |
| Tv           | 电视机类型设备                           |
| Tty          | 使用固定密度字母栅格的媒介，比如电传打字机和终端 |

## 媒体类型引用方法

```html
<link rel="stylesheet" type="text/css" href="style.css" media="screen" />
```

# 媒体查询

## 最大宽度

```css
@media screen and (max-width:480px){
 .ads {
   display:none;
  }
}/*当屏幕小于或等于480px时,页面中的广告区块（.ads）都将被隐藏*/
```

## 最小宽度

```css
@media screen and (min-width:600px) and (max-width:900px){
  body {background-color:#f5f5f5;}
}/*当屏幕在600px~900px之间时，body的背景色渲染为“#f5f5f5*/
```

## 设备屏幕的输出宽度Device-Width

下面指的是“iphone.css”样式适用于最大设备宽度为480px

```html
<link rel="stylesheet" media="screen and (max-device-width:480px)" href="iphone.css" />
```

## not关键词

排除某种媒体类型

```css
@media not print and (max-width: 1200px){样式代码}
```

## only关键词

指定某种媒体类型

```html
<link rel="stylesheet" media="only screen and (max-device-width:240px)" href="android240.css" />
```

# 常用实例

## 1024px显屏

```css
@media screen and (max-width : 1024px) {样式写在这里} 
```

## 800px显屏

```css
@media screen and (max-width : 800px) { 样式写在这里}
```

## 640px显屏

```css
@media screen and (max-width : 640px) {样式写在这里}
```

## iPad横板显屏

```css
@media screen and (max-device-width: 1024px) and (orientation: landscape) {样式写在这里}
```

## iPad竖板显屏

```css
@media screen and (max-device-width: 768px) and (orientation: portrait) {样式写在这里}
```

## iPhone 和 Smartphones

```css
@media screen and (min-device-width: 320px) and (min-device-width: 480px) {样式写在这里}
```

