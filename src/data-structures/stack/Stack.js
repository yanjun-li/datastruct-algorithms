import { equal } from '../../util'
import LinkedList from '../linked-list/LinkedList'
export default class Stack {
    constructor(compareFn = equal) {
        this.linkedList = new LinkedList()
    }
    peek() {
        if (this.isEmpty()) {
            return null
        }
        return this.linkedList.head.value
    }
    isEmpty() {
        return !this.linkedList.head
    }
    push(value) {
        this.linkedList.prepend(value)
    }
    pop() {
        let removeNode = this.linkedList.deleteHead()
        return removeNode ? removeNode.value : null
    }
    toArray(){
        return this.linkedList.toArray()
    }
    /**
     * 
     * @param {Fn} callback 
     * @returns {string} 
     */
    toString(callback) {
        return this.linkedList.toString(callback)
    }
}