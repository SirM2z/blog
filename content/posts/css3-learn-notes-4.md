---
title: "css3 学习笔记（四） 布局样式相关"
date: 2015-05-25 17:22:01
lastmod: 2015-05-25 17:22:01
draft: false
keywords: ["css3", "learn", "notes", "学习笔记"]
description: "css3 学习笔记（四） 布局样式相关"
tags: ["CSS3"]
categories: ["CSS3"]
author: "ryan"

---

# 多列布局--columns

```css
column-width：列宽，如200px

column-count：列数，如5

column-gap：列之间的间距，如50px

column-rule：列之间的边框宽度，边框样式，边框颜色，如3px solid green，如下表

column-span：标题可以跨多列，设为all，默认值为none
```

| 属性值               | 属性值说明                     | 
| ------------------- | ---------------------------- |
| column-rule-width   | 类似于border-width属性，主要用来定义列边框的宽度，其默认值为“medium”，column-rule-width属性接受任意浮点数，但不接收负值。但也像border-width属性一样，可以使用关键词：medium、thick和thin。 |
| column-rule-style   | 类似于border-style属性，主要用来定义列边框样式，其默认值为“none”。column-rule-style属性值与border-style属值相同，包括none、hidden、dotted、dashed、solid、double、groove、ridge、inset、outset。 |
| column-rule-color   | 类似于border-color属性，主要用来定义列边框颜色，其默认值为前景色color的值，使用时相当于border-color。column-rule-color接受所有的颜色。如果不希望显示颜色，也可以将其设置为transparent(透明色) |

# 盒子模型

- box-sizing:content-box（W3C盒子模型）

- border-box（IE6以下模型）

- inherit（跟随父元素模型）

## W3C盒子模型

外盒尺寸计算（元素空间尺寸）

element空间高度＝内容高度＋内距＋边框＋外距

element空间宽度＝内容宽度＋内距＋边框＋外距

内盒尺寸计算（元素大小）

element高度＝内容高度＋内距＋边框（height为内容高度）

element宽度＝内容宽度＋内距＋边框（width为内容宽度）

## IE盒模型

IE6以下，不包含IE6版本或”QuirksMode下IE5.5+”

外盒尺寸计算（元素空间尺寸）

element空间高度＝内容高度＋外距（height包含了元素内容宽度、边框、内距）

element宽间宽度＝内容宽度＋外距（width包含了元素内容宽度、边框、内距）

内盒尺寸计算（元素大小）

element高度＝内容高度（height包含了元素内容宽度、边框、内距）

element宽度＝内容宽度（width包含了元素内容宽度、边框、内距）

# Flexbox

```css
#test{
  display: -webkit-flex; display: flex; /*创建flex容器，其子元素为伸缩布局*/
  -webkit-flex-direction: column; flex-direction: column; /*改为列显示（垂直排），默认为行显示（row水平排）*/
  -webkit-align-items: flex-start; align-items: flex-start;/*将元素移动到顶部（视布局而定，此处是列），行显示的话是justify-content设置为flex-start*/
}
```

`align-items | justify-content：左上（flex-start），右上（flex-end），水平垂直居中（center）`
