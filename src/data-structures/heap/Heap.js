import Comparator from '../../util/Comparator'
export default class Heap {
    constructor(comparatorFn) {
        if (new.target === Heap) {
            throw new TypeError('Cannot construct Heap instance directly')
        }
        this.heapContainer = [];
        this.compare = new Comparator(comparatorFn)
    }
    getLeftChildIndex(parentIndex) {
        return (2 * parentIndex) + 1
    }
    getRightChildIndex(parentIndex) {
        return (2 * parentIndex) + 2
    }
    getParentIndex(childIndex) {
        return Math.floor((childIndex - 1) / 2)
    }
    hasParent(childIndex) {
        return this.getParentIndex(childIndex) >= 0
    }
    hasLeftChild(parentIndex) {
        return this.getLeftChildIndex(parentIndex) < this.heapContainer.length
    }
    hasRightChild(parentIndex) {
        return this.getRightChildIndex(parentIndex) < this.heapContainer.length
    }
    leftChild(parentIndex) {
        return this.heapContainer[this.getLeftChildIndex(parentIndex)]
    }
    rightChild(parentIndex) {
        return this.heapContainer[this.getRightChildIndex(parentIndex)]
    }
    parent(childIndex) {
        return this.heapContainer[this.getParentIndex(childIndex)]
    }
    swap(index1, index2) {
        const temp = this.heapContainer[index1]
        this.heapContainer[index1] = this.heapContainer[index2]
        this.heapContainer[index2] = temp
    }
    peek() {
        if(this.heapContainer.length === 0) {
            return null
        }
        return this.heapContainer[0]
    }
    poll() {
        if(this.heapContainer.length === 0) {
            return null
        }

        if(this.heapContainer.length === 1) {
            return this.heapContainer.pop()
        }

        const item = this.heapContainer[0]
        this.heapContainer[0] = this.heapContainer.pop()
        this.heapifyDown()
        return item
    }

    add(item) {
        this.heapContainer.push(item)
        this.heapifyUp()
        return this
    }
    remove(item, comparator = this.compare) {
        const numberOfItemsToRemove = this.find(item, comparator).length

        for (let index = 0; index < numberOfItemsToRemove; index++) {
            const indexToRemove = this.find(item, comparator).pop()

            if(indexToRemove === (this.heapContainer.length - 1)) {
                this.heapContainer.pop()
            } else {
                this.heapContainer[indexToRemove] = this.heapContainer.pop()

                const parentItme = this.parent(indexToRemove)

                if(this.hasLeftChild(indexToRemove) && (!parentItme || this.pairIsCorrectOrder(parentItme, this.heapContainer[indexToRemove]))) {
                    this.heapifyDown(indexToRemove)
                } else {
                    this.heapifyUp(indexToRemove)
                }
            }
        }
        return this
    }
    find(item, comparator = this.compare) {
        const foundItemIndeice = []
        for (let itemIndex = 0; itemIndex < this.heapContainer.length; itemIndex++) {
            if(comparator.equal(item, this.heapContainer[itemIndex])){
                foundItemIndeice.push(itemIndex)
            }
        }
        return foundItemIndeice
    }
    isEmpty() {
        return !this.heapContainer.length
    }
    toString() {
        return this.heapContainer.toString()
    }
    heapifyUp(customStartIndex) {
        let currentIndex = customStartIndex || this.heapContainer.length - 1

        while(this.hasParent(currentIndex) && !this.pairIsCorrectOrder(this.parent(currentIndex), this.heapContainer[currentIndex])) {
            this.swap(currentIndex, this.getParentIndex(currentIndex))
            currentIndex = this.getParentIndex(currentIndex)
        }
    }
    heapifyDown(customStartIndex = 0) {
        let currentIndex = customStartIndex;
        let nextIndex = null
        while(this.hasLeftChild(currentIndex)) {
            if(this.hasRightChild(currentIndex) && this.pairIsCorrectOrder(this.rightChild(currentIndex), this.leftChild(currentIndex))){
                nextIndex = this.getRightChildIndex(currentIndex)
            } else {
                nextIndex = this.getLeftChildIndex(currentIndex)
            }

            if(this.pairIsCorrectOrder(this.heapContainer[currentIndex], this.heapContainer[nextIndex])) {
                break
            }

            this.swap(currentIndex, nextIndex)
            currentIndex = nextIndex
        }
    }
    pairIsCorrectOrder(firstItem, secondItem) {
        throw new Error(`You have to implement heap pair comparison for ${firstItem} and ${secondItem} values`)
    }
}