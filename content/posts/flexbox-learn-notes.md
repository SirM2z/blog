---
title: "flexbox 深入理解"
date: 2017-05-11 22:02:37
lastmod: 2017-05-11 22:02:37
draft: false
keywords: ["flexbox", "css", "css3", "flex"]
description: "flexbox 深入理解"
tags: ["Flexbox", "CSS"]
categories: ["CSS"]
author: "Ryan"

---

# flexbox 巩固加深

## 配合[flexbox工具](http://sirm2z.github.io/flexbox-cssgrid/index.html)食用更佳

 ![](https://raw.githubusercontent.com/SirM2z/assets/master/flexbox.gif)

## flexbox 支持情况

 ![](https://raw.githubusercontent.com/SirM2z/assets/master/flex0.png)

## 整体印象

- flex: 0 ( flex-grow ) 1 ( flex-shrink ) auto ( flex-basis ); 默认值-( 属性 )
- flex-basis 控制着元素在沿着主轴上 grow 和 shrik 之前最终能够变化多大
- flex-grow 决定了他将与兄弟元素成比例的增长多少， flex-shrink 决定了缩小多少

## flex-direction

- 设置或检索伸缩盒对象的子元素在父容器中的位置
- 默认值 :row
- 适用于 :flex 容器

| 属性            | 描述                                                        |
| --------------- |----------------------------------------------------------- |
| row             | 主轴与行内轴方向作为默认的书写模式。即横向从左到右排列（左对齐） |
| row-reverse     | 对齐方式与row相反                                            |
| column          | 主轴与块轴方向作为默认的书写模式。即纵向从上往下排列（顶对齐）   |
| column-reverse  | 对齐方式与column相反                                         |

 ![](https://raw.githubusercontent.com/SirM2z/assets/master/flex4.gif)
 ![](https://raw.githubusercontent.com/SirM2z/assets/master/flex5.gif)
 ![](https://raw.githubusercontent.com/SirM2z/assets/master/flex10.gif)

## flex-wrap

- 设置或检索伸缩盒对象的子元素超出父容器时是否换行
- 默认值 :nowrap
- 适用于 :flex 容器

| 属性           | 描述                              |
| -------------- |----------------------------------|
| nowrap         | flex容器为单行。该情况下flex子项可能会溢出容器|
| wrap           | flex容器为多行。该情况下flex子项溢出的部分会被放置到新行，子项内部会发生断行|
| wrap-reverse   | 反转 wrap 排列 |

 ![](https://raw.githubusercontent.com/SirM2z/assets/master/flex13.png)

## justify-content

- 设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式
- 默认值 :flex-start
- 适用于 :flex 容器

| 属性          | 描述                            |
| -------------| --------------------------------|
| flex-start   | 弹性盒子元素将向行起始位置对齐。该行的第一个子元素的主起始位置的边界将与该行的主起始位置的边界对齐，同时所有后续的伸缩盒项目与其前一个项目对齐|
| flex-end     | 弹性盒子元素将向行结束位置对齐。该行的第一个子元素的主结束位置的边界将与该行的主结束位置的边界对齐，同时所有后续的伸缩盒项目与其前一个项目对齐|
| center       | 弹性盒子元素将向行中间位置对齐。该行的子元素将相互对齐并在行中居中对齐，同时第一个元素与行的主起始位置的边距等同与最后一个元素与行的主结束位置的边距（如果剩余空间是负数，则保持两端相等长度的溢出）|
| space-between | 弹性盒子元素会平均地分布在行里。如果最左边的剩余空间是负数，或该行只有一个子元素，则该值等效于"flex-start"。在其它情况下，第一个元素的边界与行的主起始位置的边界对齐，同时最后一个元素的边界与行的主结束位置的边距对齐，而剩余的伸缩盒项目则平均分布，并确保两两之间的空白空间相等|
| space-around | 弹性盒子元素会平均地分布在行里，两端保留子元素与子元素之间间距大小的一半。如果最左边的剩余空间是负数，或该行只有一个伸缩盒项目，则该值等效于"center"。在其它情况下，伸缩盒项目则平均分布，并确保两两之间的空白空间相等，同时第一个元素前的空间以及最后一个元素后的空间为其他空白空间的一半|

 ![](https://raw.githubusercontent.com/SirM2z/assets/master/flex6.gif)

## align-items

- 设置或检索弹性盒子元素在侧轴（纵轴）方向上的对齐方式
- 默认值 :stretch
- 适用于 :flex 容器

| 属性          | 描述                            |
| -------------| --------------------------------|
| flex-start   | 弹性盒子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴起始边界 |
| flex-end     | 弹性盒子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴结束边界 |
| center       | 弹性盒子元素在该行的侧轴（纵轴）上居中放置。（如果该行的尺寸小于弹性盒子元素的尺寸，则会向两个方向溢出相同的长度） |
| baseline     | 如弹性盒子元素的行内轴与侧轴为同一条，则该值与"flex-start"等效。其它情况下，该值将参与基线对齐 |
| stretch      | 如果指定侧轴大小的属性值为"auto"，则其值会使项目的边距盒的尺寸尽可能接近所在行的尺寸，但同时会遵照"min/max-width/height"属性的限制 |

 ![](https://raw.githubusercontent.com/SirM2z/assets/master/flex8.gif)

align-items: stretch 时每个 子元素 的 height 必须为 auto 否则 height 属性会覆盖 stretch 的效果

 ![](https://raw.githubusercontent.com/SirM2z/assets/master/flex9.png)

如果 div 内没有内容，或者子标签内没有内容，将按照每个 div 的底部对齐

 ![](https://raw.githubusercontent.com/SirM2z/assets/master/flex11.png)

## align-content

- 设置或检索弹性盒堆叠伸缩行的对齐方式
- 默认值 :stretch
- 适用于 :多行的弹性盒模型容器

| 属性          | 描述                            |
| -------------| --------------------------------|
| flex-start   | 各行向弹性盒容器的起始位置堆叠。弹性盒容器中第一行的侧轴起始边界紧靠住该弹性盒容器的侧轴起始边界，之后的每一行都紧靠住前面一行 |
| flex-end     | 各行向弹性盒容器的结束位置堆叠。弹性盒容器中最后一行的侧轴起结束界紧靠住该弹性盒容器的侧轴结束边界，之后的每一行都紧靠住前面一行 |
| center       | 各行向弹性盒容器的中间位置堆叠。各行两两紧靠住同时在弹性盒容器中居中对齐，保持弹性盒容器的侧轴起始内容边界和第一行之间的距离与该容器的侧轴结束内容边界与第最后一行之间的距离相等。（如果剩下的空间是负数，则各行会向两个方向溢出的相等距离。） |
| space-between | 各行在弹性盒容器中平均分布。如果剩余的空间是负数或弹性盒容器中只有一行，该值等效于"flex-start"。在其它情况下，第一行的侧轴起始边界紧靠住弹性盒容器的侧轴起始内容边界，最后一行的侧轴结束边界紧靠住弹性盒容器的侧轴结束内容边界，剩余的行则按一定方式在弹性盒窗口中排列，以保持两两之间的空间相等 |
| space-around | 各行在弹性盒容器中平均分布，两端保留子元素与子元素之间间距大小的一半。如果剩余的空间是负数或弹性盒容器中只有一行，该值等效于"center"。在其它情况下，各行会按一定方式在弹性盒容器中排列，以保持两两之间的空间相等，同时第一行前面及最后一行后面的空间是其他空间的一半 |
| stretch      | 各行将会伸展以占用剩余的空间。如果剩余的空间是负数，该值等效于"flex-start"。在其它情况下，剩余空间被所有行平分，以扩大它们的侧轴尺寸 |


 ![](https://raw.githubusercontent.com/SirM2z/assets/master/flex12.png)

flex-wrap 需设为 wrap, 且数量超出一行, 父容器的高度相对于子容器有多余，才能看到效果

## order

- 设置或检索伸缩盒对象的子元素出現的順序
- 默认值 :0
- 适用于 :flex子项和flex容器中的绝对定位子元素

 ![](https://raw.githubusercontent.com/SirM2z/assets/master/flex14.png)

用整数值来定义排列顺序，数值小的排在前面。可以为负值

## flex-grow

- 设置或检索弹性盒的扩展比率
- 默认值 :0
- 适用于 :flex子项

```html
<ul class="flex">
  <li>a</li>
  <li>b</li>
  <li>c</li>
</ul>

<style>
.flex{display:flex;width:600px;margin:0;padding:0;list-style:none;}
.flex li {text-align:center;height:100px;}
.flex li:nth-child(1){width:200px;background-color:green;}
.flex li:nth-child(2){flex-grow:1;width:50px;background-color:yellow;}
.flex li:nth-child(3){flex-grow:3;width:50px;background-color:red;}
</style>
```

flex-grow的默认值为0，如果没有显示定义该属性，是不会拥有分配剩余空间权利的。

本例中b,c两项都显式的定义了flex-grow，flex容器的剩余空间分成了4份，其中b占1份，c占3分，即1:3

flex容器的剩余空间长度为：600-200-50-50=300px，所以最终a,b,c的长度分别为：

- a: 50+(300/4)=200px
- b: 50+(300/4*1)=125px
- c: 50+(300/4*3)=275px

 ![](https://raw.githubusercontent.com/SirM2z/assets/master/flex15.gif)
 ![](https://raw.githubusercontent.com/SirM2z/assets/master/flex16.gif)

## flex-shrink

- 设置或检索弹性盒的收缩比率（与flex-grow相反）
- 默认值 :1
- 适用于 :flex子项

```html
<ul class="flex">
  <li>a</li>
  <li>b</li>
  <li>c</li>
</ul>

<style>
.flex{display:-webkit-flex;display:flex;width:400px;margin:0;padding:0;list-style:none;}
.flex li{width:200px;}
.flex li:nth-child(1){background:#888;}
.flex li:nth-child(2){background:#ccc;}
.flex li:nth-child(3){-webkit-flex-shrink:3;flex-shrink:3;background:#aaa;}
</style>
```

flex-shrink的默认值为1，如果没有显示定义该属性，将会自动按照默认值1在所有因子相加之后计算比率来进行空间收缩。

本例中c显式的定义了flex-shrink，a,b没有显式定义，但将根据默认值1来计算，可以看到总共将剩余空间分成了5份，其中a占1份，b占1份，c占3分，即1:1:3

我们可以看到父容器定义为400px，子项被定义为200px，相加之后即为600px，超出父容器200px。那么这么超出的200px需要被a,b,c消化

通过收缩因子，所以加权综合可得200*1+200*1+200*3=1000px；

于是我们可以计算a,b,c将被移除的溢出量是多少：

- a被移除溢出量：(200*1/1000)*200，即约等于40px
- b被移除溢出量：(200*1/1000)*200，即约等于40px
- c被移除溢出量：(200*3/1000)*200，即约等于120px

最后a,b,c的实际宽度分别为：200-40=160px, 200-40=160px, 200-120=80px

 ![](https://raw.githubusercontent.com/SirM2z/assets/master/flex17.gif)
 ![](https://raw.githubusercontent.com/SirM2z/assets/master/flex18.gif)
 ![](https://raw.githubusercontent.com/SirM2z/assets/master/flex19.gif)

## flex-basis

- 设置或检索弹性盒伸缩基准值
- 默认值 :auto
- 适用于 :flex子项

 ![](https://raw.githubusercontent.com/SirM2z/assets/master/flex22.png)

flex-basis 控制元素的默认尺寸，然后再由其他 Flexbox 属性控制，可以覆盖 width 属性

 ![](https://raw.githubusercontent.com/SirM2z/assets/master/flex20.gif)

flex-basis 可以和 width 属性互换

 ![](https://raw.githubusercontent.com/SirM2z/assets/master/flex21.gif)

flex-basis 是通过主轴 (main axis) 来影响元素尺寸的

## align-self

- 设置或检索弹性盒子元素自身在侧轴（纵轴）方向上的对齐方式
- 默认值 :auto
- 适用于 :flex子项

| 属性          | 描述           |
| ------------- | ------------- |
| auto          | 如果"align-self"的值为"auto"，则其计算值为元素的父元素的"align-items"值，如果其没有父元素，则计算值为"stretch" |
| flex-start    | 弹性盒子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴起始边界 |
| flex-end      | 弹性盒子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴结束边界 |
| center        | 弹性盒子元素在该行的侧轴（纵轴）上居中放置。（如果该行的尺寸小于弹性盒子元素的尺寸，则会向两个方向溢出相同的长度） |
| baseline      | 如弹性盒子元素的行内轴与侧轴为同一条，则该值与"flex-start"等效。其它情况下，该值将参与基线对齐 |
| stretch       | 如果指定侧轴大小的属性值为"auto"，则其值会使项目的边距盒的尺寸尽可能接近所在行的尺寸，但同时会遵照"min/max-width/height"属性的限制 |

 ![](https://raw.githubusercontent.com/SirM2z/assets/master/flex23.png)

| 元素 | css           |
| ---- | ------------- |
| a    | align-self: flex-end |
| b    | align-self: center |
| c    | align-self: flex-start |
| d    | align-self: baseline; padding: 20px 10px |
| e    | align-self: baseline |
| f    | align-self: stretch |
| g    | align-self: auto |

 ![](https://raw.githubusercontent.com/SirM2z/assets/master/flex24.gif)

> 大部分gif图片转自 [ccforward 的 github](https://github.com/ccforward/cc/issues/57)
