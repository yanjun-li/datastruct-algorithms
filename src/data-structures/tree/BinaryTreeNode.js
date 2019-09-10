import Comparator from '../../util/Comparator';

export default class BinaryTreeNode {
    constructor(value = null) {
        this.parent = null
        this.left = null
        this.right = null
        this.value = value

        this.meta = new Map()

        this.nodeComparator = new Comparator()
    }
    get leftHeight() {
        if (!this.left) {
            return 0
        }
        return this.left.height + 1
    }
    get rightHeight() {
        if (!this.right) {
            return 0
        }
        return this.right.height + 1
    }
    get height() {
        return Math.max(this.leftHeight, this.rightHeight)
    }
    // 平衡因子
    get balanceFactor() {
        return this.leftHeight - this.rightHeight
    }
    get uncle() {
        if (!this.parent) {
            return undefined
        }
        if (!this.parent.parent) {
            return undefined
        }
        if (!this.parent.parent.left || !this.parent.parent.right) {
            return undefined
        }
        if (this.nodeComparator.equal(this.parent, this.parent.parent.left)) {
            return this.parent.parent.right
        }
        return this.parent.parent.left
    }
    setValue(value) {
        this.value = value
        return this
    }
    setLeft(node) {
        this.left = node
        if (this.left) {
            this.left.parent = this
        }
        return this
    }
    setRight(node) {
        this.right = node
        if (this.right) {
            this.right.parent = this
        }
        return this
    }
    /**
     * 
     * @param {BinaryTreeNode} nodeToRemove 
     * @returns {boolean}
     */
    removeChild(nodeToRemove) {
        if (this.left && this.nodeComparator.equal(this.left, nodeToRemove)) {
            this.left = null
            return true
        }
        if (this.right && this.nodeComparator.equal(this.right, nodeToRemove)) {
            this.right = null
            return true
        }
        return false
    }
    /**
     * 
     * @param {BinaryTreeNode} nodeToReplace 
     * @param {BinaryTreeNode} replacementNode 
     * @returns {boolean}
     */
    replaceChild(nodeToReplace, replacementNode) {
        if (!nodeToReplace || !replacementNode) {
            return false
        }
        if (this.left && this.nodeComparator.equal(this.left, nodeToReplace)) {
            this.left = replacementNode;
            return true;
        }

        if (this.right && this.nodeComparator.equal(this.right, nodeToReplace)) {
            this.right = replacementNode;
            return true;
        }
        return false
    }
    /**
     * 
     * @param {BinaryTreeNode} sourceNode 
     * @returns {BinaryTreeNode}
     */
    static copyNode(sourceNode){
        const newNode = new BinaryTreeNode(sourceNode.value)
        newNode.setLeft(sourceNode.left)
        newNode.setRight(sourceNode.right)
        return newNode
    }
    // 前序遍历Preorder（root-left-right）, 中序遍历Inorder(left-root-right), 后续遍历Postorder(left-right-root)，
    traverseInOrder(){
        let traverse = []
        if(this.left){
            traverse = traverse.concat(this.left.traverseInOrder())
        }
        traverse.push(this.value)

        if(this.right){
            traverse = traverse.concat(this.right.traverseInOrder())
        }
        return traverse
    }
    /**
     * @returns {string}
     */
    toString() {
        return this.traverseInOrder().toString()
    }
}