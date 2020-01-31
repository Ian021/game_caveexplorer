
export class Player {
    constructor(){
        this.code = 100101
        this.health = 100
        this.moving = false
        this.lastMove = 0
        this.speed = {
            module:200,
            x:0,
            y:0
        }
        this.position = {
            x : 0,
            y : 0
        }
    }
    move(timestamp){
        if(timestamp - this.lastMove > this.speed.module){
            this.moving = false
        }
    }
}