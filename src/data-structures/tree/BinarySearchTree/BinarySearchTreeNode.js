import BinaryTreeNode from '../BinaryTreeNode'
import Comparator from '../../../util/Comparator'

export default class BinarySearchTreeNode extends BinaryTreeNode {
    constructor(value = null, compareFn = undefined) {
        super(value)

        this.compareFn = compareFn
        this.nodeValueComparator = new Comparator(compareFn)
    }
    /**
     * 
     * @param {*} value 
     * @returns {BinarySearchTreeNode}
     */
    insert(value) {
        if (this.value === null) {
            this.setValue(value)
            return this
        }
        if (this.nodeComparator.lessThan(value, this.value)) {
            if(this.left){
                this.left.insert(value)
            }
            const newNode = new BinarySearchTreeNode(value)
            this.setLeft(newNode)
            return newNode
        }
        if (this.nodeComparator.greaterThan(value, this.value)) {
            if(this.right){
                this.right.insert(value)
            }
            const newNode = new BinarySearchTreeNode(value)
            this.setRight(newNode)
            return newNode
        }
        return this
    }
    find(value) {

    }

    remove(value) {

    }
    findMin() {

    }
    contains(value) {

    }
}