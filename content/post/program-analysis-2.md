---
title: "静态程序分析入门（二）——无循环符号分析"
date: 2021-02-20T10:52:21+08:00
lastmod: 2021-02-20T10:52:21+08:00
draft: true
keywords: [program analysis]
description: ""
tags: [program analysis]
categories: []
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

## 1. 直行语言



数据流分析是程序分析中的一种基础分析方法。数据流分析把需要分析的状态抽象出来，并且为程序中的每种指令定义状态转换函数。在程序执行的过程中，针对每条指令来进行状态的转换，直到程序执行结束。

指令执行的过程通常通过控制流图来表示。

符号分析：判断程序中的每个变量是正、负或0



这里我们用sign={+, -, 0, ⊥, Τ}来表示变量可能的符号。其中⊥表示变量的值是未定义的，例如未初始化的变量。Τ表示我们不知道变量的值是正还是负。

我们从最简单的情况开始：只有定义和赋值语句

```c
int x, y;
x = 0;
y = 0;
x = 2;
```

这里，程序的状态是[x->sign, y->sign], 而每条语句则会改变这个状态。

```c
int x, y;           [x->⊥, y->⊥]
x = 0;              [x->0, y->⊥]
y = 0;              [x->0, y->0]
x = 2;              [x->+, y->0]
```





