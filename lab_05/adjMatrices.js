import { seed } from "./constants.js";

const randomizer = (seed) => {

    let currentValue = seed;
    return function() {
        currentValue = (currentValue * 1 + 12) % 28;
        return currentValue * 0.55 % 1;
    }

}


const createDirMatrix = (strVariant) => {
    const arr = [...String(strVariant)].map(Number);
    const count = 10 + arr[2];
    const generator = randomizer(strVariant);
    const k = 1.0 - 2 * 0.01 - 4 * 0.005 - 0.15;
    const directedMatrix = [...Array(count)].map(() => Array(count).fill(0));

    for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
            directedMatrix[i][j] = Math.floor(generator() * 2 * k);
        }
    }

    return directedMatrix;
};


const directedMatrix = createDirMatrix(seed);
export {directedMatrix}