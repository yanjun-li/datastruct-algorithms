import DoublyLinkedListNode from './DoublyLinkedListNode'
import { equal } from '../../util'
export default class DoublyLinkedList {
    /**
     * @param {Function} compareFn 
     */
    constructor(compareFn = equal) {
        this.compareFn = compareFn
        /**@type {DoublyLinkedListNode} */
        this.head = null;
        /**@var DoublyLinkedListNode */
        this.tail = null;
    }
    /**
     * 
     * @param {*} value
     * @return {DoublyLinkedList}
     */
    prepend(value) {
        const newNode = new DoublyLinkedListNode(value, this.head)

        if (this.head) {
            this.head.previous = newNode
        }
        this.head = newNode

        if (!this.tail) {
            this.tail = newNode
        }
        return this
    }

    /**
     * 
     * @param {*} value
     * @return {DoublyLinkedList}
     */
    append(value) {
        const newNode = new DoublyLinkedListNode(value, null, this.tail)
        if (this.tail) {
            this.tail.next = newNode
        }
        newNode.previous = this.tail
        this.tail = newNode
        if (!this.head) {
            this.head = newNode
        }
        return this
    }
    /**
     * 
     * @param {*} value 
     * @returns {DoublyLinkedListNode|null}
     */
    delete(value) {
        if (!this.head) {
            return null
        }
        let deleteNode = null;
        let currentNode = this.head
        while (currentNode) {
            if (this.compareFn(value, currentNode.value)) {
                deleteNode = currentNode
                if (currentNode === this.head) {
                    this.head = currentNode.next
                    if (this.head) {
                        this.head.previous = null
                    } else {
                        this.tail = null
                    }
                } else if (currentNode === this.tail) {
                    this.tail = currentNode.previous
                    this.tail.next = null
                } else {
                    let previousNode = currentNode.previous
                    let nextNode = currentNode.next
                    previousNode.next = nextNode
                    nextNode.previous = previousNode
                }
            }
            currentNode = currentNode.next
        }


        return deleteNode
    }
    /**
     * 
     * @param {Object} param
     * @param {*} param.value
     * @param {Function} param.callback
     * @returns {DoublyLinkedListNode|null}
     */
    find({ value = undefined, callback = undefined }) {
        if (!this.head) {
            return null
        }
        let currentNode = this.head
        while (currentNode) {
            if (callback && callback(currentNode.value)) {
                return currentNode
            }
            if (value !== undefined && this.compareFn(value, currentNode.value)) {
                return currentNode
            }
            currentNode = currentNode.next
        }
        return null
    }

    deleteHead() {
        if (!this.head) {
            return null
        }
        let deleteNode = this.head

        if (this.head.next) {
            this.head = this.head.next
            this.head.previous = null
        } else {
            this.head = null
            this.tail = null
        }

        return deleteNode
    }
    deleteTail() {
        if (!this.tail) {
            return null
        }
        const deleteNode = this.tail
        if (this.head === this.tail) {
            this.head = null
            this.tail = null
        } else {
            this.tail = this.tail.previous
            this.tail.next = null
        }
        return deleteNode
    }
    toArray() {
        const nodes = []
        let currentNode = this.head
        while (currentNode) {
            nodes.push(currentNode)
            currentNode = currentNode.next
        }
        return nodes
    }
    /**
     * 
     * @param {Array} values 
     * @returns {DoublyLinkedList}
     */
    fromArray(values) {
        values.forEach(value => this.append(value))
        return this
    }
    /**
     * 
     * @param {Function} callback 
     */
    toString(callback) {
        return this.toArray().map(node => node.toString(callback)).toString()
    }
    reverse() {
        let currentNode = this.head
        let prevNode = null
        let nextNode = null

        while (currentNode) {
            prevNode = currentNode.previous
            nextNode = currentNode.next

            currentNode.next = prevNode
            currentNode.previous = nextNode

            currentNode = nextNode
        }
        this.tail = this.head
        this.head = prevNode.previous
    }
}