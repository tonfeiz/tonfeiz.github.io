---
title: Leetcode703-Kth In Stream
date: "2019-04-30"
summary: "Design a class to find the kth largest element in a stream. Note that it is the kth largest element in the sorted order, not the kth distinct element." 
---
Design a class to find the kth largest element in a stream. Note that it is the kth largest element in the sorted order, not the kth distinct element.

Your KthLargest class will have a constructor which accepts an integer k and an integer array nums, which contains initial elements from the stream. For each call to the method KthLargest.add, return the element representing the kth largest element in the stream.

----

这题其实的意思是在一段流里找第k大的数，也就是说对于连续的流，每次调用函数都能获取当前第k大的数。  

这也是一道很经典的题了，但是最开始想着要保留所有的数，于是就超时了。实际上很容易想到，既然是求第k大的数，那么只需要保留前k个数即可。每新来一个数都将它与前k个数中最小的数比较，如果小于它就丢弃，如果大于它就将它插入合适位置。这里最开始我想的是排序，利用插入排序的方式。可是后来想到显然小顶堆是最合适的数据结构。另外，go语言很久没用了，这里编译错误好几次，还需要复习go语言的用法。  

```
type KthLargest struct {
    h *IntHeap
    num int
}

// An IntHeap is a min-heap of ints.
type IntHeap []int

func (h IntHeap) Len() int           { return len(h) }
func (h IntHeap) Less(i, j int) bool { return h[i] < h[j] }
func (h IntHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }

func (h *IntHeap) Push(x interface{}) {
    // Push and Pop use pointer receivers because they modify the slice's length,
    // not just its contents.
    *h = append(*h, x.(int))
}

func (h *IntHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}

func Constructor(k int, nums []int) KthLargest {
    h := IntHeap(nums)
    heap.Init(&h)
    return KthLargest{&h, k}
}


func (this *KthLargest) Add(val int) int {
    heap.Push(this.h, val)
    for len(*(this.h)) > this.num {
        heap.Pop(this.h)
    } 
    res := (*this.h)[0]
    return res
}


/**
 * Your KthLargest object will be instantiated and called as such:
 * obj := Constructor(k, nums);
 * param_1 := obj.Add(val);
 */
```
