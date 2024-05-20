import {directedMatrix} from "./adjMatrices.js";
import {DFSAlgorithm} from "./graphTraversal.js";


const DFS = (matrix) => {

    const dfsTraversalMatrix = matrix.map(row => [...row]);
    dfsTraversalMatrix.forEach(row => row.fill(0));

    const stack = new DFSAlgorithm();
    const dfs = Array.from({ length: matrix.length }, () => 0);
    let vertexCount = 1;

    const searchPaths = (start) => {
        dfs[start] = 1;
        stack.addToStack(start);

        while (!stack.isStackEmpty()) {
            const v = stack.topOfStack();
            let found = false;
            for (let i = 0; i < matrix.length; i++) {

                if (matrix[v][i] === 1 && dfs[i] === 0) {
                    vertexCount++;
                    dfsTraversalMatrix[v][i] = 1;
                    dfs[i] = vertexCount;
                    stack.addToStack(i);
                    found = true;
                    break;
                }
            }
            if (!found) {
                stack.removeFromStack();
            }
            
        }

    };

    for (let i = 0; i < matrix.length; i++) {
        if (dfs[i] === 0) {
            (searchPaths(i));
        }
    }

    const myDFSroads = stack.getHistoryOfSteps()


    console.group('Матриця DFS')
    console.log(dfsTraversalMatrix);
    console.groupEnd()

    console.group('Вектор DFS')
    dfs.map((item, index)=>{
        console.log(`The new number of vertex ${index + 1} is ${item}`);
    });
    console.groupEnd()


    return myDFSroads;
};

const dfsTraversal = DFS(directedMatrix);
export {dfsTraversal}