import {directedMatrix} from "./adjMatrices.js";
import {BFSAlgorithms} from "./graphTraversal.js";

const BFS = (matrix) => {
    const bfsTraversalMatrix = matrix.map(row => [...row]);
    bfsTraversalMatrix.forEach(row => row.fill(0));

    const queue = new BFSAlgorithms()
    const bfsVisited = Array.from({ length: matrix.length }, () => 0);
    let vertexCount = 1;



    const searchPaths = (start) =>{
        bfsVisited[start] = 1;
        queue.addToQueue(start);

        while (!queue.isQueueEmpty()) {
            const v = queue.removeFromQueue()
            for (let i = 0; i < matrix.length; i++) {
                if (matrix[v][i] === 1 && bfsVisited[i] === 0) {
                    vertexCount++
                    bfsTraversalMatrix[v][i] = 1
                    bfsVisited[i] = vertexCount;
                    queue.addToQueue(i)
                }
            }
        }
    }

    for (let i = 0; i < matrix.length; i++) {
        if (bfsVisited[i] === 0) {
            (searchPaths(i));
        }
    }

    const bfsRoads = queue.getHistoryOfSteps()

    console.group('Матриця BFS')
    console.log(bfsTraversalMatrix);
    console.groupEnd()

    console.group('Вектор BFS')
    bfsVisited.map((item, index)=>{
        console.log(`The new number of vertex ${index + 1} is ${item}`);
    });
    console.groupEnd()


    return bfsRoads;
}
const bfsTraversal = BFS(directedMatrix)
export {bfsTraversal}