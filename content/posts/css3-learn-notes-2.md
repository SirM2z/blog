---
title: "css3 学习笔记（二） 选择器（包含 css2 选择器）"
date: 2015-05-23 13:43:05
lastmod: 2015-05-23 13:43:05
draft: false
keywords: ["css3", "选择器", "learn", "notes", "学习笔记"]
description: "css3 学习笔记（二） 选择器（包含 css2 选择器）"
tags: ["CSS3"]
categories: ["CSS3"]
author: "ryan"

---


# css3 选择器

## 属性选择器

首先选到含有att属性的E元素

> E[att="val"] ，表示：att属性等于val的元素

`input[type="text"]`

> E[att^="val"] ，^表示：att属性开头为val的元素

`div[class^="box"]`

> E[att$="val"] ，$表示：att属性结尾为val的元素

`a[href$="img"]`

> E[att*="val"] ，*表示：att属性中含有val字符的元素

`a[title*="box"]`

## 结构性伪类选择器

> --root：下边等价

```css
:root{background:yellow;}
html{background:yellow;}/*两个等价*/
```

> --not：选择某个元素之外的所有元素

```css
div:not([id="box"]){color:red}	/*设置除id为box的其他所有div样式*/
```

> --empty：选择没有任何内容的元素

```css
div:empty{border:1px solid green;}
```

> --target：匹配url的某个标识符的目标元素，可以理解为单击触发css

```css
#test:target{display:none;}
```

```html
<a href="#test">TEST</a>
<div id="test">点击TEST(即a标签)，这句话就会消失</div>
```

> --first-child：选择元素中的第一个子元素

```css
ul > li:first-child{color:red;}
```

> --last-child：选择元素中的最后一个子元素

```css
ul > li:last-child {border-bottom: none;}
```

> --nth-child(n)：选择元素中符合n表达式的子元素，n可以为2n（即偶数,也可以为even），2n+1(即奇数,也可以为odd)，n是从0开始计算，当n<=0时，不选择任何元素

```css
ul > li:nth-child(2n+1){background: green;}/*使ul下奇数行的li元素的背景为绿色*/
```

> --nth-last-child(n)：选择元素中倒数第n个子元素，n同上

```css
ul > li:nth-last-child(5){background: orange;}/*修改ul的倒数第五个子元素的背景色为橙色*/
```

> --first-of-type：定位父元素下某个类型的第一个子元素

```css
#test > div:first-of-type { background: orange;}/*选择id为test元素下的第一个div元素*/
```

> --nth-of-type(n)：定位父元素下符合n表达式的某个类型的子元素，n同（nth-child(n)）一样

```css
#test > div:nth-of-type(2n-1){color:red}/*选择id为test的元素中所有div中奇数行的div元素*/
```

> --last-of-type：选择父元素下某个类型元素的最后一个子元素

```css
#test > div:last-of-type{background: orange;}
```

> --nth-last-of-type(n)：选择父元素下某个类型元素的倒数第n个元素，n同上

```css
#test > div:nth-last-of-type(5){background: orange;}
```

> --only-child：选择元素的父元素中仅有这个子元素的元素

```css
li:only-child {background: orange;}/*选择li元素的父元素中只含有一个li元素的li元素----有点绕*/
```

> --only-of-type：选择元素的父元素中仅有这种类型元素的元素

```css
#test p:only-of-type{background: orange;}/*选择id为test的元素中仅含有一个p元素的p元素*/
p:only-of-type{background: orange;}/*效果同上*/
```

> --enabled：选择那些可用状态的表单元素

```css
input[type="text"]:enabled {
	border: 1px solid #f36;
	box-shadow: 0 0 5px #f36;
}
```

> --disabled：选择那些不可用状态的表单元素

```css
input[type="submit"]:disabled{
	background: #eee;
	border-color: #eee;
	color: #ccc;
}
```

> --checked：选择复选框被选中的元素

```css
input[type="radio"]+span:checked{opacity: 1;}/*选择被选中的复选框元素，其中‘+’号为兄弟元素选择器，选择相邻的并且有同一父元素的span元素，这个案列在别的文章介绍*/
```

> --selection：鼠标选中文本时的样式

```css
::selection{background: orange;color: white;}
::-moz-selection{background: orange;color: white;}/*Firefox要加前缀*/
```

> --read-only：选择处于只读状态的元素，就是设置了 "readonly='readonly'"属性的元素

```css
input[type="text"]:read-only{border-color: #ccc;}
```

> --read-write：用来指定当元素处于非只读状态时的样式

```css
input[type="text"]:read-write{border:2px solid red;}
```

> --before,after：分别用来给元素的前面和后面插入内容，常和“content”配合使用，使用最多的是清除浮动

```css
.test::before,
.test::after {
    content: ".";
    display: block;
}
```

# css2选择器

## 子选择器：>

仅包含第一代子元素

```css
#test>li{color:red;}
```

## 后代选择器：" "

加一个空格，不仅包含后代元素，也包含后代的后代元素

```css
#test li{color:red;}
```

## 通用选择器： *

匹配html中所有标签元素

```css
*{margin:0;padding:0;}
```

## hover：伪类选择器

表示鼠标滑过该元素的样式

```css
#test:hover{color:red;}
```

## 分组选择符：","

使多个标签元素设置同一样式

```css
a,span{color:red;}
```
