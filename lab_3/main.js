'use strict';


import {
  seed, 
  canvasContext, 
  vertexRadius, 
  vertexSpacing,
  startXDirected,
  startXUndirected,
  startYCoord,
  vertexNum,
} from './constants.js';

const randomizer = (seed) => {

    let value = seed;
    return function() {
        value = (value * 1 + 12) % 28;
        return value * 0.55 % 1;
    }

}

//створення напрямленої матриці
const createDirMatrix = (strVariant) => {

  const arr = [...String(strVariant)].map(Number);
  const count = 10 + arr[2];
  const generator = randomizer(strVariant);
  const k = 1.0 - 2 * 0.02 - 4 * 0.005 - 0.25
  const directedMatrix = [...Array(count)].map(() => Array(count).fill(0));

  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      directedMatrix[i][j] = Math.floor(generator() * 2 * k);
    }
  }

  return directedMatrix;

};

//створення ненапрямленої матриці
const createUndirMatrix  = (arr) => {

  let undirectedMatrix = arr.map((row) => row.slice());

  for (let i = 0; i < undirectedMatrix.length; i++) {
    for (let j = 0; j < undirectedMatrix[i].length; j++) {
      if (undirectedMatrix[i][j] === 1) {
        undirectedMatrix[j][i] = 1;
      }
    }
  }

  return undirectedMatrix;

};

const directedMatrix = createDirMatrix(seed);
console.log("The adjacency matrix of a directed graph:");
console.log(directedMatrix);
const undirectedMatrix = createUndirMatrix (directedMatrix);
console.log("The adjacency matrix of an undirected graph:");
console.log(createUndirMatrix (directedMatrix));

//створення кругів(вершин)
const  = (canvasContext, x, y, number) => {

  canvasContext.beginPath();
  canvasContext.arc(x, y, vertexRadius, 0, 2 * Math.PI);
  canvasContext.strokeStyle = '#fe5b79';
  canvasContext.lineWidth = 2;
  canvasContext.fillStyle = "white";
  canvasContext.fill();
  canvasContext.stroke();
  canvasContext.closePath();
  canvasContext.shadowColor = "rgba(255, 192, 203, 1)";
  canvasContext.shadowBlur = 4;
  canvasContext.fillStyle = "#696969";
  canvasContext.font = "16px Arial";
  canvasContext.textAlign = "center";
  canvasContext.textBaseline = "middle";
  canvasContext.fillText(number, x, y);
  return { x: x, y: y };

};

//Обчислення координатів вершин напрямленого графа
let renderDirectedGraphVertices = (canvasContext, vertexSpacing, x = startXDirected, y = startYCoord) => {

  let curX = x;
  let curY = y;
  let vertexNumber = 1;
  let vertices = [];
  let column1 = 5;
  let column2 = 6;
  let column3 = 7;

  for (let i = 0; i < vertexNum; i++) {
    let vertex = renderCircle(canvasContext, curX, curY, vertexNumber, "#fe5b79", vertexRadius);
    vertices.push(vertex);

    if (i < column1) {
      curX -= 60;
      curY += 100;
    }

    if (i >= column1 && i < column2) {
      curX += 300;
    }

    if (i === column2) {
      curX += 300;
    }

    if (i === column3) {
      curX -= 60;
      curY -= 100;
    }

    if (i > column3) {
      curX -= 60;
      curY -= 100;
    }

    vertexNumber++;

  }

  return vertices;

};

//Обчислення координатів вершин напрямленого графа
let renderUndirectedGraphVertices = (canvasContext, vertexSpacing, x = startXUndirected, y = startYCoord) => {
  return renderDirectedGraphVertices(canvasContext, vertexSpacing, x, y);
};

const directedVertexCoords = renderDirectedGraphVertices(canvasContext, vertexSpacing);
const undirectedVertexCoords = renderUndirectedGraphVertices(canvasContext, vertexSpacing);

let directedGraphVertexMatrix = {};

directedVertexCoords.forEach((vertex, index) => {
  directedGraphVertexMatrix[index] = vertex;
});

let undirectedGraphVertexMatrix = {};
undirectedVertexCoords.forEach((vertex, index) => {
  undirectedGraphVertexMatrix[index] = vertex;
});

//петля
let renderLoop = (startEl, arrowDistance = 30) => {

  let controlX1 = startEl.x - 70;
  let controlY1 = startEl.y - 70;
  let controlX2 = startEl.x + 70;
  let controlY2 = startEl.y - 70;

  let distance = Math.sqrt(2) * 70;
  let ratio = arrowDistance / distance;
  let arrowX = startEl.x + (controlX2 - startEl.x) * ratio;
  let arrowY = startEl.y + (controlY2 - startEl.y) * ratio;

  canvasContext.beginPath();
  canvasContext.moveTo(startEl.x, startEl.y);
  canvasContext.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, startEl.x, startEl.y);
  canvasContext.stroke();

  return { arrowX, arrowY, controlY2, controlX2 };

};

//стрілка для петлі
let renderLoopArrow = (startEl, arrowSize = 8, arrowColor = "#FF1493") => {

  let arrow = renderLoop(startEl);
  let arrowX = arrow.arrowX;
  let arrowY = arrow.arrowY;
  let controlY2 = arrow.controlY2;
  let controlX2 = arrow.controlX2;
  let angle = Math.PI / 4;

  canvasContext.save();
  canvasContext.translate(arrowX, arrowY);
  canvasContext.rotate(Math.atan2(controlY2 - startEl.y, controlX2 - startEl.x) + angle);
  canvasContext.fillStyle = arrowColor;
  canvasContext.beginPath();
  canvasContext.moveTo(0, 0);
  canvasContext.lineTo(-arrowSize, arrowSize);
  canvasContext.lineTo(-arrowSize, -arrowSize);
  canvasContext.closePath();
  canvasContext.fill();
  canvasContext.restore();

};

//пряма
let renderLine = (start, end) => {

  let angle = Math.atan2(end.y - start.y, end.x - start.x);
  let arrowEndX = end.x - 20 * Math.cos(angle);
  let arrowEndY = end.y - 20 * Math.sin(angle);

  canvasContext.beginPath();
  canvasContext.moveTo(start.x, start.y);
  canvasContext.lineTo(arrowEndX, arrowEndY);
  canvasContext.stroke();

  return { angle, arrowEndX, arrowEndY };

};

//стрілка для прямої
let renderLineArrow = (start, end) => {

  let line = renderLine(start, end);
  let angle = line.angle;
  let arrowEndX = line.arrowEndX;
  let arrowEndY = line.arrowEndY;

  angle = Math.atan2(end.y - start.y, end.x - start.x);
  arrowEndX = end.x - 20 * Math.cos(angle);
  arrowEndY = end.y - 20 * Math.sin(angle);

  canvasContext.save();
  canvasContext.translate(arrowEndX, arrowEndY);
  canvasContext.rotate(angle);
  canvasContext.beginPath();
  canvasContext.moveTo(0, 0);
  canvasContext.lineTo(-10, 5);
  canvasContext.lineTo(-10, -5);
  canvasContext.closePath();
  canvasContext.fill();
  canvasContext.restore();

};

//дуга
let renderCurve = (start, end, arrowDistance = 20, bendAngle = Math.PI / 8) => {
  
  let midX = (start.x + end.x) / 2;
  let midY = (start.y + end.y) / 2;

  let distance = Math.sqrt(
    Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
  );

  let newEndX = end.x - ((end.x - start.x) / distance) * arrowDistance;
  let newEndY = end.y - ((end.y - start.y) / distance) * arrowDistance;

  let controlX, controlY;

  if (start.x !== end.x && start.y !== end.y) {
    controlX = midX + Math.cos(bendAngle) * (midY - start.y);
    controlY = midY + Math.sin(bendAngle) * (midX - start.x);
  } else if (start.x === end.x) {
    controlX = midX + 100;
    controlY = midY;
  } else {
    controlX = midX;
    controlY = midY + 100;
  }

  canvasContext.beginPath();
  canvasContext.moveTo(start.x, start.y);
  canvasContext.quadraticCurveTo(controlX, controlY, newEndX, newEndY);
  canvasContext.stroke();

  return { newEndX, newEndY, controlX, controlY };

};

//стрілка для дуги
let renderCurveArrow = (start, end, arrowDistance = 20, arrowSize = 10, arrowColor = "#1E90FF", bendAngle = Math.PI / 1) => {
  
  let arrow = renderCurve(start, end, arrowDistance, bendAngle);
  let newEndX = arrow.newEndX;
  let newEndY = arrow.newEndY;
  let controlX = arrow.controlX;
  let controlY = arrow.controlY;
  let angle = Math.atan2(newEndY - controlY, newEndX - controlX);
  
  canvasContext.save();
  canvasContext.translate(newEndX, newEndY);
  canvasContext.rotate(angle);
  canvasContext.fillStyle = arrowColor;
  canvasContext.beginPath();
  canvasContext.moveTo(0, 0);
  canvasContext.lineTo(-arrowSize, arrowSize / 2);
  canvasContext.lineTo(-arrowSize, -arrowSize / 2);
  canvasContext.closePath();
  canvasContext.fill();
  canvasContext.restore();

};

//перевірка на наявність вершини між двома іншими
let findInterveningVertex = (v1, v2, coords) => {

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

//напрямлений граф
let renderDirectedGraph = (directedMatrix) => {

  let dirMat = directedMatrix;

  for (let i = 0; i < dirMat.length; i++) {
    for (let j = i; j < dirMat.length; j++) {
      if (
        (dirMat[i][j] === 1 || dirMat[j][i] === 1) &&
        !(dirMat[i][j] === 1 && dirMat[j][i] === 1)
      ) {
        if (
          findInterveningVertex(
            directedGraphVertexMatrix[i],
            directedGraphVertexMatrix[j],
            directedVertexCoords
          )
        ) {
          if (dirMat[i][j] === 1 && i < j) {
            renderCurveArrow(directedGraphVertexMatrix[i], directedGraphVertexMatrix[j]);
          } else {
            renderCurveArrow(directedGraphVertexMatrix[j], directedGraphVertexMatrix[i]);
          }
        } else if (dirMat[i][j] === 1 && i < j) {
          renderLineArrow(directedGraphVertexMatrix[i], directedGraphVertexMatrix[j]);
        } else {
          renderLineArrow(directedGraphVertexMatrix[j], directedGraphVertexMatrix[i]);
        }
      } else if (dirMat[i][j] === 1 && dirMat[j][i] === 1) {
        if (
          findInterveningVertex(
            directedGraphVertexMatrix[i],
            directedGraphVertexMatrix[j],
            directedVertexCoords
          )
        ) {
          renderCurveArrow(directedGraphVertexMatrix[i], directedGraphVertexMatrix[j]);
          renderCurveArrow(directedGraphVertexMatrix[j], directedGraphVertexMatrix[i]);
        } else if (dirMat[i][j] === 1 && i === j) {
          renderLoopArrow(directedGraphVertexMatrix[i]);
        } else {
          renderCurveArrow(directedGraphVertexMatrix[j], directedGraphVertexMatrix[i]);
          renderLineArrow(directedGraphVertexMatrix[i], directedGraphVertexMatrix[j]);
        }
      }
    }
  }
};

//ненапрямлений граф
let renderUndirectedGraph = (undirectedMatrix) => {

  let unDirMat = undirectedMatrix;

  for (let i = 0; i < unDirMat.length; i++) {
    for (let j = i; j <= unDirMat.length; j++) {
      if (unDirMat[i][j] === 1 && i === j) {
        renderLoop(undirectedGraphVertexMatrix[i]);
      } else if (unDirMat[i][j] === 1 && unDirMat[j][i] === 1) {
        if (
          findInterveningVertex(
            undirectedGraphVertexMatrix[i],
            undirectedGraphVertexMatrix[j],
            undirectedVertexCoords
          )
        ) {
          renderCurve(undirectedGraphVertexMatrix[i], undirectedGraphVertexMatrix[j]);
        } else renderLine(undirectedGraphVertexMatrix[i], undirectedGraphVertexMatrix[j]);
      }
    }
  }
};

renderDirectedGraph(directedMatrix);
renderUndirectedGraph(undirectedMatrix);

renderDirectedGraphVertices(canvasContext, vertexSpacing);
renderUndirectedGraphVertices(canvasContext, vertexSpacing);