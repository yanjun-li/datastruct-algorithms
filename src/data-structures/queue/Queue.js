import { equal } from '../../util'
import LinkedList from '../linked-list/LinkedList'
class Queue {
    constructor(compareFn = equal){
        this.compare = compareFn
        this.linkedList = new LinkedList()
    }
    isEmpty(){
        return !this.linkedList.head
    }
    peek(){
        const headNode = this.linkedList.head
        if(!headNode){
            return null
        }
        return headNode.value
    }
    enqueue(value){
        this.linkedList.append(value)
    }
    dequeue(){
       let removeNode =  this.linkedList.deleteHead()
       return removeNode ? removeNode.value : null
    }
    toString(callback){
        return this.linkedList.toString(callback)
    }
}
export default Queue