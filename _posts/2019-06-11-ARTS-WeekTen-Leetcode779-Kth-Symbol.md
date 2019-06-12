---
layout: posts
---
On the first row, we write a 0. Now in every subsequent row, we look at the previous row and replace each occurrence of 0 with 01, and each occurrence of 1 with 10.  

Given row N and index K, return the K-th indexed symbol in row N. (The values of K are 1-indexed.) (1 indexed).  

Examples:  
Input: N = 1, K = 1  
Output: 0  

Input: N = 2, K = 1  
Output: 0  

Input: N = 2, K = 2  
Output: 1  

Input: N = 4, K = 5  
Output: 1  


row 1: 0  
row 2: 01  
row 3: 0110  
row 4: 01101001  
---
这题还是很有意思的。最直观的解法是生成第N行然后直接索引第K个，然而很快就会发现，第row行的字符数量是`$2^(N-1)$`，显然是放不下的。因此还要有其他方法。  

我自己的解法是比较复杂的，主要是通过观察数列规律得出。很显然，可以根据K和N分为下列情况（假设middle是第N行的中间位置,f(N,K)是想要寻找的数字)  
* K < middle, 此时就是第N-1行的对应索引，即f(N, K) = f(N-1, K)  
* K > middle,此时要分N是奇数还是偶数  
    * N为奇数时，此时N行左半边和右半边对称，因此f(N, K) = f(N, middle * 2 - K + 1) = f(N - 1, middle * 2- K + 1)  
    * N为偶数时，将数列划分为四等分，则必定是abba的形式，因此又分两种情况  
        * K在右侧的左半边时，则位于abba中第2个b的位置，则可在第1个b中找到其对应位置，即f(N, K) = f(N, K - middle / 2) = f(N - 1, K - middle / 2)  
        * K在右侧的右半边时，即位于abba中第2个a的位置，则可在第1个a中找到其对应位置，即f(N, K) = f(N, K - middle / 2 * 3) = f(N - 1, K - middle / 2 * 3)  

基准情形则是N=1和N=2时的情况。总体来说，思路就是把N往小了化简。  

在看了解析之后，才发现其实很简单。把第N-1行的0看作第N行的0和1的父节点，第N-1行的1看作第N行的1和0的父节点。很显然，第N行中如果K是偶数，则它是父节点的右子节点，如果K是奇数，则它是父节点的左子节点。而只要确定了K对应的位置的父节点的数值，则K的数值就很简单就能确定。从子节点一直往上回溯直到找到基准情形即可。这种思路的代码非常简单，如下所示  
```
class Solution {
public:
    int kthGrammar(int N, int K) {
	if (N == 1) return 0;
	if (K % 2 == 0) return (kthGrammar(N - 1, K / 2) == 0) ? 1 : 0;
	else return (kthGrammar(N - 1, (K + 1) / 2) == 0) ? 0 : 1;
    }
};
```

我自己的代码复杂一些，这里也附上  
```
class Solution {
public:
    int kthGrammar(int N, int K) {
        if(N == 1)
            return 0;   
        if(N == 2 && K == 1)
            return 0;
        if(N == 2 && K == 2)
            return 1;
        
        int middle = pow(2, N - 2);
        if(K <= middle)
            return kthGrammar(N-1, K);
        else if(K > middle && N % 2)
            return kthGrammar(N - 1, middle * 2 - K + 1);
        else 
        {
            if(K <= 3 * middle / 2)
                return kthGrammar(N - 1, K - middle / 2);
            else
                return kthGrammar(N - 1, K - middle / 2 * 3);
        }
    }
};
```