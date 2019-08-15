import LindedListNode from '../linked-list/LinkedListNode'

export default class DoublyLindedListNode extends LindedListNode {
    constructor(value, next = null, previous = null) {
        super(value, next)
        this.previous = previous
    }
}