---
layout: posts
---
Suppose you have a long flowerbed in which some of the plots are planted and some are not. However, flowers cannot be planted in adjacent plots - they would compete for water and both would die.  

Given a flowerbed (represented as an array containing 0 and 1, where 0 means empty and 1 means not empty), and a number n, return if n new flowers can be planted in it without violating the no-adjacent-flowers rule.  

Example:
```
Input: flowerbed = [1,0,0,0,1], n = 1
Output: True
```

```
Input: flowerbed = [1,0,0,0,1], n = 2
Output: False
```

----
这题的意思是在一串0和1组成的数组中，0表示可以放置花的位置，1表示已经有花的位置，花与花不能相邻，则判断给定数能否放下。  

最开始直接采用了模拟的方法，考虑了多种情况，写出的代码较复杂，放在后面仅做参考。后来仔细思考后发现其实就是贪心算法。对于数组两侧为0的情况，则在两侧放置为1肯定是最优解。接下来遍历数组，碰到0则判断是否能放，能放则放，不能放则继续，如此就能得到最多能放下的花数。  

代码如下：
```
func canPlaceFlowers(flowerbed []int, n int) bool {

    res := 0
    length := len(flowerbed)
    if length == 1 {
        if flowerbed[0] == 0 {
            return n <= 1
        } else {
            return n == 0
        }
    }
    
    if flowerbed[0] == 0 && flowerbed[1] == 0 {
        flowerbed[0] = 1
        res++;
    }
    if flowerbed[length - 1] == 0 && flowerbed[length - 2] == 0 {
        flowerbed[length - 1] = 1
        res++
    }
    
    for i := 1; i < length - 1; i++ {
        if(flowerbed[i] == 0 && flowerbed[i - 1] == 0 && flowerbed[i + 1] == 0) {
            res++
            flowerbed[i] = 1
        }
    }
    
    return res >= n
}
```

第一种想法的代码如下：
```
func canPlaceFlowers(flowerbed []int, n int) bool {

    left_start := 0
    right_end := len(flowerbed) - 1

    for left_start <= right_end && flowerbed[left_start] == 0  {
        left_start++;
    }
    for right_end >= left_start && flowerbed[right_end] == 0 {
        right_end--;
    }

    if left_start >= right_end {
        if len(flowerbed) == 1 {
            if(flowerbed[0] == 1 && n >= 1) {
                return false
            } else {
                return n <= 1
            }
        }
        if left_start == len(flowerbed) {
            return ((left_start + 1) / 2) >= n
        } else {
            return (left_start / 2 + (len(flowerbed) - 1 - right_end) / 2) >= n
        }
    }

    res := 0
    current_start := left_start
    for i := left_start + 1; i <= right_end; i++ {
        if flowerbed[i] == 1 {
            res += (i - current_start - 2) / 2
            current_start = i
        }
    }

    return (res + left_start  / 2 + (len(flowerbed) - 1 - right_end) / 2) >= n
}
```
