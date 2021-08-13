import Heap from "./Heap";
export default class MInHeap extends Heap {
    pairIsCorrectOrder(item1, item2) {
        return this.compare.lessThanOrEqual(item1, item2)
    }
}