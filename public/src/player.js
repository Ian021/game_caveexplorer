import { platform } from "os"

export class Player {
    constructor(name){
        this.name = name
        this.level = 1
        this.power = {
            alreadyUsed: false
        }
        this.code = 2
        this.health = 100
        this.moving = false
        this.lastMove = 0
        this.baseSpeed = 200
        this.speed = {
            module:this.baseSpeed,
            x:0,
            y:0
        }
        this.position = {
            x : 0,
            y : 0
        }
    }

    levelUp(level){
        this.level = level
        this.speed.module = this.baseSpeed
        this.power.alreadyUsed = false
        if (this.powerControl){
            this.powerControl('LEVEL_UP')
        }
    }

    usePower(powerControl,inputHandler){
        this.powerControl = powerControl.bind(inputHandler)
        if (!this.power.alreadyUsed){
            this.powerControl('USING_POWER')
            this.power.alreadyUsed = true
            this.speed.module = 100
        setTimeout(() => {
            this.speed.module = this.baseSpeed
            this.powerControl('POWER_END')
        }, 1000);
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