import { accessibilityMatrix } from "./reachabilityMatrix.js";

function transposeMatrix(matrix) {
  return matrix[0].map((_, i) => matrix.map((row) => row[i]));
}

function multiplyMatricesElementWise(firstMatrix, secondMatrix) {
  return firstMatrix.map((row, i) =>
    row.map((value, j) => value * secondMatrix[i][j])
  );
}

const transposedMatrix = transposeMatrix(accessibilityMatrix);
const elementWiseResult = multiplyMatricesElementWise(
  accessibilityMatrix,
  transposedMatrix
);

console.log("Matrix of strong connectivity", elementWiseResult);

export { elementWiseResult };
