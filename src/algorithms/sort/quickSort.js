export default function quickSort(arr) {
    if (arr.length === 0) {
        return []
    }

    let pivot = arr[0]
    let left = []
    let right = []
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat(pivot, quickSort(right))
}