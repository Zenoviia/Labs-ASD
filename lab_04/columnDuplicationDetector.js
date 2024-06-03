import { elementWiseResult } from "./strongComponentMatrix.js";
import { vertexNum } from "./constants.js";

const detectDuplicateMatrixColumns = (matrix) => {
  const columnIndices = {};

  for (let columnIndex = 0; columnIndex < matrix[0].length; columnIndex++) {
    let columnIdentifier = "";

    for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
      columnIdentifier += matrix[rowIndex][columnIndex];
    }

    if (columnIndices[columnIdentifier]) {
      columnIndices[columnIdentifier].push(columnIndex);
    } else {
      columnIndices[columnIdentifier] = [columnIndex];
    }
  }

  const duplicateColumns = [];
  for (const key in columnIndices) {
    if (columnIndices.hasOwnProperty(key) && columnIndices[key].length > 1) {
      duplicateColumns.push(columnIndices[key]);
    }
  }
  return duplicateColumns;
};

const duplicatedColumns = detectDuplicateMatrixColumns(elementWiseResult);

const uniqueColumns = Array.from({ length: vertexNum }, (_, i) => i)
  .filter(
    (columnIndex) =>
      !duplicatedColumns.some((indices) => indices.includes(columnIndex))
  )
  .map((columnIndex) => [columnIndex]);

let sortedColumnIndices = uniqueColumns.concat(duplicatedColumns);
sortedColumnIndices.sort((a, b) => a[0] - b[0]);

const stronglyConnectedComponents = sortedColumnIndices;

console.log("Components of strong connectivity", stronglyConnectedComponents);

export { stronglyConnectedComponents };
