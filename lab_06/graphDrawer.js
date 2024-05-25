import {
  renderCurve,
  renderLine,
  renderLoop,
} from "./edgeDrawer.js";
import { directedGraphVertexMatrix, undirectedGraphVertexMatrix } from "./vertexCoordinateRelations.js";
import { directedVertexCoords, undirectedGraphVertexCoord } from "./vertexDrawer.js";

//перевірка на проміжну вершину
const findInterveningVertex = (v1, v2, coords) => {
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

//малювання напрямленого графа
let renderDirectedGraph = (dirMatrix) => {};

//малювання ненапрямленого графа
const renderUndirectedGraph = (unDirMatrix, colors) => {
  let unDirMat = unDirMatrix;
  let k = 1;

  for (let i = 0; i < unDirMat.length; i++) {
    for (let j = i; j <= unDirMat.length; j++) {
      if (unDirMat[i][j] > 0 && i === j) {
        renderLoop(undirectedGraphVertexMatrix[i]);
      } else if (unDirMat[i][j] > 0 && unDirMat[j][i] > 0) {
        if (
          findInterveningVertex(
            undirectedGraphVertexMatrix[i],
            undirectedGraphVertexMatrix[j],
              undirectedGraphVertexCoord
          )
        ) {
          renderCurve(
            undirectedGraphVertexMatrix[i],
            undirectedGraphVertexMatrix[j],
            unDirMat[j][i],
            colors[k]
          );
          k++;
        } else {
          renderLine(
            undirectedGraphVertexMatrix[i],
            undirectedGraphVertexMatrix[j],
            unDirMat[j][i],
            colors[k]
          );
          k++;
        }
      }
    }
  }
};
//[1,2,3]
let k = 0;
//малювання графа
const renderGraph = (arr, colors) => {
  const firstEl = arr[0];
  const secondEl = arr[1];
  const thirdEl = arr[2];

  if (firstEl === secondEl) {
    renderLoop(directedGraphVertexMatrix[firstEl]);
  } else if (
    findInterveningVertex(
      directedGraphVertexMatrix[firstEl],
      directedGraphVertexMatrix[secondEl],
      directedVertexCoords
    )
  ) {
    renderCurve(
      directedGraphVertexMatrix[firstEl],
      directedGraphVertexMatrix[secondEl],
      thirdEl,
      colors[k]
    );
    k++;
  } else {
    renderLine(
      directedGraphVertexMatrix[firstEl],
      directedGraphVertexMatrix[secondEl],
      thirdEl,
      colors[k]
    );
    k++;
  }
};

export { renderDirectedGraph, renderUndirectedGraph, renderGraph };