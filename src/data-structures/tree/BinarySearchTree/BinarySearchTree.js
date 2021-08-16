import BinaryTreeNode from "../BinaryTreeNode"
import Comparator from "../../../util/Comparator"
export default class BinarySearchTree {
    constructor(nodeValueCompareFunction) {
        this.root = new BinaryTreeNode()
        this.compare = new Comparator(nodeValueCompareFunction)
    }
    insert(value) {
        let currentNode = this.root
        if (this.compare.equal(currentNode.value, null)) {
            currentNode.value = value
            return this
        }
        // let needInsert = true
        while(currentNode) {
            if(this.compare.lessThan(value, currentNode.value)) {
                if (currentNode.left) {
                    currentNode = currentNode.left
                } else {
                    const newNode = new BinaryTreeNode(value)
                    currentNode.setLeft(newNode)
                    return this
                }
            }
            if (this.compare.greaterThan(value, currentNode.value)) {
                if (currentNode.right) {
                    currentNode = currentNode.right
                } else {
                    const newNode = new BinaryTreeNode(value)
                    currentNode.setRight(newNode)
                    return this
                }
            }
        }
    }
    find(value) {
        let currentNode = this.root
        if (this.compare.equal(value, currentNode.value)) {
            return currentNode
        }
        while (currentNode.left && this.compare.lessThan(value, currentNode.value)) {
            currentNode = currentNode.left
            if(currentNode.value === value) {
                return currentNode
            }
        }
        while (currentNode.right && this.compare.greaterThan(value, currentNode.value)) {
            currentNode = currentNode.right
            if(currentNode.value === value) {
                return currentNode
            }
        }
        return null
    }
    remove(value) {
        const nodeToRemove = this.find(value)
        if (!nodeToRemove) {
            throw new Error('Item not found in the tree');
        }
        const { parent } = nodeToRemove

        if(!nodeToRemove.left && !nodeToRemove.right) {
            if(parent) {
                parent.removeChild(nodeToRemove)
            } else {
                nodeToRemove.setValue(null)
            }
        } else if(nodeToRemove.left && nodeToRemove.right) {
            const minInRight = this.findMinInRight()
            if(!this.compare.equal(minInRight, nodeToRemove.right)){
                this.remove(minInRight.value)
                nodeToRemove.setValue(minInRight.value)
            } else {
                nodeToRemove.setValue(nodeToRemove.right.value)
                nodeToRemove.setRight(nodeToRemove.right.right)
            }
        } else {
            const child = nodeToRemove.left || nodeToRemove.right
            if(parent) {
                parent.removeChild(child)
            } else {
                BinaryTreeNode.copyNode(child, nodeToRemove);
            }
        }
        nodeToRemove.parent = null;
        return true
    }
    contains(value) {
        return !!this.find(value)
    }
    findMinInRight() {
        let currentNode = this.root
        let right = this.root.right
        let min = right
        while(right.left) {
            min = right.left
        }
        return min
    }
    toString() {
        return this.root.toString()
    }
}