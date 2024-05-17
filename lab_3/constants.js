const seed = "3124";
const drawingCanvas = document.getElementById("my-canvas");
const canvasContext = drawingCanvas.getContext("2d");
const vertexRadius = 20;
const vertexSpacing = 150;
const startXDirected = 400;
const startXUndirected = 1400;
const startYCoord = 100;
const vertexNum = 10 + +seed.charAt(2);

export {
    seed, 
    canvasContext, 
    vertexRadius, 
    vertexSpacing,
    startXDirected,
    startXUndirected,
    startYCoord,
    vertexNum,
};