import { array, undirectedMatrix } from "./adjMatrices.js";


//генерація матриць ваг на основі вхідної матриці
const generateWeightMatrix = (matrix) => {
  const matrixLength = matrix.length;
  const B = array("3124", true);
  const W = Array.from({ length: matrixLength }, () => Array(matrixLength).fill(0));

  //обрахунок C
  const C = [];
  for (let i = 0; i < matrixLength; i++) {
    C[i] = [];
    for (let j = 0; j < matrixLength; j++) {
      C[i][j] = Math.ceil(100 * B[i][j] * matrix[i][j]);
    }
  }

  //обрахунок D
  const D = [];
  for (let i = 0; i < matrixLength; i++) {
    D[i] = [];
    for (let j = 0; j < matrixLength; j++) {
      if (C[i][j] === 0) {
        D[i][j] = 0;
      } else {
        D[i][j] = 1;
      }
    }
  }

  //обрахунок H
  const H = [];
  for (let i = 0; i < matrixLength; i++) {
    H[i] = [];
    for (let j = 0; j < matrixLength; j++) {
      if (D[i][j] !== D[j][i]) {
        H[i][j] = 1;
      } else {
        H[i][j] = 0;
      }
    }
  }

  //обрахунок Tr
  const Tr = [];
  for (let i = 0; i < matrixLength; i++) {
    Tr[i] = [];
    for (let j = 0; j < matrixLength; j++) {
      if (i <= j) {
        Tr[i][j] = 1;
      } else {
        Tr[i][j] = 0;
      }
    }
  }

  //обрахунок W
  for (let i = 0; i < matrixLength; i++) {
    for (let j = 0; j < i; j++) {
      W[i][j] = W[j][i] = (D[i][j] + H[i][j] * Tr[i][j]) * C[i][j];
    }
  }

  return W;
};

const finalWeightMatrix = generateWeightMatrix(undirectedMatrix);
console.log("weightMatrix", finalWeightMatrix);
export { finalWeightMatrix };