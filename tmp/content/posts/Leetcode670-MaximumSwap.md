---
title: Leetcode670-Maximum Swap
date: "2019-06-25"
summary: "Given a non-negative integer, you could swap two digits at most once to get the maximum valued number. Return the maximum valued number you could get." 
---
Given a non-negative integer, you could swap two digits at most once to get the maximum valued number. Return the maximum valued number you could get.   

Example 1:  
```
Input: 2736  
Output: 7236  
Explanation: Swap the number 2 and the number 7.  
```

Example 2:
```
Input: 9973  
Output: 9973  
Explanation: No swap.  
```

---
这题的意思是对给定数字，只能交换一次不同位置的数字，则能得到的最大数字是多少。  

我自己的想法比较复杂。对于一个多位数字，显然把较大的数字放在前面更好。为了找到拿来交换的较大的数字的位置，遍历数组，并且找到递增的最大位置，该位置即为可以拿来交换的最大位置。当然，这样的位置可能有多个，则需要从这些位置中找到最大的、最靠后的位置。  

接下去找可拿来交换的最小位置，该位置一定在0到我们找到的第一个递增的最大位置之间，因此在这两个位置之间再找到比我们之前找到的最大位置数字小的位置，则该位置为能交换的小位置。最后，交换这两个位置的数字即可。  

代码如下：
```
class Solution {
public:
    int maximumSwap(int num) {
        string s = to_string(num);
        vector<int> vi;
        
        for(int i = 0; i < s.size() - 1; ++i) {
            if(s[i] < s[i + 1]) {
                while(s[i] <= s[i + 1] && i < s.size() - 1) {
                    ++i;
                }
                vi.push_back(i);
            }
        }
        
        if(vi.empty()) {
            return num;
        }
        
        int max_num_index = vi[0];
        char max_num = s[max_num_index];
        for(int i = 0; i < vi.size(); ++i) {
            if(s[vi[i]] >= max_num) {
                max_num = s[vi[i]];
                max_num_index = vi[i];
            }
        }
        
        for(int i = 0; i < vi[0]; ++i) {
            if(max_num > s[i]) {
                char c = s[i];
                s[i] = max_num;
                s[max_num_index] = c;
                break;
            }
        }
        
        return stoi(s);
        
    }
};
```
