/**
 * 奇数在前，偶数在后
 * @param {number[]} nums 
 */
var exchange = function(nums) {
    let left = 0;
    let right = nums.length - 1
    while(left < right) {
        if(isOdd(nums[left]) && !isOdd(nums[right])) {
            swap(nums, left, right)
        }
        if(!isOdd(nums[left])) {
            left++
        }
        if(isOdd(nums[right])){
            right--
        }
    }
    return nums  
};

function swap(array, i, j) {
    const temp = array[i]
    array[i] = array[j];
    array[j] = temp;
}
function isOdd(number) {
    return (number & 1) === 0
}