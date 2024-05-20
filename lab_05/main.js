'use strict'


import { directedMatrix } from "./adjMatrices.js"
console.group('Матриця напрямленого графа')
console.log(directedMatrix);
console.groupEnd()

import { renderDirectedGraph} from "./graphDrawer.js";
renderDirectedGraph(directedMatrix);