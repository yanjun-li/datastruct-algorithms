/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var getKthFromEnd = function (head, k) {
    let slow = head
    let fast = head
    let gap = 0
    while (fast) {
        if (gap < k) {
            gap++
        } else {
            slow = slow.next
        }
        fast = fast.next
    }
    if(!fast && gap < k) {
        return null
    }
    return slow
};