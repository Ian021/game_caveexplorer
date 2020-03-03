
export class Map {
    constructor(size_x,size_y,optional_parameters){
        let check = this.checkInput(size_x,size_y,optional_parameters);if(check !=='TRUE'){console.log(check)}else{
            this.size_x = size_x
            this.size_y = size_y
            if(optional_parameters.density){this.density = optional_parameters.density}else{this.density=0.2}
            if(optional_parameters.dispersion){this.dispersion = optional_parameters.dispersion}else{this.dispersion=1}
            if(optional_parameters.maxPropagation){this.maxPropagation = optional_parameters.maxPropagation}else{this.maxPropagation=1}
            if(optional_parameters.minPropagation){this.minPropagation = optional_parameters.minPropagation}else{this.minPropagation=0.25}
        }

        this.gridMap
        this.generateMap()
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

    generateSeedMap(){
        let seedBlocksDensity = this.density*this.dispersion
        // let seedBlocks = 0
        let seedBlockLocations = []
        // let blocks = 0
        
        let blankMap = new Array(this.size_x).fill(new Array(this.size_y).fill(0))

        if (seedBlocksDensity > 0) {
            while (seedBlockLocations.length === 0){
                this.gridMap = blankMap.map((row,row_index)=>{
                    return(row.map((col,col_index)=>{
                        let rand = Math.random()
                        if(rand > seedBlocksDensity){
                            return(0)
                        } else {
                            // seedBlocks++
                            seedBlockLocations.push({x:row_index,y:col_index})
                            return(1)
                        }
                    }))
                })
            }
        }
        return {
            blockLocations: seedBlockLocations, 
            blocks: seedBlockLocations.length
        }
    }


    generateMap(){

        let {blocks, blockLocations} = this.generateSeedMap()

        let maxBlocks = Math.round(this.size_x*this.size_y*this.density)

        if(blocks > 0){

            while(blocks < maxBlocks){
                
                let propagation = Math.min(
                    this.maxPropagation,
                    Math.max(
                        (maxBlocks - blocks)/(4*blocks),
                        this.minPropagation
                    )
                )
                
                blockLocations.forEach(location =>{
                    let neighboors = [{x:location.x,y:location.y+1},
                                    {x:location.x+1,y:location.y},
                                    {x:location.x,y:location.y-1},
                                    {x:location.x-1,y:location.y}]
                    neighboors.forEach(element => {
                        if(element.x >= 0 & element.x < this.size_x & element.y >= 0 & element.y < this.size_y) {
                            if(this.gridMap[element.x][element.y] === 0) {
                                if(Math.random() < propagation) {
                                    this.gridMap[element.x][element.y] = 1
                                    blockLocations.push({x:element.x,y:element.y})
                                }
                            }
                        }
                    })
                })
                blocks = blockLocations.length
            }
        }
    }
}