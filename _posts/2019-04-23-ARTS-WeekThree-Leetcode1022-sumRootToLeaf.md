---
layout: posts
---
Given a binary tree, each node has value 0 or 1.  Each root-to-leaf path represents a binary number starting with the most significant bit.  For example, if the path is 0 -> 1 -> 1 -> 0 -> 1, then this could represent 01101 in binary, which is 13.  

For all leaves in the tree, consider the numbers represented by the path from the root to that leaf.  

Return the sum of these numbers.  

**Note:**  
    1. The number of nodes in the tree is between 1 and 1000.  
    2. node.val is 0 or 1.  
    3. The answer will not exceed 2^31 - 1.  

-----
这道题的意思就是对一棵二叉树，每个结点可能是0或者1,则从根节点到叶节点就构成了一个二进制数。求所有这样的二进制数的和。  

二叉树的题目一般都是涉及到递归的。递归的方法主要就是回溯，因此一开始就往回溯那方面去想了。这题用回溯也可以做，但没那么复杂。  

递归的题目中，我觉得函数代表的意义是很重要的。对这题来说，假设有一个递归函数的输入是一个节点`node`和一个数`num`(表示到当前节点为止形成的二进制数，不包括当前节点)，输出是该节点到叶节点的二进制数的和，那么：  
1. 假设函数输入的节点不是空节点，那么肯定要将该节点中的数加入`num`中。接着，如果该节点是叶子节点，那么返回`num`即可。而如果该节点不是叶子节点，则是该节点左子节点到叶子节点形成的数和该节点右子节点形成的数的和  
2. 若函数输入的节点是空节点，则无法形成数，返回0即可  

代码如下：  
```
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func sumRootToLeaf(root *TreeNode) int {   
    number := 0
    
    res := sumRootToLeafHelper(root, number)
    return res
}

func sumRootToLeafHelper(root *TreeNode, number int) int {
    if root == nil {
        return 0
    }
    
    number = number * 2 + root.Val
    
    if root.Left == nil && root.Right == nil {
        return number
    }
    
    return sumRootToLeafHelper(root.Left, number) + sumRootToLeafHelper(root.Right, number)
    
}
```
