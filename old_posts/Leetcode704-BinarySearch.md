---
title: Leetcode704-Binary Search
date: "2019-04-15"
summary: "Given a sorted (in ascending order) integer array nums of n elements and a target value, write a function to search target in nums. If target exists, then return its index, otherwise return -1." 
---
Given a sorted (in ascending order) integer array nums of n elements and a target value, write a function to search target in nums. If target exists, then return its index, otherwise return -1.

You may assume that all elements in nums are unique.
n will be in the range [1, 10000].
The value of each element in nums will be in the range [-9999, 9999].

----
这题其实就是一个简单的二分搜索，数组中的元素都是唯一的，且数值也不大，难怪会被分到简单题里  

二分搜索很有名，要实现一个完全正确的二分搜索是很困难的，但这题的要求并不高。基本思想就是每次寻找中间元素并根据中间元素与目标元素的大小判断下一个搜索范围应该在哪一侧  

二分搜索时，左侧和右侧的范围应当界定明确。在下面的代码中，采用的范围是C++中的通用范围，即[left, right)。因此，循环的推出条件就是两者相等。当缩小范围时，要根据上面的关系选择是中间元素还是中间元素的两侧元素  

```
func search(nums []int, target int) int {
    left := 0
    right := len(nums)
    
    res := -1;
    for left < right {
        middle := left + (right - left) / 2;
        if(nums[middle] > target) {
            right = middle;
        } else if(nums[middle] < target) {
            left = middle + 1;
        } else {
            return middle;
        }
    }
    
    return res;   
}
```
