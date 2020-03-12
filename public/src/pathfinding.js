import { uptime } from "os";

export class Pathfinding {

    constructor(map){
        this.map = map
        this.visitedCode = 82719;
    }

    execute(monster,player){

        let {nodeMap,startingNode} = this.generateNodeMap(this.map,player.code,monster.code)
        if (startingNode.position === undefined){
            return false
        } else {
            let nodeArray = [new this.node(startingNode.name,startingNode,player,{x:0,y:0},true,startingNode.position)]
            return this.findPath(nodeMap,nodeArray,player)
        }

    }

    generateNodeMap(map,playerCode,monsterCode){

        let nodeMap = {}
        let nodename = 0;

        let startingNode = {}

        for (let y = 0; y < map.size_y; y++){
            for (let x = 0; x < map.size_x; x++){
                if(map.gridMap[x][y] === 0 || map.gridMap[x][y] === monsterCode || map.gridMap[x][y] === playerCode) {
                    nodeMap[nodename] = {
                        name:nodename,
                        x:x,
                        y:y
                    }
                    if(x + 1 < this.map.size_x && (map.gridMap[x+1][y] === 0 || map.gridMap[x+1][y] === playerCode)){
                        nodeMap[nodename]['RIGHT'] = nodename + 1
                    }
                    if (x - 1 >= 0 && (map.gridMap[x-1][y] === 0 || map.gridMap[x-1][y] === playerCode)){
                        nodeMap[nodename]['LEFT'] = nodename - 1
                    }
                    if (y + 1 < this.map.size_y && (map.gridMap[x][y+1] === 0 || map.gridMap[x][y+1] === playerCode)){
                        nodeMap[nodename]['DOWN'] = nodename + this.map.size_x
                    }
                    if (y - 1 >= 0 && (map.gridMap[x][y-1] === 0 || map.gridMap[x][y-1] === playerCode)){
                        nodeMap[nodename]['UP'] = nodename - this.map.size_x
                    }

                    if (map.gridMap[x][y] === monsterCode){
                        startingNode = {
                            name:nodename,
                            position: {
                                x:x,
                                y:y
                            }
                        };
                        nodeMap[nodename].visited = true;
                    }
                }
                nodename++   
            }
        }
        return {nodeMap,startingNode}
    }

    node(name,startingNode,objectiveNode,direction,firstNode,currentNode){
        // calculates the atributes of the node
        this.name = name
        
        if (firstNode) {
            this.previousNode = undefined;
            this.distanceWalked = 0;
        } else {
            this.visited = false
            this.previousNode = startingNode;
            this.distanceWalked = startingNode.distanceWalked + 1
        }
        this.position = {
            x:startingNode.position.x + direction.x,
            y:startingNode.position.y + direction.y,
        }

        this.distanceToObjectiveNode = Math.abs(objectiveNode.position.x - this.position.x) + 
                                       Math.abs(objectiveNode.position.y - this.position.y);

        this.weight = this.distanceToObjectiveNode + this.distanceWalked
    };

    preferredDirections(currentNode,objectiveNode){
        // find the node in the more likely direction by subtracting the coordinates of the current node
        // and the objective node
        let preferredDirections = []

        let difference = {
            x: objectiveNode.position.x - currentNode.position.x,
            y: objectiveNode.position.y - currentNode.position.y
        }

        if(Math.abs(difference.x) > Math.abs(difference.y)){
            if(difference.x > 0){
                preferredDirections.push({x:1,y:0,name:'RIGHT'})
                preferredDirections.push({x:-1,y:0,name:'LEFT'})
            } else {
                preferredDirections.push({x:-1,y:0,name:'LEFT'})
                preferredDirections.push({x:1,y:0,name:'RIGHT'})
            }
            if(difference.y > 0){
                preferredDirections.splice(1,0,{x:0,y:1,name:'DOWN'})
                preferredDirections.splice(2,0,{x:0,y:-1,name:'UP'})
            } else {
                preferredDirections.splice(1,0,{x:0,y:-1,name:'UP'})
                preferredDirections.splice(2,0,{x:0,y:1,name:'DOWN'})
            }
        } else {
            if(difference.y > 0){
                preferredDirections.push({x:0,y:1,name:'DOWN'})
                preferredDirections.push({x:0,y:-1,name:'UP'})
            } else {
                preferredDirections.push({x:0,y:-1,name:'UP'})
                preferredDirections.push({x:0,y:1,name:'DOWN'})
            }
            if(difference.x > 0){
                preferredDirections.splice(1,0,{x:1,y:0,name:'RIGHT'})
                preferredDirections.splice(2,0,{x:-1,y:0,name:'LEFT'})
            } else {
                preferredDirections.splice(1,0,{x:-1,y:0,name:'LEFT'})
                preferredDirections.splice(1,0,{x:1,y:0,name:'RIGHT'})
            }
        }

        return preferredDirections
    }

    nextNode(nodeMap,currentNode,objectiveNode){
        for (let index in currentNode.preferredDirections){

            let direction = currentNode.preferredDirections[index]

            if(nodeMap[currentNode.name][direction.name] !== undefined){
                if(!nodeMap[nodeMap[currentNode.name][direction.name]].visited){
                    nodeMap[nodeMap[currentNode.name][direction.name]].visited = true; // sometimes generates error
                    return new this.node(nodeMap[nodeMap[currentNode.name][direction.name]].name,currentNode,
                        objectiveNode,direction,false,nodeMap[currentNode.name])
                }
            }
        }
        return false
    }

    positionNodeInNodeArray(currentNode,nodeArray){
        // position the calculated node in the nodeArray in a manner that the nodeArray stays sorted
        // from the most promissing node to the least promissing node.
        // the most promissing node is aways the node with the least weight (distance walked + distance
        // to the objective) and the distance to the objective

        for (let index = 0; index < nodeArray.length; index++){
            if (currentNode.weight === nodeArray[index].weight){
                if(currentNode.distanceToObjectiveNode < nodeArray[index].distanceToObjectiveNode){
                    nodeArray.splice(index,0,currentNode)
                    return nodeArray
                } else if (index + 1 === nodeArray.length) {
                    nodeArray.push(currentNode)
                    return nodeArray
                }
            } else if (index + 1 === nodeArray.length) {
                nodeArray.push(currentNode)
                return nodeArray
            }
        }
    }

    traceFirstMovement(currentNode,nextNode){
        if(currentNode === undefined){
            return false
        } else if(currentNode.previousNode !== undefined){
            return this.traceFirstMovement(currentNode.previousNode,currentNode)
        } else {
            let direction = {
                    x: nextNode.position.x - currentNode.position.x ,
                    y: nextNode.position.y - currentNode.position.y
            }

            if (direction.x > 0) {
                direction.name = 'RIGHT'
            } else if (direction.x < 0) {
                direction.name = 'LEFT'
            } else if (direction.y > 0) {
                direction.name = 'DOWN'
            } else if (direction.y < 0){
                direction.name = 'UP'
            }

            return direction
        }
    }
        
    findPath(nodeMap,nodeArray,objectiveNode){
        // loops through the node finding functions until it finds the shortest path

        let run = true;

        while (run){
            let currentNode = nodeArray[0]
            currentNode.preferredDirections = this.preferredDirections(currentNode,objectiveNode)
            let nextNode = this.nextNode(nodeMap,currentNode,objectiveNode)

            if (nextNode){
                nodeArray = this.positionNodeInNodeArray(nextNode,nodeArray)
                if (nodeArray[0].distanceToObjectiveNode === 0){
                    run = false
                }
            } else {
                nodeArray.shift()
                if(nodeArray.length===0){
                    run=false
                }
            }
        }
        return this.traceFirstMovement(nodeArray[0])
    }
}