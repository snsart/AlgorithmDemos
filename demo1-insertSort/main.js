/*
* 排序数组[4,8,6,2,,1,3,1,5,8,7,9,4]
* */
let arr=[4,8,6,2,1,3,1,5,8,7,9,4];
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

insertSort(arr);
console.log(arr);