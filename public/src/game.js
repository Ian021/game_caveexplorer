
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

let path = new Pathfinding()

let player = new Player()
let monster = new Monster(path)
let win = new Win()

let scenario

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

function gameLoop(timestamp){

    if (!scenario||nextLevel){
        scenario = new Scenario(new Map(size_x,size_y,mapParameters),player,monster,win)
        nextLevel = 0
    }

    let deltaTime = timestamp - lastTime

    lastTime = timestamp

    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT)

    player.move(timestamp, scenario.move(player,deltaTime,timestamp,monster.code,events.gameOver,win))
    monster.move(timestamp, scenario.move(monster,deltaTime,timestamp,player.code,events.gameOver))
    nextLevel = scenario.nextLevel()

    scenario.draw(ctx,size_x,size_y,sqm,player.code,monster.code,win.code)
    
    requestAnimationFrame(gameLoop)
}

gameLoop(0)