import { directedMatrix } from "./matrixGenerator.js";
import { stronglyConnectedComponents } from "./columnDuplicationDetector.js";

function detectComponentRelations(adjacencyMatrix, strongComponents) {
  const links = {
    from: [],
    to: [],
  };

  strongComponents.forEach((subComponent, i) => {
    subComponent.forEach((vertex) => {
      adjacencyMatrix.forEach((linkedVertices, j) => {
        if (linkedVertices[vertex] === 1 && vertex !== j) {
          const hasLinkedComponent = strongComponents.some(
            (comp, k) => k !== i && comp.includes(j)
          );
          if (hasLinkedComponent) {
            links.from.push(
              strongComponents.findIndex((comp) => comp.includes(j))
            );
            links.to.push(i);
          }
        }
      });
    });
  });

  return links;
}

const detectComponentRelationsResult = detectComponentRelations(
  directedMatrix,
  stronglyConnectedComponents
);
function filterUniquePairs(array) {
  const uniqueLinks = [];
  const visitedPairs = new Set();

  array[0].forEach((fromVertex, i) => {
    const toVertex = array[1][i];
    const pair = [fromVertex, toVertex];
    const identifier = pair.join();

    if (!visitedPairs.has(identifier)) {
      uniqueLinks.push(pair);
      visitedPairs.add(identifier);
    }
  });

  return uniqueLinks;
}

const uniquePairs = filterUniquePairs([
  detectComponentRelationsResult.from,
  detectComponentRelationsResult.to,
]);

export { uniquePairs };
