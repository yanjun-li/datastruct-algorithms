import { swap } from '../../util'
export default function insertSort(array) {
    array = array.slice()
    for (var i = 1; i < array.length; i++) {
        let current = array[i]
        let previousIndex = i - 1
        while(previousIndex >= 0 && current < array[previousIndex]) {
            swap(array, previousIndex, previousIndex + 1)
            previousIndex--
        }
    }
    return array
}