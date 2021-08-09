function Node(val, neighbors) {
    this.val = val
    this.neighbors = neighbors
}

var cloneGraph = function (node) {
    let newNode = new Node(node.val)
    if (node.neighbors.length > 0) {
        newNode.neighbors = node.neighbors.map(neigbor => {
            let newNeigborNode = cloneGraph(neigbor)
            return newNeigborNode
        })
    } else {
        return []
    }

    return newNode
};