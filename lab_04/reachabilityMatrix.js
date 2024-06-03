import {
  generateIdentityMatrix,
  exponentiateMatrix,
} from "./matrixGenerator.js";
import { vertexNum } from "./constants.js";
import { directedMatrix } from "./matrixGenerator.js";

function convertToBooleanMatrix(matrix) {
  return matrix.map((row) => row.map((value) => (value ? 1 : 0)));
}

function mergeMatrices(firstMatrix, secondMatrix) {
  return firstMatrix.map((row, i) =>
    row.map((value, j) => value + secondMatrix[i][j])
  );
}

const exponentiatedMatrices = Array.from({ length: vertexNum }, (_, i) =>
  exponentiateMatrix(directedMatrix, i)
);

const identityMatrix = generateIdentityMatrix(vertexNum);
const sumMatrix = exponentiatedMatrices.reduce(
  (accumulator, currentMatrix) => mergeMatrices(accumulator, currentMatrix),
  identityMatrix
);

const accessibilityMatrix = convertToBooleanMatrix(sumMatrix);

console.log("Accessibility matrix", accessibilityMatrix);

export { accessibilityMatrix };
