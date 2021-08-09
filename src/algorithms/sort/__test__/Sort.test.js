import quickSort from '../quickSort'
import insertSort from '../insertSort'

let array = [6, 8, 4, 7, 9, 3, 5, 1]
describe('quick sort', () => {
    it('should', () => {
        let sortedArr = quickSort(array)
        expect(sortedArr).toEqual([1, 3, 4, 5, 6, 7, 8, 9])
    })
})

describe('insert sort', () => {
    it('should', () => {
        let sortedArr = insertSort(array)
        expect(sortedArr).toEqual([1, 3, 4, 5, 6, 7, 8, 9])
    })
})