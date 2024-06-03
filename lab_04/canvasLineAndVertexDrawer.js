import {
  seed,
  drawingCanvas,
  canvasContext,
  vertexRadius,
  vertexSpacing,
  startXDirected,
  startXUndirected,
  startYCoord,
  vertexNum,
} from "./constants.js";

function renderLoop(startingVertex, arrowSpacing = 30) {
  const { x1, y1, x2, y2 } = calculateBezierControlPoints(startingVertex);
  const { arrowX, arrowY } = calculateArrowCoords(
    startingVertex,
    { x2, y2 },
    arrowSpacing
  );

  canvasContext.beginPath();
  canvasContext.moveTo(startingVertex.x, startingVertex.y);
  canvasContext.bezierCurveTo(
    x1,
    y1,
    x2,
    y2,
    startingVertex.x,
    startingVertex.y
  );
  canvasContext.stroke();

  return { arrowX, arrowY, x2, y2 };
}

function renderLoopArrow(
  startingVertex,
  arrowSize = 8,
  arrowColor = "MediumVioletRed"
) {
  const { arrowX, arrowY, x2, y2 } = renderLoop(startingVertex);
  drawArrowHead(
    arrowX,
    arrowY,
    x2,
    startingVertex.x,
    startingVertex.y,
    arrowSize,
    arrowColor,
    Math.PI / 4
  );
}

function renderLine(startPoint, endPoint) {
  const lineAngle = Math.atan2(
    endPoint.y - startPoint.y,
    endPoint.x - startPoint.x
  );
  const { endX, endY } = calculateEndCoords(endPoint, lineAngle, vertexRadius);

  canvasContext.beginPath();
  canvasContext.moveTo(
    startPoint.x + vertexRadius * Math.cos(lineAngle),
    startPoint.y + vertexRadius * Math.sin(lineAngle)
  );
  canvasContext.lineTo(endX, endY);
  canvasContext.stroke();

  return { lineAngle, endX, endY };
}

function renderLineArrow(startPoint, endPoint) {
  const { lineAngle, endX, endY } = renderLine(startPoint, endPoint);
  drawArrowHead(endX, endY, lineAngle, 10);
}

function renderCurve(start, end, arrowDistance = 20, bendAngle = Math.PI / 8) {
  const { midX, midY } = calculateMidPoint(start, end);
  const distance = calculateDistance(start, end);
  const { newEndX, newEndY } = calculateNewEndCoords(
    start,
    end,
    distance,
    arrowDistance
  );
  const { controlX, controlY } = calculateControlPoints(
    start,
    end,
    midX,
    midY,
    bendAngle
  );

  const startAngle = Math.atan2(controlY - start.y, controlX - start.x);
  const endAngle = Math.atan2(newEndY - controlY, newEndX - controlX);

  canvasContext.beginPath();
  canvasContext.moveTo(
    start.x + vertexRadius * Math.cos(startAngle),
    start.y + vertexRadius * Math.sin(startAngle)
  );
  canvasContext.quadraticCurveTo(controlX, controlY, newEndX, newEndY);
  canvasContext.stroke();

  return { newEndX, newEndY, controlX, controlY };
}

function renderCurveArrow(
  start,
  end,
  arrowDistance = 20,
  arrowSize = 10,
  arrowColor = "PaleVioletRed",
  bendAngle = Math.PI / 1
) {
  const { newEndX, newEndY, controlX, controlY } = renderCurve(
    start,
    end,
    arrowDistance,
    bendAngle
  );
  const angle = Math.atan2(newEndY - controlY, newEndX - controlX);
  drawArrowHead(newEndX, newEndY, angle, arrowSize, arrowColor);
}

function calculateBezierControlPoints(startingVertex) {
  const x1 = startingVertex.x - 70;
  const y1 = startingVertex.y - 70;
  const x2 = startingVertex.x + 70;
  const y2 = startingVertex.y - 70;
  return { x1, y1, x2, y2 };
}

function calculateArrowCoords(startingVertex, controlPoints, arrowSpacing) {
  const pointDistance = Math.sqrt(2) * 70;
  const proportion = arrowSpacing / pointDistance;
  const arrowX =
    startingVertex.x + (controlPoints.x2 - startingVertex.x) * proportion;
  const arrowY =
    startingVertex.y + (controlPoints.y2 - startingVertex.y) * proportion;
  return { arrowX, arrowY };
}

function calculateEndCoords(endPoint, angle, distance) {
  const endX = endPoint.x - distance * Math.cos(angle);
  const endY = endPoint.y - distance * Math.sin(angle);
  return { endX, endY };
}

function drawArrowHead(x, y, angle, size, color = "black", rotation = 0) {
  canvasContext.save();
  canvasContext.translate(x, y);
  canvasContext.rotate(angle + rotation);
  canvasContext.fillStyle = color;
  canvasContext.beginPath();
  canvasContext.moveTo(0, 0);
  canvasContext.lineTo(-size, size / 2);
  canvasContext.lineTo(-size, -size / 2);
  canvasContext.closePath();
  canvasContext.fill();
  canvasContext.restore();
}

function calculateMidPoint(start, end) {
  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;
  return { midX, midY };
}

function calculateDistance(start, end) {
  return Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
}

function calculateNewEndCoords(start, end, distance, arrowDistance) {
  const ratio = arrowDistance / distance;
  const newEndX = start.x + (end.x - start.x) * (1 - ratio);
  const newEndY = start.y + (end.y - start.y) * (1 - ratio);
  return { newEndX, newEndY };
}

function calculateControlPoints(start, end, midX, midY, bendAngle) {
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
  return { controlX, controlY };
}

let renderCircle = (canvasContext, coordX, coordY, vertexNumber) => {
  canvasContext.beginPath();
  canvasContext.arc(coordX, coordY, vertexRadius, 0, 2 * Math.PI);
  canvasContext.strokeStyle = "#fe5b79";
  canvasContext.lineWidth = 2;
  canvasContext.fillStyle = "white";
  canvasContext.fill();
  canvasContext.stroke();
  canvasContext.closePath();

  canvasContext.fillStyle = "black";
  canvasContext.font = "20px Arial";
  canvasContext.textAlign = "center";
  canvasContext.textBaseline = "middle";
  canvasContext.fillText(vertexNumber, coordX, coordY);

  return { x: coordX, y: coordY };
};

let renderDirectedGraphVertices = (
  canvasContext,
  vertexSpacing,
  coordX = startXDirected,
  coordY = startYCoord
) => {
  let currentX = coordX;
  let currentY = coordY;
  let vertexNumber = 1;
  let renderedVertices = [];
  let firstColumnVertices = 5;
  let thirdColumnVertices = 7;

  for (let i = 0; i < vertexNum; i++) {
    let graphVertex = renderCircle(
      canvasContext,
      currentX,
      currentY,
      vertexNumber
    );
    renderedVertices.push(graphVertex);

    if (i < firstColumnVertices) {
      currentX -= 60;
      currentY += 100;
    } else if (i >= firstColumnVertices && i < thirdColumnVertices - 1) {
      currentX += 300;
    } else if (i === thirdColumnVertices - 1) {
      currentX += 300;
    } else if (i === thirdColumnVertices) {
      currentX -= 60;
      currentY -= 100;
    } else if (i > thirdColumnVertices) {
      currentX -= 60;
      currentY -= 100;
    }

    vertexNumber++;
  }

  return renderedVertices;
};

let renderUndirectedGraphVertices = (
  canvasContext,
  vertexSpacing,
  coordX = startXUndirected,
  coordY = startYCoord
) => {
  return renderDirectedGraphVertices(
    canvasContext,
    vertexSpacing,
    coordX,
    coordY
  );
};

const directedVertexCoords = renderDirectedGraphVertices(
  canvasContext,
  vertexSpacing
);
const undirectedVertexCoord = renderUndirectedGraphVertices(
  canvasContext,
  vertexSpacing
);

renderDirectedGraphVertices(canvasContext, vertexSpacing);
renderUndirectedGraphVertices(canvasContext, vertexSpacing);

export {
  renderCurve,
  renderCurveArrow,
  renderLine,
  renderLineArrow,
  renderLoop,
  renderLoopArrow,
  renderCircle,
  renderDirectedGraphVertices,
  renderUndirectedGraphVertices,
  directedVertexCoords,
  undirectedVertexCoord,
};
