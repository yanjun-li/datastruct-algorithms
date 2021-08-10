export default function mergeSort(array) {
    const len = array.length
    if(len === 0 || len === 1) return array
    const mid = len >> 1
    let left = array.slice(0, mid)
    let right = array.slice(mid)
    return _merge(mergeSort(left), mergeSort(right))
}

function _merge(arr1, arr2) {
    const l1 = arr1.length
    const l2 = arr2.length
    if(l1 === 0) {
        return arr2
    }
    if(l2 === 0) {
        return arr1
    }
    let array = []
    let i = 0;
    let j = 0;
    while(i<l1 && j<l2) {
        if(arr1[i]<= arr2[j]) {
            array.push(arr1[i])
            i++
        } else {
            array.push(arr2[j])
            j++
        }
    }
    if(i===l1) {
        return array.concat(arr2.slice(j))
    } else if(j===l2) {
        return array.concat(arr1.slice(i))
    }
    return array
}
