import { seed } from "./constants.js";



// генерація випадкових чисел для створення матриць
const randomizer = (seed) => {

    let currentValue = seed;
    return function() {
        currentValue = (currentValue * 1 + 12) % 28;
        return currentValue * 0.55 % 1;
    }

}

//створення матриці для графа
const array = (strVariant, isB = false) => {
    const arr = [...String(strVariant)].map(Number);
    const vertexNumber = 10 + arr[2];
    const matrixGenerator = randomizer(strVariant);
    const k = 1.0 - arr[2] * 0.01 - arr[3] * 0.005 - 0.3;
    const directedMatrix = [...Array(vertexNumber)].map(() => Array(vertexNumber).fill(0));

    for (let i = 0; i < vertexNumber; i++) {
        for (let j = 0; j < vertexNumber; j++) {
            if (isB) {
                directedMatrix[i][j] = matrixGenerator();
            } else {
                directedMatrix[i][j] = Math.floor(matrixGenerator() * 2 * k);
            }
        }
    }

    return directedMatrix;
};


//створення ненапрямленої матриці
const createUndirMatrix = (arr) => {
    let undirectedMatrix = arr.map(row => row.slice());

    for (let i = 0; i < undirectedMatrix.length; i++) {
        for (let j = 0; j < undirectedMatrix[i].length; j++) {
            if (undirectedMatrix[i][j] === 1) {
                undirectedMatrix[j][i] = 1;
            }
        }
    }
    return undirectedMatrix;
};


const directedMatrix = array(seed);
const undirectedMatrix = createUndirMatrix(directedMatrix);


export {directedMatrix, undirectedMatrix, array}