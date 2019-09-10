/**
 * Traversal LinkedList by callback function.
 * @param {LinkedList} linkedList 
 * @param {Function} callback 
 */
export default function traversal(linkedList, callback){
    let curr = linkedList.head
    while(curr){
        callback(curr.value)
        curr = curr.next
    }
}