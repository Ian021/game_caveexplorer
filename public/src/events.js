
export class Events{
    gameOver(playerName,level){
        let ajax = new XMLHttpRequest()
        ajax.open('POST','/ranking')
        ajax.send({player:playerName,level:level})
        window.location.replace(document.querySelector('.game-over').value)
    }
}