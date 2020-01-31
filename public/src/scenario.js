// Trocar forearch por for; calcular novos blocos somente nas extremidades (remover blocos antigos)

export class Scenario {
    constructor(size_x,size_y,optional_parameters){
        let check = this.checkInput(size_x,size_y,optional_parameters);if(check !=='TRUE'){console.log(check)}else{
            this.size_x = size_x
            this.size_y = size_y
            if(optional_parameters.density){this.density = optional_parameters.density}else{this.density=0.2}
            if(optional_parameters.dispersion){this.dispersion = optional_parameters.dispersion}else{this.dispersion=1}
            if(optional_parameters.maxPropagation){this.maxPropagation = optional_parameters.maxPropagation}else{this.maxPropagation=1}
            if(optional_parameters.minPropagation){this.minPropagation = optional_parameters.minPropagation}else{this.minPropagation=0.25}
        }

        this.size = size_x*size_y
        this.maxBlocks = Math.round(this.size*this.density)

        this.seedBlocksDensity = this.density*this.dispersion
        this.seedBlocks = 0
        this.blockLocations = []
        this.blocks = 0
        this.gridMap

        this._generateMap()
    }

    checkInput(size_x,size_y,optional_parameters) {
        if(typeof size_x === 'number' & typeof size_y === 'number' & typeof optional_parameters === 'object'){
            if (size_x > 0 & size_y > 0){
                if (size_x % 1 === 0 & size_y % 1 === 0) {
                    return('TRUE')
                } else {
                    return('Must use integers: size_x and size_y!')
                }
            } else {
                return('Must be Greater than zero: size_x and size_y!')
            }
        } else {
            return('size_x and size_y Must be Natural Numbers and optional_parameters Must be an object. received '+ JSON.stringify({
                size_x:typeof size_x,
                size_y:typeof size_y,
                optional_parameters:typeof optional_parameters
            }))
        }
    }

    _generateSeedMap(){
        
        let blankMap = new Array(this.size_x).fill(new Array(this.size_y).fill(0))

        if (this.seedBlocksDensity > 0) {
            while (this.blocks === 0){
                this.gridMap = blankMap.map((row,row_index)=>{
                    return(row.map((col,col_index)=>{
                        let rand = Math.random()
                        if(rand > this.seedBlocksDensity){
                            return(0)
                        } else {
                            this.seedBlocks++
                            this.blockLocations.push({x:row_index,y:col_index})
                            return(1)
                        }
                    }))
                })
                this.blocks = this.blockLocations.length
            }
        }
        
    }


    _generateMap(){
        this._generateSeedMap()

        if(this.seedBlocks > 0){

            while(this.blocks < this.maxBlocks){
                
                let propagation = Math.min(
                    this.maxPropagation,
                    Math.max(
                        (this.maxBlocks - this.blocks)/(4*this.blocks),
                        this.minPropagation
                    )
                )
                
                // console.log(propagation)
                this.blockLocations.forEach(location =>{
                    let neighboors = [{x:location.x,y:location.y+1},
                                    {x:location.x+1,y:location.y},
                                    {x:location.x,y:location.y-1},
                                    {x:location.x-1,y:location.y}]
                    neighboors.forEach(element => {
                        if(element.x >= 0 & element.x < this.size_x & element.y >= 0 & element.y < this.size_y) {
                            if(this.gridMap[element.x][element.y] === 0) {
                                if(Math.random() < propagation) {
                                    this.gridMap[element.x][element.y] = 1
                                    this.blockLocations.push({x:element.x,y:element.y})
                                }
                            }
                        }
                    })
                })
                this.blocks = this.blockLocations.length
            }
        }
    }

    positionPlayer(player){
        player.position.x = Math.round(this.size_x/2-1)
        player.position.y = Math.round(this.size_y/2-1)
        this.gridMap[player.position.x][player.position.y] = player.code
    }

    movePlayer(player,deltaTime,timestamp){

        if (deltaTime !== 0 && player.moving === false){

            if( player.position.x + player.speed.x < this.size_x &&
                player.position.x + player.speed.x >= 0 &&
                player.position.y + player.speed.y < this.size_y &&
                player.position.y + player.speed.y >= 0
                ){
                if (this.gridMap[player.position.x+player.speed.x][player.position.y+player.speed.y]===0){
                    this.gridMap[player.position.x][player.position.y] = 0
                    this.gridMap[player.position.x+player.speed.x][player.position.y+player.speed.y] = player.code

                    player.position.x = player.position.x + player.speed.x
                    player.position.y = player.position.y + player.speed.y
                    player.moving = true
                    player.lastMove = timestamp
                }
            }
        }
    }

    draw(ctx,size_x,size_y,grid_element_size){

        for(let x=0;x<size_x;x++){
            for (let y=0;y<size_y;y++){
                if (this.gridMap[x][y]===1){
                    ctx.fillStyle = 'rgb(64,64,64)'
                    ctx.fillRect(
                        grid_element_size*x,
                        grid_element_size*y,
                        grid_element_size,
                        grid_element_size);
                } else if (this.gridMap[x][y]===100101) {
                    ctx.fillStyle = 'rgb(64,64,128)'
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