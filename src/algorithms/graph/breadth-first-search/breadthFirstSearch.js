import Queue from '../../../data-structures/queue/Queue'
/**
 * @typedef {Object} Callbacks
 * @property {function(vertex:Object):boolean} [allowTraversal] Determines whether BFS should traverse from the vertex to its neighbor
 * @property {function(vertex:Object)} [enterVertex] 
 * @property {function(vertex:Object)} [leaveVertex]
 */
function initCallbacks(callbacks = {}) {
    const initiatedCallback = callbacks
    // 桩代码，保证程序正常运行的无实际逻辑的代码
    const stubCallback = () => { }

    const allowTraversalCallback = (() => {
        const seen = {}
        return ({ nextVertex }) => {
            if (!seen[nextVertex.getKey()]) {
                seen[nextVertex.getKey()] = true
                return true
            }
            return false
        }
    })()

    initiatedCallback.allowTraversal = callbacks.allowTraversal || allowTraversalCallback;
    initiatedCallback.enterVertex = callbacks.enterVertex || stubCallback;
    initiatedCallback.leaveVertex = callbacks.leaveVertex || stubCallback;

    return initiatedCallback;
}
/**
 * 
 * @param {Graph} graph 
 * @param {GraphVertex} startVertex 
 * @param {*} originalCallbacks 
 */
export default function breadthFirstSearch(graph, startVertex, originalCallbacks) {
    const callbacks = initCallbacks(originalCallbacks)
    const vertexQueue = new Queue()

    // 设置初始化队列
    vertexQueue.enqueue(startVertex)
    let previousVertex = null

    while (!vertexQueue.isEmpty()) {
        const currentVertex = vertexQueue.dequeue()
        callbacks.enterVertex({ currentVertex, previousVertex })
        graph.getNeighbors(currentVertex).forEach(nextVertex => {
            if (callbacks.allowTraversal({ previousVertex, currentVertex, nextVertex })) {
                vertexQueue.enqueue(nextVertex)
            }
        })
        callbacks.leaveVertex({ currentVertex, previousVertex })

        previousVertex = currentVertex
    }

}