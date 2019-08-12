/*
 * @Author: liyanjun@do-global.com
 * @Date: 2018-08-28 14:40:50
 * @Last Modified by: liyanjun@do-global.com
 * @Last Modified time: 2019-07-31 11:04:48
 */
class LinkedListNode {
    constructor(value, next=null){
        this.value=value
        this.next=next
    }
    toString(callback){
        return callback?callback(this.value):`${this.value}`
    }
}

export default LinkedListNode