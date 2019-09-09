import LinkedList from '../linked-list/LinkedList'
import GraphEdge from './GraphEdge'
export default class GraphVertex {
    constructor(value) {
        if (value === undefined) {
            throw new Error('Graph vertex must have a value')
        }
        /**
         * @param {GraphEdge} edgeA
         * @param {GraphEdge} edgeB
         */
        const edgeCompareFn = (edgeA, edgeB) => {
            if (edgeA.getKey() === edgeB.getKey()) {
                return 0
            }
            return edgeA.getKey() < edgeB.getKey() ? -1 : 1
        }

        this.value = value
        this.edges = new LinkedList(edgeCompareFn)
    }
    /**
     * @returns {string}
     */
    getKey() {
        return this.value
    }
    /**
     * 
     * @param {GraphEdge} edge 
     * @returns {GraphVertex}
     */
    addEdge(edge) {
        this.edges.append(edge)
        return this
    }
    /**
     * 
     * @param {GraphEdge} edge 
     */
    deleteEdge(edge) {
        this.edges.delete(edge)
    }
    getNeighbors() {
        const edges = this.edges.toNodeArray()

        /** @param {LinkedListNode} node */
        const neighborsConverter = (node) => {
            return node.value.startVertex === this ? node.value.endVertex : node.value.startVertex;
        };
        return edges.map(neighborsConverter);
    }
    getEdges() {
        return this.edges.toArray()
    }
    getDegree() {
        return this.edges.toArray().length
    }
    /**
     * 
     * @param {GraphEdge} edge 
     * @returns {boolean} 
     */
    hasEdge(requireEdge) {
        const foundEdge = this.edges.find({ callback: edge => edge === requireEdge })
        return !!foundEdge
    }
    /**
     * 
     * @param {GraphVertex} vertex 
     * @returns {boolean}
     */
    hasNeighbor(vertex) {
        const foundVertex = this.edges.find({ callback: edge => edge.startVertex === vertex || edge.endVertex === vertex })
        return !!foundVertex
    }
    /**
     * 
     * @param {GraphVertex} vertex 
     * @returns {GraphEdge|null}
     */
    findEdge(vertex) {
        const edgeFinder = (edge) => {
            return edge.startVertex === vertex || edge.endVertex === vertex
        }
        const edge = this.edges.find({ callback: edgeFinder })
        return edge ? edge.value : null
    }
    deleteAllEdges() {
        this.getEdges().forEach(edge => {
            this.deleteEdge(edge)
        })
        return this
    }
    /**
     * 
     * @param {Function|undefined} cb 
     * @returns {string}
     */
    toString(cb) {
        return cb ? cb(this.value) : `${this.value}`
    }
}