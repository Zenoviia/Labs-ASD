import { vertexCanvasCoordinates } from "./visualizeSortedStrongComponents.js";
import { uniquePairs } from "./strongComponentRelations.js";
import { renderCondensationGraph } from "./graphDrawer.js";

const createVertexConnections = (vertexCoordinatesArray, graphEdges) => {
  return graphEdges.map((edge) => {
    const [firstIndex, lastIndex] = edge;
    const start = vertexCoordinatesArray[firstIndex];
    const end = vertexCoordinatesArray[lastIndex];
    return { start, end };
  });
};

const vertexConnections = createVertexConnections(
  vertexCanvasCoordinates,
  uniquePairs
);

renderCondensationGraph(vertexConnections);

export { vertexConnections };
