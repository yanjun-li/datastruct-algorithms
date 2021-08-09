import  traversal from './traversal.js'
import LinkedList from 'src/data-structures/linked-list/LinkedList'
const palindromeLinkedList =  new LinkedList()
const isPalindrome = () => {

}

function a (head) {
    if (head === null) return null;
    let cloneHead = new Node(head.val, null, head.random);
    let current = head;
    let pre = cloneHead
    while(current.next) {
        let nextNode = current.next
        let cloneNode = new Node(nextNode.val, null, nextNode.random)
        pre.next = cloneNode
        pre = cloneNode
        current = nextNode
    }
    return cloneHead
}