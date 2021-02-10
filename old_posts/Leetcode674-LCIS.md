---
title: Leetcode674-LCIS
date: "2019-05-17"
summary: "Given an unsorted array of integers, find the length of longest continuous increasing subsequence (subarray)." 
---
Given an unsorted array of integers, find the length of longest continuous increasing subsequence (subarray).   

----
这题其实就是找数组中的最长连续递增子序列。想法也很简单，设置一个startIndex，当发现序列不是递增时，则子序列的长度是当前的Index减去startIndex，同时将startIndex设置为当前位置(这里注意可能有off-by-one)。遍历整个序列，找到最长的序列即可。  

代码如下：
```
func findLengthOfLCIS(nums []int) int {
    if len(nums) == 0 {
        return 0
    }
    lengthMax := 1
    startIndex := 0
    
    arrayLength := len(nums)
    for i := 0; i < arrayLength - 1; i++ {
        if nums[i + 1] <= nums[i] {
            if i +  1 - startIndex > lengthMax {
                lengthMax = i + 1 - startIndex
            }
            startIndex = i + 1
        }
    }
    
    if startIndex != arrayLength - 1 && arrayLength - startIndex > lengthMax {
        lengthMax = arrayLength - startIndex
    }
    
    return lengthMax
}
```
