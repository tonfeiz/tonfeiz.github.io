---
layout: posts
title: ARTS Week Thirteen Leetcode868 BinaryGap
---
Given a positive integer N, find and return the longest distance between two consecutive 1's in the binary representation of N.  

If there aren't two consecutive 1's, return 0.  

Example:  
```
Input: 22
Output: 2
Explanation: 
22 in binary is 0b10110.
In the binary representation of 22, there are three ones, and two consecutive pairs of 1's.
The first consecutive pair of 1's have distance 2.
The second consecutive pair of 1's have distance 1.
The answer is the largest of these two distances, which is 2.
```

---
这题的意思是找出十进制数的二进制表示中两个连续的1之间最远的距离。思路也非常简单，在将十进制数转换为二进制时记录上一个1和当前的1的位置，然后相减即得到距离。在转换同时记录距离的最大值即可。  

代码如下：
```
class Solution {
public:
    int binaryGap(int N) {
        int last_pos = -1, cur_pos = -1;
        
        int mod;
        int max_dis = 0;
        int cur_iter = 0;
        while(N > 0) {
            mod = N % 2;
            if(mod == 1) {
                last_pos = cur_pos;
                cur_pos = cur_iter;
                if(last_pos > -1 && cur_pos - last_pos > max_dis) {
                    max_dis = cur_pos - last_pos;
                }
            }
            N /= 2;
            cur_iter++;
        }
        
        return max_dis;
        
    }
};
```