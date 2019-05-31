---
layout: posts
---
 A self-dividing number is a number that is divisible by every digit it contains.  

For example, 128 is a self-dividing number because 128 % 1 == 0, 128 % 2 == 0, and 128 % 8 == 0.  

Also, a self-dividing number is not allowed to contain the digit zero.  

Given a lower and upper number bound, output a list of every possible self dividing number, including the bounds if possible.   

---
这题其实也很简单，就按照题目意思顺次遍历然后转化为字符串判断是否可以自除即可。go语言代码如下：  
```
func selfDividingNumbers(left int, right int) []int {
    res := make([]int, 0)
    
    for i := left; i <= right; i++ {
        if(isSelfDivide(i)) {
            res = append(res, i)
        }
    }
    
    return res
    
}

func isSelfDivide(num int) bool {
    strNum := strconv.Itoa(num)
    
    for i := 0; i < len(strNum); i++ {
        n := (int)(strNum[i] - '0')
        if n == 0 || num % n != 0 {
            return false
        }
    }
    
    return true
}
```
