"use strict";

const seed = "3124";
const vertexNum = 10 + +seed.charAt(2);
const drawingCanvas = document.getElementById("graphCanvas");
const canvasContext = drawingCanvas.getContext("2d");
const verticesPerRow = vertexNum / 2 - 1;
const vertexRadius = 20;
const vertexSpacing = 100;
const startXDirected = 400;
const startXUndirected = 1400;
const startYCoord = 100;

export {
  seed,
  drawingCanvas,
  canvasContext,
  vertexRadius,
  vertexSpacing,
  startXDirected,
  startXUndirected,
  startYCoord,
  vertexNum,
  verticesPerRow,
};
