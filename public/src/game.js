
// Contains the game logic
// Only called for the play page
/*---------------------------------- ----------------------------------*/

import { Map } from './map'
import { Scenario } from './scenario'
import { resolution } from './resolution'
import { Player } from './player'
import { Monster } from './monster'
import { Win } from './win'
import { InputHandler } from './input'
import { Events } from './events'
import { Pathfinding } from './pathfinding'
/*---------------------------------- ----------------------------------*/

let {GAME_WIDTH, GAME_HEIGHT,size_x,size_y} = resolution.SQUARE_MOBILE

let mapParameters = {density:0.15,dispersion:0.2,maxPropagation:0.5,minPropagation:0.05}

let player = new Player()
let monster = new Monster()
let win = new Win()

let map,scenario,pathfinding

window.input = new InputHandler(player,monster)
window.events = new Events()

const sqm = GAME_HEIGHT/size_y
/*---------------------------------- ----------------------------------*/


let canvas = document.getElementById('gameScreen');
let ctx = canvas.getContext('2d');

canvas.style.backgroundColor = 'rgba(200,200,50,0.5)'
canvas.setAttribute('width',GAME_WIDTH)
canvas.setAttribute('height',GAME_HEIGHT)

/*---------------------------------- GAME LOOP ----------------------------------*/

let lastTime = 0
let nextLevel = 0
let level = 1
let resetGame = false

function createGame (callback){
    map = new Map(size_x,size_y,mapParameters)
    scenario = new Scenario(map,player,monster,win)
    pathfinding = new Pathfinding(map)
    return callback()
}

function nextLevelText(level){
    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT)
    ctx.fillStyle = 'rgb(64,64,64)'
    ctx.textAlign = "center";
    ctx.font = "bold 30px Arial";
    ctx.fillText("LEVEL "+level, canvas.width/2, canvas.height/2);
}

function gameLoop(timestamp){

    if (!scenario || nextLevel === true || resetGame){
        
        createGame(()=>{
            if(player.isAbleToWin(win,pathfinding) === true && monster.isAbleToWin(win,pathfinding) === true){
                resetGame = false
            } else {
                resetGame = true
            }
        })

        if(nextLevel && !resetGame){
            nextLevel = false
            level++
            nextLevelText(level)
            setTimeout(()=>requestAnimationFrame(gameLoop),1000)
        } else {    
            requestAnimationFrame(gameLoop)
        }

    } else {
        let deltaTime = timestamp - lastTime
        lastTime = timestamp

        player.move(timestamp, scenario.move(player,deltaTime,timestamp,monster.code,events.gameOver, win))
        monster.move(timestamp, scenario.move(monster,deltaTime,timestamp,player.code,events.gameOver), pathfinding, player, win)
        
        ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT)
        scenario.draw(ctx,size_x,size_y,sqm,player.code,monster.code,win.code)

        nextLevel = scenario.nextLevel()
        requestAnimationFrame(gameLoop)
    }
}

gameLoop(0)