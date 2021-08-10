import { swap } from '../../util'
export default function shellSort(array) {
    array = array.slice()
    let step = array.length >> 1;
    while (step > 0) {
        for (let i = step; i < array.length; i++) {
            let current = array[i];
            let previousIndex = i - step;
            while(previousIndex >= 0 && current < array[previousIndex]) {
                swap(array, previousIndex, previousIndex+step);
                previousIndex -= step;
            }
        }
        step = step >> 1
    }
    return array
}