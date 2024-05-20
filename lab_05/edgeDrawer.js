import {canvasContext, vertexRadius } from "./constants.js";

let renderLoop = (startEl, arrowDistance = 4) => {
    let startX = startEl.x ;
    let startY = startEl.y - vertexRadius;

    let controlX1 = startX - 50;
    let controlY1 = startY - 50;
    let controlX2 = startX + 50;
    let controlY2 = startY - 50;

    let distance = Math.sqrt(2) * 70;
    let ratio = arrowDistance / distance;
    let arrowX = startX + (controlX2 - startX) * ratio;
    let arrowY = startY + (controlY2 - startY) * ratio;

    canvasContext.beginPath();
    canvasContext.moveTo(startX, startY);
    canvasContext.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, startX, startY);
    canvasContext.stroke();

    return {arrowX, arrowY, controlY2, controlX2}
}

let renderLoopArrow = (startEl, arrowSize = 8, arrowColor = '#fe5b79') =>{
    let arrow = renderLoop(startEl);
    let arrowX = arrow.arrowX;
    let arrowY = arrow.arrowY;
    let controlY2 = arrow.controlY2;
    let controlX2 = arrow.controlX2


    let angle = Math.PI ;
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
}

let renderLine = (start, end, color) => {
    let angle = Math.atan2(end.y - start.y, end.x - start.x);
    let startX = start.x + vertexRadius * Math.cos(angle);
    let startY = start.y + vertexRadius * Math.sin(angle);
    let arrowEndX = end.x - 20 * Math.cos(angle);
    let arrowEndY = end.y - 20 * Math.sin(angle);

    canvasContext.beginPath();
    canvasContext.moveTo(startX, startY);
    canvasContext.strokeStyle = color;
    canvasContext.lineTo(arrowEndX, arrowEndY);
    canvasContext.stroke();

    return { angle, arrowEndX, arrowEndY };
}

let renderLineArrow = (start, end, color) => {
    let line = renderLine(start, end, color);
    let angle = line.angle;

    angle = Math.atan2(end.y - start.y, end.x - start.x);
    let arrowEndX = end.x - 20 * Math.cos(angle);
    let arrowEndY = end.y - 20 * Math.sin(angle);


    canvasContext.save();
    canvasContext.translate(arrowEndX, arrowEndY);
    canvasContext.rotate(angle);
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.moveTo(0, 0);
    canvasContext.lineTo(-10, 5);
    canvasContext.lineTo(-10, -5);
    canvasContext.closePath();
    canvasContext.fill();
    canvasContext.restore();
}

let renderCurve = (start, end, color, arcAngle = 2, arrowDistance = 20, bendAngle = Math.PI / 8) => {
    let angle = Math.atan2(end.y - start.y, end.x - start.x);
    let startX = start.x + vertexRadius * Math.cos(angle);
    let startY = start.y + vertexRadius * Math.sin(angle);

    let midX = (start.x + end.x) / arcAngle;
    let midY = (start.y + end.y) / arcAngle;

    let distance = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));

    let newEndX = end.x - (end.x - start.x) / distance * arrowDistance;
    let newEndY = end.y - (end.y - start.y) / distance * arrowDistance;

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
    canvasContext.moveTo(startX, startY);
    canvasContext.quadraticCurveTo(controlX, controlY, newEndX, newEndY);
    canvasContext.strokeStyle = color;
    canvasContext.stroke();

    return { newEndX, newEndY, controlX, controlY};
}

let renderCurveArrow = (start, end, color, arcAngle = 2, arrowDistance = 20, arrowSize = 10, arrowColor = '#1E90FF', bendAngle = Math.PI / 1) => {

    let arrow = renderCurve(start, end, color, arcAngle, arrowDistance, bendAngle);
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
}


export {renderCurve,renderCurveArrow,renderLine,renderLineArrow,renderLoop,renderLoopArrow}