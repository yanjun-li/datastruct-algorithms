import LinkedList from '../linked-list/LinkedList'

const DEFAULTSIZE = 32
const getBucketLinkListNodeSymbol = Symbol('getBucketLinkListNode')
export default class HashTable {
    constructor(size = DEFAULTSIZE) {
        this.buckets = Array(size).fill(null).map(()=> new LinkedList())
        this.keys = {}
    }
    [getBucketLinkListNodeSymbol](key) {
        const hash = this.hash(key)
        const bucketLinkList = this.buckets[hash]
        const node = bucketLinkList.find({callback: (val)=> val.key === key})
        return node
    }
    hash(key) {
        const hash = Array.from(key).reduce((pre, curr)=>{
            return pre + curr.charCodeAt(curr)
        }, 0)
        return hash % this.buckets.length
    }
    set(key, value) {
        const hash = this.hash(key)
        this.keys[key] = hash
        const bucketLinkList = this.buckets[hash]
        const node = bucketLinkList.find({callback: (val)=> val.key === key})
        if(node) {
            node.value.value = value
        } else {
            bucketLinkList.append({key, value})
        }
    }
    get(key) {
        // const hash = this.hash(key)
        // const bucketLinkList = this.buckets[hash]
        // const node = bucketLinkList.find({callback: (val)=> val.key === key})
        const node = this[getBucketLinkListNodeSymbol](key)
        return node ? node.value.value : undefined
    }
    delete(key) {
        const hash = this.hash(key)
        delete this.keys[key]
        const bucketLinkList = this.buckets[hash]
        const node = bucketLinkList.find({callback: (val)=> val.key === key})
        if(node) {
            return bucketLinkList.delete(node.value)
        }
        return null
    }
    has(key) {
        return Object.prototype.hasOwnProperty.call(this.keys, key)
    }
    getKeys() {
        return Object.keys(this.keys)
    }
    getValues() {
        return this.buckets.reduce((values, bucket)=>{
            const  bucketValues = bucket.toArray().map(value=>value.value)
            return values.concat(bucketValues)
        }, [])
    }
}