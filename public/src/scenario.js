
export class Scenario {
    constructor(map,player,monster){

        this.map = map

        this.positionPlayer(player)
        this.positionMonster(monster)

        this.isGameOver = 0
    }

    positionPlayer(player){
        player.position.x = Math.round(this.map.size_x/2-1)
        player.position.y = Math.round(this.map.size_y/2-1)
        this.map.gridMap[player.position.x][player.position.y] = player.code
    }

    positionMonster(monster){
        
        let randomSeed = Math.random()

        if (randomSeed > 0.5) {
            if (randomSeed > 0.75) {
                monster.position.x = this.map.size_x - 1
            } else {
                monster.position.x = 0
            }
            monster.position.y = Math.round((this.map.size_y - 1) * Math.random())
        } else {
            if (randomSeed > 0.25) {
                monster.position.y = this.map.size_x - 1
            } else {
                monster.position.y = 0
            }
            monster.position.x = Math.round((this.map.size_x - 1) * Math.random())
        }
        this.map.gridMap[monster.position.x][monster.position.y] = monster.code
    }

    movePlayer(player,deltaTime,timestamp,monsterCode,gameOver){

        if (deltaTime !== 0 && player.moving === false){

            if( player.position.x + player.speed.x < this.map.size_x &&
                player.position.x + player.speed.x >= 0 &&
                player.position.y + player.speed.y < this.map.size_y &&
                player.position.y + player.speed.y >= 0
                ){
                if (this.map.gridMap[player.position.x+player.speed.x][player.position.y+player.speed.y]===0){
                    this.map.gridMap[player.position.x][player.position.y] = 0
                    this.map.gridMap[player.position.x+player.speed.x][player.position.y+player.speed.y] = player.code

                    return {
                        position:{
                            x: player.position.x + player.speed.x,
                            y: player.position.y + player.speed.y
                        },
                        moving: true,
                        lastMove: timestamp
                    }

                } else if (this.map.gridMap[player.position.x+player.speed.x][player.position.y+player.speed.y]===monsterCode &&
                    this.isGameOver === 0) {
                    this.isGameOver = 1
                    gameOver()
                }
            }
        }
    }

    moveMonster(monster,deltaTime,timestamp,playerCode,gameOver){

        if (deltaTime !== 0 && monster.moving === false){

            if( monster.position.x + monster.speed.x < this.map.size_x &&
                monster.position.x + monster.speed.x >= 0 &&
                monster.position.y + monster.speed.y < this.map.size_y &&
                monster.position.y + monster.speed.y >= 0
                ){
                if (this.map.gridMap[monster.position.x+monster.speed.x][monster.position.y+monster.speed.y]===0){
                    this.map.gridMap[monster.position.x][monster.position.y] = 0
                    this.map.gridMap[monster.position.x+monster.speed.x][monster.position.y+monster.speed.y] = monster.code

                    return {
                        position:{
                            x: monster.position.x + monster.speed.x,
                            y: monster.position.y + monster.speed.y
                        },
                        moving: true,
                        lastMove: timestamp
                    }

                } else if (this.map.gridMap[monster.position.x+monster.speed.x][monster.position.y+monster.speed.y]===playerCode &&
                    this.isGameOver === 0) {
                    this.isGameOver = 1
                    gameOver()
                }
            }
        }
    }

    draw(ctx,size_x,size_y,grid_element_size,playerCode,monsterCode){
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
                }
            }
        }
    }
}