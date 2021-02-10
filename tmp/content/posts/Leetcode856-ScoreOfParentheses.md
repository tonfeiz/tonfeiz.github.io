---
title: Leetcode856-Score Of Parenthess
date: "2019-05-06"
summary: "Given a balanced parentheses string S, compute the score of the string based on the following rule"
---
Given a balanced parentheses string S, compute the score of the string based on the following rule:

    () has score 1
    AB has score A + B, where A and B are balanced parentheses strings.
    (A) has score 2 * A, where A is a balanced parentheses string.

Example:

```
Input: "()"
Output: 1

Input: "(())"
Output: 2

Input: "()()"
Output: 2

Input: "(()(()))"
Output: 6
```
----
这是一道mdeium题，题意是对于一个完全匹配的括号串，()表示1,AB表示A+B,(A)表示A\*2，其中A、B都是某个括号表达式，求给定括号串的值。  

这道题还是想了有一点时间，最开始是想用栈，但是感觉怎么用都不太对，后面才开始想用递归的方法。  

递归的核心其实就是把问题的规模变小，并且要有一个最终的停止条件。对一个函数`f`来说，假设其输入是字符串以及起始位置`start`和`end`(范围为`[start, end)`)，显然终止条件有:  
* `end - start < 2`, 此时值为0  
* `s[start]s[end - 1] == "()"`,此时值为1  

如果不是上面这两种情况，则需要找到当前左括号匹配的右括号，如果该右括号不在`end`处，那么说明后面还有字符串，则需要将两者代表的值相加。否则说明需要将内部的值扩大两倍并缩小范围。哪种情况都需要继续递归。  

[未完成]:递归的方法时空复杂度都很高，后来看了解析才发现更好的方法。可以用一个栈，但是栈里面并不是保存字符串的括号，而是某个层次括号上的所有值。每次碰到新的左括号都将值置0并压入，而碰到右括号则将栈顶的值加上1.  

递归版的代码见下，用栈的方法留作练习  
```
func scoreOfParentheses(S string) int {
    return eval(S, 0, len(S))
}

func eval(s string, start, end int) int {
    if end - start < 2 {
        return 0
    }
    
    if end - start == 2 &&s[start] == '(' && s[end - 1] == ')' {
        return 1
    }
    
    parenthes_num := 1
    i := start + 1
    for ; i < end; i++ {
        if parenthes_num == 0 {
            break;
        }
        if(s[i] == '(') {
            parenthes_num++;
        } else {
            parenthes_num--;
        }
    }
    
    if i == end {
        return 2 * eval(s, start + 1, end - 1)
    }
    return eval(s, start, i) + eval(s, i, end)
}
```
