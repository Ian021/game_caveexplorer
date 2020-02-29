
export class Events{
    constructor(){
    }

    gameOver(){
        window.location.replace(document.querySelector('.game-over').value)
    }
}