import quickSort from '../quickSort'
import insertSort from '../insertSort'
import shellSort from '../shellSort'
import mergeSort from '../mergeSort'

let array = [6, 8, 4, 7, 3, 5, 1]
describe('quick sort', () => {
    it('should', () => {
        let sortedArr = quickSort(array)
        expect(sortedArr).toEqual([1, 3, 4, 5, 6, 7, 8])
    })
})

describe('insert sort', () => {
    it('should', () => {
        let sortedArr = insertSort(array)
        expect(sortedArr).toEqual([1, 3, 4, 5, 6, 7, 8])
    })
})

describe('shell sort', () => {
    it('should', () => {
        let sortedArr = shellSort(array)
        expect(sortedArr).toEqual([1, 3, 4, 5, 6, 7, 8])
    })
})
describe('merge sort', () => {
    it('should', () => {
        let sortedArr = mergeSort(array)
        expect(sortedArr).toEqual([1, 3, 4, 5, 6, 7, 8])
    })
})