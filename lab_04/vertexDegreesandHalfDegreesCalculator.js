import { directedMatrix, undirectedMatrix } from "./matrixGenerator.js";

function computeVertexDegrees(matrix) {
  return matrix.map((row, i) =>
    row.reduce(
      (sum, value, j) => (value === 1 || matrix[j][i] === 1 ? sum + 1 : sum),
      0
    )
  );
}

function determineUndirectedVertexDegrees(matrix) {
  return matrix.map((row) =>
    row.reduce((sum, value) => (value === 1 ? sum + 1 : sum), 0)
  );
}

const generateDegreeDescriptions = (vertexDegrees) => {
  return vertexDegrees.map(
    (vertexDegree, vertexIndex) => `Vertex ${vertexIndex + 1}: ${vertexDegree}`
  );
};

let directedVertexDegrees = computeVertexDegrees(directedMatrix);
let undirectedVertexDegrees =
  determineUndirectedVertexDegrees(undirectedMatrix);
let directedDegreeDescriptions = generateDegreeDescriptions(
  directedVertexDegrees
);
let undirectedDegreeDescriptions = generateDegreeDescriptions(
  undirectedVertexDegrees
);

function computeInOutDegrees(matrix) {
  const incomingDegrees = matrix.map((_, columnIndex) =>
    matrix.reduce((sum, row) => sum + row[columnIndex], 0)
  );
  const outgoingDegrees = matrix.map((row) =>
    row.reduce((sum, value) => sum + value, 0)
  );
  return { incomingDegrees, outgoingDegrees };
}

let generateHalfDegreeDescriptions = (halfDegrees) => {
  return halfDegrees.incomingDegrees.map(
    (inDegree, i) =>
      `Vertex ${i + 1}: incoming - ${inDegree}, outgoing - ${
        halfDegrees.outgoingDegrees[i]
      }`
  );
};

let vertexHalfDegrees = computeInOutDegrees(directedMatrix);
let finalHalfDegreeDescriptions =
  generateHalfDegreeDescriptions(vertexHalfDegrees);

console.log(
  "Degrees of vertices of a directed graph",
  directedDegreeDescriptions
);
console.log(
  "Degrees of vertices of an undirected graph",
  undirectedDegreeDescriptions
);
console.log(
  "The half degrees of the entry and exit of the directed graph",
  finalHalfDegreeDescriptions
);

export {
  directedDegreeDescriptions,
  undirectedDegreeDescriptions,
  directedVertexDegrees,
  computeVertexDegrees,
  determineUndirectedVertexDegrees,
  finalHalfDegreeDescriptions,
  computeInOutDegrees,
};
