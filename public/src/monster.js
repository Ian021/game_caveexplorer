
export class Monster {
    constructor(path){

        this.path = path
        this.code = 100201
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
            this.findNextMove()
        }
    }
    processMovement(object) {
        if (object) {
            this.position = object.position;
            this.moving = object.moving;
            this.lastMove = object.lastMove;
        }
    }
    findNextMove(){
        let random = Math.random();

        this.speed.x = 0
        this.speed.y = 0
        
        if (random<0.25) {
            this.speed.x = 1
        } else if (random<0.50) {
            this.speed.x = -1
        } else if (random<0.75) {
            this.speed.y = 1
        } else {
            this.speed.y = -1
        }
        // this.path.execute({position:{x:0,y:0}},{x:5,y:5},3)
    }
}