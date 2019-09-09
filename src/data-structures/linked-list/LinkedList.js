import LinkedListNode from './LinkedListNode'
import Comparator from '../../util/Comparator'
class LinkedList {
    /**
     * 
     * @param {Function} compareFn 
     */
    constructor(compareFn) {
        this.head = null;
        this.tail = null;
        this.compare = new Comparator(compareFn)
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

    /**
     * @param {Object} findParams
     * @param {*} findParams.value
     * @param {function} [findParams.callback]
     * @return {LinkedListNode}
     */
    find({ value = undefined, callback = undefined }) {
        if (!this.head) {
            return null;
        }

        let currentNode = this.head;

        while (currentNode) {
            // If callback is specified then try to find node by callback.
            if (callback && callback(currentNode.value)) {
                return currentNode;
            }

            // If value is specified then try to compare by value..
            if (value !== undefined && this.compare.equal(currentNode.value, value)) {
                return currentNode;
            }

            currentNode = currentNode.next;
        }

        return null;
    }
    delete(value) {
        let deleteNode = null

        if (!this.head) {
            return deleteNode
        }

        // head 会被替换不能使用if
        // if (this.head && this.compare(this.head.value, value)) {
        while (this.head && this.compare.equal(this.head.value, value)) {
            deleteNode = this.head
            this.head = this.head.next
        }

        let currentNode = this.head;
        // if (currentNode !== null) {
        //     while (currentNode.next) {
        //         if (this.compare(currentNode.next.value, value)) {
        //             deleteNode = currentNode.next
        //             currentNode.next = deleteNode.next
        //         } else {
        //             currentNode = currentNode.next
        //         }
        //     }
        // }

        while (currentNode && currentNode.next) {
            if (this.compare.equal(currentNode.next.value, value)) {
                deleteNode = currentNode.next
                currentNode.next = deleteNode.next
            } else {
                currentNode = currentNode.next
            }
        }
        if (this.compare.equal(this.tail.value, value)) {
            this.tail = currentNode
        }

        return deleteNode
    }
    deleteHead() {
        let deleteNode = this.head
        if (this.head) {
            this.head = this.head.next
            if (!this.head) {
                this.tail = null
            }
        }
        return deleteNode
    }

    deleteTail() {
        let deleteNode = this.tail

        if (!this.head.next) {
            this.head = null
            this.tail = null
            return deleteNode
        }

        let currentNode = this.head
        while (currentNode.next) {
            if (!currentNode.next.next) {
                currentNode.next = null
            } else {
                currentNode = currentNode.next
            }
        }
        this.tail = currentNode

        return deleteNode
    }
    travel(callback) {
        let currentNode = this.head
        while (currentNode) {
            callback(currentNode)
            currentNode = currentNode.next
        }
    }
    /**
     * @returns {LinkedListNode[]}
     */
    toNodeArray() {
        let arr = []
        let curr = this.head
        while(curr){
            arr.push(curr)
            curr = curr.next
        }
        return arr
    }
    /**
     * @returns {string[]}
     */
    toArray() {
        let arr = []
        let curr = this.head
        while(curr){
            arr.push(curr.value)
            curr = curr.next
        }
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
