import {
  canvasContext,
  vertexRadius,
} from "./constants.js";

//малювання петлі
const renderLoop = (startElement, arrowLength = 30) => {
  let controlX1 = startElement.x - 70;
  let controlY1 = startElement.y - 70;
  let controlX2 = startElement.x + 70;
  let controlY2 = startElement.y - 70;

  let distance = Math.sqrt(2) * 70;
  let ratio = arrowLength / distance;
  let arrowX = startElement.x + (controlX2 - startElement.x) * ratio;
  let arrowY = startElement.y + (controlY2 - startElement.y) * ratio;

  canvasContext.beginPath();
  canvasContext.moveTo(startElement.x, startElement.y);
  canvasContext.bezierCurveTo(
    controlX1,
    controlY1,
    controlX2,
    controlY2,
    startElement.x,
    startElement.y
  );
  canvasContext.stroke();

  return { arrowX, arrowY, controlY2, controlX2 };
};

//малювання петлі зі стрілкою
const renderLoopArrow = (startEl, arrowSize = 8, arrowColor = "green") => {
  let arrow = renderLoop(startEl);
  let arrowX = arrow.arrowX;
  let arrowY = arrow.arrowY;
  let controlY2 = arrow.controlY2;
  let controlX2 = arrow.controlX2;

  let directionAngle = Math.PI / 4;
  canvasContext.save();
  canvasContext.translate(arrowX, arrowY);
  canvasContext.rotate(Math.atan2(controlY2 - startEl.y, controlX2 - startEl.x) + directionAngle);
  canvasContext.fillStyle = arrowColor;
  canvasContext.beginPath();
  canvasContext.moveTo(0, 0);
  canvasContext.lineTo(-arrowSize, arrowSize);
  canvasContext.lineTo(-arrowSize, -arrowSize);
  canvasContext.closePath();
  canvasContext.fill();
  canvasContext.restore();
};

//малювання лінії
const renderLine = (startPoint, endPoint, caption, edgeColor) => {
  let angle = Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x);
  let startX = startPoint.x + vertexRadius * Math.cos(angle);
  let startY = startPoint.y + vertexRadius * Math.sin(angle);
  let arrowEndX = endPoint.x - 20 * Math.cos(angle);
  let arrowEndY = endPoint.y - 20 * Math.sin(angle);

  canvasContext.beginPath();
  canvasContext.strokeStyle = edgeColor || "red";
  canvasContext.moveTo(startX, startY);
  canvasContext.strokeStyle = edgeColor;
  canvasContext.lineTo(arrowEndX, arrowEndY);
  canvasContext.stroke();

  let midX = (startPoint.x + arrowEndX) / 2;
  let midY = (startPoint.y + arrowEndY) / 2;

  let offsetX = 6;
  let offsetY = 20;
  canvasContext.fillStyle = edgeColor || "black";

  if (caption) {
    canvasContext.font = "16px Arial";
    canvasContext.fillText(caption, midX + offsetX, midY + offsetY);
  }

  return { angle, arrowEndX, arrowEndY };
};

//малювання лінії зі стрілкою
const renderLineArrow = (start, end) => {
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

//малювання дуги
const renderCurve = (
  start,
  end,
  text,
  color,
  arcAngle = 2,
  arrowDistance = 20,
  arcBendAngle = Math.PI / 8
) => {
  let angle = Math.atan2(end.y - start.y, end.x - start.x);
  let startX = start.x + vertexRadius * Math.cos(angle);
  let startY = start.y + vertexRadius * Math.sin(angle);

  let midX = (start.x + end.x) / arcAngle;
  let midY = (start.y + end.y) / arcAngle;

  let distance = Math.sqrt(
    Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
  );

  let newEndX = end.x - ((end.x - start.x) / distance) * arrowDistance;
  let newEndY = end.y - ((end.y - start.y) / distance) * arrowDistance;

  let controlX, controlY;
  if (start.x !== end.x && start.y !== end.y) {
    controlX = midX + Math.cos(arcBendAngle) * (midY - start.y);
    controlY = midY + Math.sin(arcBendAngle) * (midX - start.x);
  } else if (start.x === end.x) {
    controlX = midX + 100;
    controlY = midY;
  } else {
    controlX = midX;
    controlY = midY + 100;
  }

  canvasContext.beginPath();
  canvasContext.strokeStyle = color || "black";
  canvasContext.moveTo(startX, startY);
  canvasContext.quadraticCurveTo(controlX, controlY, newEndX, newEndY);
  canvasContext.strokeStyle = color;
  canvasContext.stroke();

  let arcMidX = (start.x + controlX + newEndX) / 3;
  let arcMidY = (start.y + controlY + newEndY) / 3;
  canvasContext.fillStyle = color || "black";
  if (text) {
    canvasContext.font = "16px Arial";
    canvasContext.fillText(text, arcMidX, arcMidY);
  }

  return { newEndX, newEndY, controlX, controlY };
};

//малювання дуги зі стрілкою
const renderCurveArrow = (
  start,
  end,
  arrowDistance = 20,
  arrowSize = 10,
  arrowColor = "blue",
  bendAngle = Math.PI / 1
) => {
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

export {
  renderCurve,
  renderCurveArrow,
  renderLine,
  renderLineArrow,
  renderLoop,
  renderLoopArrow,
};