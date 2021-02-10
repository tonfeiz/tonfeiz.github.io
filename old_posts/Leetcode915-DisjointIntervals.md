---
title: Leetcode915-Disjoint Intervals
date: "2019-06-19"
summary: "Given an array A, partition it into two (contiguous) subarrays left and right so that" 
---
Given an array A, partition it into two (contiguous) subarrays left and right so that:  

* Every element in left is less than or equal to every element in right.  
* left and right are non-empty.  
* left has the smallest possible size.  

Return the length of left after such a partitioning.  It is guaranteed that such a partitioning exists.  

Example 1:

Input: [5,0,3,8,6]
Output: 3
Explanation: left = [5,0,3], right = [8,6]

Example 2:

Input: [1,1,1,0,6,12]
Output: 4
Explanation: left = [1,1,1,0], right = [6,12]

---
这题的意思是将数组划分成两个区间，左边的每一个元素都小于右边的每一个元素。如此一来，思路就很清晰了——找到数组中每个位置左边最大元素和右边最小元素，使得该位置上左边最大元素小于右边最小元素，同时该位置应当尽量靠近左边。  

为了找到每个位置的左边最大元素和右边最小元素，需遍历数组两次。第一次从左往右，并与当前的最大值做比较，同时记录。第二次从右往左，并与当前的最小值作比较，同时记录。最后根据左边最大、右边最小两个数组上对应位置的大小关系即可确认划分位置。这里要注意的是，存在一些细节问题，但只要仔细思考，这些细节问题很容易解决。  

代码如下所示：  
```
class Solution {
public:
    int partitionDisjoint(vector<int>& A) {
        vector<int> left_max(A.size()), right_min(A.size());
        
        int current_max = INT_MIN;
        for(int i = 0; i < A.size(); ++i) {
            if(A[i] > current_max) {
                current_max = A[i];
            }
            left_max[i] = current_max;
        }
        
        int current_min = INT_MAX;
        for(int i = A.size() - 1; i >= 0; --i) {
            right_min[i] = current_min;
            if(A[i] < current_min) {
                current_min = A[i];
            }
        }
    
        int res = 0;
        for(int i = 0; i < A.size() - 1; ++i) {
            if(left_max[i] <= right_min[i]) {
                res = i + 1;
                break;
            }
        }
        return res;
    }
    
};
```
