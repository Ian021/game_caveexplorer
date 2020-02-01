// Contains the game logic
// Only called for the play page
/*---------------------------------- ----------------------------------*/
import { Scenario } from './scenario'
import { resolution } from './resolution'
import { Player } from './player'
import { InputHandler } from './input'
/*---------------------------------- ----------------------------------*/


let {GAME_WIDTH, GAME_HEIGHT,size_x,size_y} = resolution.SQUARE_MOBILE
let scenario = new Scenario(size_x,size_y,{density:0.15,dispersion:0.2,maxPropagation:0.5,minPropagation:0.05})
window.player = new Player(sqm)
scenario.positionPlayer(player)

window.input = new InputHandler(player)

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

    scenario.movePlayer(player,deltaTime,timestamp)
    player.move(timestamp)
    
    scenario.draw(ctx,size_x,size_y,sqm)

    requestAnimationFrame(gameLoop)
}

gameLoop(0)