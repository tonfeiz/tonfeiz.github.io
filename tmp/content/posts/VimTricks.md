---
title: Vim Tricks
date: "2019-05-17"
summary: "这篇文章介绍了一些vim中的小技巧" 
---
这篇文章介绍了一些vim中的小技巧。  

## 替换单词
替换命令可以将一个单词替换为另一个单词，例如`:%s/four/4/g`  
然而，对于`thirtyfour`来说显然不用替换，此时可以使用"\\<"标志，转化为`:%s/\<four/4/g`  
显然，对于`fourteen`来说，也是不对。可以使用"\\>"标志，则转化为:`:%s/\<four\>/4/g`  
如果正在编程，可能希望替换注释中的“four”，这可以使用`:%s/\<four\>4/gc`  

## 将"Last, First"转化为"First Last"
假设你有许多单词，其形式为  
```
Doe, John
Smith, Peter
```
你想将它们变为  
```
John Doe
Peter Smith
```
这可以通过一个命令完成：`:%s/\([^,]*\),\(.*\)/\2 \1/`  
解释如下：   
```
The first part between \( \) matches "Last"	\(     \)
match anything but a comma			  [^,]
any number of times				      *
matches ", " literally					 ,
The second part between \( \) matches "First"		   \(  \)
any character					     .
any number of times					      *
```
"\2"和"\1"叫做`backreferences`，可以指代前面用"\\( \\)"包围的文本  

## 逆转行的顺序
命令为`:global/^/m 0`  
它的意思是，对于特定的一行，`^`到达行开始，`m`移动整行，移动位置是第0行，也就是第一行之前。而`global`命令不会被改变的顺序影响，因此所有的行依次进行上面的命令，则逆转了文件所有行的顺序  

## 数单词
命令为`g CTRL-G`，注意`g`的后面没有空格。也可以在可视模式下选择部分内容再使用上面的命令  

## 无用的空格
有时候有些空格在行的最后没有用且很丑，为了删除这些空格，可以使用这条命令`:%s/\s\+$//`。这句话的意思是将一个或多个`(\+)`在结尾`($)`处的空格`(\s)`替换成空白`(//)`。  
