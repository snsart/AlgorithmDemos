## demo3-heapSort
**��������**
```javascript
/*�ڶ�����У������±��󸸽�㡢���Ӻ��Һ��ӵ��±�*/
function parent(i){
	return Math.ceil(i/2)-1;
}

function left(i){
	return 2*i+1;
}

function right(i){
	return 2*i+2;
}

/*ά���ѵ�����*/
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

/*������*/
function buildMaxHeap(A){
	A.heapSize=A.length;
	for(let i=Math.floor(A.length/2);i>=0;i--){
		maxHeapify(A,i);
	}
}

/*������*/
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