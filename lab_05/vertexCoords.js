import { directedVertexCoordinates,secondVertexCoord, smallGraphVertexCoordinates } from "./vertexDrawer.js";


let directedVertexMatrix = {};


directedVertexCoordinates.forEach((vertex, index) => {
    directedVertexMatrix[index] = vertex;
});


let graphCoordinates = {};
secondVertexCoord.forEach((vertex, index) => {
    graphCoordinates[index] = vertex;
});

let smallVertexCoords = {};
smallGraphVertexCoordinates.forEach((vertex, index) => {
    smallVertexCoords[index] = vertex;
});


export {directedVertexMatrix, graphCoordinates,smallVertexCoords}