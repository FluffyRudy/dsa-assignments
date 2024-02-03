/**
 * Class representing a Graph.
 *
 * @class
 * @classdesc This class represents a graph data structure.
 */
class Graph {
    /**
     * Creates a new instance of the Graph class.
     *
     * @param {number} v - The number of vertices in the graph.
     */
    constructor(v) {
        this.vertexCount = v;
        this.adj = new Array(v).fill(null).map(elem => [])
    }
    /**
     * Adds an edge between two vertices in the graph.
     *
     * @param {number} vertex - The first vertex in the edge.
     * @param {number} connectedVertex - The second vertex in the edge.
     */
    addEdge(vertex, connectedVertex) {
        this.adj[vertex].push(connectedVertex);
    }

    /**
     * Performs a Breadth-First Search (BFS) on the graph.
     *
     * @param {number} start - The starting vertex for the BFS.
     * @returns {Array} An array of vertices in the order they were visited.
     */
    BFS(start) {
        const visited = new Array(this.vertexCount).fill(false);
        const queue = [];
        queue.push(start);
        visited[start] = true;
        const traversedResult = []

        while (queue.length > 0) {
            const poppedVertex = queue.shift();
            traversedResult.push(poppedVertex);

            for (let neighbour of this.adj[poppedVertex]) {
                if (!visited[neighbour]) {
                    queue.push(neighbour);
                    visited[neighbour] = true;
                }
            }
        }
        return traversedResult;
    }

    /**
     * Performs a Depth-First Search (DFS) on the graph.
     *
     * @param {number} start - The starting vertex for the DFS.
     * @returns {Array} An array of vertices in the order they were visited.
     */
    DFS(start) {
        const visited = new Array(this.vertexCount).fill(false);
        const stack = [];
        stack.push(start);
        const traversedResult = [];

        while (stack.length > 0) {
            const poppedVertex = stack.pop();
            if (visited[poppedVertex])
                continue;    

            visited[poppedVertex] =  true;
            traversedResult.push(poppedVertex);
            for (let neighbour of this.adj[poppedVertex]) {
               if (!visited[neighbour])
                stack.push(neighbour);
            }
        }

        return traversedResult;
    }
}

const graph = new Graph(5);
graph.addEdge(0, 2);
graph.addEdge(0, 1);
graph.addEdge(1, 2);
graph.addEdge(2, 0);
graph.addEdge(2, 3);
graph.addEdge(2, 4);
graph.addEdge(3, 3);
graph.addEdge(1, 4);

const BFSResult = graph.BFS(0);
console.log(BFSResult);

const DFSResult = graph.DFS(0);
console.log(DFSResult);