import {
  directedVertexCoords,
  undirectedVertexCoord,
} from "./canvasLineAndVertexDrawer.js";

const createVertexMatrix = (vertexCoords) => {
  return vertexCoords.reduce((matrix, vertexCoordinate, vertexIndex) => {
    matrix[vertexIndex] = vertexCoordinate;
    return matrix;
  }, {});
};

const directedGraphVertexMatrix = createVertexMatrix(directedVertexCoords);
const undirectedGraphVertexMatrix = createVertexMatrix(undirectedVertexCoord);

export { directedGraphVertexMatrix, undirectedGraphVertexMatrix };
