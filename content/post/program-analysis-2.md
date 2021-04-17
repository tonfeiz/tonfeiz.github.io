---
title: "静态程序分析入门（二）——直行代码符号分析"
date: 2021-04-15T10:52:21+08:00
lastmod: 2021-04-15T10:52:21+08:00
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

在这篇文章中，我们会对**无条件直行**的语言进行一种很简单的程序分析——**符号分析**。

## 2. 语言

我们假设初始的PAT语言具有下列特性：

1. 所有数据的类型均为整数
2. 变量无需声明，直接赋值即可
3. 一行只有一个表达式
4. 表达式的形式需要为下面几种情况中的一种: 
   1. *var* = *num*
   2. *var* = *var*
   3. *var* = (*var*|*num*) (+|-|\*) (*var*|*num*) 

于是，我们可以写出这样的代码

```
x = 1
y = x
z = x + 1
a = z + x
```

## 3. 符号分析

符号分析是一种非常经典的程序分析，它的目的是判断程序中变量的符号是正、负还是零。

举个简单的例子：

```
x = 0
y = x + 1
z = y - 2
```

在以上例子中，我们可以很简单地推出

```
x -> 0
y -> 正
z -> 负
```

尽管符号分析乍一看非常简单，但从符号分析能推出的东西却不少。此外，随着语言特性的逐渐增加，我们会发现符号分析的难度也开始变大。

## 4. 符号分析方法

接下去让我们开始思考，如何对PAT语言写成的代码进行符号分析？

一种很自然的想法是跟踪程序的执行，并且同步计算这些变量的值。当程序执行结束后，根据变量的值来判断变量的符号。

熟悉**解释器**(Interpreter)概念的同学可能一下就想到了，这不就是解释器的作用吗？

简单来说，解释器的作用就是对给定的程序进行求值。像我们熟悉的Shell，以及用来解释Java字节码的JVM，都可以看作是解释器。从更广泛的概念讲，计算机也是一台解释器，它解释的是二进制的机器语言。与解释器相对的是**编译器**(Compiler)，编译器的作用是把一种语言翻译成另一种语言，通常大部分编译器的目的都是把一种高级语言（如C++、Java等）翻译成一种低级语言（机器语言、字节码等），最后再交由解释器进行解释。

那么解释器的方案是否可行呢？可能大部分同学也想到了——如果分析程序的前提是必须**精确**执行这段程序并且**精确**跟踪所有变量，那我还为啥要专门写一个解释器分析它，直接跑它然后输出数据不香吗：）？

解释器方案的另一个问题是有时候我们并不知道变量实际的值，例如一个用户输入变量。这些运行时才能知晓的值是无法由一个静态的解释器进行解释的。

为了解决这些问题，就诞生了**抽象解释**(Abstract Interpretation)这一程序分析中至为重要的概念。

抽象解释从概念上讲其实非常简单，那就是把不知道的东西、代价比较大的东西都抽象掉，抽象成**不知道**或者**有可能**。

以我们的符号分析为例。对于这段代码

```
x = 0
y = x + 1
z = y - 2
```

我们觉得，要精确跟踪每一个变量的值的代价太大了，那就进行抽象。我们把代价大的东西(变量的**值**)抽象成我们感兴趣的**状态**(正, 负, 0, ?)，然后再进行计算。

```
x = 0                   // x -> 0
y = x + 1               // y -> x + 1 -> 0 + 正 -> 正
z = y - 2               // z -> y - 2 -> 正 - 正 -> ?
```

这样，我们分析的对象就从值空间(无穷大)转移到了状态空间(只有4个)，分析代价就减少了。然而，由于抽象的存在，我们的结果可能精度并不高。例如上面这段代码中的*z*，我们只能得出**不知道**的结论。程序分析的很大一部分工作就是需要去分析抽象造成的精度损失以及减少这些损失，使得结果尽量准确。

## 5. 代码repo简介

本节将会提一提这一系列博客所用到的代码。代码使用C++写成，repo的地址在[这里](https://github.com/tonfeiz/program-analyzer)。

整个repo下根据不同的语言特性有不同的文件夹，从最简单的straight到复杂一点的condition等。通常复杂特性是在简单特性的基础上进行开发的。

每个语言特性下的模块大致可分为front-end、cfg和analyzer，即语言的前端、程序控制流图（下文简称CFG，目前可以不用了解的很清楚)和程序分析器：

1. 前端部分会读取PAT语言的程序文件并输出对应的**AST**(Abstract Syntax Tree, 抽象语法树)
2. CFG部分会读取AST并生成控制流图（最简单的直行语言不会生成），并且提供遍历图的接口
3. 程序分析器会使用CFG提供的遍历接口，根据不同的分析目标进行分析

我们关注的主要是CFG和程序分析器的实现和演化，前端部分写的比较简陋，通常不用过于探究。

由于学习的目标是程序分析算法，故实现时往往以简单、直观为目的。这导致有些细节部分实现的效率较低，且并不符合常见的C++编程规范和软件设计原则，但总体应不会造成较大影响。

## 6. 直行语言符号分析实现

待补充。