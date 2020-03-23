import { platform } from "os"

export class Player {
    constructor(name){
        this.name = name
        this.code = 2
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

    move(timestamp,object) {
        if (object) {
            this.position = object.position;
            this.moving = object.moving;
            this.lastMove = object.lastMove;
        }
        if(timestamp - this.lastMove > this.speed.module){
            this.moving = false
        }
    }
    isAbleToWin(win,pathfinding){
        let isAbleToWin = Boolean(pathfinding.execute(this,win))
        return isAbleToWin
    }
}