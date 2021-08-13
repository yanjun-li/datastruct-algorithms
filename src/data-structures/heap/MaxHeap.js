import Heap from "./Heap";
export default class MaxHeap extends Heap {
    pairIsCorrectOrder(item1, item2) {
        return this.compare.greaterThanOrEqual(item1, item2)
    }
}