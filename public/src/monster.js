
export class Monster {
    constructor(path){

        this.allowMovement = true
        this.path = path
        this.code = 3
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
    pause(gamePaused){
        this.speed.x = 0
        this.speed.y = 0
        
        if (gamePaused){
            this.allowMovement = false
        } else {
            this.allowMovement = true
        }
    }

    move(timestamp,object,pathfinding,player){
        if (object) {
            this.position = object.position;
            this.moving = object.moving;
            this.lastMove = object.lastMove;
        }
        if(timestamp - this.lastMove > this.speed.module){
            this.moving = false
            this.findNextMove(pathfinding,player)
        }
    }
    
    findNextMove(pathfinding,player){
        if (this.allowMovement === true) {
            let direction = pathfinding.execute(this,player)
            if (direction){
                this.translateMovement(direction)
            }
        }
    }

    isAbleToWin(win,pathfinding){
        let isAbleToWin = Boolean(pathfinding.execute(this,win))
        return isAbleToWin
    }
    
    translateMovement(direction){
        if (this.allowMovement){
            switch(direction.name){
                case 'LEFT':
                    this.translateMovement({name:'STOP'})
                    this.speed.x = -1
                    break
                case 'UP':
                    this.translateMovement({name:'STOP'})
                    this.speed.y = -1
                    break
                case 'RIGHT':
                    this.translateMovement({name:'STOP'})
                    this.speed.x = 1
                    break
                case 'DOWN':
                    this.translateMovement({name:'STOP'})
                    this.speed.y = 1
                    break
                case 'STOP':
                    this.speed.x = 0
                    this.speed.y = 0
                    break
            }
        }
    }
}