
export class Scenario {
    constructor(map,player,monster,win){

        this.map = map

        this.positionPlayer(player)
        this.positionNPC(monster)
        this.positionNPC(win)

        this.gameWon = 0
        this.isGameOver = 0
    }

    positionPlayer(player){
        player.position.x = Math.round(this.map.size_x/2-1)
        player.position.y = Math.round(this.map.size_y/2-1)
        this.map.gridMap[player.position.x][player.position.y] = player.code
    }

    positionNPC(NPC){
        
        let randomSeed = Math.random()

        if (randomSeed > 0.5) {
            if (randomSeed > 0.75) {
                NPC.position.x = this.map.size_x - 1
            } else {
                NPC.position.x = 0
            }
            NPC.position.y = Math.round((this.map.size_y - 1) * Math.random())
        } else {
            if (randomSeed > 0.25) {
                NPC.position.y = this.map.size_x - 1
            } else {
                NPC.position.y = 0
            }
            NPC.position.x = Math.round((this.map.size_x - 1) * Math.random())
        }
        this.map.gridMap[NPC.position.x][NPC.position.y] = NPC.code
    }

    move(creature,deltaTime,timestamp,enemyCode,gameOver,win){

        if (deltaTime !== 0 && creature.moving === false && this.gameWon === 0){

            if( creature.position.x + creature.speed.x < this.map.size_x &&
                creature.position.x + creature.speed.x >= 0 &&
                creature.position.y + creature.speed.y < this.map.size_y &&
                creature.position.y + creature.speed.y >= 0
                ){
                if (this.map.gridMap[creature.position.x+creature.speed.x][creature.position.y+creature.speed.y]===0){
                    this.map.gridMap[creature.position.x][creature.position.y] = 0
                    this.map.gridMap[creature.position.x+creature.speed.x][creature.position.y+creature.speed.y] = creature.code

                    return {
                        position:{
                            x: creature.position.x + creature.speed.x,
                            y: creature.position.y + creature.speed.y
                        },
                        moving: true,
                        lastMove: timestamp
                    }

                } else if (this.map.gridMap[creature.position.x+creature.speed.x][creature.position.y+creature.speed.y]===enemyCode &&
                    this.isGameOver === 0) {
                    this.isGameOver = 1
                    return gameOver()
                } else if (win && this.map.gridMap[creature.position.x+creature.speed.x][creature.position.y+creature.speed.y]===win.code &&
                    this.gameWon === 0) {
                    this.gameWon = 1
                }
            }
        }
    }

    nextLevel(){
        return this.gameWon
    }

    draw(ctx,size_x,size_y,grid_element_size,playerCode,monsterCode,winCode){
        for(let x=0;x<size_x;x++){
            for (let y=0;y<size_y;y++){
                if (this.map.gridMap[x][y]===1){
                    ctx.fillStyle = 'rgb(64,64,64)'
                    ctx.fillRect(
                        grid_element_size*x,
                        grid_element_size*y,
                        grid_element_size,
                        grid_element_size);
                } else if (this.map.gridMap[x][y]===playerCode) {
                    ctx.fillStyle = 'rgb(64,64,128)'
                    ctx.fillRect(
                        grid_element_size*x,
                        grid_element_size*y,
                        grid_element_size,
                        grid_element_size);
                } else if (this.map.gridMap[x][y]===monsterCode) {
                    ctx.fillStyle = 'rgb(128,64,64)'
                    ctx.fillRect(
                        grid_element_size*x,
                        grid_element_size*y,
                        grid_element_size,
                        grid_element_size);
                } else if (this.map.gridMap[x][y]===winCode) {
                ctx.fillStyle = 'rgb(64,128,64)'
                ctx.fillRect(
                    grid_element_size*x,
                    grid_element_size*y,
                    grid_element_size,
                    grid_element_size);
            }
            }
        }
    }
}