---
title: "Leetcode942-DI String Match"
date: "2019-06-05"
summary: "Given a string S that only contains 'I' (increase) or 'D' (decrease), let N = S.length." 
---

Given a string S that only contains "I" (increase) or "D" (decrease), let N = S.length.  

Return any permutation A of [0, 1, ..., N] such that for all i = 0, ..., N-1:  

*    If S[i] == "I", then A[i] < A[i+1]
*    If S[i] == "D", then A[i] > A[i+1]

Example 1:  

Input: "IDID"  
Output: [0,4,1,3,2]  

Example 2:  

Input: "III"  
Output: [0,1,2,3]  

Example 3:  

Input: "DDI"  
Output: [3,2,0,1]  

-----
这题的意思是对于一个由"I"和"D"组成的序列，"I"表示增加,"D"表示减少，则根据该序列，给出一个由0到N组成的满足上面序列的数字序列。  

这题刚开始思考了一下，有点摸不着头脑，但后来发现，只要遇到"I"则放入当前能放入的最小的数，遇到"D"则放入当前能放入的最大的数，最后两者肯定汇聚到某个数，最后再放入汇聚的数即可。  

代码如下：
```
class Solution {
public:
    vector<int> diStringMatch(string S) {
        int left = 0, right = S.size();
        
        vector<int> res(right + 1);
        
        for(int i = 0; i < S.size(); ++i) {
            if(S[i] == 'I') {
                res[i] = left;
                left++;
            } else {
                res[i] = right;
                right--;
            }
        }
        
        res[res.size() - 1] = left;
        
        return res;
    }
};
```
