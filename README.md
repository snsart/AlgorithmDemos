# AlgorithmDemos
---
## demo1-insertSort
**思路**：插入排序的基本操作就是将一个数据插入到已经排好序的有序数据中，从而得到一个新的、个数加一的有序数据；基本思想为每步将一个待排序的记录，按其关键码值的大小插入前面已经排序的文件中适当位置上，直到全部插入完为止。<br>
**算法思想**：**增量（incremental）方法**——在排好子数组A[1..j-1]后，将A[j]插入，形成排好序的子数组A[1..j];<br>
**代码如下**：
```javascript
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
## demo2-mergeSort
**代码如下**：
```javascript
function mergeArray(arr,left,mid,right){
    let tempArr=[];
    let l=left;
    let r=mid+1;
    while(l<=mid&&r<=right){
        if(arr[l]<arr[r]){
            tempArr.push(arr[l++]);
        }else{
            tempArr.push(arr[r++]);
        }
    }
    while (l<=mid){
        tempArr.push(arr[l++]);
    }
    while(r<=right){
        tempArr.push(arr[r++]);
    }
    for(let i=0;i<tempArr.length;i++){
        arr[left+i]=tempArr[i];/*注意这里是arr[left+i]，而不是arr[i]*/
    }
}

function mergeSort(arr,left,right){
    if(left<right){
        let mid=Math.floor((left+right)/2);
        mergeSort(arr,left,mid);
        mergeSort(arr,mid+1,right);
        mergeArray(arr,left,mid,right);
    }
}

let arr=[4,8,6,2,1,3,1,5,8,7,9,4,8];
mergeSort(arr,0,arr.length-1);
console.log(arr);
```
## demo3-heapSort
**代码如下**
```javascript
/*在二叉堆中，根据下标求父结点、左孩子和右孩子的下标*/
function parent(i){
	return Math.ceil(i/2)-1;
}

function left(i){
	return 2*i+1;
}

function right(i){
	return 2*i+2;
}

/*维护堆的性质*/
function maxHeapify(A,i){
	let largest;
	let l=left(i);
	let r=right(i);
	if(l<A.heapSize&&A[l]>A[i]){
		largest=l;
	}else{
		largest=i;
	}
	if(r<A.heapSize&&A[r]>A[largest]){
		largest=r;
	}
	if(largest!=i){
		let temp=A[largest];
		A[largest]=A[i];
		A[i]=temp;
		maxHeapify(A,largest);
	}
}

/*建最大堆*/
function buildMaxHeap(A){
	A.heapSize=A.length;
	for(let i=Math.floor(A.length/2);i>=0;i--){
		maxHeapify(A,i);
	}
}

/*堆排序*/
function heapSort(A){
	buildMaxHeap(A);
	for(var i=A.length-1;i>=1;i--){
		var temp=A[0];
		A[0]=A[i];
		A[i]=temp;
		A.heapSize--;
		maxHeapify(A,0);
	}
}

var arr=[4,8,6,2,1,3,1,5,8,7,9,4,8];
heapSort(arr);
console.log(arr);
```

