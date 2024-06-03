import { strongComponentsVertexCoordinates } from "./visualizeSortedStrongComponents.js";
import { renderCircle } from "./canvasLineAndVertexDrawer.js";
import { canvasContext } from "./constants.js";

const drawStrongComponentsVertices = (
  coordinates,
  context,
  offsetX = 500,
  offsetY = 300
) => {
  Object.entries(coordinates).forEach(([key, { x, y }], index) => {
    renderCircle(context, x + offsetX, y + offsetY, index + 1);
  });
};

drawStrongComponentsVertices(strongComponentsVertexCoordinates, canvasContext);

export { drawStrongComponentsVertices };
