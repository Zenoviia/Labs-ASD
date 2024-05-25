import {
  canvasContext,
  vertexRadius,
  vertexSpacing,
  startXDirected,
  startXUndirected,
  startYCoord,
  vertexNum,
} from "./constants.js";

//малювання кіл (вершин графа)
const renderCircle = (ctx, x, y, number) => {
  ctx.beginPath();
  ctx.arc(x, y, vertexRadius, 0, 2 * Math.PI);
  ctx.strokeStyle = "red";
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

const renderDirectedGraphVertices = (
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

const renderUndirectedGraphVertices = (
  ctx,
  vertexBetweenSpace,
  x = startXUndirected,
  y = startYCoord
) => {
  const drawnDirGraphVertex = renderDirectedGraphVertices(ctx, vertexBetweenSpace, x, y);
  return drawnDirGraphVertex;
};

const directedVertexCoords = renderDirectedGraphVertices(canvasContext, vertexSpacing);
const undirectedGraphVertexCoord = renderUndirectedGraphVertices(canvasContext, vertexSpacing);


export {
  renderCircle,
  renderDirectedGraphVertices,
  renderUndirectedGraphVertices,
  directedVertexCoords,
  undirectedGraphVertexCoord,
};