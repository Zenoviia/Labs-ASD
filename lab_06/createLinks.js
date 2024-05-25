import { finalWeightMatrix } from "./calculateWeights.js";

class nodeInLinkedList {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedListCreationAndManagement {
  constructor() {
    this.firstNode = null;
    this.nodeCount = 0;
  }

  //додати новий вузол до списку
  push(data) {
    const addedNode = new nodeInLinkedList(data);
    if (!this.firstNode) {
      this.firstNode = addedNode;
    } else {
      let currentNode = this.firstNode;
      while (currentNode.next) {
        currentNode = currentNode.next;
      }
      currentNode.next = addedNode;
    }
    this.nodeCount++;
  }

  //список -> масив
  nodesListToArray() {
    let edgeArray = [];
    let current = this.firstNode;
    while (current) {
      edgeArray.push(current.data);
      current = current.next;
    }
    return edgeArray;
  }
}

//виявлення наявності циклу в графі за допомогою DFS
const detectCycle = (matrix, selectedEdges) => {
  const n = matrix.length;
  const graphConnections = Array.from({ length: n }, () => []);
  const visitedNodes = new Array(n).fill(false);

  //побудова графа
  for (const { u: startVertex, v: endVertex } of selectedEdges) {
    graphConnections[startVertex].push(endVertex);
    graphConnections[endVertex].push(startVertex);
  }
  const detectCycleUtil = (v, parent) => {
    visitedNodes[v] = true;
    for (const neighbor of graphConnections[v]) {
      if (!visitedNodes[neighbor]) {
        if (detectCycleUtil(neighbor, v)) {
          return true;
        }
      } else if (neighbor !== parent) {
        return true;
      }
    }
    return false;
  };

  // Проверка всех вершин на наличие циклов
  for (let i = 0; i < n; i++) {
    if (!visitedNodes[i] && detectCycleUtil(i, -1)) {
      return true;
    }
  }

  return false;
}

//чи присутнє зворотнє ребро між вершинами
const isReverseEdgePresent = (edges, u, v) => {
  for (const edge of edges) {
    if (edge.u === v && edge.v === u) {
      return true;
    }
  }
  return false;
}

//сортування ребер за вагою
const sortEdgesByWeight = (matrix) =>{
  const edgeArray = [];
  const vertexCount = matrix.length;

  for (let i = 0; i < vertexCount; i++) {
    for (let j = 0; j < vertexCount; j++) {
      if (matrix[i][j] > 0) {
        if (!isReverseEdgePresent(edgeArray, i, j)) {
          edgeArray.push({ u: i, v: j, weight: matrix[i][j] });
        }
      }
    }
  }
  edgeArray.sort((a, b) => a.weight - b.weight);
  return edgeArray;
}


//алгоритм крускала для побудови мін. кістяка
const kruskalAlgorithm = (matrix) => {
  const n = matrix.length;
  const edgeArray = sortEdgesByWeight(matrix);
  const selectedEdges = new LinkedListCreationAndManagement();

  let selectedEdgeCount = 0;
  let currentEdgeIndex = 0;

  while (selectedEdgeCount < n - 1 && currentEdgeIndex < edgeArray.length) {
    const edge = edgeArray[currentEdgeIndex];
    currentEdgeIndex++;
    const selectedEdgeArray = selectedEdges.nodesListToArray();

    if (!detectCycle(matrix, selectedEdgeArray.concat(edge))) {
      selectedEdges.push(edge);
      selectedEdgeCount++;
    }
  }

  return selectedEdges;
}

const kruskalResult = kruskalAlgorithm(finalWeightMatrix);
console.log("List", kruskalResult);
const minTree = kruskalResult.nodesListToArray();
export { minTree };