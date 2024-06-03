import {
  renderCurve,
  renderCurveArrow,
  renderLine,
  renderLineArrow,
  renderLoop,
  renderLoopArrow,
} from "./canvasLineAndVertexDrawer.js";
import {
  directedGraphVertexMatrix,
  undirectedGraphVertexMatrix,
} from "./coordVertexLinker.js";
import {
  directedVertexCoords,
  undirectedVertexCoord,
} from "./canvasLineAndVertexDrawer.js";
import { vertexCanvasCoordinates } from "./visualizeSortedStrongComponents.js";
import { directedMatrix, undirectedMatrix } from "./matrixGenerator.js";

let checkIntermediateVertex = (firstVertex, secondVertex, verticesCoords) => {
  return verticesCoords.some((vertex) => {
    const { x, y } = vertex;
    const isSameAsFirstVertex = x === firstVertex.x && y === firstVertex.y;
    const isSameAsSecondVertex = x === secondVertex.x && y === secondVertex.y;

    if (isSameAsFirstVertex || isSameAsSecondVertex) return false;

    const collinear =
      (y - firstVertex.y) * (secondVertex.x - firstVertex.x) ===
      (secondVertex.y - firstVertex.y) * (x - firstVertex.x);
    const betweenX =
      (firstVertex.x <= x && x <= secondVertex.x) ||
      (secondVertex.x <= x && x <= firstVertex.x);
    const betweenY =
      (firstVertex.y <= y && y <= secondVertex.y) ||
      (secondVertex.y <= y && y <= firstVertex.y);

    return collinear && betweenX && betweenY;
  });
};

let renderDirectedGraph = (directedMatrix) => {
  directedMatrix.forEach((row, i) => {
    row.forEach((value, j) => {
      if (i <= j) {
        const isDirectedEdge =
          (directedMatrix[i][j] === 1 || directedMatrix[j][i] === 1) &&
          !(directedMatrix[i][j] === 1 && directedMatrix[j][i] === 1);
        const isBidirectionalEdge =
          directedMatrix[i][j] === 1 && directedMatrix[j][i] === 1;

        if (isDirectedEdge) {
          const fromVertex = directedGraphVertexMatrix[i];
          const toVertex = directedGraphVertexMatrix[j];
          const hasIntermediate = checkIntermediateVertex(
            fromVertex,
            toVertex,
            directedVertexCoords
          );

          if (directedMatrix[i][j] === 1 && i < j) {
            hasIntermediate
              ? renderCurveArrow(fromVertex, toVertex)
              : renderLineArrow(fromVertex, toVertex);
          } else {
            hasIntermediate
              ? renderCurveArrow(toVertex, fromVertex)
              : renderLineArrow(toVertex, fromVertex);
          }
        }

        if (isBidirectionalEdge) {
          const fromVertex = directedGraphVertexMatrix[i];
          const toVertex = directedGraphVertexMatrix[j];
          const hasIntermediate = checkIntermediateVertex(
            fromVertex,
            toVertex,
            directedVertexCoords
          );

          if (i === j) {
            renderLoopArrow(fromVertex);
          } else {
            hasIntermediate
              ? renderCurveArrow(fromVertex, toVertex)
              : renderLineArrow(fromVertex, toVertex);
            renderCurveArrow(toVertex, fromVertex);
          }
        }
      }
    });
  });
};

let renderUndirectedGraph = (undirectedMatrix) => {
  undirectedMatrix.forEach((row, i) => {
    row.forEach((value, j) => {
      if (i <= j) {
        if (undirectedMatrix[i][j] === 1 && i === j) {
          renderLoop(undirectedGraphVertexMatrix[i]);
        } else if (
          undirectedMatrix[i][j] === 1 &&
          undirectedMatrix[j][i] === 1
        ) {
          const fromVertex = undirectedGraphVertexMatrix[i];
          const toVertex = undirectedGraphVertexMatrix[j];
          const hasIntermediate = checkIntermediateVertex(
            fromVertex,
            toVertex,
            undirectedVertexCoord
          );

          hasIntermediate
            ? renderCurve(fromVertex, toVertex)
            : renderLine(fromVertex, toVertex);
        }
      }
    });
  });
};

const renderCondensationGraph = (edges) => {
  edges.forEach(({ start, end }) => {
    const hasIntermediate = checkIntermediateVertex(
      start,
      end,
      vertexCanvasCoordinates
    );

    hasIntermediate
      ? renderCurveArrow(start, end)
      : renderLineArrow(start, end);
  });
};

renderDirectedGraph(directedMatrix);
renderUndirectedGraph(undirectedMatrix);

export { renderDirectedGraph, renderUndirectedGraph, renderCondensationGraph };
