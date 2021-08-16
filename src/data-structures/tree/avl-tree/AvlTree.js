import BinarySearchTree from '../binary-search-tree/BinarySearchTree'

export default class AvlTree extends BinarySearchTree {
    insert(value) {
        super.insert(value)

        let currentNode = this.find(value)
        while(currentNode) {
            this.balance(currentNode)
            currentNode = currentNode.parent
        }
    }
    remove(value) {
        super.remove(value)

        this.balance(this.root)
    }
    balance(node) {
        if(node.balanceFactor > 1) {
            if(node.left.balanceFactor > 0) {
                this.rotateLeftLeft(node)
            } else if(node.left.balanceFactor < 0) {
                this.rotateLeftRight(node)
            }
        } else if(node.balanceFactor < -1) {
            if (node.right.balanceFactor < 0) {
                // Right-Right rotation
                this.rotateRightRight(node);
              } else if (node.right.balanceFactor > 0) {
                // Right-Left rotation.
                this.rotateRightLeft(node);
              }
        }
    }

    /**
     * 
     * @param {BinaryTreeNode} rootNode 
     */
    rotateLeftLeft(rootNode) {
        const leftNode = rootNode.left
        rootNode.setLeft(null)

        if(rootNode.parent) {
            rootNode.parent.setLeft(leftNode)
        } else if(rootNode === this.root) {
            this.root = leftNode
        }

        if(leftNode.right) {
            rootNode.setLeft(leftNode.right)
        }

        leftNode.setRight(rootNode)
    }

    rotateLeftRight(rootNode) {
        const leftNode = rootNode.left
        rootNode.setLeft(null)

        const leftRightNode = leftNode.right
        leftNode.setRight(null)

        if(leftRightNode.left) {
            leftNode.setRight(leftRightNode.left)
            leftRightNode.setLeft(null)
        }

        rootNode.setLeft(leftRightNode)

        leftRightNode.setLeft(leftNode)

        this.rotateLeftLeft(rootNode)
    }
    rotateRightLeft(rootNode) {
        const rightNode = rootNode.right
        rootNode.setRight(null)

        const rightLeftNode = rightNode.left
        rightLeftNode.setLeft(null)

        if(rightLeftNode.right) {
            rightNode.setLeft(rightLeftNode.right)
            rightLeftNode.setRight(null)
        }

        rootNode.setRight(rightLeftNode)

        rightLeftNode.setRight(rightNode)

        this.rotateRightRight(rootNode)
    }

    rotateRightRight(rootNode) {
        const rightNode = rootNode.right
        rootNode.setRight(null)

        if(rootNode.parent) {
            rootNode.parent.setRight(rightNode)
        } else if(rightNode === this.root) {
            this.root = rightNode
        }

        if(rightNode.left) {
            rootNode.setRight(rightNode.left)
        }

        rightNode.setLeft(rootNode)
    }
}