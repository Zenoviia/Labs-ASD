import {
  canvasContext,
  vertexSpacing,
  startXDirected,
  startXUndirected,
  startYCoord,
  vertexNum,
} from "./constants.js";

let renderCircle = (ctx, x, y, number, color = "red", radius = 20) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.stroke();
  ctx.closePath();

  ctx.fillStyle = "black";
  ctx.font = "16px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(number, x, y);

  return { x: x, y: y };
};
let drawDirectedGraphVertices = (
  ctx,
  vertexBetweenSpace,
  x = startXDirected,
  y = startYCoord,
  radius
) => {
  let curX = x;
  let curY = y;
  let vertexNumber = 1;
  let vertices = [];
  let column1 = 5;
  let column3 = 7;
  for (let i = 0; i < vertexNum; i++) {
    let vertex = renderCircle(ctx, curX, curY, vertexNumber, "red", radius);
    vertices.push(vertex);

    if (i < column1) {
      curX -= 60;
      curY += 100;
    }

    if (i >= column1 && i < column3 - 1) {
      curX += 300;
    }

    if (i === column3 - 1) {
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

let renderGraphVerticesWithStatus = (
  ctx,
  vertexBetweenSpace,
  x = startXDirected,
  y = startYCoord,
  radius
) => {
  let curX = x;
  let curY = y;
  let vertexNumber = 1;
  let vertices = [];
  let column1 = 5;
  let column3 = 7;
  let status = "n";
  for (let i = 0; i < vertexNum; i++) {
    let vertex = renderCircle(ctx, curX, curY, status, "red", radius);
    vertices.push(vertex);

    if (i < column1) {
      curX -= 60;
      curY += 100;
    }

    if (i >= column1 && i < column3 - 1) {
      curX += 300;
    }

    if (i === column3 - 1) {
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

let renderBFSGraphVertices = (
  ctx,
  vertexBetweenSpace,
  x = startXUndirected,
  y = startYCoord
) => {
  const drawnDirGraphVertex = drawDirectedGraphVertices(ctx, vertexBetweenSpace, x, y);
  return drawnDirGraphVertex;
};

let drawGraphVertices = (
  ctx,
  vertexBetweenSpace,
  x = startXUndirected - 30,
  y = startYCoord - 10,
  radius = 9
) => {
  const drawSmallCircle = renderGraphVerticesWithStatus(
    ctx,
    vertexBetweenSpace,
    x,
    y,
    radius
  );
  return drawSmallCircle;
};

let renderVerticesWithStatus = (ctx, x, y, number, color = "red", radius = 9) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.stroke();
  ctx.closePath();

  ctx.fillStyle = "black";
  ctx.font = "16px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(number, x, y);

  return { x: x, y: y };
};

const directedVertexCoordinates = drawDirectedGraphVertices(canvasContext, vertexSpacing);
const secondVertexCoord = renderBFSGraphVertices(canvasContext, vertexSpacing);

const smallGraphVertexCoordinates = drawGraphVertices(canvasContext, vertexSpacing);

export {
  renderCircle,
  drawDirectedGraphVertices,
  renderBFSGraphVertices,
  directedVertexCoordinates,
  secondVertexCoord,
  smallGraphVertexCoordinates,
  renderVerticesWithStatus,
};