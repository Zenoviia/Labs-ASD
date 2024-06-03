import { directedMatrix } from "./matrixGenerator.js";
import { exponentiateMatrix } from "./matrixGenerator.js";

function findTwoStepPaths(matrix, squaredMatrix) {
  let paths = [];

  squaredMatrix.forEach((row, i) => {
    row.forEach((exists, j) => {
      if (exists) {
        matrix.forEach((innerRow, k) => {
          if (innerRow[j] > 0 && matrix[i][k] === 1 && k !== i && k !== j) {
            paths.push(`(v${i + 1}, v${k + 1}, v${j + 1})`);
          }
        });
      }
    });
  });

  return paths;
}

function findThreeStepPaths(matrix, thirdPowerMatrix) {
  const matrixSize = matrix.length;
  let pathArray = [];

  thirdPowerMatrix.forEach((row, i) => {
    row.forEach((exists, j) => {
      if (exists) {
        matrix.forEach((innerRow, k) => {
          innerRow.forEach((val, l) => {
            if (
              val &&
              matrix[k][l] &&
              matrix[l][j] &&
              (l !== i || l !== j || k !== j)
            ) {
              pathArray.push(`(v${i + 1}, v${k + 1}, v${l + 1}, v${j + 1})`);
            }
          });
        });
      }
    });
  });

  return pathArray;
}

const twoPathArray = findTwoStepPaths(
  directedMatrix,
  exponentiateMatrix(directedMatrix, 2)
);
const threePathArray = findThreeStepPaths(
  directedMatrix,
  exponentiateMatrix(directedMatrix, 3)
);

console.log("Routes of length 2", twoPathArray);
console.log("Routes of length 3", threePathArray);

export { twoPathArray, threePathArray };
