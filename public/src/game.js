// Contains the game logic
// Only called for the play page
/*---------------------------------- ----------------------------------*/

import { Scenario } from './scenario'
import { resolution } from './resolution'
import { Player } from './player'
import { Monster } from './monster'
import { InputHandler } from './input'
import { Events } from './events'
/*---------------------------------- ----------------------------------*/


let {GAME_WIDTH, GAME_HEIGHT,size_x,size_y} = resolution.SQUARE_MOBILE
let scenario = new Scenario(size_x,size_y,{density:0.15,dispersion:0.2,maxPropagation:0.5,minPropagation:0.05})

window.player = new Player()
window.monster = new Monster()
scenario.positionPlayer(player)
scenario.positionMonster(monster)

window.input = new InputHandler(player)
window.events = new Events()

const sqm = GAME_HEIGHT/size_y
/*---------------------------------- ----------------------------------*/


let canvas = document.getElementById('gameScreen');
let ctx = canvas.getContext('2d');

canvas.style.backgroundColor = 'rgba(200,200,50,0.5)'
canvas.setAttribute('width',GAME_WIDTH)
canvas.setAttribute('height',GAME_HEIGHT)


/*---------------------------------- ----------------------------------*/
let lastTime = 0

function gameLoop(timestamp){

    let deltaTime = timestamp - lastTime

    lastTime = timestamp

    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT)

    scenario.movePlayer(player,deltaTime,timestamp,monster.code,events.gameOver)
    player.move(timestamp)
    
    scenario.draw(ctx,size_x,size_y,sqm,player.code,monster.code)

    requestAnimationFrame(gameLoop)
}

gameLoop(0)