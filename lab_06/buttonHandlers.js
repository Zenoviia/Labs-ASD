import { minTree } from "./createLinks.js";
import { renderGraph } from "./graphDrawer.js";
import { colors } from "./constants.js";

let edgeWeights = [];
for (const obj of minTree) {
  let tempArray = [];
  for (const key in obj) {
    tempArray.push(obj[key]);
  }
  edgeWeights.push(tempArray);
}

const weights = edgeWeights.map((item) => item[2]);
let sumOfWeights = weights.reduce((total, current) => total + current, 0);
console.log("Сума ваг ребер:", sumOfWeights);

let stepCount = 0;
const clickButton = document.querySelector(".click");
clickButton.addEventListener("click", () => {
  if (stepCount < edgeWeights.length) {
    renderGraph(edgeWeights.at(stepCount), colors);

    stepCount++;
  } else {
    alert("Побудову мінімального кістяка завершено");
    location.reload();
  }
});