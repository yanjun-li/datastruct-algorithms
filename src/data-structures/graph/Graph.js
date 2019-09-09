import GraphVertex from './GraphVertex'
import GraphEdge from './GraphEdge'
export default class Graph {
    constructor(isDirected = false) {
        this.vertices = {}
        this.edges = {}
        this.isDirected = isDirected
    }
    /**
     * 
     * @param {GraphVertex} vertex 
     * @returns {Graph}
     */
    addVertex(vertex) {
        this.vertices[vertex.getKey()] = vertex
        return this
    }
    /**
     * 
     * @param {string} vertexKey 
     * @returns {GraphVertex}
     */
    getVertexByKey(vertexKey) {
        return this.vertices[vertexKey]
    }
    /**
     * 
     * @param {GraphVertex} vertex 
     * @returns {GraphVertex[]}
     */
    getNeighbors(vertex) {
        return vertex.getNeighbors()
    }
    /**
     * @returns {GraphVertex[]}
     */
    getAllVertices() {
        return Object.values(this.vertices)
    }
    /**
     * @returns {GraphEdge[]}
     */
    getAllEdges() {
        return Object.values(this.edges)
    }
    /**
     * 
     * @param {GraphEdge} edge
     * @returns {Graph} 
     */
    addEdge(edge) {
        // 查看vertex是否原本在graph中
        let startVertex = this.getVertexByKey(edge.startVertex.getKey())
        let endVertex = this.getVertexByKey(edge.endVertex.getKey())
        // 没有需要将vertex插入
        if (!startVertex) {
            this.addVertex(edge.startVertex)
            startVertex = this.getVertexByKey(edge.startVertex.getKey())
        }

        if (!endVertex) {
            this.addVertex(edge.endVertex)
            endVertex = this.getVertexByKey(edge.endVertex.getKey())
        }
        // 检查原本是否有这个edge
        if (this.edges[edge.getKey()]) {
            throw new Error('Edge has already been added before')
        } else {
            this.edges[edge.getKey()] = edge
        }
        // 如果是方向图，在开始vertex插入edge
        if (this.isDirected) {
            startVertex.addEdge(edge)
        } else {
            // 非方向图，两个vertices都插入edge
            startVertex.addEdge(edge)
            endVertex.addEdge(edge)
        }

        return this
    }
    deleteEdge(edge) {
        if (this.edges[edge.getKey()]) {
            delete this.edges[edge.getKey()]
        } else {
            throw new Error('Edge not found in graph')
        }
        const startVertex = this.getVertexByKey(edge.startVertex.getKey())
        const endVertex = this.getVertexByKey(edge.endVertex.getKey())
        startVertex.deleteEdge(edge)
        endVertex.deleteEdge(edge)
    }
    /**
     * @param {GraphVertex} startVertex
     * @param {GraphVertex} endVertex
     * @return {(GraphEdge|null)}
     */
    findEdge(startVertex, endVertex) {
        const vertex = this.getVertexByKey(startVertex.getKey());

        if (!vertex) {
            return null;
        }

        return vertex.findEdge(endVertex);
    }
    getWeight() {
        return this.getAllEdges().reduce((weight, graphEdge) => {
            return weight + graphEdge.weight
        }, 0)
    }
    getVerticesIndices() {
        const verticesIndices = {}
        this.getAllVertices().forEach((vertex, index) => {
            verticesIndices[vertex.getKey()] = index
        })
        return verticesIndices
    }
    /**
     * @returns {*[][]}
     */
    getAdjacencyMatrix() {
        const vertices = this.getAllVertices()
        const verticesIndices = this.getVerticesIndices();

        const adjacencyMatrix = Array(vertices.length).fill(null).map(() => {
            return Array(vertices.length).fill(Infinity)
        })

        vertices.forEach((vertex, vertexIndex) => {
            vertex.getNeighbors().forEach(neighbor => {
                const neighborIndex = verticesIndices[neighbor.getKey()]
                adjacencyMatrix[vertexIndex][neighborIndex] = this.findEdge(vertex, neighbor).weight
            })
        })
        return adjacencyMatrix
    }
    /**
     * Reverse all the edges in directed graph.
     * @return {Graph}
     */
    reverse() {
        /** @param {GraphEdge} edge */
        this.getAllEdges().forEach((edge) => {
            // Delete straight edge from graph and from vertices.
            this.deleteEdge(edge);

            // Reverse the edge.
            edge.reverse();

            // Add reversed edge back to the graph and its vertices.
            this.addEdge(edge);
        });

        return this;
    }
    /**
     * @return {string}
     */
    toString() {
        return Object.keys(this.vertices).toString();
    }
}