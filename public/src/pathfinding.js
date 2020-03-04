
export class Pathfinding {

    constructor(){}

    execute(startingNode,objectiveNode,map){

        let nodeArray = [new this.node(startingNode,objectiveNode,{x:0,y:0},true)]
        // nodeArray.push(new this.node(nodeArray[0],objectiveNode,{x:1,y:0}))

        console.log(nodeArray)

        this.findPath(objectiveNode,map,nodeArray)

        // this.findNextMove(nodeArray)
    }

    node(startingNode,objectiveNode,direction,firstNode){
        // calculates the atributes of the node

        if (firstNode) {
            this.previousNode = undefined;
            this.distanceWalked = 0;
        } else {
            this.previousNode = startingNode;
            this.distanceWalked = startingNode.distanceWalked + 1
        }

        this.position = {
            x:startingNode.position.x + direction.x,
            y:startingNode.position.y + direction.y,
        };

        this.distanceToObjectiveNode = Math.abs(objectiveNode.x - this.position.x) + 
                                       Math.abs(objectiveNode.y - this.position.y);

        this.weight = this.distanceToObjectiveNode + this.distanceWalked
    };

    findNode(currentNode,objectiveNode,map){
        // find the node in the more likely direction by subtracting the coordinates of the current node
        // and the objective node
        // desconsiders visited nodes
    }

    positionNodeInNodeArray(currentNode,nodeArray){
        // position the calculated node in the nodeArray in a manner that the nodeArray stays sorted
        // from the most promissing node to the least promissing node.
        // the most promissing node is aways the node with the least weight (distance walked + distance
        // to the objective) and the distance to the objective
    }
        
    findPath(objectiveNode,map,nodeArray){
        // loops through the node finding functions until it finds the shortest path
        // console.log(objectiveNode)
    }
    

    findNextMove(){
        // traces back next move based on the shortest path
    }
    

}