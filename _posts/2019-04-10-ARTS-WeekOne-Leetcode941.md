---
layout: posts
---
Given an array `A` of integers, return `true` if and only if it is a *valid mountain array*.

Recall that `A` is a mountain array if and only if:
* `A.length` >= 3
* There exists some `i` with `0 < i < A.length - 1` such that: 
    * `A[0] < A[1] < ... A[i-1] < A[i]`
    * `A[i] > A[i+1] > ... > A[B.length - 1]`

--------------
这是一道简单题，题意就是判断一个数组是否存在且只存在一个山顶，其实就是判断是否数组是先升后降的，并且不存在相等元素。  

思路很直白，设置一个变量`mountain_top`(需初始化为0)，遍历数组，当找到降序后将山顶位置赋值给它，然后继续遍历，若此后出现升序则直接返回false。最后，若遍历完成后该变量未被修改，说明不存在山顶(单纯升序则为0,单纯降序也为0)。最后，注意排除相等的情况。  

代码是用go语言写的，如下所示  
```
func validMountainArray(A []int) bool {
    if len(A) < 3 {
        return false
    }
    
    mountain_top := 0
    for i := 0; i < len(A) - 1; i++ {
        if A[i] > A[i + 1] {
            mountain_top = i
            break
        } else if A[i] == A[i + 1] {
            return false;
        }
    }
    for i := mountain_top; i < len(A) - 1; i++ {
        if A[i] <= A[i + 1] {
            return false
        } 
    }
    
    
    return mountain_top != 0
}
```
