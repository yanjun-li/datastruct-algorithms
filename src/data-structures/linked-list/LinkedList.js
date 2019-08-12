import LinkedListNode from './LinkedListNode'
import { euqal } from '../../util'
class LinkedList {
    /**
     * 
     * @param {Function} compareFn 
     */
    constructor(compareFn = euqal) {
        this.head = null;
        this.tail = null;
        this.compare = compareFn
    }
    /**
     * 
     * @param {*} value 
     * @return {LinkedList}
     */
    prepend(value) {
        let node = new LinkedListNode(value, this.head);
        this.head = node;

        if (!this.tail) {
            this.tail = node;
        }

        return this
    }

    append(value) {
        let node = new LinkedListNode(value)

        if (!this.tail) {
            this.head = node
            this.tail = node
        } else {
            this.tail.next = node;
            this.tail = node;
        }

        return this;
    }

    find(value) {
        if (!this.head) {
            return null
        }

        let currentNode = this.head
        while (currentNode) {
            if (this.compare(currentNode.value, value)) {
                return currentNode
            }
            currentNode = currentNode.next
        }

        return null
    }
    delete(value) {
        let deleteNode = null

        if (!this.head) {
            return deleteNode
        }

        // head 会被替换不能使用if
        // if (this.head && this.compare(this.head.value, value)) {
        while (this.head && this.compare(this.head.value, value)) {
            deleteNode = this.head
            this.head = this.head.next
        }

        let currentNode = this.head;
        while (currentNode && currentNode.next) {
            if (this.compare(currentNode.next.value, value)) {
                deleteNode = currentNode.next
                currentNode.next = deleteNode.next
            } else {
                currentNode = currentNode.next
            }
        }
        if (this.compare(this.tail.value, value)) {
            this.tail = currentNode
        }

        return deleteNode
    }
    travel(callback) {
        let currentNode = this.head
        while (currentNode) {
            callback(currentNode)
            currentNode = currentNode.next
        }
    }
    toNodeArray() {
        let arr = []
        const cb = (node) => {
            arr.push(node)
        }
        this.travel(cb)
        return arr
    }
    toArray() {
        // let array = []
        // let currentNode = this.head
        // if (currentNode) {
        //     array.push(currentNode.value)
        //     currentNode = currentNode.next
        // }
        // return array
        let arr = []
        const cb = (node) => {
            arr.push(node.value)
        }
        this.travel(cb)
        return arr
    }
    /**
     * 
     * @param {Array} values 
     */
    fromArray(values) {
        values.forEach(value => this.append(value))
        return this
    }
    toString(callback) {
        return this.toNodeArray().map(node => node.toString(callback)).toString()
    }
    reverse() {
        let pre = null
        let curr = this.head
        while (curr) {
            let next = curr.next
            curr.next = pre

            pre = curr
            curr = next
        }
        this.tail = this.head
        this.head = pre
    }
}
export default LinkedList
