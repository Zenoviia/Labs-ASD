import { stronglyConnectedComponents } from "./columnDuplicationDetector.js";
import { directedVertexCoords } from "./canvasLineAndVertexDrawer.js";
import { renderCircle } from "./canvasLineAndVertexDrawer.js";
import { canvasContext } from "./constants.js";

const sortStrongComponentsVertices = (componentsArray) => {
  const sortedVertices = [];
  componentsArray.forEach((component) => {
    sortedVertices.push(component[0]);
  });
  return sortedVertices;
};

const sortedStrongComponentsVerticesArray = sortStrongComponentsVertices(
  stronglyConnectedComponents
);

const updateStrongComponentsVertexCoords = (
  sortedComponentVertices,
  directedVertexCoords
) =>
  sortedComponentVertices.reduce((map, vertexIndex) => {
    map[vertexIndex] = directedVertexCoords[vertexIndex];
    return map;
  }, {});

const strongComponentsVertexCoordinates = updateStrongComponentsVertexCoords(
  sortedStrongComponentsVerticesArray,
  directedVertexCoords
);
const vertexCanvasCoordinates = Object.values(
  strongComponentsVertexCoordinates
).map((vertexPos, index) =>
  renderCircle(canvasContext, vertexPos.x + 500, vertexPos.y + 300, index + 1)
);

export {
  vertexCanvasCoordinates,
  updateStrongComponentsVertexCoords,
  strongComponentsVertexCoordinates,
};
