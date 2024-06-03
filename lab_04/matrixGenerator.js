import { seed } from "./constants.js";

const randomizer = (seed) => {
  let currentValue = seed;
  return function () {
    currentValue = (currentValue * 1103515245 + 12345) % 2147483648;
    return currentValue % 100 < 12;
  };
};

const createDirMatrix = (seed) => {
  const [a, b, c, d] = [...String(seed)].map(Number);
  const vertexCount = 10 + c;
  const k = 1.0 - c * 0.01 - d * 0.01 - 0.3;
  const randomGen = randomizer(seed);

  return Array.from({ length: vertexCount }, () =>
    Array(vertexCount)
      .fill(0)
      .map(() => Math.floor(randomGen() * 2 * k))
  );
};

const createUndirMatrix = (array) => {
  const undirectedMatrix = [];

  for (let i = 0; i < array.length; i++) {
    const newRow = [];
    for (let j = 0; j < array[i].length; j++) {
      newRow.push(array[i][j]);
    }
    undirectedMatrix.push(newRow);
  }

  for (let i = 0; i < undirectedMatrix.length; i++) {
    for (let j = i + 1; j < undirectedMatrix[i].length; j++) {
      if (undirectedMatrix[i][j] === 1) {
        undirectedMatrix[j][i] = 1;
      } else if (undirectedMatrix[j][i] === 1) {
        undirectedMatrix[i][j] = 1;
      }
    }
  }

  return undirectedMatrix;
};

const directedMatrix = createDirMatrix(seed);
const undirectedMatrix = createUndirMatrix(directedMatrix);

let generateIdentityMatrix = (matrixSize) => {
  return Array.from({ length: matrixSize }, (_, i) =>
    Array.from({ length: matrixSize }, (_, j) => (i === j ? 1 : 0))
  );
};

let matrixMultiplication = (firstMatrix, secondMatrix) => {
  return firstMatrix.map((row) =>
    secondMatrix[0].map((_, j) =>
      row.reduce((sum, element, k) => sum + element * secondMatrix[k][j], 0)
    )
  );
};

let exponentiateMatrix = (matrix, power) => {
  let result = generateIdentityMatrix(matrix.length);
  while (power > 0) {
    if (power % 2 === 1) {
      result = matrixMultiplication(result, matrix);
    }
    matrix = matrixMultiplication(matrix, matrix);
    power = Math.floor(power / 2);
  }
  return result;
};

console.log("The adjacency matrix of a directed graph", directedMatrix);
console.log("The adjacency matrix of an undirected graph", undirectedMatrix);

export {
  directedMatrix,
  undirectedMatrix,
  generateIdentityMatrix,
  exponentiateMatrix,
  matrixMultiplication,
};
