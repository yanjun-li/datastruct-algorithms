export default class GraphEdge {
    /**
     * 
     * @param {GraphVertex}
     * @param {GraphVertex}
     * @param {number}
     */
    constructor(startVertex, endVertex, weight = 0) {
        this.startVertex = startVertex
        this.endVertex = endVertex
        this.weight = weight
    }
    /**
     * @returns {string}
     */
    getKey() {
        return this.startVertex.getKey() + '_' + this.endVertex.getKey()
    }
    /**
     * @returns {GraphEdge}
     */
    reverse() {
        let tmp = this.startVertex
        this.startVertex = this.endVertex
        this.endVertex = tmp
        return this
    }
    /**
     * 
     * @param {Function|undefined} cb 
     * @returns {string}
     */
    toString(cb) {
        return cb ? cb(this.startVertex, this.endVertex, this.weight) : this.getKey()
    }
}