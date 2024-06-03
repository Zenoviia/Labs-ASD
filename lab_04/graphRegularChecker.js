import { directedVertexDegrees } from "./vertexDegreesandHalfDegreesCalculator.js";
const isGraphRegular = (vertexDegreeArray) => {
  const uniqueDegrees = [...new Set(vertexDegreeArray)];
  const isRegular = uniqueDegrees.length === 1;

  return isRegular
    ? { regular: true, degree: uniqueDegrees[0] }
    : { regular: false };
};

let graphIsRegular = isGraphRegular(directedVertexDegrees);

if (graphIsRegular.true === true) {
  console.log("The graph is regular:" + Array.from(graphIsRegular.degree));
} else {
  console.log("The graph is not regular:");
}

export { graphIsRegular };
