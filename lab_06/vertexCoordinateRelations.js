import { directedVertexCoords,undirectedGraphVertexCoord } from "./vertexDrawer.js";

//створення об'єкту для зв'язку координат вершин напрямленого графа з їх індексами у матриці суміжності
let directedGraphVertexMatrix = {};

//проходження по масиву координат вершин напрямленого графа та створення зв'язку
directedVertexCoords.forEach((vertex, index) => {
    directedGraphVertexMatrix[index] = vertex;
});

//створення об'єкту для зв'язку координат вершин ненапрямленого графа з їх індексами у матриці суміжності
let undirectedGraphVertexMatrix = {};
undirectedGraphVertexCoord.forEach((vertex, index) => {
    undirectedGraphVertexMatrix[index] = vertex;
});

export {directedGraphVertexMatrix, undirectedGraphVertexMatrix}