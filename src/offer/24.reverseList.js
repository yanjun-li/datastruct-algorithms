/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
 var reverseList = function(head) {
     if(head.next === null) {
         return head
     }
    let newHead = reverseList(head.next)
    head.next.next = head
    head.next = null
    return newHead
};


function ListNode(val, node=null) {
    this.val = val;
    this.next = node;
}

let n3 =  new ListNode(3)
let n2 = new ListNode(2, n3)
let head = new ListNode(1, n2)

reverseList(head)