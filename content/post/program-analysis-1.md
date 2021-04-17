---
title: "静态程序分析入门（一）——简介"
date: 2021-03-22T10:52:21+08:00
lastmod: 2021-03-22T10:52:21+08:00
draft: false
keywords: [program analysis]
description: ""
tags: [program analysis]
categories: [programming]
author: ""

# You can also close(false) or open(true) something for this content.
# P.S. comment can only be closed
comment: false
toc: true
autoCollapseToc: false
postMetaInFooter: false
hiddenFromHomePage: false
# You can also define another contentCopyright. e.g. contentCopyright: "This is another copyright."
contentCopyright: false
reward: false
mathjax: false
mathjaxEnableSingleDollar: false
mathjaxEnableAutoNumber: false

# You unlisted posts you might want not want the header or footer to show
hideHeaderAndFooter: false

# You can enable or disable out-of-date content warning for individual post.
# Comment this out to use the global config.
#enableOutdatedInfoWarning: false

flowchartDiagrams:
  enable: false
  options: ""

sequenceDiagrams: 
  enable: false
  options: ""
---
## 1. 简介

静态程序分析（下文简称程序分析）是在不运行程序的情况下得出程序的某种属性的艺术。它有许多作用，最常见的就是在编译器的优化过程中利用程序分析的结果进行优化。

程序分析是一件很有趣的事情，正如《Static Program Analysis》（下文简称SPA）前言中所说的：

> For anyone interested in programming, what can be more fun than writing programs that analyze programs?

## 2. 动机

当前程序分析的资料其实并不算少，想学习的同学轻松就可以根据这些资料学习到其中的数学原理和方法。作为一名初学者，我也是遵循着这样的学习路线。其中包括：

1. [Static Program Analysis](https://cs.au.dk/~amoeller/spa/).

   比较理论的介绍了静态程序分析的原理，私以为如果打算精通程序分析，完全读懂这一lecture是基础中的基础

2. [NJU Static Program Analysis](https://pascal-group.bitbucket.io/teaching.html)

   南京大学的程序分析课程，对于入门者极其友好，有大量的例子和step-by-step的教学，重点讲了Pointer Analysis

3. [PKU Software Analysis](https://xiongyingfei.github.io/SA/2020/main.htm)

   北京大学的软件分析课程，涉及内容较广，包括软件缺陷定位、符号执行等。不过光看课件会比较吃力，可以配合[视频](https://liveclass.org.cn/cloudCourse/#/courseDetail/8mI06L2eRqk8GcsW)学习

其余还包括CMU的[课程](https://cmu-program-analysis.github.io/2021/)， [DC888](https://homepages.dcc.ufmg.br/~fernando/classes/dcc888/ementa/)等，由于精力有限，我没有看完，但粗略浏览后质量都是比较高的。其中CMU课程的叙述方式对我的学习方式启发比较大。

这些都是非常优质的课程，我也从中受益匪浅。然而，或许是本人水平有限的缘故，看起这些资料来总觉得有点吃力。此外，这些资料中的大部分通常都只是给出了程序分析做了什么、怎么做的，却很少提到为什么会变成这么做。

出于这些原因，我决定写一些程序分析的博客。一方面是作为我学习的记录，加深自己的理解；另一方面也试图从具体到抽象，以更简单、直观的方式阐述程序分析。

## 3. 方法

大多数程序分析的资料都是先介绍一些程序分析中用到的基础概念，例如控制流图（Control Flow Graph）。然后举一些程序分析的例子，例如活跃变量分析（Liveness Variable Analysis），从中引出数据流分析的算法，再到介绍格（Lattice）理论等。再往下一直介绍到过程间分析（Inter Procedural Analysis）、指针分析（Pointer Analysis）等。

这些资料提供了程序分析的**知识**，但要真正掌握这些知识，必须还要实践，否则过眼即忘。例如我本人看了许多遍SPA，先不说仍然有很多看不懂的地方，即使是看懂的地方过不了多久也会忘记。因此，学习程序分析时去**实现**这些算法是很重要的。

除此之外，如同上面提到过的，很多资料没有提供**为什么**。为什么要用控制流图来表示程序呢？为什么会诞生WorkList  Algorithm呢？这一点准确来说是程序分析的**演化**，而演化过程中往往蕴含着比算法本身还要重要的东西。

基于以上两点，我决定采用这样一种方法来学习程序分析：设定一门语言，从最简单的语法特性开始，慢慢扩充它，同时对这个语言试验不同的分析算法。从无条件直行到函数调用、指针，从符号分析到可达性分析等。出于方便起见，给这门语言起个名字叫做PAT(Program Analysis Teaching)。

由于我对于程序语言理论（Programming Language Theory，简称PLT）缺乏足够的了解，加上这一系列的主要目的是学习程序分析，因此语言语法的设计会非常简陋，并且实现的前端将完全依赖于输入的准确性。