import {dfsTraversal} from "./graphDFS.js";
import {bfsTraversal} from "./graphBFS.js";
import {colorsOfEdges} from "./constants.js";
import {drawDFSGraph, drawBFSGraph } from "./graphDrawer.js";
console.log(dfsTraversal);
const dfsButton = document.querySelector('.dfs');
let iteration = 0;

dfsButton.addEventListener('click', () => {

    if (iteration < dfsTraversal.length) {
        drawDFSGraph(dfsTraversal.at(iteration), colorsOfEdges);

        iteration++;
    } else {
        alert('DFS обхід завершено')
        location.reload();
    }
});

const bfsButton = document.querySelector('.bfs');

bfsButton.addEventListener('click', () => {
   
    if (iteration < bfsTraversal.length) {
        drawBFSGraph(bfsTraversal.at(iteration), colorsOfEdges);
   
        iteration++;
    } else {
        alert('BFS обхід завершено!')
        location.reload();
    }
});


