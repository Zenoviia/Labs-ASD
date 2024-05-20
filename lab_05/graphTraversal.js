class DFSAlgorithm {
    constructor() {
        this.stackElements = []
        this.paths = []
    }

    addToStack(element) {
        this.stackElements.push(element)
        this.paths.push([element, 'active'])
    }

    removeFromStack() {
        this.paths.push([this.stackElements.at(-1), 'closed'])
        this.stackElements.pop();

        if(this.stackElements.length !== 0){
            this.paths.push([this.stackElements.at(-1), 'active'])
        }

    }

    topOfStack() {
        return this.stackElements[this.stackElements.length - 1];
    }

    isStackEmpty() {
        if(this.stackElements.length !== 0){
            this.paths.push([this.stackElements.at(-1), 'visited'])
        }
        return this.stackElements.length === 0;
    }

    getHistoryOfSteps(){
        return this.paths
    }
}


class BFSAlgorithms {
    constructor() {
        this.queueElements = []
        this.paths = []
        this.visitedVertices = []
    }

    addToQueue(element) {
        this.queueElements.push(element)
        this.paths.push([this.queueElements.at(-1), `visited`])
    }


    removeFromQueue() {
        this.paths.push([this.queueElements.at(0), 'active'])
        this.visitedVertices.push(this.queueElements.at(0))
        return this.queueElements.shift();
    }

    isQueueEmpty() {
        if(!this.paths.includes(this.visitedVertices) && this.visitedVertices.length !== 0){
            this.paths.push([...this.visitedVertices, 'closed'])
            this.visitedVertices = [];
        }

        return this.queueElements.length === 0;
    }

    getHistoryOfSteps(){
      return this.paths
    }

}

export {DFSAlgorithm, BFSAlgorithms}