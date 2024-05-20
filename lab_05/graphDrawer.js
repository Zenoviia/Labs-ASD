import {
  renderCurveArrow,
  renderLineArrow,
  renderLoopArrow,
} from "./edgeDrawer.js";
import {
  directedVertexMatrix,
  graphCoordinates,
  smallVertexCoords,
} from "./vertexCoords.js";
import { directedVertexCoordinates, secondVertexCoord } from "./vertexDrawer.js";
import { renderCircle, renderVerticesWithStatus, smallGraphVertexCoordinates } from "./vertexDrawer.js";
import { canvasContext } from "./constants.js";

let checkConnectionsBetweenVertices = (v1, v2, coords) => {
  for (let i = 0; i < coords.length; i++) {
    const vertex = coords[i];
    if (
      (vertex.x === v1.x && vertex.y === v1.y) ||
      (vertex.x === v2.x && vertex.y === v2.y)
    )
      continue;

    if (
      (vertex.y - v1.y) * (v2.x - v1.x) === (v2.y - v1.y) * (vertex.x - v1.x) &&
      ((v1.x <= vertex.x && vertex.x <= v2.x) ||
        (v2.x <= vertex.x && vertex.x <= v1.x)) &&
      ((v1.y <= vertex.y && vertex.y <= v2.y) ||
        (v2.y <= vertex.y && vertex.y <= v1.y))
    )
      return true;
  }
  return false;
};

let renderDirectedGraph = (dirMatrix) => {
  let dirMat = dirMatrix;

  for (let i = 0; i < dirMat.length; i++) {
    for (let j = i; j < dirMat.length; j++) {
      if (
        (dirMat[i][j] === 1 || dirMat[j][i] === 1) &&
        !(dirMat[i][j] === 1 && dirMat[j][i] === 1)
      ) {
        if (
          checkConnectionsBetweenVertices(
            directedVertexMatrix[i],
            directedVertexMatrix[j],
            directedVertexCoordinates
          )
        ) {
          if (dirMat[i][j] === 1 && i < j) {
            renderCurveArrow(directedVertexMatrix[i], directedVertexMatrix[j]);
          } else {
            renderCurveArrow(directedVertexMatrix[j], directedVertexMatrix[i]);
          }
        } else if (dirMat[i][j] === 1 && i < j) {
          renderLineArrow(directedVertexMatrix[i], directedVertexMatrix[j]);
        } else {
          renderLineArrow(directedVertexMatrix[j], directedVertexMatrix[i]);
        }
      } else if (dirMat[i][j] === 1 && dirMat[j][i] === 1) {
        if (
          checkConnectionsBetweenVertices(
            directedVertexMatrix[i],
            directedVertexMatrix[j],
            directedVertexCoordinates
          )
        ) {
          renderCurveArrow(directedVertexMatrix[i], directedVertexMatrix[j]);
          renderCurveArrow(directedVertexMatrix[j], directedVertexMatrix[i], 1.9);
        } else if (dirMat[i][j] === 1 && i === j) {
          renderLoopArrow(directedVertexMatrix[i]);
        } else {
          renderCurveArrow(directedVertexMatrix[j], directedVertexMatrix[i]);
          renderLineArrow(directedVertexMatrix[i], directedVertexMatrix[j]);
        }
      }
    }
  }
};

let activeVertices = [];

function drawDFSGraph(element, color) {
  const firstEl = element[0];
  const secondEl = element[1];

  if (secondEl === "active") {
    activeVertices.push(firstEl);
    renderVerticesWithStatus(
      canvasContext,
      smallVertexCoords[firstEl].x,
      smallVertexCoords[firstEl].y,
      "a"
    );
    renderCircle(
      canvasContext,
      graphCoordinates[firstEl].x,
      graphCoordinates[firstEl].y,
      firstEl + 1,
      color[firstEl]
    );
  }

  if (secondEl === "visited") {
    renderVerticesWithStatus(
      canvasContext,
      smallVertexCoords[firstEl].x,
      smallVertexCoords[firstEl].y,
      "v"
    );
  }

  if (activeVertices.length === 2) {
    if (
      checkConnectionsBetweenVertices(
        graphCoordinates[activeVertices[0]],
        graphCoordinates[activeVertices[1]],
        secondVertexCoord
      )
    ) {
      renderCurveArrow(
        graphCoordinates[activeVertices[0]],
        graphCoordinates[activeVertices[1]],
        color[activeVertices[0]]
      );
    } else {
      renderLineArrow(
        graphCoordinates[activeVertices[0]],
        graphCoordinates[activeVertices[1]],
        color[activeVertices[0]]
      );
    }
    activeVertices.shift();
  }

  if (secondEl === "closed") {
    renderVerticesWithStatus(
      canvasContext,
      smallVertexCoords[firstEl].x,
      smallVertexCoords[firstEl].y,
      "c"
    );
    activeVertices = [];
  }
}

function drawBFSGraph(element, color) {
  const firstEl = element[0];
  const secondEl = element[1];

  if (secondEl === "active") {
    renderVerticesWithStatus(
      canvasContext,
      smallVertexCoords[firstEl].x,
      smallVertexCoords[firstEl].y,
      "a"
    );
    renderCircle(
      canvasContext,
      graphCoordinates[firstEl].x,
      graphCoordinates[firstEl].y,
      firstEl + 1,
      color[firstEl]
    );
    activeVertices.push(firstEl);
  }

  if (secondEl === "visited" && activeVertices.length !== 0) {
    if (
      checkConnectionsBetweenVertices(
        graphCoordinates[activeVertices[0]],
        graphCoordinates[firstEl],
        secondVertexCoord
      )
    ) {
      renderCurveArrow(
        graphCoordinates[activeVertices[0]],
        graphCoordinates[firstEl],
        color[activeVertices[0]]
      );
    } else {
      renderCircle(
        canvasContext,
        graphCoordinates[firstEl].x,
        graphCoordinates[firstEl].y,
        firstEl + 1,
        color[activeVertices]
      );
      renderLineArrow(
        graphCoordinates[activeVertices[0]],
        graphCoordinates[firstEl],
        color[activeVertices[0]]
      );
      renderVerticesWithStatus(
        canvasContext,
        smallVertexCoords[firstEl].x,
        smallVertexCoords[firstEl].y,
        "v"
      );
    }
  }

  if (secondEl === "closed") {
    renderVerticesWithStatus(
      canvasContext,
      smallVertexCoords[firstEl].x,
      smallVertexCoords[firstEl].y,
      "c"
    );
    activeVertices = [];
  }
}

export { renderDirectedGraph, drawDFSGraph, drawBFSGraph };