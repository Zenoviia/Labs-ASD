"use strict";


import {
  canvasContext,
  vertexSpacing,
  colors,
} from "./constants.js";

import { directedMatrix, undirectedMatrix } from "./adjMatrices.js";
console.log("unDirMatrix", undirectedMatrix);


import { renderDirectedGraph, renderUndirectedGraph } from "./graphDrawer.js";
import { finalWeightMatrix } from "./calculateWeights.js";

renderDirectedGraph(directedMatrix);
renderUndirectedGraph(finalWeightMatrix, colors);

//малювання вершин графа
import { renderDirectedGraphVertices, renderUndirectedGraphVertices } from "./vertexDrawer.js";
renderDirectedGraphVertices(canvasContext, vertexSpacing);
renderUndirectedGraphVertices(canvasContext, vertexSpacing);