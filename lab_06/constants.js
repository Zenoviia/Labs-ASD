"use strict";

//Input
const seed = "3124";
const drawingCanvas = document.getElementById("canvas-box");
const canvasContext = drawingCanvas.getContext("2d");
const vertexRadius = 20;
const vertexSpacing = 150;
const startXDirected = 400;
const startXUndirected = 1400;
const startYCoord = 100;
const vertexNum = 10 + +seed.charAt(2);
const verticesPerSide = vertexNum / 2 - 1;
const colors = [
  "navy",
  "darkslategray",
  "darkgreen",
  "gold",
  "darkviolet",
  "darkorchid",
  "darkorange",
  "dimgray",
  "darkturquoise",
  "darkcyan",
  "limegreen",
  "saddlebrown",
  "darkred",
  "deeppink",
  "darkcyan",
  "rebeccapurple",
];


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
  verticesPerSide,
  colors,
};