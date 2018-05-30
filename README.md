# AlgorithmDemos


## demo1-insertSort
---
思路：插入排序的基本操作就是将一个数据插入到已经排好序的有序数据中，从而得到一个新的、个数加一的有序数据；基本思想为每步将一个待排序的记录，按其关键码值的大小插入前面已经排序的文件中适当位置上，直到全部插入完为止。
算法思想：增量（incremental）方法——在排好子数组A[1..j-1]后，将A[j]插入，形成排好序的子数组A[1..j];
代码如下：
```
function insertSort(arr){
    for(let i=1;i<=arr.length;i++){
        let temp=arr[i];
        for(let j=i-1;j>=0;j--){
            if(arr[j]>temp){
                let t=arr[j+1];
                arr[j+1]=arr[j];
                arr[j]=t;
            }
        }
    }
}
```
