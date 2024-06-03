import { directedMatrix } from "./matrixGenerator.js";
import { computeVertexDegrees } from "./vertexDegreesandHalfDegreesCalculator.js";

const detectHangingAndIsolatedVertices = (vertexDegrees) => {
  const hangingVertices = vertexDegrees
    .map((degree, index) => (degree === 1 ? index + 1 : null))
    .filter((vertex) => vertex !== null);

  const isolatedVertices = vertexDegrees
    .map((degree, index) => (degree === 0 ? index + 1 : null))
    .filter((vertex) => vertex !== null);

  return { hanging: hangingVertices, isolated: isolatedVertices };
};

let generateIsolatedVerticesDescriptions = (hangingVertex) => {
  return hangingVertex.isolated.map((key) => `№${key}`);
};

let generateHangingVerticesDescription = (hangingVertex) => {
  return hangingVertex.hanging.map((key) => `№${key}`);
};

let classifiedVertices = detectHangingAndIsolatedVertices(
  computeVertexDegrees(directedMatrix)
);
const outputIsolated = generateIsolatedVerticesDescriptions(classifiedVertices);
const outputHanging = generateHangingVerticesDescription(classifiedVertices);

console.log("Isolated vertices", outputIsolated);
console.log("Hanging vertices", outputHanging);

export {
  classifiedVertices,
  generateIsolatedVerticesDescriptions,
  generateHangingVerticesDescription,
};
