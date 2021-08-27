/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * 先广度遍历寻相同根，再深度遍历;
 * @param {TreeNode} A
 * @param {TreeNode} B
 * @return {boolean}
 */
var isSubStructure = function (A, B) {
    if (!B || !A) {
        return false
    }
    return bfs(A, B)
};

function bfs(A, B) {
    let queue = [A]
    while (queue.length > 0) {
        let node = queue.shift()
        if (node.val === B.val) {
            // 此处应判断为包含关系
            let result = isSubTrees(node, B)
            if (result) {
                return true
            }
        }
        if (node.left) {
            queue.push(node.left)
        }
        if (node.right) {
            queue.push(node.right)
        }
    }
    return result
}

// 此处为相同的tree， 不适用于包含关系
function isSameTree(A, B) {
    if (!A && !B) {
        return true
    }
    if (A && B && A.val === B.val) {
        return isSameTree(A.left, B.left) && isSameTree(A.right, B.right)
    } else {
        return false
    }
}

function isSubTrees(A, B) {
    if(!B) {
        return true
    }
    if (A && B && A.val === B.val) {
        return isSubTrees(A.left, B.left) && isSubTrees(A.right, B.right)
    } else {
        return false
    }
}

// 也可全部通过递归深度遍历，更为简洁
var isSubStructure = function (A, B) {
    if (!B || !A) {
        return false
    }
    return isSubTrees(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B)
};