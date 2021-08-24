/**
 * 
 * @param {number[]} numbers 
 * @returns {number}
 */
function minArray(numbers) {
    let left = 0;
    let right = numbers.length - 1
    while(left < right) {
        const mid = left + ((right - left) >> 2)
        if(left > right && numbers[mid] > right){
            left = mid + 1
        } else {
            right = mid
        }
    }
    return left
}
