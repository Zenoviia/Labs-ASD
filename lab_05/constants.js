"use strict";


const seed = "3124";
const drawingCanvas = document.getElementById("my-canvas");
const canvasContext = drawingCanvas.getContext("2d");
const vertexRadius = 20;
const vertexSpacing = 100;
const startXDirected = 400;
const startXUndirected = 1400;
const startYCoord = 100;
const vertexNum = 10 + +seed.charAt(2);
const vertexCountPerSide = vertexNum / 2 - 1;

const colorsOfEdges = [
  "Blue",
  "Brown",
  "Chartreuse",
  "DarkGreen",
  "Yellow",
  "Black",
  "Aqua",
  "Chocolate",
  "DarkSlateGray",
  "DeepPink",
  "Indigo",
  "GreenYellow",
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
  vertexCountPerSide,
  colorsOfEdges,
};